import { useEffect, useState } from 'react';
import { FiCreditCard } from 'react-icons/fi';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

import './styles.css';

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
            <li>
              <header>
                GREENROCK
              </header>

              <FiCreditCard style={{ color: "#FFF" }} />

              <span>
                <div>
                  <div className="cards-content-row">
                    <p>Thales dos Santos Domingues</p>
                  </div>

                  <div className="cards-content-row">
                    <p>0247 5471 1223 8</p>
                  </div>
                </div>

                <div>
                  <div className="cards-content-row">
                    <strong>Status</strong>
                    <p>Solicitado</p>
                  </div>

                  <div className="cards-content-row">
                    <strong>Limite</strong>
                    <p>R$ 15.000,00</p>
                  </div>
                </div>
              </span>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Cards;
