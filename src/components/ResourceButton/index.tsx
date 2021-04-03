import { Link } from 'react-router-dom';
import { FiChevronRight, FiUsers, FiFileText } from 'react-icons/fi';
import { AiOutlineIdcard } from 'react-icons/ai';
import { FaRegCreditCard } from 'react-icons/fa';

import './styles.css';

interface ButtonProps {
  path: string;
  description: string;
  icon?: string;
}

const ResourceButton = ({ path, description, icon }: ButtonProps) => {
  switch (icon) {
    case 'FiUsers':
      return (<Link to={path}>
        <span>
          <FiUsers />
        </span>
        <p>{description}</p>
      </Link>);

    case 'FaRegCreditCard':
      return (<Link to={path}>
        <span>
          <FaRegCreditCard />
        </span>
        <p>{description}</p>
      </Link>);

    case 'AiOutlineIdcard':
      return (<Link to={path}>
        <span>
          <AiOutlineIdcard />
        </span>
        <p>{description}</p>
      </Link>);

    case 'FiFileText':
      return (<Link to={path}>
        <span>
          <FiFileText />
        </span>
        <p>{description}</p>
      </Link>);

    default:
      return (<Link to={path}>
        <span>
          <FiChevronRight />
        </span>
        <p>{description}</p>
      </Link>);
  }

}

export default ResourceButton;
