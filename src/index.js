import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import { UserProvider } from './utils/userContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  // eslint-disable-next-line comma-dangle
  document.getElementById('app')
);
