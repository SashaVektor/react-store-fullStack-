import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { StoreProvider } from './context/Store';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
          </PayPalScriptProvider>
        </HelmetProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode >
);


