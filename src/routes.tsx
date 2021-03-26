import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Users from './pages/Users';
import Cards from './pages/Cards';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={LandingPage} exact />
      <Route path="/users" component={Users} />
      <Route path="/cards" component={Cards} />
    </BrowserRouter>
  );
}

export default Routes;
