import React from 'react';
import '../styles/RestaurantMenu.css'; 
import rice from '../assets/rice.jpg';
import jollofrice from '../assets/jollof-rice.jpg';
import amala from '../assets/amala.jpg';
import friedrice from '../assets/fried-rice.jpg';
import ewa from '../assets/ewa.jpg';
import noodles from '../assets/noodles.jpg';
import porridge from '../assets/porridge.jpg';
import chicken from '../assets/chicken.jpg';
import shawarma from '../assets/sharwarma.jpg';
import spaghetti from '../assets/spaghetti.jpg';
import semo from '../assets/semo.jpg';
import fufu from '../assets/fufu.jpg';
import pando from '../assets/pando.jpg';
import grilledchicken from '../assets/grilled-chicken.jpg';
import friedchicken from '../assets/fried-chicken.jpg';
import fish from '../assets/fish.jpg';

const RestaurantMenu = () => {
  const menuItems = [
    { name: 'Jollof Rice', price: '₦10', image: jollofrice },
    { name: 'Fried Rice', price: '₦12', image: friedrice },
    { name: 'Ewa Agoyin and Bread', price: '₦15', image: ewa },
    { name: 'Noodles and Egg', price: '₦15', image: noodles },
    { name: 'Porridge', price: '₦15', image: porridge },
    { name: 'Chicken and Chips', price: '₦15', image: chicken },
    { name: 'Sharwarma', price: '₦15', image: shawarma },
    { name: 'Spaghetti', price: '₦15', image: spaghetti },
    { name: 'White Rice and Fish Sauce', price: '₦15', image: rice },
    { name: 'Semo and Efo Riro', price: '₦15', image: semo },
    { name: 'Fufu and Egusi', price: '₦15', image: fufu },
    { name: 'Pando', price: '₦15', image: pando },
    { name: 'Amala and Ewedu', price: '₦15', image: amala },
    { name: 'Grilled Chicken', price: '₦15', image: grilledchicken },
    { name: 'Fried Chicken', price: '₦15', image: friedchicken },
    { name: 'Fish Sauce and Meat Sauce', price: '₦15', image: fish },
    // Add more items as needed
  ];

  return (
    <div id="restaurantMenu" className="menu-container">
      <div className="menu-scroll">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.image} alt={item.name} style ={{height:'100px', }} />
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
