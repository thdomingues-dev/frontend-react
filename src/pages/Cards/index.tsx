import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiCreditCard, FiCheckSquare, FiXSquare } from 'react-icons/fi';

import translateToPortuguese, { formatToBRL } from '../../utils/translate';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import SearchBox from '../../components/SearchBox';

import './styles.css';

interface Card {
  id: number;
  user_id: number;
  status: string;
  metadatas: {
    name: string;
    digits: number;
    limit: number;
  };
}

const Cards = () => {
  const { analyst } = useContext(AuthContext);

  const [cards, setCards] = useState<Card[]>([]);
  const [userName, setUserName] = useState('');
  const [searchedCard, setSearchedCard] = useState('');

  const [isUpdatedCard, setIsUpdatedCard] = useState(Number);
  const [isUpdatingUserName, setIsUpdatingUserName] = useState(Number);
  const [isSearching, setIsSearching] = useState(false);
  const [isCardFound, setIsCardFound] = useState(true);

  async function loadCards() {
    const response = await api.get('/cards');

    setCards(response.data);
  }

  async function approvedCard(card: Card) {
    const oldCard = card;

    if (oldCard.status === 'requested') {
      await api.put(`/cards/${card.id}`, {
        id: card.id,
        user_id: card.user_id,
        status: "approved",
        metadatas: card.metadatas,
      });

      await api.post('/audits/', {
        createdAt: new Date().toISOString(),
        type: "card-status-change",
        before: {
          id: oldCard.id,
          status: oldCard.status
        },
        after: {
          id: oldCard.id,
          status: "approved"
        },
        requestedBy: analyst.user_id,
      });

      isSearching ? searchCard(card.id) : loadCards();
    } else {
      setIsUpdatedCard(card.id);
    }
  }

  async function rejectedCard(card: Card) {
    const oldCard = card;

    if (oldCard.status === 'requested') {
      await api.put(`/cards/${card.id}`, {
        id: card.id,
        user_id: card.user_id,
        status: "rejected",
        metadatas: card.metadatas,
      });

      await api.post('/audits/', {
        createdAt: new Date().toISOString(),
        type: "card-status-change",
        before: {
          id: oldCard.id,
          status: oldCard.status
        },
        after: {
          id: oldCard.id,
          status: "rejected"
        },
        requestedBy: analyst.user_id,
      });

      isSearching ? searchCard(card.id) : loadCards();
    } else {
      setIsUpdatedCard(card.id);
    }
  }

  async function deletedCard(card: Card) {
    const oldCard = card;

    await api.delete(`/cards/${card.id}`);

    await api.post('/audits/', {
      createdAt: new Date().toISOString(),
      type: "card-remove",
      before: {
        id: oldCard.id,
        status: oldCard.status
      },
      after: {
        id: oldCard.id,
        status: "deleted"
      },
      requestedBy: analyst.user_id,
    });

    loadCards();
  }

  async function updatedUserName(card: Card) {
    await api.put(`/cards/${card.id}`, {
      id: card.id,
      user_id: card.user_id,
      status: card.status,
      metadatas: {
        name: userName,
        digits: card.metadatas.digits,
        limit: card.metadatas.limit,
      }
    });

    await api.post('/audits/', {
      createdAt: new Date().toISOString(),
      type: "card-name-change",
      before: {
        id: card.id,
        status: String(card.metadatas.name),
      },
      after: {
        id: card.id,
        status: userName,
      },
      requestedBy: analyst.user_id,
    });

    isSearching ? searchCard(card.id) : loadCards();
    setIsUpdatingUserName(0);
  }

  function handleUserCard(card: Card) {
    setIsUpdatingUserName(card.id);
  }

  async function searchCard(cardId: number) {
    const response = await api.get('/cards');
    let foundCard = false;

    for (let index = 0; index < response.data.length; index++) {
      if (response.data[index].id === cardId) {
        setCards([response.data[index]]);
        foundCard = true;
      }
    }
    if (foundCard) {
      setIsSearching(true);
      setIsCardFound(true);
    } else {
      setIsSearching(false);
      setIsCardFound(false);
    }
  }

  function handleClearSearch() {
    ((document.getElementById("SearchedCard") as HTMLInputElement).value) = "";
    setSearchedCard("");
    setIsSearching(false);
    setIsCardFound(true);
    loadCards();
  }

  function handleChange(e: any) {
    setSearchedCard(e.target.value);
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="cards-container">
      <PageHeader />

      <PageTitle
        title="Consulta de cartões"
        description="Verifique status, valores e muito mais."
      />

      <div className="cards-content">
        <aside>
          <SearchBox
            id="SearchedCard"
            title="Buscar Cartão"
            description="Informe id cartão"
            alert="Cartão não encontrado."
            isTargetFound={isCardFound}
            inputChange={handleChange}
            handleTarget={() => { searchCard(Number(searchedCard)) }}
            handleClearSearch={handleClearSearch}
          />
        </aside>

        <main>
          <ul>
            {cards.map((card: Card) => (
              <div key={card.id.toString()} className="cards-content-layer">
                <div className="cards-content-group">
                  <li>
                    <header>
                      GREENROCK
                    </header>

                    <FiCreditCard style={{ color: "#FFF" }} />

                    <span>
                      <div>
                        <div className="cards-content-row">
                          <p>{card.metadatas.name}</p>
                        </div>

                        {(isUpdatingUserName === card.id) &&
                          <div className="cards-content-row">
                            <div className="cards-content-name">
                              <input
                                type="text"
                                placeholder="Nome do usuário"
                                onChange={(e) => { setUserName(e.target.value) }}
                                maxLength={70}
                                autoComplete="off"
                              />
                              <FiCheckSquare onClick={() => { updatedUserName(card) }} />
                            </div>
                          </div>
                        }

                        <div className="cards-content-row">
                          <p>{card.metadatas.digits}</p>
                        </div>
                      </div>

                      <div>
                        <div className="cards-content-column">
                          <div className="cards-content-row">
                            <strong>ID</strong>
                            <p>{card.id}</p>
                          </div>

                          <div className="cards-content-row">
                            <strong>ID_Cliente</strong>
                            <p>{card.user_id}</p>
                          </div>
                        </div>

                        <div className="cards-content-row">
                          <strong>Status</strong>
                          <p>{translateToPortuguese(card.status)}</p>
                        </div>

                        {analyst.roles.includes("n2") &&
                          <div className="cards-content-row">
                            <strong>Limite</strong>
                            <p>{formatToBRL(card.metadatas.limit)}</p>
                          </div>
                        }
                      </div>
                    </span>
                  </li>

                  <div className="cards-group-box">
                    <button
                      type="button"
                      onClick={() => { approvedCard(card) }}
                    >
                      Aprovar
                    </button>

                    <button
                      type="button"
                      onClick={() => { rejectedCard(card) }}
                    >
                      Rejeitar
                    </button>

                    <button
                      type="button"
                      onClick={() => { handleUserCard(card) }}
                    >
                      Atualizar
                    </button>

                    {analyst.roles.includes("n2") &&
                      <button
                        type="button"
                        onClick={() => { deletedCard(card) }}
                      >
                        Excluir
                    </button>}
                  </div>
                  {
                    (isUpdatedCard === card.id) &&
                    (
                      <div className="cards-alert" onClick={() => { setIsUpdatedCard(0) }}>
                        <p>Status do cartão já foi modificado</p>
                        <FiXSquare />
                      </div>
                    )
                  }
                </div>
              </div>
            ))}
          </ul>
        </main>
      </div>
    </div >
  );
}

export default Cards;
