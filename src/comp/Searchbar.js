import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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



const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listItems, setListItems] = useState([
    { text: 'Jollof Rice', link: '/menu/jollof-rice', image: jollofrice, description: 'Delicious rice dish with tomatoes and spices.' },
    { text: 'Fried Rice', link: '/menu/fried-rice',image: friedrice },
    { text: 'Ewa Agoyin and Bread', link: '/menu/ewa',image: ewa },
    { text: 'Noodles and Egg', link: '/menu/noodles',image: noodles },
    { text: 'Porridge', link: '/menu/porridge', image: porridge },
    { text: 'Chicken and Chips', link: '/menu/chicken', image: chicken },
    { text: 'Sharwarma', link: '/menu/sharwarma', image: shawarma },
    { text: 'Spaghetti', link: '/menu/spaghetti', image: spaghetti },
    { text: 'White Rice and Fish Sauce', link: '/menu/rice', image: rice },
    { text: 'Semo and Efo Riro', link: '/menu/semo', image: semo },
    { text: 'Fufu and Egusi', link: '/menu/fufu', image: fufu },
    { text: 'Pando Yam with Efo Riro', link: '/menu/pando', image: pando },
    { text: 'Amala and Ewedu', link: '/menu/amala', image: amala },
    { text: 'Grilled Chicken', link: '/menu/grilled', image: grilledchicken },
    { text: 'Fried Chicken', link: '/menu/fried-chicken', image: friedchicken },
    { text: 'Fish and Meat Sauce', link: '/menu/fish', image: fish },
    // Add more items as needed
  ]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredList = listItems.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

 return (
    <div>
      <input
        type="text"
        placeholder="What do you want...?"
        value={searchTerm}
        onChange={handleSearch}
        className ='d-flex justify-content-center mx-auto'
        style = {{width: '80vw', margin: '0', borderRadius: '20px', marginBottom: '1.5vh'}}
      />
      <h6 style = {{marginLeft:'3vw'}}> Meals </h6>
 
      {filteredList.map((item, index) => (
        <div key={index} style = {{ textDecoration : 'none', color: 'black', marginLeft: '6vw'}} >
          <Link to={item.link} style = {{ textDecoration : 'none', color: 'black'}}>
            <img src={item.image} alt={item.text} style={{ width: '50vw', height: '40vw', marginRight: '8px',borderRadius: '20px',  }} />
            {item.text}
          </Link>
          <p>{item.description}</p>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default SearchBar;