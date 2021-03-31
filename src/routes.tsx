import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Users from './pages/Users';
import Cards from './pages/Cards';
import Audits from './pages/Audits';
import Login from './pages/Login';
import NewCard from './pages/NewCard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/landing" component={LandingPage} />
      <Route path="/users" component={Users} />
      <Route path="/cards" component={Cards} />
      <Route path="/newcard" component={NewCard} />
      <Route path="/audits" component={Audits} />
    </BrowserRouter>
  );
}

export default Routes;
