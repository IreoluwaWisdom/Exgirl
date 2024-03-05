import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import sharwarma from "../assets/sharwarma.jpg";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sharwarma = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Sharwarma</h1>
      <img
        src={sharwarma}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Sharwarma" />
    </div>
  );
};
export default Sharwarma;
