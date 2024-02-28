import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdReorder } from "react-icons/io";
import { BiTime, BiCheck } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import "../styles/Nav.css";

const Tabs = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    // Extract the current route from the pathname
    const currentRoute = location.pathname.replace("/", "");
    setCurrentPage(currentRoute || "home");
  }, [location.pathname]);

  return (
    <nav
      className="navbar navbar-light"
      style={{ marginTop: "5vh", padding: "0vh", backgroundColor: "#fffdd0" }}
    >
      <div className="container">
        <Link
          to="/cart"
          className={`navbar-brand${currentPage === "cart" ? " active" : ""}`}
          style={{
            fontSize: "150%",
            ...(currentPage === "cart" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
              width: "80px",
              margin: "0px",
            }),
          }}
        >
          <MdShoppingCart />{" "}
          {currentPage === "cart" && (
            <span style={{ fontSize: "2vw" }}>Cart</span>
          )}
        </Link>

        <Link
          to="/ongoing"
          className={`navbar-brand${currentPage === "ongoing" ? " active" : ""}`}
          style={{
            fontSize: "150%",
            ...(currentPage === "ongoing" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
              width: "80px",
              margin: "0px",
            }),
          }}
        >
          <BiTime />
          {currentPage === "ongoing" && (
            <span style={{ fontSize: "2vw" }}>Ongoing</span>
          )}
        </Link>

        <Link
          to="/completed"
          className={`navbar-brand${currentPage === "completed" ? " active" : ""}`}
          style={{
            fontSize: "150%",
            ...(currentPage === "completed" && {
              backgroundColor: "white",
              color: "#6a0dad",
              borderRadius: "20px",
              padding: "0px 15px",
              width: "80px",
              margin: "0px",
            }),
          }}
        >
          <BiCheck />
          {currentPage === "completed" && (
            <span style={{ fontSize: "2vw" }}>Completed</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Tabs;
