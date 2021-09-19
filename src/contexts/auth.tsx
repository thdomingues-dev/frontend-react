import { createContext, useState, useEffect } from 'react';
import authService from '../services/auth';
import api from '../services/api'

interface AuthContextData {
  logged: boolean;
  analyst: Analyst;
  isWrongPassword: boolean;
  login: (arg0: string, arg1: string) => void;
  logout: () => void;
}

interface Analyst {
  id: number;
  name: string;
  user_id: number;
  email: string;
  password: string;
  roles: [string];
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [analyst, setAnalyst] = useState<Analyst>({} as Analyst);
  const [logged, setLogged] = useState(false);
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  async function loadStoragedAnalyst() {
    const storagedAnalyst = await localStorage.getItem('@RAuth:analyst');
    if (storagedAnalyst) {
      const { user, token } = JSON.parse(storagedAnalyst)
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      setAnalyst(user);
      setLogged(true);
    } else {
      setLogged(false);
    }
  }

  async function login(email: string, password: string) {
    const { user, token } = await authService(email, password);
    if (user && token) {
      await localStorage.setItem('@RAuth:analyst', JSON.stringify({ user, token}));
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setAnalyst(user);
      setLogged(true);
    }
    setIsWrongPassword(true);
  }

  function logout() {
    localStorage.clear();
    setLogged(false);
    setIsWrongPassword(false);
  }

  useEffect(() => {
    loadStoragedAnalyst();
  }, []);

  return (
    <AuthContext.Provider value={{ logged, analyst, isWrongPassword, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
