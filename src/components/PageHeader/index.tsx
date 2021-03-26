import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

const PageHeader = () => {
  const history = useHistory();

  function handleNavigateBack() {
    history.goBack();
  }

  return (
    <header className="page-header">
      <strong>GREENROCK</strong>

      <div className="page-back-container" onClick={handleNavigateBack}>
        <FiArrowLeft />
        Voltar
      </div>
    </header>
  );
}

export default PageHeader;
