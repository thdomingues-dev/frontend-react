import { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router';

import PageTitle from '../../components/PageTitle';

import api from '../../services/api';

import './styles.css';

interface Analyst {
  email: string;
  password: string;
}

const Login = () => {
  const [analysts, setAnalysts] = useState<Analyst[]>([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      for (let i = 0; i < analysts.length; i++) {
        if ((analysts[i].email === email) && (analysts[i].password === password)) {
          history.push('/landing');
        }
      }
    } catch (err) {
      window.alert('Erro ao efetuar login, tente novamente.');
    }
  }

  async function loadAnalysts() {
    const response = await api.get('/analysts');

    setAnalysts(response.data);
  }

  useEffect(() => {
    loadAnalysts();
  }, []);


  return (
    <div className="login-container">
      <div className="login-title">
        <PageTitle
          title="GREENROCK"
          description="Descomplicando a sua vida financeira"
        />
      </div>

      <form className="login-box" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
          autoComplete="off"
          required
        />

        <label>Senha</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          autoComplete="off"
          required
        />

        <div className="button-container">
          <div className="button-box">
            <span>
              <FiChevronRight />
            </span>
            <button type="submit">Entrar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;