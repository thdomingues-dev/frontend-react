import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

const PageHeader = () => {
  return (
    <header className="page-header">
      <strong>GREENROCK</strong>

      <div className="page-back-container">
        <FiArrowLeft />
        Voltar
      </div>
    </header>
  );
}

export default PageHeader;
