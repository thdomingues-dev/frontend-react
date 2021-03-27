import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import './styles.css';

interface ButtonProps {
  path: string;
  description: string;
}

const ResourceButton = ({ path, description }: ButtonProps) => {
  return (
    <Link to={path}>
      <span>
        <FiChevronRight />
      </span>
      <p>{description}</p>
    </Link>
  );
}

export default ResourceButton;
