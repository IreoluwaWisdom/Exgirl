import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import pando from "../assets/pando.jpg";

const Pando = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Pounded Yam with Efo riro</h1>
      <img
        src={pando}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Pando Yam with Efo riro" />
    </div>
  );
};
export default Pando;
