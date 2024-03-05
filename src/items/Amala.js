import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import amala from "../assets/amala.jpg";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Amala = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Amala</h1>
      <img
        src={amala}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Amala and Ewedu" itemPrice="5000" />

      <Link to="/menu/grilled">
        <button
          style={{
            marginRight: "10px",
            border: "none",
            backgroundColor: "transparent",
            position: "relative",
            bottom: "40vh",
            right: "37vw",
            fontSize: "120%",
          }}
        >
          <BsChevronLeft />
        </button>
      </Link>
    </div>
  );
};
export default Amala;
