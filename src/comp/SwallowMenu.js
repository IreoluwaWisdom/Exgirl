import React, { useState } from 'react';
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

const SwallowMenu = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const menuItems = [
    { name: 'Semo and Efo Riro', price: '₦15', description: 'Delicious Semo served with Efo Riro stew.', image: semo },
    { name: 'Fufu and Egusi', price: '₦15', description: 'Traditional Fufu paired with Egusi soup.', image: fufu },
    { name: 'Pando yam and efo riro', price: '₦15', description: 'Pando Yam accompanied by Efo Riro sauce.', image: pando },
    { name: 'Amala and Ewedu', price: '₦15', description: 'Authentic Amala served with Ewedu soup.', image: amala },
    // Add more items as needed
  ];

  const handleHover = (index) => {
    setHoveredItem(index);
  };

  const handleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(index)) {
        return prevFavorites.filter((item) => item !== index);
      } else {
        return [...prevFavorites, index];
      }
    });
  };

  return (
    <div id="restaurantMenu" className="menu-container">
      <div className='menu-scroll'>
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="menu-item" 
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="item-image-container">
              <img 
                src={item.image} 
                alt={item.name} 
                className="item-image" 
                style={{ opacity: hoveredItem === index ? 0.7 : 1 }} 
              />
              {hoveredItem === index && (
                <div className="item-description-overlay">
                  <p className="item-description">{item.description}</p>
                </div>
              )}
            </div>
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">{item.price}</p>
              <button 
                className={favorites.includes(index) ? "favorite-button active" : "favorite-button"}
                onClick={() => handleFavorite(index)}
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwallowMenu;
