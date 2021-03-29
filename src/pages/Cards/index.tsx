import { useEffect, useState } from 'react';
import { FiCreditCard } from 'react-icons/fi';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

import './styles.css';
import PageTitle from '../../components/PageTitle';

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
  const [cards, setCards] = useState([]);

  async function loadCards() {
    const response = await api.get('/cards');

    setCards(response.data);
  }

  async function approvedCard(card: Card) {
    await api.put(`/cards/${card.id}`, {
      status: "approved",
      metadatas: card.metadatas,
    });
  }

  async function rejectedCard(card: Card) {
    await api.put(`/cards/${card.id}`, {
      status: "rejected",
      metadatas: card.metadatas,
    });
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

                      <div className="cards-content-row">
                        <p>{card.metadatas.digits}</p>
                      </div>
                    </div>

                    <div>
                      <div className="cards-content-row">
                        <strong>Status</strong>
                        <p>{card.status}</p>
                      </div>

                      <div className="cards-content-row">
                        <strong>Limite</strong>
                        <p>R$ {card.metadatas.limit}</p>
                      </div>
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
                </div>
              </div>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Cards;
