import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import fufu from "../assets/fufu.jpg";

const Fufu = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Fufu and Egusi</h1>
      <img
        src={fufu}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Fufu and Egusi" />
    </div>
  );
};
export default Fufu;
