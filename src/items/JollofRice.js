import React from "react";
import jollofrice from "../assets/jollof-rice.jpg";
import QuantitySelector from "../comp/QuantitySelector";

const JollofRice = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Jollof Rice</h1>
      <img
        src={jollofrice}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
        }}
      />
      <QuantitySelector itemName="Jollof Rice" />
    </div>
  );
};
export default JollofRice;
