import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';

import './styles.css';

const Audits = () => {
  return (
    <div className="audits-container">
      <PageHeader />
      <PageTitle
        title="Auditoria de logs"
        description="Analise as operações realizadas no sistema."
      />

      <main>
        <ul>
          <li>
            <strong>ID</strong>
            <strong>Data/Hora</strong>
            <strong>Antes</strong>
            <strong>Depois</strong>
            <strong>Analista</strong>
          </li>

          <li>
            <p>0502</p>
            <p>28/03/2021 00h00</p>
            <p>Solicitado</p>
            <p>Aprovado</p>
            <p>Thales Domingues</p>
          </li>

          <li>
            <p>0502</p>
            <p>28/03/2021 00h00</p>
            <p>Solicitado</p>
            <p>Aprovado</p>
            <p>Thales Domingues Domingues Domingues</p>
          </li>

          <li>
            <p>202012</p>
            <p>28/03/2021 00h00</p>
            <p>Solicitado</p>
            <p>Rejeitado</p>
            <p>Lumena Dias da Fonseca Martins Rodrigues Alves da Silva</p>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default Audits;