import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import ewa from "../assets/ewa.jpg";

const Ewa = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "10%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Ewa Agoyin and Bread</h1>
      <img
        src={ewa}
        style={{
          borderRadius: "10px",
          marginTop: "3vh",
          marginBottom: "5vh",
          width: "75vw",
          height: "50vw",
        }}
      />
      <QuantitySelector itemName="Ewa Agoyin and bread" />
    </div>
  );
};
export default Ewa;
