import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

const PageHeader = () => {
  return (
    <header className="page-header">
      <strong>Green Rock</strong>

      <div>
        <FiArrowLeft />
        Voltar
      </div>
    </header>
  );
}

export default PageHeader;
