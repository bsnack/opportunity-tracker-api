import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Optional: Import CSS (if you're using a CSS file)
// import './styles/tailwind.css';

// Create a root element for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component to the DOM
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you're using a service worker, you would register it here
// serviceWorkerRegistration.register();