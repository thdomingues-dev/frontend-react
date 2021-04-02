import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';

import api from '../../services/api';

import './styles.css';

interface Audit {
  id: number;
  createdAt: string;
  type: string;
  before: {
    status: string;
  };
  after: {
    status: string;
  }
  requestedBy: number;
}

const Audits = () => {
  const { analyst } = useContext(AuthContext);

  const [audits, setAudits] = useState([]);
  //const [analysts, setAnalysts] = useState<Analyst[]>([]);
  const [users, setUsers] = useState<any>([]);

  async function loadAudits() {
    const response = await api.get('/audits');

    setAudits(response.data);
  }

  async function loadUsers() {
    const response = await api.get('/users');

    setUsers(response.data);
  }

  function findAnalyst(idRequester: number) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === idRequester) return users[i].name;
    }
    return idRequester;
  }

  function translateToPortuguese(status: string) {
    switch (status.toLocaleLowerCase()) {
      case 'rejected':
        return 'Rejeitado';

      case 'approved':
        return 'Aprovado';

      case 'requested':
        return 'Solicitado';

      default:
        return status;
    }
  }

  useEffect(() => {
    loadAudits();
    loadUsers();
  }, []);

  return (
    <div className="audits-container">
      <PageHeader />
      {analyst.roles.includes("n2") &&
        <>
          <PageTitle
            title="Auditoria de logs"
            description="Analise as operações realizadas no sistema."
          />

          <main>
            <ul>
              <li>
                <strong>ID</strong>
                <strong>Data/Hora</strong>
                <strong>Antes</strong>
                <strong>Depois</strong>
                <strong>Analista</strong>
              </li>

              {audits.map((audit: Audit) => (
                <li key={audit.id}>
                  <p>{audit.id}</p>
                  <p>{audit.createdAt}</p>
                  <p>{translateToPortuguese(audit.before.status)}</p>
                  <p>{translateToPortuguese(audit.after.status)}</p>
                  <p>{findAnalyst(audit.requestedBy)}</p>
                </li>
              ))
              }
            </ul>
          </main>
        </>
      }
    </div>
  );
}

export default Audits;
