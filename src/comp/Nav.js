import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdOutlineFoodBank } from 'react-icons/md';
import { IoMdReorder } from 'react-icons/io';
import { BiSupport } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebaseConfig';

const Nav = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    // Extract the current route from the pathname
    const currentRoute = location.pathname.replace('/', '');
    setCurrentPage(currentRoute || 'home');
  }, [location.pathname]);

  return (
    <nav className="navbar fixed-bottom  navbar-light bg-light" style={{ marginTop: '5vh', padding: '0vh' }}>
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ fontSize: '2em' }}>
          <FiHome />
          {currentPage === 'home' && <span style ={{fontSize: '2vw'}}>Home</span>}
        </Link>

        <Link to="/menu" className="navbar-brand" style={{ fontSize: '2em' }}>
          <MdOutlineFoodBank />
          {currentPage === 'menu' && <span style ={{fontSize: '2vw'}}>Menu</span>}
        </Link>

        <Link to="/cart" className="navbar-brand" style={{ fontSize: '2em' }}>
          <IoMdReorder />
          {currentPage === 'cart' && <span style ={{fontSize: '2vw'}}>Cart</span>}
        </Link>

        <Link to="/support" className="navbar-brand" style={{ fontSize: '2em' }}>
          <BiSupport />
          {currentPage === 'support' && <span style ={{fontSize: '2vw'}}>Support</span>}
        </Link>

        <Link to="/account" style={{ fontSize: '2em' }} className="navbar-brand">
          <CgProfile />
          {currentPage === 'account' && <span style ={{fontSize: '2vw'}}>Account</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
