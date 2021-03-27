import PageHeader from '../../components/PageHeader';

import { FiCreditCard } from 'react-icons/fi';

import './styles.css';

const Cards = () => {
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
