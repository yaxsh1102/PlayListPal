import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
<GoogleOAuthProvider clientId='458394514542-2oqrokk66qtd7crfj8bhqredc4pic91i.apps.googleusercontent.com'>

    <App />
    </GoogleOAuthProvider>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
