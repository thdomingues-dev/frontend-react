import PageHeader from '../../components/PageHeader';

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
              Card1Card1Card1
            </li>

            <li>
              Card2Card2Card2
            </li>

            <li>
              Card3Card3Card3
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Cards;
