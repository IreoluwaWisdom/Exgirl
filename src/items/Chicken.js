import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import chicken from "../assets/chicken.jpg";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Chicken = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "10%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Chicken and Chips</h1>
      <img
        src={chicken}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Chicken and Chips" />
    </div>
  );
};
export default Chicken;
