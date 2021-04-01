import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';
import { FiCreditCard, FiCheckSquare } from 'react-icons/fi';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';

import './styles.css';

interface Card {
  id: number;
  status: string;
  metadatas: {
    name: string;
    digits: number;
    limit: number;
  };
}

const Cards = () => {
  const { analyst } = useContext(AuthContext);

  const [cards, setCards] = useState([]);
  const [userName, setUserName] = useState('');
  const [isUpdatingUserName, setIsUpdatingUserName] = useState(Number);

  async function loadCards() {
    const response = await api.get('/cards');

    setCards(response.data);
  }

  async function approvedCard(card: Card) {
    const oldCard = card;

    await api.put(`/cards/${card.id}`, {
      status: "approved",
      metadatas: card.metadatas,
    });

    await api.post('/audits/', {
      createdAt: "2021-02-28T23:00:02.790Z",
      before: {
        status: oldCard.status
      },
      after: {
        status: "approved"
      },
      requestedBy: 1963,
    });

    loadCards();
  }

  async function rejectedCard(card: Card) {
    const oldCard = card;

    await api.put(`/cards/${card.id}`, {
      status: "rejected",
      metadatas: card.metadatas,
    });

    await api.post('/audits/', {
      createdAt: "2021-02-28T23:00:02.790Z",
      before: {
        status: oldCard.status
      },
      after: {
        status: "rejected"
      },
      requestedBy: 1963,
    });

    loadCards();
  }

  async function deletedCard(card: Card) {
    const oldCard = card;

    await api.delete(`/cards/${card.id}`);

    await api.post('/audits/', {
      createdAt: "2021-02-28T23:00:02.790Z",
      before: {
        status: oldCard.status
      },
      after: {
        status: "deleted"
      },
      requestedBy: 1963,
    });

    loadCards();
  }

  async function updatedUserName(card: Card) {
    await api.put(`/cards/${card.id}`, {
      status: card.status,
      metadatas: {
        name: userName,
        digits: card.metadatas.digits,
        limit: card.metadatas.limit,
      }
    });

    await api.post('/audits/', {
      createdAt: "2021-02-28T23:00:02.790Z",
      before: {
        status: String(card.metadatas.name),
      },
      after: {
        status: userName,
      },
      requestedBy: 7247,
    });

    loadCards();
    setIsUpdatingUserName(0);
  }

  function handleUserCard(card: Card) {
    setIsUpdatingUserName(card.id);
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
        <aside>Buscar cartão</aside>
        <main>
          <ul>
            {cards.map((card: Card) => (
              <div className="cards-content-group">
                <li key={card.id}>
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
                      <div className="cards-content-row">
                        <strong>Status</strong>
                        <p>{card.status}</p>
                      </div>

                      {analyst.roles.includes("n2") &&
                        <div className="cards-content-row">
                          <strong>Limite</strong>
                          <p>R$ {card.metadatas.limit}</p>
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
              </div>
            ))}
          </ul>
        </main>
      </div>
    </div >
  );
}

export default Cards;
