import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Users from './pages/Users';
import Cards from './pages/Cards';
import Audits from './pages/Audits';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={LandingPage} exact />
      <Route path="/users" component={Users} />
      <Route path="/cards" component={Cards} />
      <Route path="/audits" component={Audits} />
    </BrowserRouter>
  );
}

export default Routes;
