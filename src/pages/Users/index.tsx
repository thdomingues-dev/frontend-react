import PageHeader from '../../components/PageHeader';

import './styles.css';

const Users = () => {
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
            <li>Dev1</li>

            <li>Dev2</li>

            <li>Dev3</li>
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Users;
