import PageHeader from '../../components/PageHeader';
import PageTitle from '../../components/PageTitle';
import './styles.css';

const NewCard = () => {
  return (
    <div className="newcard-container">
      <PageHeader />

      <PageTitle
        title="Pedido de cartão"
        description="Informe os dados do usuário"
      />

      <main>
        <form >
          <label>Nome</label>
          <input type="text" />

          <label >ID usuário</label>
          <input type="" />

          <label>Dígitos cartão</label>
          <input type="" />

          <label>Limite</label>
          <input type="" />

          <div className="newcard-button-container">
            <button>Solicitar</button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NewCard;