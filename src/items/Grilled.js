import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import grilledchicken from "../assets/grilled-chicken.jpg";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Grilled = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Grilled Chicken</h1>
      <img
        src={grilledchicken}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Grilled Chicken" />
    </div>
  );
};
export default Grilled;
