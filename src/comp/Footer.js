import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        paddingBottom: "20vh",
        paddingTop: "7vh",
        backgroundColor: "#F0F0F0",
        textAlign: "center",
        color: "#6a0dad",
      }}
    >
      &copy; 2024 Ex-girlfriend foods
      <br />
      <Link
        to="https://www.upwork.com/freelancers/~011dd99f9d6b3935c9"
        style={{ color: "#6a0dad" }}
      >
        Developed by Ireoluwa Olukayode
      </Link>
    </div>
  );
};
export default Footer;
