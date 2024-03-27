import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import semo from "../assets/semo.jpg";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { menuItems } from "../data/menuNavigation";

const Semo = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "7%", // Adjusted left position
      }}
    >
      <h1 style={{ textAlign: "center" }}>Semo and Efo Riro</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to={menuItems[10 % menuItems.length].link}
          style={{ marginRight: "10px" }}
        >
          <span
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bolder",
            }}
          >
            <BsChevronLeft />
          </span>{" "}
        </Link>
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
        <Link
          to={menuItems[11 % menuItems.length].link}
          style={{ marginLeft: "10px" }}
        >
          <span
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bolder",
            }}
          >
            <BsChevronRight />
          </span>
        </Link>
      </div>
      <QuantitySelector itemName="Semo and Efo Riro" />
    </div>
  );
};

export default Semo;
