import React from "react";
import { Link } from "react-router-dom";
import "../styles/OrderNowButton.css";

const OrderNowButton = () => {
  return (
    <Link to="/menu">
      <button
        className="order-now-button"
        style={{ marginTop: "15vh", marginRight: "auto", marginLeft: "auto" }}
      >
        Order Now
      </button>
    </Link>
  );
};

export default OrderNowButton;
