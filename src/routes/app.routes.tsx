import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import Users from '../pages/Users';
import Cards from '../pages/Cards';
import Audits from '../pages/Audits';
import NewCard from '../pages/NewCard';
import NewUser from '../pages/NewUser';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/landing" />
        </Route>
        <Route path="/landing" component={LandingPage} />
        <Route path="/users" component={Users} />
        <Route path="/cards" component={Cards} />
        <Route path="/newcard" component={NewCard} />
        <Route path="/newuser" component={NewUser} />
        <Route path="/audits" component={Audits} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
