import { createContext, useState } from 'react';
import authService from '../services/auth';

interface AuthContextData {
  logged: boolean;
  user: object | null;
  login: (arg0: string, arg1: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);

  async function login(email: string, password: string) {
    const userResponse = await authService(email, password);

    setUser(userResponse);
  }

  return (
    <AuthContext.Provider value={{ logged: !!user, user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;