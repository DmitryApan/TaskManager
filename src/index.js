import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {cards, headerInfo} from './Data';

ReactDOM.render(
  <React.StrictMode>
    <App value={{cards, headerInfo}} srcData={'http://app-d6eb8af9-d909-438d-a0b6-7075cc1a5829.cleverapps.io/cards'} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
