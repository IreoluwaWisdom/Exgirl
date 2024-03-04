import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import rice from "../assets/rice.jpg";

const Rice = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "15%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>White Rice and Fish Sauce </h1>
      <img
        src={rice}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName=" White Rice and Fish Sauce" />
    </div>
  );
};
export default Rice;
