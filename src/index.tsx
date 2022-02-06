import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStoreAndSubscription } from './redux-root/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { initSockets } from 'communication';

const {store, subscribeToChange} = createStoreAndSubscription();

const socketCommunication = initSockets(store, subscribeToChange);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
