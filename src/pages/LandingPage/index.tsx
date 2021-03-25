import PageHeader from '../../components/PageHeader';

import './styles.css';

const LandingPage = () => {
  return (
    <div className="page-container">
      <PageHeader />

      <h1>Bem-vindo, Thales!</h1>

      <p>Escolha uma das opções abaixo para continuar.</p>

      <main>
        <h2>Recursos disponíveis</h2>
        <p>Visualizar usuários</p>
      </main>
    </div>
  );
}

export default LandingPage;
