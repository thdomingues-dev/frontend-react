import { useEffect, useState } from 'react';

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

interface Analyst {
  id: number;
  email: string;
}

const Audits = () => {
  const [audits, setAudits] = useState([]);
  const [analysts, setAnalysts] = useState<Analyst[]>([]);

  async function loadAudits() {
    const response = await api.get('/audits');

    setAudits(response.data);
  }

  async function loadAnalysts() {
    const response = await api.get('/analysts');

    setAnalysts(response.data);
  }

  function findAnalyst(idRequester: number) {
    for (let i = 0; i < analysts.length; i++) {
      if (analysts[i].id === idRequester) return analysts[i].email;
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
    loadAnalysts();
  }, []);

  return (
    <div className="audits-container">
      <PageHeader />
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
    </div>
  );
}

export default Audits;
