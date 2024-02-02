import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import heart icons
import '../styles/Searchbar.css'; // Import CSS for styling
import jollofrice from '../assets/jollof-rice.jpg';
import friedrice from '../assets/fried-rice.jpg';
import ewa from '../assets/ewa.jpg';
import noodles from '../assets/noodles.jpg';
import porridge from '../assets/porridge.jpg';
import chicken from '../assets/chicken.jpg';
import shawarma from '../assets/sharwarma.jpg';
import spaghetti from '../assets/spaghetti.jpg';
import rice from '../assets/rice.jpg';
import semo from '../assets/semo.jpg';
import fufu from '../assets/fufu.jpg';
import pando from '../assets/pando.jpg';
import amala from '../assets/amala.jpg';
import grilledchicken from '../assets/grilled-chicken.jpg';
import friedchicken from '../assets/fried-chicken.jpg';
import fish from '../assets/fish.jpg';
import Typing from '../Texts/Typing';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  const listItems = [
    { text: 'Jollof Rice', link: '/menu/jollof-rice', image: jollofrice, price: '₦1500', description: 'Delicious rice dish with tomatoes and spices.' },
    { text: 'Fried Rice', link: '/menu/fried-rice', image: friedrice, price: '₦1500' },
    { text: 'Ewa Agoyin and Bread', link: '/menu/ewa', image: ewa, price: '₦1500' },
    { text: 'Noodles and Egg', link: '/menu/noodles', image: noodles, price: '₦1500' },
    { text: 'Porridge', link: '/menu/porridge', image: porridge, price: '₦1500' },
    { text: 'Chicken and Chips', link: '/menu/chicken', image: chicken, price: '₦1500' },
    { text: 'Sharwarma', link: '/menu/sharwarma', image: shawarma, price: '₦1500' },
    { text: 'Spaghetti', link: '/menu/spaghetti', image: spaghetti, price: '₦1500' },
    { text: 'White Rice and Fish Sauce', link: '/menu/rice', image: rice, price: '₦1500' },
    { text: 'Semo and Efo Riro', link: '/menu/semo', image: semo, price: '₦1500' },
    { text: 'Fufu and Egusi', link: '/menu/fufu', image: fufu, price: '₦1500' },
    { text: 'Pando Yam with Efo Riro', link: '/menu/pando', image: pando, price: '₦1500' },
    { text: 'Amala and Ewedu', link: '/menu/amala', image: amala, price: '₦1500' },
    { text: 'Grilled Chicken', link: '/menu/grilled', image: grilledchicken, price: '₦1500' },
    { text: 'Fried Chicken', link: '/menu/fried-chicken', image: friedchicken, price: '₦1500' },
    { text: 'Fish and Meat Sauce', link: '/menu/fish', image: fish, price: '₦1500' },
    // Add more items as needed
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

  const filteredList = listItems.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginBottom: '18vh', marginTop: '5vh' }}>
      <Typing className='typing' phrase='Our Exquisite Menu' />
      <div style={{ marginTop: "5vh", textAlign: "center" }}>
        <label>
          <input
            type="text"
            required
            placeholder = "What meal do you want?..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input inputa"
          />
          
        </label>
      </div>
      {filteredList.map((item, index) => (
        <div key={index} className="search-item">
          <Link to={item.link} className="item-link">
            <img src={item.image} alt={item.text} className="item-image" />
            <div className="item-details">
              <p className="item-name">{item.text}</p>
              <p className="item-price">{item.price}</p>
              <p className={`item-description ${favorites.includes(index) && 'favorite'}`}>{item.description}</p>
            </div>
          </Link>
          <button className="favorite-button" onClick={() => handleFavorite(index)}>
            {favorites.includes(index) ? <AiFillHeart className="favorite-icon" /> : <AiOutlineHeart className="favorite-icon-fill" />}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
