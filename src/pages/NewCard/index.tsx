import { FormEvent, useEffect, useState, useContext } from 'react';
import authService from '../../contexts/auth';
import { useHistory } from 'react-router';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';

import api from '../../services/api';

import './styles.css';

interface User {
  enabledFeatures: number[];
  id: number;
}

const NewCard = () => {
  const { analyst } = useContext(authService);

  const [users, setUsers] = useState<User[]>([]);

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [digitsCard, setDigitsCard] = useState('');
  const [limitCard, setLimitCard] = useState('');

  const history = useHistory();

  async function handleCardRequire(e: FormEvent) {
    e.preventDefault();

    const response = isValidFeature();

    if (response) {
      await api.post('/cards/', {
        status: "requested",
        user_id: Number(userId),
        metadatas: {
          name: name,
          digits: Number(digitsCard),
          limit: Number(limitCard),
        }
      });

      await api.post('/audits/', {
        createdAt: "2021-03-31T23:00:02.790Z",
        before: {
          status: "new"
        },
        after: {
          status: "requested"
        },
        requestedBy: analyst.user_id,
      });

      history.push('/cards');
    }

  }

  function isValidFeature() {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === Number(userId) && users[i].enabledFeatures.includes(0)) {
        return true;
      }
    } return false;
  }

  async function loadUsers() {
    const response = await api.get('/users');

    setUsers(response.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="newcard-container">
      <PageHeader />

      <PageTitle
        title="Pedido de cartão"
        description="Informe os dados do usuário"
      />

      <main>
        <form onSubmit={handleCardRequire}>
          <label>Nome</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            autoComplete="off"
            required
          />

          <label >ID usuário</label>
          <input
            name="id"
            type="number"
            value={userId}
            onChange={(e) => { setUserId(e.target.value) }}
            autoComplete="off"
            required
          />

          <label>Dígitos cartão</label>
          <input
            name="digits"
            type="number"
            value={digitsCard}
            onChange={(e) => { setDigitsCard(e.target.value) }}
            autoComplete="off"
            required
          />

          <label>Limite</label>
          <input
            name="limit"
            type="number"
            value={limitCard}
            onChange={(e) => { setLimitCard(e.target.value) }}
            autoComplete="off"
            required
          />

          <div className="newcard-button-container">
            <button type="submit">Solicitar</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NewCard;