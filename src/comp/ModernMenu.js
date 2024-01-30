import React, { useState, useRef } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import heart icons
import '../styles/RestaurantMenu.css'; 
import rice from '../assets/rice.jpg';
import jollofrice from '../assets/jollof-rice.jpg';
import friedrice from '../assets/fried-rice.jpg';
import noodles from '../assets/noodles.jpg';
import porridge from '../assets/porridge.jpg';
import chicken from '../assets/chicken.jpg';
import shawarma from '../assets/sharwarma.jpg';
import spaghetti from '../assets/spaghetti.jpg';

const ModernMenu = () => {
  const [favorites, setFavorites] = useState([]);
  const menuItemRefs = useRef([]);

 const menuItems = [
    { name: 'Jollof Rice', price: '₦1000', image: jollofrice },
    { name: 'Fried Rice', price: '₦12', image: friedrice },
    { name: 'Noodles and Egg', price: '₦15', image: noodles },
    { name: 'Porridge', price: '₦15', image: porridge },
    { name: 'Chicken and Chips', price: '₦15', image: chicken },
    { name: 'Sharwarma', price: '₦15', image: shawarma },
    { name: 'Spaghetti', price: '₦15', image: spaghetti },
    { name: 'White Rice and Fish Sauce', price: '₦15', image: rice },
    // Add more items as needed
  ];

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
    <div className="menu-container">
      <div className='menu-scroll'>
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="menu-item" style = {{marginRight:'7vw', width:'75vw'}}
            ref={(ref) => menuItemRefs.current[index] = ref}
          >
            <div className="item-image-container" style={{height:'40vw', width:'60vw', marginRight:'10px'}}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="item-image" style ={{height:'40vw',  marginRight:'10px'}}
              />
            </div>
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <div style = {{display:'flex', width:'55vw'}}>
              <p style = {{color: "B8860B"}} className="item-price">{item.price}</p> &nbsp; <p style ={{textAlign:'center', color:'#B8860B'}} className={`item-description ${favorites.includes(index) && 'favorite'}`}>
                  {item.description}
                </p> &nbsp; <button 
                className="favorite-button" style = {{height:'30px', backgroundColor:'white', borderWidth:'0px'}}
                onClick={() => handleFavorite(index)}
              >
                {favorites.includes(index) ? <AiFillHeart style={{color:'#6a0dad'}} className="favorite-icon" /> : <AiOutlineHeart style ={{color:'#B8860B'}} className="favorite-icon" />}
              </button>
              </div>
              <div className="description-container" style={{textAlign:'center'}}>
                
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernMenu;
