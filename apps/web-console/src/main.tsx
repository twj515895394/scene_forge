import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import './styles/base.css';
import './styles/variant-b-layout.css';
import './styles/variant-b-chat-feed.css';
import './styles/variant-b-chat-markdown.css';
import './styles/variant-b-chat-inputs.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
