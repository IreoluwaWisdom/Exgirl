import React from "react";
import { Link } from "react-router-dom";
import "../styles/OrderNowButton.css";

const OrderNowButton = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Link to="/menu">
        <button className="order-now-button" style={{ marginTop: "15vh" }}>
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default OrderNowButton;
