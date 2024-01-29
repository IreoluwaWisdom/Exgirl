import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import heart icons
import '../styles/RestaurantMenu.css'; 
import amala from '../assets/amala.jpg';
import semo from '../assets/semo.jpg';
import fufu from '../assets/fufu.jpg';
import pando from '../assets/pando.jpg';

const SwallowMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const menuItemRefs = useRef([]);

  const menuItems = [
    { name: 'Semo and Efo Riro', price: '₦15', description: 'Delicious Semo served with Efo Riro stew.', image: semo },
    { name: 'Fufu and Egusi', price: '₦15', description: 'Traditional Fufu paired with Egusi soup.', image: fufu },
    { name: 'Pando yam and efo riro', price: '₦15', description: 'Pando Yam accompanied by Efo Riro sauce.', image: pando },
    { name: 'Amala and Ewedu', price: '₦15', description: 'Authentic Amala served with Ewedu soup.', image: amala },
    // Add more items as needed
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    menuItemRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
            ref={(ref) => menuItemRefs.current[index] = ref}
          >
            <div className="item-image-container">
              <img 
                src={item.image} 
                alt={item.name} 
                className="item-image" 
                style={{ height:'40vw' }} 
              />
              {(hoveredItem === index || isVisible) && (
                <div className="item-description-overlay">
                  <p className="item-description shaky">{item.description}</p>
                </div>
              )}
            </div>
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">{item.price}</p>
              <button 
                className="favorite-button"
                onClick={() => handleFavorite(index)}
              >
                {favorites.includes(index) ? <AiFillHeart className="favorite-icon" /> : <AiOutlineHeart className="favorite-icon" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwallowMenu;
