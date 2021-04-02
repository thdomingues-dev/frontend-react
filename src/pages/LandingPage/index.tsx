import { useContext } from 'react';
import AuthContext from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import ResourceButton from '../../components/ResourceButton';

import './styles.css';

const LandingPage = () => {
  const { analyst } = useContext(AuthContext);

  function handleNameFormated() {
    const analystName = analyst.name.split(" ");
    return analystName[0];
  }

  return (
    <div className="page-container">
      <PageHeader />

      <PageTitle
        title={`Bem-vindo(a), ${handleNameFormated()}!`}
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

            {analyst.roles.includes("n2") &&
              <ResourceButton
                path="/audits"
                description=" Obter auditoria"
              />
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
