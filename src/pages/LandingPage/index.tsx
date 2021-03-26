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
            <a href="/">
              <span>
                <FiChevronRight />
              </span>
              <p> Visualizar usuários</p>
            </a>

            <a href="/">
              <span>
                <FiChevronRight />
              </span>
              <p> Consultar cartões</p>
            </a>

            <a href="/">
              <span>
                <FiChevronRight />
              </span>
              <p> Obter auditoria</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
