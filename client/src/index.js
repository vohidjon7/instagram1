import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Context from './components/Context';


let info = JSON.parse(localStorage.getItem('userinfo'));

axios.defaults.baseURL = "http://localhost:5000/api"
axios.defaults.headers.common['Authorization'] = info?.token;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Context>
        <App />
      </Context>
    </Router>
  </React.StrictMode>
);