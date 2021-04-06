import { createContext, useState, useEffect } from 'react';
import authService from '../services/auth';

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

  useEffect(() => {
    loadStoragedAnalyst();
  }, []);

  async function loadStoragedAnalyst() {
    const storagedAnalyst = await localStorage.getItem('@RAuth:analyst');
    if (storagedAnalyst) {
      setAnalyst(JSON.parse(storagedAnalyst));
      setLogged(true);
    }
  }

  async function login(email: string, password: string) {
    const analystResponse = await authService(email, password);
    if (analystResponse) {
      setAnalyst(analystResponse);
      await localStorage.setItem('@RAuth:analyst', JSON.stringify(analystResponse));
      setLogged(true);
    }
    setIsWrongPassword(true);
  }

  function logout() {
    localStorage.clear();
    setLogged(false);
    setIsWrongPassword(false);
  }

  return (
    <AuthContext.Provider value={{ logged, analyst, isWrongPassword, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
