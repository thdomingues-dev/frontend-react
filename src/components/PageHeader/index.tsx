import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

const PageHeader = () => {
  return (
    <header className="page-header">
      <strong>Green Rock</strong>

      <Link to="/">
        <FiArrowLeft />
        Voltar
      </Link>
    </header>
  );
}

export default PageHeader;
