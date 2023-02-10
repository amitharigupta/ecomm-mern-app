import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const BACKEND_APP_API_ENDPOINT = "https://yellow-intern-djrqn.ineuron.app:5173"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
      <Toaster />
    </Router>
  </React.StrictMode>,
)
