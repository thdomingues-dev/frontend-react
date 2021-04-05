import './styles.css';

interface SearchUserProps {
  id: string;
  isUserFound: boolean;
  inputChange: (e: any) => void;
  handleUser: () => void;
  handleClearSearch: () => void;
}

const SearchUser = (props: SearchUserProps) => {
  return (
    <>
      <p>Buscar usuário</p>
      <div className="search-group">
        <input
          type="text"
          id={props.id}
          onChange={props.inputChange}
          placeholder="Informe id do usuário"
          autoComplete="off"
        />

        <div className="search-buttons">
          <button onClick={props.handleUser}>Buscar</button>
          <button onClick={props.handleClearSearch}>Limpar</button>
        </div>

        {!props.isUserFound &&
          <p>Usuário não encontrado.</p>
        }
      </div>
    </>
  );
}

export default SearchUser;
