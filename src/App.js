import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './comp/Nav'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Support from './pages/Support';
import Profile from './pages/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (



<Router>
        
        <Nav />
        <Routes>
        <Route path ="/" element = {<Home/>} />
        <Route path = "/menu" element = {<Menu/>} />
        <Route path = "/cart" element = {<Cart/>} />
        <Route path = "/support" element = {<Support/>} />
        <Route path = "/profile" element = {<Profile/>} />
        
        </Routes>

</Router>


);
};

export default App;
