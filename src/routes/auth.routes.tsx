import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';


const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} />
    </BrowserRouter>
  );
}

export default AuthRoutes;