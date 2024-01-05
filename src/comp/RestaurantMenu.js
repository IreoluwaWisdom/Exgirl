import React from 'react';
import '../styles/RestaurantMenu.css'; 
import rice from '../assets/rice.jpg';

const RestaurantMenu = () => {
  const menuItems = [
    { name: 'Dish 1', price: '₦10', image: rice },
    { name: 'Dish 2', price: '₦12', image: rice },
    { name: 'Dish 3', price: '₦15', image: rice },
    // Add more items as needed
  ];

  return (
    <div className="menu-container">
      <div className="menu-scroll">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
