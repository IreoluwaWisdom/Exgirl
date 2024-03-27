import React from "react";
import QuantitySelector from "../comp/QuantitySelector";
import spaghetti from "../assets/spaghetti.jpg";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { menuItems } from "../data/menuNavigation";

const Spaghetti = () => {
  return (
    <div
      style={{
        position: "absolute",
        textAlign: "center",
        top: "15%",
        left: "7%",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Spaghetti</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to={menuItems[8 % menuItems.length].link}
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
          src={spaghetti}
          style={{
            borderRadius: "10px",
            marginTop: "3vh",
            marginBottom: "5vh",
            width: "75vw",
            height: "50vw",
          }}
        />
        <Link
          to={menuItems[9 % menuItems.length].link}
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
      <QuantitySelector itemName="Spaghetti" />
    </div>
  );
};
export default Spaghetti;
