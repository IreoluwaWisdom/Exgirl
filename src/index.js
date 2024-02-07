// index.js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import ReactDOM from "react-dom";
import App from "./App";
import app from "./config/firebaseConfig";
import { CartProvider } from "./context/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
