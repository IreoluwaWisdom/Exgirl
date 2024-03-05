import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import friedchicken from "../assets/fried-chicken.jpg";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const FriedChicken = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Fried Chicken</h1>
      <img
        src={friedchicken}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Fried Chicken" />
    </div>
  );
};
export default FriedChicken;
