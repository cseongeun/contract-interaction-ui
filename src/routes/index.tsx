import React, { lazy } from 'react';

import Loader from 'components/Common/Loader';
// import PrivateRoute from 'components/Common/PrivateRoute'
import { GlobalStyle } from 'components/Common/GlobalStyle';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('pages/Contract'));


const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
      <GlobalStyle />
    </React.Suspense>
  );
};

export default Routes;
