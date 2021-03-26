import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Users from './pages/Users';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={LandingPage} exact />
      <Route path="/users" component={Users} />
    </BrowserRouter>
  );
}

export default Routes;
