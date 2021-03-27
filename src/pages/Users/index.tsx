import { useState } from 'react';
import { FiUser } from 'react-icons/fi';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import './styles.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await api.get('/users');

    setUsers(response.data);
  }

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
            <li>
              <header>
                <FiUser />
                <strong>Thales dos Santos Domingues</strong>
              </header>

              <strong>E-mail</strong>
              <p>ts.tkd2@gmail.com</p>

              <strong>CPF/CNPJ</strong>
              <p>{"***.049.457.***-**"}</p>

              <strong>Aniversário</strong>
              <p>27/11/1995</p>

              <strong>Salário</strong>
              <p>R$ 12.000,00</p>
            </li>

            <li>
              <header>
                <FiUser />
                <strong>Thales dos Santos Domingues</strong>
              </header>

              <strong>E-mail</strong>
              <p>ts.tkd2@gmail.com</p>

              <strong>CPF/CNPJ</strong>
              <p>{"***.049.457.***-**"}</p>

              <strong>Salário</strong>
              <p>R$ 12.000,00</p>

              <strong>Aniversário</strong>
              <p>27/11/1995</p>
            </li>

            <li>
              <header>
                <FiUser />
                <strong>Thales dos Santos Domingues</strong>
              </header>

              <strong>E-mail</strong>
              <p>ts.tkd2@gmail.com</p>

              <strong>CPF/CNPJ</strong>
              <p>{"***.049.457.***-**"}</p>

              <strong>Salário</strong>
              <p>R$ 12.000,00</p>

              <strong>Aniversário</strong>
              <p>27/11/1995</p>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Users;
