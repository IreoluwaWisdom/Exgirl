import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./comp/Nav";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SignOut from "./pages/SignOut";
import Checkout from "./pages/Checkout";
import JollofRice from "./items/JollofRice";
import Amala from "./items/Amala";
import Chicken from "./items/Chicken";
import Ewa from "./items/Ewa";
import Fish from "./items/Fish";
import FriedChicken from "./items/FriedChicken";
import FriedRice from "./items/FriedRice";
import Fufu from "./items/Fufu";
import Grilled from "./items/Grilled";
import Noodles from "./items/Noodles";
import Pando from "./items/Pando";
import Porridge from "./items/Porridge";
import Rice from "./items/Rice";
import Semo from "./items/Semo";
import Sharwarma from "./items/Sharwarma";
import Spaghetti from "./items/Spaghetti";
import SignUp from "./comp/SignUp";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/menu/jollof-rice" element={<JollofRice />} />
        <Route path="/menu/amala" element={<Amala />} />
        <Route path="/menu/chicken" element={<Chicken />} />
        <Route path="/menu/ewa" element={<Ewa />} />
        <Route path="/menu/fish" element={<Fish />} />
        <Route path="/menu/fried-chicken" element={<FriedChicken />} />
        <Route path="/menu/fried-rice" element={<FriedRice />} />
        <Route path="/menu/fufu" element={<Fufu />} />
        <Route path="/menu/grilled" element={<Grilled />} />
        <Route path="/menu/noodles" element={<Noodles />} />
        <Route path="/menu/pando" element={<Pando />} />
        <Route path="/menu/porridge" element={<Porridge />} />
        <Route path="/menu/rice" element={<Rice />} />
        <Route path="/menu/semo" element={<Semo />} />
        <Route path="/menu/sharwarma" element={<Sharwarma />} />
        <Route path="/menu/spaghetti" element={<Spaghetti />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
