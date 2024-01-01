import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './i18n.jsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
