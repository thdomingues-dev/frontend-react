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

  const [isValidUser, setIsValidUser] = useState(true);
  const [isRequestSucceeded, setIsRequestSucceeded] = useState(false);

  const history = useHistory();

  async function handleCardRequire(e: FormEvent) {
    e.preventDefault();

    const response = isValidFeature();
    let getCardId = {} as any;

    if (response) {
      setIsValidUser(true);
      setIsRequestSucceeded(true);
      getCardId = await api.post('/cards/', {
        createdAt: new Date().toISOString(),
        updatedAt: null,
        status: "requested",
        user_id: Number(userId),
        metadatas: {
          name: name,
          digits: Number(digitsCard),
          limit: Number(limitCard),
        }
      });

      await api.post('/audits/', {
        createdAt: new Date().toISOString(),
        type: 'card-request',
        before: {
          status: "new",
          id: getCardId.data.id,
        },
        after: {
          status: "requested",
          id: getCardId.data.id,
        },
        requestedBy: analyst.user_id,
      });

      setTimeout(() => {
        history.push('/cards');
      }, 1500);
    } else {
      setIsValidUser(false);
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
        title="Pedido de cart??o"
        description="Informe os dados do usu??rio"
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
            maxLength={70}
            required
          />

          <label>Usu??rio ID</label>
          <input
            name="id"
            type="number"
            value={userId}
            onChange={(e) => { setUserId(e.target.value) }}
            autoComplete="off"
            required
          />

          <label>D??gitos Cart??o</label>
          <input
            name="digits"
            type="number"
            value={digitsCard}
            onChange={(e) => { setDigitsCard(e.target.value) }}
            autoComplete="off"
            min="1"
            max="100000000000000"
            required
          />

          <label>Limite</label>
          <input
            name="limit"
            type="number"
            value={limitCard}
            onChange={(e) => { setLimitCard(e.target.value) }}
            autoComplete="off"
            min="1"
            max="100000000000000"
            required
          />

          <div className="newcard-button-container">
            {isValidUser ?
              (
                isRequestSucceeded ? (
                  <>
                    <button type="submit">Solicitar</button>
                    <p id="submit-success">Solicita????o enviada com sucesso.</p>
                  </>
                ) :
                  (<button type="submit">Solicitar</button>)
              ) : (
                <>
                  <button type="submit">Solicitar</button>
                  <p>Este usu??rio n??o possue direito de solicitar cart??o.</p>
                </>
              )
            }
          </div>
        </form>
      </main>
    </div>
  );
}

export default NewCard;
