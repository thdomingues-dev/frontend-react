import './styles.css';

interface TitleProps {
  title: string;
  description: string;
}

const PageTitle = (props: TitleProps) => {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </>
  );
}

export default PageTitle;
