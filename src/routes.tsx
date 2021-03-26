import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={LandingPage} exact />
    </BrowserRouter>
  );
}

export default Routes;