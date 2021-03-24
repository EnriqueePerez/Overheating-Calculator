import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import ReactDOM from 'react-dom';
import App from './routes/App';

const firebaseConfig = {
  apiKey: 'AIzaSyBG8TGssPs_39NVTsHPcXVlgeJHwn5x6GU',
  authDomain: 'termoconfort-5d960.firebaseapp.com',
  projectId: 'termoconfort-5d960',
  storageBucket: 'termoconfort-5d960.appspot.com',
  messagingSenderId: '543790644750',
  appId: '1:543790644750:web:58e6bc6483ed0642c0865f',
  measurementId: 'G-LFHCHCVDTQ',
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  // eslint-disable-next-line comma-dangle
  document.getElementById('app')
);
