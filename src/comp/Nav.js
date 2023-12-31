import React from 'react'; import { Link } 
from 'react-router-dom'; import {CiHome} 
from 'react-icons/ci'; import {GoHome} 
from 'react-icons/go'; import 
{MdOutlineFoodBank} from 'react-icons/md'; 
import {IoMdReorder} from 
'react-icons/io'; import {BiSupport} from 
'react-icons/bi'; import {CgProfile} from 
'react-icons/cg';

const Nav = () => { return ( <nav 
    className="navbar fixed-bottom 
    navbar-light bg-light">
      <div className="container"> <Link 
        to="/" className="navbar-brand" 
      ><CiHome/></Link> 
        <Link to="/menu" 
        className="navbar-brand"><MdOutlineFoodBank/></Link> 
        <Link to="/cart" 
        className="navbar-brand"> 
        <IoMdReorder/></Link> <Link 
        to="/support" 
        className="navbar-brand"><BiSupport/></Link> 
        <Link to="/profile" 
        className="navbar-brand"><CgProfile/></Link>
      </div> </nav> );
};

export default Nav;
