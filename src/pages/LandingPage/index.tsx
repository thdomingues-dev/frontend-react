import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import PageHeader from '../../components/PageHeader';

import './styles.css';

const LandingPage = () => {
  return (
    <div className="page-container">
      <PageHeader />

      <h1>Bem-vindo, Thales!</h1>

      <p>Escolha uma das opções abaixo para continuar.</p>

      <main>
        <div className="group-container">
          <h2>Recursos disponíveis</h2>

          <div className="resource-group">
            <Link to="/users">
              <span>
                <FiChevronRight />
              </span>
              <p> Visualizar usuários</p>
            </Link>

            <Link to="/cards">
              <span>
                <FiChevronRight />
              </span>
              <p> Consultar cartões</p>
            </Link>

            <Link to="/audits">
              <span>
                <FiChevronRight />
              </span>
              <p> Obter auditoria</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
