import { useContext } from 'react';

import AuthContext from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { logged } = useContext(AuthContext);

  return logged ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
