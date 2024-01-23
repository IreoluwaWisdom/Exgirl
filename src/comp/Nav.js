import React, {useState, useEffect} from 'react'; 
import { Link } from 'react-router-dom'; 
import {FiHome} from 'react-icons/fi'; 
import {MdOutlineFoodBank} from 'react-icons/md'; 
import {IoMdReorder} from 'react-icons/io';
 import {BiSupport} from 'react-icons/bi'; 
import {CgProfile} from 'react-icons/cg';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebaseConfig';



const Nav = () => {




 return ( <nav 
    className="navbar fixed-bottom  navbar-light bg-light" style = {{marginTop : '5vh', padding:'0vh' }}>
      <div className="container"> <Link 
        to="/" className="navbar-brand" style ={{fontSize: '2em'}}
      ><FiHome/></Link> 
        <Link to="/menu" className="navbar-brand" style ={{fontSize: '2em'}}><MdOutlineFoodBank/>   </Link> 
        
        <Link to="/cart" className="navbar-brand" style ={{fontSize: '2em'}}> 
        <IoMdReorder/>
        </Link> 


        <Link to="/support"  className="navbar-brand" style ={{fontSize: '2em'}}><BiSupport/></Link> 
        <Link to="/account" style ={{fontSize: '2em'}}
        className="navbar-brand"><CgProfile/></Link>
      </div> </nav> );
};

export default Nav;
