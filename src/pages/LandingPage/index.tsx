import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import ResourceButton from '../../components/ResourceButton';

import './styles.css';

const LandingPage = () => {
  return (
    <div className="page-container">
      <PageHeader />

      <PageTitle
        title="Bem-vindo, Thales!"
        description="Escolha uma das opções abaixo para continuar."
      />

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
              path="/newcard"
              description=" Solicitar cartão"
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
