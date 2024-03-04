import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import noodles from "../assets/noodles.jpg";

const Noodles = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Noodles and Egg</h1>
      <img
        src={noodles}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Noodles and Egg" />
    </div>
  );
};
export default Noodles;
