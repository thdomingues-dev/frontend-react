import PageTitle from '../../components/PageTitle';
import ResourceButton from '../../components/ResourceButton';

import './styles.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-title">
        <PageTitle
          title="GREENROCK"
          description="Descomplicando a sua vida financeira"
        />
      </div>

      <form className="login-box">
        <label>Email</label>
        <input type="email" required />

        <label>Senha</label>
        <input type="password" required />

        <div className="button-box">
          <ResourceButton path="/home" description="Entrar" />
        </div>
      </form>
    </div>
  );
}

export default Login;