import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/auth';

import { FiUser } from 'react-icons/fi';

import { formatToBRL, formatToCPF, formatToBirthdate } from '../../utils/translate';

import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import SearchBox from '../../components/SearchBox';

import api from '../../services/api';

import './styles.css';

interface User {
  id: number;
  name: string;
  document: number;
  email: string;
  birthDate: string;
  salaryBase: number;
  enabledFeatures: number[];
  address: {
    city: string;
    state: string;
    postalCode: string;
    streetNumber: number;
  }
}

const Users = () => {
  const { analyst } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  const [searchedUser, setSearchedUser] = useState('');
  const [isUserFound, setIsUserFound] = useState(true);

  async function loadUsers() {
    const response = await api.get('/users');

    setUsers(response.data);
  }

  function checkCreditCard(features: number[]) {
    if (features.includes(0)) return 'Elegível';
    return 'Não elegível';
  }

  function handleChange(e: any) {
    setSearchedUser(e.target.value);
  }

  async function searchUser(userId: number) {
    const response = await api.get('/users');
    let foundUser = false;

    for (let index = 0; index < response.data.length; index++) {
      if (response.data[index].id === userId) {
        setUsers([response.data[index]]);
        foundUser = true;
      }
    }

    foundUser ? setIsUserFound(true) : setIsUserFound(false);
  }

  function clearSearch() {
    ((document.getElementById("SearchedUser") as HTMLInputElement).value) = "";
    setSearchedUser('');
    setIsUserFound(true);
    loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="users-container">
      <PageHeader />

      <PageTitle
        title="Usuários cadastrados"
        description="Aqui é possível encontrar informações como: nome, documento, e-mail e muito mais."
      />

      <div className="users-content">
        <aside>
          <SearchBox
            id="SearchedUser"
            title="Buscar Usuário"
            description="Informe id usuário"
            alert="Usuário não encontrado."
            isTargetFound={isUserFound}
            inputChange={handleChange}
            handleTarget={() => { searchUser(Number(searchedUser)) }}
            handleClearSearch={clearSearch}
          />
        </aside>
        <main>
          <ul>
            {
              users.map((user: User) => (
                <li key={user.document}>
                  <header>
                    <FiUser />
                    <strong>{user.name}</strong>
                  </header>

                  <strong>E-mail</strong>
                  <p>{user.email}</p>

                  <div className="users-content-group">
                    <div className="users-content-column">
                      <strong>ID</strong>
                      <p>{user.id}</p>
                    </div>

                    <div className="users-content-column">
                      <strong>Número de CPF</strong>
                      <p>{formatToCPF(String(user.document))}</p>
                    </div>

                    <div className="users-content-column">
                      <strong>Nascimento</strong>
                      <p>{formatToBirthdate(user?.birthDate)}</p>
                    </div>
                  </div>


                  <div className="users-content-group">
                    <div className="users-content-column">
                      <strong>Número</strong>
                      <p>{user.address.streetNumber}</p>
                    </div>

                    <div className="users-content-column">
                      <strong>Cidade</strong>
                      <p>{user.address.city}</p>
                    </div>

                    <div className="users-content-column">
                      <strong>UF</strong>
                      <p>{user.address.state}</p>
                    </div>

                    <div className="users-content-column">
                      <strong>Cód. Postal</strong>
                      <p>{user.address.postalCode}</p>
                    </div>
                  </div>

                  <div className="users-content-group">
                    {analyst.roles.includes("n2") && (
                      <div className="users-content-column">
                        <strong>Salário</strong>
                        <p>{formatToBRL(user.salaryBase)}</p>
                      </div>
                    )
                    }

                    <div className="users-content-column">
                      <strong>Cartão</strong>
                      <p>{checkCreditCard(user.enabledFeatures)}</p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Users;
