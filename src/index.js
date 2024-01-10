// index.js
import 
'bootstrap/dist/css/bootstrap.min.css'; 
import 
'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import React from 'react'; import ReactDOM 
from 'react-dom'; import App from './App'; 
import app from './config/firebaseConfig';

ReactDOM.render(
  <React.StrictMode> <App /> 
  </React.StrictMode>, 
  document.getElementById('root')
);
