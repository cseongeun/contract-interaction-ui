import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import Routes from 'routes';
import Providers from 'providers';

declare global {
  interface Window {
    ethereum: any;
  }
}

const App = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
