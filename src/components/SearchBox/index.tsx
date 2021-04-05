import './styles.css';

interface SearchBoxProps {
  id: string;
  title: string;
  alert: string;
  description: string;
  isTargetFound: boolean;
  inputChange: (e: any) => void;
  handleTarget: () => void;
  handleClearSearch: () => void;
}

const SearchBox = (props: SearchBoxProps) => {
  return (
    <>
      <p>{props.title}</p>
      <div className="search-group">
        <input
          type="text"
          id={props.id}
          onChange={props.inputChange}
          placeholder={props.description}
          autoComplete="off"
        />

        <div className="search-buttons">
          <button onClick={props.handleTarget}>Buscar</button>
          <button onClick={props.handleClearSearch}>Limpar</button>
        </div>

        {!props.isTargetFound &&
          <p>{props.alert}</p>
        }
      </div>
    </>
  );
}

export default SearchBox;
