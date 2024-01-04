import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listItems, setListItems] = useState([
    { text: 'Jollof Rice', link: '/menu/jollof-rice' },
    { text: 'Fried Rice', link: '/menu/fried-rice' },
    { text: 'Ewa Agoyin and Bread', link: '/menu/ewa' },
    { text: 'Noodles and Egg', link: '/menu/noodles' },
    { text: 'Porridge', link: '/menu/porridge' },
    { text: 'Chicken and Chips', link: '/menu/chicken' },
    { text: 'Sharwarma', link: '/menu/sharwarma' },
    { text: 'Spaghetti', link: '/menu/spaghetti' },
    { text: 'White Rice and Fish Sauce', link: '/menu/rice' },
    { text: 'Semo and Efo Riro', link: '/menu/semo' },
    { text: 'Fufu and Egusi', link: '/menu/fufu' },
    { text: 'Pando Yam with Efo Riro', link: '/menu/pando' },
    { text: 'Amala and Ewedu', link: '/menu/amala' },
    { text: 'Grilled Chicken', link: '/menu/grilled' },
    { text: 'Fried Chicken', link: '/menu/fried-chicken' },
    { text: 'Fish and Meat Sauce', link: '/menu/fish' },
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
            <Link to={item.link} style = {{ textDecoration : 'none', color: 'black'}}>{item.text}</Link>
          <hr/>
          </div>
        ))}
      
    </div>
  );
};

export default SearchBar;
