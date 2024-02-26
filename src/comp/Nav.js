import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdOutlineFoodBank } from "react-icons/md";
import { IoMdReorder } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebaseConfig";
import "../styles/Nav.css";

const Nav = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    // Extract the current route from the pathname
    const currentRoute = location.pathname.replace("/", "");
    setCurrentPage(currentRoute || "home");
  }, [location.pathname]);

  return (
    <nav
      className="navbar fixed-bottom navbar-light"
      style={{ marginTop: "5vh", padding: "0vh", backgroundColor: "#fffdd0" }}
    >
      <div className="container">
        <Link
          to="/"
          className={`navbar-brand${currentPage === "home" ? " active" : ""}`}
          style={{
            fontSize: "2em",
            ...(currentPage === "home" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
            }),
          }}
        >
          <FiHome />
          {currentPage === "home" && (
            <span style={{ fontSize: "2vw" }}>Home</span>
          )}
        </Link>

        <Link
          to="/menu"
          className={`navbar-brand${currentPage === "menu" ? " active" : ""}`}
          style={{
            fontSize: "2em",
            ...(currentPage === "menu" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
            }),
          }}
        >
          <MdOutlineFoodBank />
          {currentPage === "menu" && (
            <span style={{ fontSize: "2vw" }}>Menu</span>
          )}
        </Link>

        <Link
          to="/cart"
          className={`navbar-brand${currentPage === "cart" ? " active" : ""}`}
          style={{
            fontSize: "2em",
            ...(currentPage === "cart" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
            }),
          }}
        >
          <IoMdReorder />
          {currentPage === "cart" && (
            <span style={{ fontSize: "2vw" }}>Process</span>
          )}
        </Link>

        <Link
          to="/support"
          className={`navbar-brand${currentPage === "support" ? " active" : ""}`}
          style={{
            fontSize: "2em",
            ...(currentPage === "support" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
            }),
          }}
        >
          <BiSupport />
          {currentPage === "support" && (
            <span style={{ fontSize: "2vw" }}>Support</span>
          )}
        </Link>

        <Link
          to="/account"
          className={`navbar-brand${currentPage === "account" ? " active" : ""}`}
          style={{
            fontSize: "2em",
            ...(currentPage === "account" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
            }),
          }}
        >
          <CgProfile />
          {currentPage === "account" && (
            <span style={{ fontSize: "2vw" }}>Account</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
