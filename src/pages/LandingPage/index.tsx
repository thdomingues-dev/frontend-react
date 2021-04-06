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

      <div className="page-container-grid">
        <div className="page-title">
          <PageTitle
            title={`Bem-vindo(a), ${handleNameFormated()}!`}
            description="Escolha uma das opções para continuar."
          />
        </div>

        <main>
          <div className="group-container">
            <h2>Recursos disponíveis</h2>

            <div className="resource-group">
              <ResourceButton
                path="/users"
                description=" Visualizar usuários"
                icon="FiUsers"
              />

              <ResourceButton
                path="/cards"
                description=" Consultar cartões"
                icon="FaRegCreditCard"
              />

              <ResourceButton
                path="/newcard"
                description=" Solicitar cartão"
                icon="AiOutlineIdcard"
              />

              {analyst.roles.includes("n2") &&
                <ResourceButton
                  path="/audits"
                  description=" Obter auditoria"
                  icon="FiFileText"
                />
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default LandingPage;
