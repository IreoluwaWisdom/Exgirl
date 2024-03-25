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
    <nav className="navbar fixed-bottom navbar-light">
      <div className="container nav-container">
        <Link
          to="/"
          className={`navbar-brand ${currentPage === "home" ? "active" : ""}`}
        >
          <div className="menu-icon">
            <FiHome />
            <span className="menu-text">Home</span>
          </div>
        </Link>

        <Link
          to="/menu"
          className={`navbar-brand ${currentPage === "menu" ? "active" : ""}`}
        >
          <div className="menu-icon">
            <MdOutlineFoodBank />
            <span className="menu-text">Menu</span>
          </div>
        </Link>

        <Link
          to="/cart"
          className={`navbar-brand ${currentPage === "cart" ? "active" : ""}`}
        >
          <div className="menu-icon">
            <IoMdReorder />
            <span className="menu-text">Process</span>
          </div>
        </Link>

        <Link
          to="/support"
          className={`navbar-brand ${currentPage === "support" ? "active" : ""}`}
        >
          <div className="menu-icon">
            <BiSupport />
            <span className="menu-text">Support</span>
          </div>
        </Link>

        <Link
          to="/account"
          className={`navbar-brand ${currentPage === "account" ? "active" : ""}`}
        >
          <div className="menu-icon">
            <CgProfile />
            <span className="menu-text">Account</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
