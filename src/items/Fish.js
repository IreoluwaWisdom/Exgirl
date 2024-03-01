import React from "react";
import QuantitySelector from '../comp/QuantitySelector';
import fish from '../assets/fish.jpg'


const Fish = () => {
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
      <QuantitySelector itemName="Fish and Meat Sauce"/>
    </div>
  );
};
export default Fish;
