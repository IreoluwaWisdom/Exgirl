import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import semo from "../assets/semo.jpg";

const Semo = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Semo and Efo Riro</h1>
      <img
        src={semo}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Semo and Efo Riro" />
    </div>
  );
};
export default Semo;
