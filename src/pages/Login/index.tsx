import { FormEvent, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';

import { useContext } from 'react';
import AuthContext from '../../contexts/auth';

import PageTitle from '../../components/PageTitle';

import './styles.css';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    login(email, password);
  }

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
              <FiLogIn />
            </span>
            <button type="submit">Entrar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;