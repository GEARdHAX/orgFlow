import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Imports Tailwind styles
import App from './App';
import $ from 'jquery'; // <-- ADD THIS
window.$ = window.jQuery = $; // <-- ADD THIS

// ... rest of your imports
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);