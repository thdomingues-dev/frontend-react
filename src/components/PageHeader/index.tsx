import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';

import AuthProvider from '../../contexts/auth';

import './styles.css';

const PageHeader = () => {
  const history = useHistory();
  const { logout } = useContext(AuthProvider);

  function handleNavigateBack() {
    history.goBack();
  }

  return (
    <header className="page-header">
      <strong>GREENROCK</strong>

      <div className="page-button-container">
        <div className="page-back" onClick={handleNavigateBack}>
          <FiArrowLeft />
          Voltar
          </div>
        |
          <div className="page-out" onClick={logout}>
          Sair
            <FiLogOut />
        </div>
      </div>
    </header >
  );
}

export default PageHeader;
