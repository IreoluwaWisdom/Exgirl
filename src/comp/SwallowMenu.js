import React, { useState, useRef } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons
import "../styles/RestaurantMenu.css";
import amala from "../assets/amala.jpg";
import semo from "../assets/semo.jpg";
import fufu from "../assets/fufu.jpg";
import pando from "../assets/pando.jpg";
// import { Link } from "react-router-dom";

const SwallowMenu = () => {
  const [favorites, setFavorites] = useState([]);
  const menuItemRefs = useRef([]);

  const menuItems = [
    {
      name: "Semo and Efo Riro",
      price: "₦1500",
      description: "Delicious Semo served with Efo Riro stew.",
      image: semo,
    },
    {
      name: "Fufu and Egusi",
      price: "₦15",
      description: "Traditional Fufu paired with Egusi soup.",
      image: fufu,
    },
    {
      name: "Pando yam and efo riro",
      price: "₦15",
      description: "Pando Yam accompanied by Efo Riro sauce.",
      image: pando,
    },
    {
      name: "Amala and Ewedu",
      price: "₦15",
      description: "Authentic Amala served with Ewedu soup.",
      image: amala,
    },
    // Add more items as needed
  ];

  const handleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      if (prevFavorites.includes(index)) {
        newFavorites.splice(prevFavorites.indexOf(index), 1);
      } else {
        newFavorites.push(index);
      }
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="menu-container" id="swallow" style={{ marginTop: "8vh" }}>
      <div className="menu-scroll">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            style={{ marginRight: "7vw", width: "75vw" }}
            ref={(ref) => (menuItemRefs.current[index] = ref)}
          >
            <div
              className="item-image-container"
              style={{ height: "40vw", width: "60vw", marginRight: "10px" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="item-image"
                style={{ height: "40vw", marginRight: "10px" }}
              />
            </div>
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <div style={{ display: "flex", width: "55vw" }}>
                <p style={{ color: "B8860B" }} className="item-price">
                  {item.price}
                </p>{" "}
                &nbsp;{" "}
                <p
                  style={{ textAlign: "center", color: "#B8860B" }}
                  className={`item-description ${favorites.includes(index) && "favorite"}`}
                >
                  {item.description}
                </p>{" "}
                &nbsp;{" "}
                <button
                  className="favorite-button"
                  style={{
                    height: "30px",
                    backgroundColor: "white",
                    borderWidth: "0px",
                  }}
                  onClick={() => handleFavorite(index)}
                >
                  {favorites.includes(index) ? (
                    <AiFillHeart
                      style={{ color: "#6a0dad" }}
                      className="favorite-icon"
                    />
                  ) : (
                    <AiOutlineHeart
                      style={{ color: "#B8860B" }}
                      className="favorite-icon"
                    />
                  )}
                </button>
              </div>
              <div
                className="description-container"
                style={{ textAlign: "center" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwallowMenu;
