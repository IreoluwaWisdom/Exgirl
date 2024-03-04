import React from "react";
import jollofrice from "../assets/jollof-rice.jpg";
import QuantitySelector from "../comp/QuantitySelector";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

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
      <Link>
        <button
          style={{
            marginRight: "10px",
            border: "none",
            backgroundColor: "transparent",
            position: "relative",
            bottom: "40vh",
            right: "37vw",
            fontSize: "120%",
          }}
        >
          <BsChevronLeft />
        </button>
      </Link>

      <Link to="/menu/fried-rice">
        <button
          style={{
            marginLeft: "10px",
            border: "none",
            backgroundColor: "transparent",
            position: "relative",
            bottom: "40vh",
            left: "37vw",
            fontSize: "120%",
          }}
        >
          <BsChevronRight />
        </button>
      </Link>
    </div>
  );
};
export default JollofRice;
