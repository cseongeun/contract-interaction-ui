import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';

import App from './App';

ReactDOM.render(
  <React.Fragment>
    <Normalize />
    <App />
  </React.Fragment>,
  document.getElementById('root')
);
