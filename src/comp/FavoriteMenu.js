import React, { useState, useEffect } from "react";
import "../styles/RestaurantMenu.css";

import rice from "../assets/rice.jpg";
import jollofrice from "../assets/jollof-rice.jpg";
import amala from "../assets/amala.jpg";
import friedrice from "../assets/fried-rice.jpg";
import ewa from "../assets/ewa.jpg";
import noodles from "../assets/noodles.jpg";
import porridge from "../assets/porridge.jpg";
import chicken from "../assets/chicken.jpg";
import shawarma from "../assets/sharwarma.jpg";
import spaghetti from "../assets/spaghetti.jpg";
import semo from "../assets/semo.jpg";
import fufu from "../assets/fufu.jpg";
import pando from "../assets/pando.jpg";
import grilledchicken from "../assets/grilled-chicken.jpg";
import friedchicken from "../assets/fried-chicken.jpg";
import fish from "../assets/fish.jpg";

const FavoriteMenu = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Load favorite items from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteItems(storedFavorites);
  }, []);

  const handleFavorite = (index) => {
    const updatedFavorites = [...favoriteItems];
    if (updatedFavorites.includes(index)) {
      updatedFavorites.splice(updatedFavorites.indexOf(index), 1);
    } else {
      updatedFavorites.push(index);
    }
    setFavoriteItems(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const menuItems = [
    { name: "Jollof Rice", price: "₦10", image: jollofrice },
    { name: "Fried Rice", price: "₦12", image: friedrice },
    { name: "Ewa Agoyin and Bread", price: "₦15", image: ewa },
    { name: "Noodles and Egg", price: "₦15", image: noodles },
    { name: "Porridge", price: "₦15", image: porridge },
    { name: "Chicken and Chips", price: "₦15", image: chicken },
    { name: "Sharwarma", price: "₦15", image: shawarma },
    { name: "Spaghetti", price: "₦15", image: spaghetti },
    { name: "White Rice and Fish Sauce", price: "₦15", image: rice },
    { name: "Semo and Efo Riro", price: "₦15", image: semo },
    { name: "Fufu and Egusi", price: "₦15", image: fufu },
    { name: "Pando", price: "₦15", image: pando },
    { name: "Amala and Ewedu", price: "₦15", image: amala },
    { name: "Grilled Chicken", price: "₦15", image: grilledchicken },
    { name: "Fried Chicken", price: "₦15", image: friedchicken },
    { name: "Fish Sauce and Meat Sauce", price: "₦15", image: fish },
    // Add more items as needed
  ];

  return (
    <div className="menu-container" id="favorites">
      <h2>Favorite Items</h2>
      <div className="menu-scroll">
        {favoriteItems.map((index) => {
          const item = menuItems[index];
          return (
            <div key={index} className="menu-item">
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
                    className="item-description"
                  >
                    {item.description}
                  </p>{" "}
                  &nbsp;{" "}
                </div>
                <div
                  className="description-container"
                  style={{ textAlign: "center" }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteMenu;
