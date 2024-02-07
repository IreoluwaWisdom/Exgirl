import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SignUpButton from "../Buttons/SignUpButton";
import SignInButton from "../Buttons/SignInButton";
import Continuing from "../Texts/Continuing";
import UserDetails from "../comp/UserDetails";

const Account = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      Account
      {currentUser ? (
        <>
          <UserDetails userEmail={currentUser.email} />
          {/* Change the button to link to the sign-out page */}
          <Link to="/sign-out">
            <button>Sign Out</button>
          </Link>
        </>
      ) : (
        <>
          <div>
            <h5>You are using Guest Mode</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "3vh",
              }}
            >
              <SignUpButton />
              OR
              <SignInButton />
            </div>
            <Continuing />
            <span style={{ fontSize: "80%" }}> Need Help? Chat with Perry</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Account;
