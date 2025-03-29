import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RootContextProvider } from './utils/context/RootContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { SignInContextProvider } from './utils/context/signInPopupContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <RootContextProvider>
        <SignInContextProvider>
          <App />
        </SignInContextProvider>
      </RootContextProvider>
    </Router>
  </React.StrictMode>
);