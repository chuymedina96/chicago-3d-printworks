import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Theme preview: ?theme=green (or orange). Remembered for the session.
try {
  const q = new URLSearchParams(window.location.search).get("theme");
  if (q) sessionStorage.setItem("c3dpw-theme", q);
  const t = q || sessionStorage.getItem("c3dpw-theme");
  if (t && t !== "orange") document.documentElement.dataset.theme = t;
} catch (e) {}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
