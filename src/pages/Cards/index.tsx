import { useEffect, useState } from 'react';
import { FiCreditCard } from 'react-icons/fi';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

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
  const [cards, setCards] = useState([]);

  async function loadCards() {
    const response = await api.get('/cards');

    setCards(response.data);
  }

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="cards-container">
      <PageHeader />
      <h1>Consulta de cartões</h1>
      <p>Verifique status, valores e muito mais.</p>

      <div className="cards-content">
        <aside>Buscar cartão</aside>
        <main>
          <ul>
            {cards.map((card: Card) => (
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
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Cards;
