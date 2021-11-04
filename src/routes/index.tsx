import React, { lazy } from 'react';

import Loader from 'components/Common/Loader';
import { GlobalStyle } from 'components/Common/GlobalStyle';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const ContractInteraction = lazy(() => import('pages/ContractInteraction'));
const Info = lazy(() => import('pages/Info'));


const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <ContractInteraction />
          </Route>
          <Route exact path='/info'>
            <Info />
          </Route>
        </Switch>
      </Router>
      <GlobalStyle />
    </React.Suspense>
  );
};

export default Routes;
