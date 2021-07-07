import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';

import translateToPortuguese, { formatToLog } from '../../utils/translate';

import api from '../../services/api';

import './styles.css';

interface Audit {
  id: number;
  created_at: string;
  type: string;
  before: {
    id: number;
    status: string;
  };
  after: {
    id: number;
    status: string;
  },
  analyst_id: number;
}

const Audits = () => {
  const { analyst } = useContext(AuthContext);
  const [audits, setAudits] = useState([]);
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
      if (users[i]?.id === idRequester) return users[i]?.name;
    }
    return idRequester;
  }

  useEffect(() => {
    loadAudits();
    loadUsers();
  }, []);

  return (
    <div className="audits-container">
      <PageHeader />
      {analyst.roles.includes("n2") ?
        (
          <>
            <PageTitle
              title="Auditoria de logs"
              description="Analise as operações realizadas no sistema."
            />

            <main>
              <ul>
                <li>
                  <strong>ID</strong>
                  <strong>Hora/Data</strong>
                  <strong>Tipo</strong>
                  <strong>Antes</strong>
                  <strong>Depois</strong>
                  <strong>ID Cartão</strong>
                  <strong>Analista</strong>
                </li>

                {audits.map((audit: Audit) => (
                  <li key={audit?.id}>
                    <p>{audit?.id}</p>
                    <p>{formatToLog(audit?.created_at)}</p>
                    <p>{translateToPortuguese(audit?.type)}</p>
                    <p>{translateToPortuguese(audit?.before?.status)}</p>
                    <p>{translateToPortuguese(audit?.after?.status)}</p>
                    <p>{audit?.after?.id}</p>
                    <p>{findAnalyst(audit?.analyst_id)}</p>
                  </li>
                ))
                }
              </ul>
            </main>
          </>
        ) : (
          <h1>
            Usuário não possui acesso a esta página.
          </h1>
        )
      }
    </div>
  );
}

export default Audits;
