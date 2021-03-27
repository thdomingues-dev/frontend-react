import PageHeader from '../../components/PageHeader';
import ResourceButton from '../../components/ResourceButton';

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
            <ResourceButton
              path="/users"
              description=" Visualizar usuários"
            />

            <ResourceButton
              path="/cards"
              description=" Consultar cartões"
            />

            <ResourceButton
              path="/audits"
              description=" Obter auditoria"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
