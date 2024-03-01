import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import amala from "../assets/amala.jpg";
import Next from "../comp/Next";

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
    </div>
  );
};
export default Amala;
