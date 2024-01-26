import React from 'react';
import { Link } from 'react-scroll';
import '../styles/OrderNowButton.css'

const OrderNowButton = () => {
  return (
    <Link to="restaurantMenu" smooth={true} duration={500}>
      <button className="order-now-button" 
      style = {{marginTop:'15vh', marginRight:'auto', marginLeft:'auto'}}
      >Order Now</button>
    </Link>
  );
};

export default OrderNowButton;

