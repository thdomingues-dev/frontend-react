import './styles.css';

interface TitleProps {
  title: string;
  description: string;
}

const PageTitle = (props: TitleProps) => {
  return (
    <div className="title-container">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
}

export default PageTitle;
