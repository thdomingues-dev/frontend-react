import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import './styles.css';

interface User {
  name: string;
  document: number;
  email: string;
  BirthDate: string;
  salaryBase: number;
}


const Users = () => {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await api.get('/users');

    setUsers(response.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="users-container">
      <PageHeader />
      <h1>Usuários cadastrados</h1>

      <p>Aqui é possível encontrar informações como: nome, documento, e-mail e muito mais.</p>

      <div className="users-content">
        <aside>
          <div>Buscar users</div>
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

                  <strong>CPF/CNPJ</strong>
                  <p>{user.document}</p>

                  <strong>Aniversário</strong>
                  <p>{user.BirthDate}</p>

                  <strong>Salário</strong>
                  <p>R$ {user.salaryBase}</p>
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
