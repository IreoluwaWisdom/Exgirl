import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import noodles from "../assets/noodles.jpg";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { menuItems } from "../data/menuNavigation";

const Noodles = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "7%", // Adjusted left position
      }}
    >
      <h1 style={{ textAlign: "center" }}>Noodles and Egg</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to={menuItems[4 % menuItems.length].link}
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
          src={noodles}
          style={{
            borderRadius: "10px",
            marginTop: "3vh",
            marginBottom: "5vh",
            width: "75vw",
            height: "50vw",
          }}
        />
        <Link
          to={menuItems[5 % menuItems.length].link}
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
      <QuantitySelector itemName="Noodles and Egg" />
    </div>
  );
};

export default Noodles;
