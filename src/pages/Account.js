// Account.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SignUpButton from "../Buttons/SignUpButton";
import SignInButton from "../Buttons/SignInButton";
import Continuing from "../Texts/Continuing";
import UserDetails from "../comp/UserDetails";
import "../styles/Account.css";

const Account = () => {
  const { currentUser } = useAuth();

  return (
    <div className="account-container">
      {currentUser ? (
        <div className="user-details-container">
          <UserDetails userEmail={currentUser.email} />
        </div>
      ) : (
        <div>
          <h5>You are using Guest Mode</h5>
          <div style={{ textAlign: "center" }}>
            <SignUpButton />
            <br /> <SignInButton />
            OR &nbsp;

            <span>CONTINUE WITH GOOGLE </span>
          </div>
          <Continuing />
          <span style={{ fontSize: "80%" }}> Need Help? Chat with Perry</span>
        </div>
      )}
    </div>
  );
};

export default Account;
