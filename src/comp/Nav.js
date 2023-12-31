import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar fixed-bottom navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Home</Link>
        <Link to="/menu" className="navbar-brand">Menu</Link>
        <Link to="/cart" className="navbar-brand">Cart</Link>
        <Link to="/support" className="navbar-brand">Support</Link>
        <Link to="/profile" className="navbar-brand">Profile</Link>
      </div>
    </nav>
  );
};

export default Nav;
