import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import porridge from "../assets/porridge.jpg";

const Porridge = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Porridge</h1>
      <img
        src={porridge}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Porridge" />
    </div>
  );
};
export default Porridge;
