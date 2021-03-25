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
            <p>{">"} Visualizar usuários</p>

            <p>{">"} Consultar cartões</p>

            <p>{">"} Obter auditoria</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
