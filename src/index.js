import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CategoriesProvider } from './contexts/CategoriesContext'
import { CurrencyProvider } from './contexts/CurrencyContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
    <CategoriesProvider>
          <App />
    </CategoriesProvider>
    </CurrencyProvider>
  </React.StrictMode>
);

