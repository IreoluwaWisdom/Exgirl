import React, { useState, useRef } from "react";
import "../styles/RestaurantMenu.css";
import ewa from "../assets/ewa.jpg";
import chicken from "../assets/chicken.jpg";
import shawarma from "../assets/sharwarma.jpg";

import grilledchicken from "../assets/grilled-chicken.jpg";
import friedchicken from "../assets/fried-chicken.jpg";
import fish from "../assets/fish.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons

const ProteinMenu = () => {
  const menuItems = [
    { name: "Ewa Agoyin and Bread", price: "₦15", image: ewa },
    { name: "Chicken and Chips", price: "₦15", image: chicken },
    { name: "Sharwarma", price: "₦15", image: shawarma },
    { name: "Grilled Chicken", price: "₦15", image: grilledchicken },
    { name: "Fried Chicken", price: "₦15", image: friedchicken },
    { name: "Fish Sauce and Meat Sauce", price: "₦15", image: fish },
    // Add more items as needed
  ];

  const [favorites, setFavorites] = useState([]);
  const menuItemRefs = useRef([]);

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
    <div className="menu-container">
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

export default ProteinMenu;
