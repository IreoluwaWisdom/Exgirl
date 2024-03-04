import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import friedrice from "../assets/fried-rice.jpg";

const FriedRice = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Fried Rice</h1>
      <img
        src={friedrice}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Fried Rice" />
    </div>
  );
};
export default FriedRice;
