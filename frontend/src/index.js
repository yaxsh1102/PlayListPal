import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { clientID } from './utils/constants';
const clientID = process.env.REACT_APP_clientID


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
<GoogleOAuthProvider clientId={clientID}>

    <App />
    </GoogleOAuthProvider>
  </Provider>

);


