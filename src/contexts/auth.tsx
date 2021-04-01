import { createContext, useState, useEffect } from 'react';
import authService from '../services/auth';

interface AuthContextData {
  logged: boolean;
  analyst: object | null;
  login: (arg0: string, arg1: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [analyst, setAnalyst] = useState<object | null>(null);

  useEffect(() => {
    loadStoragedAnalyst();
  }, []);

  async function loadStoragedAnalyst() {
    const storagedAnalyst = await localStorage.getItem('@RAuth:analyst');
    if (storagedAnalyst) {
      setAnalyst(JSON.parse(storagedAnalyst));
    }
  }

  async function login(email: string, password: string) {
    const analystResponse = await authService(email, password);

    setAnalyst(analystResponse);

    await localStorage.setItem('@RAuth:analyst', JSON.stringify(analystResponse));
  }

  function logout() {
    localStorage.clear();
    setAnalyst(null);
  }

  return (
    <AuthContext.Provider value={{ logged: !!analyst, analyst, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;