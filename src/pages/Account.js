import React from "react";
import { useAuth } from "../context/AuthContext";
import SignUpButton from "../Buttons/SignUpButton";
import SignInButton from "../Buttons/SignInButton";
import Continuing from "../Texts/Continuing";
import UserDetails from "../comp/UserDetails";

const Account = () => {
  const { currentUser, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear user data from local storage
      localStorage.clear();
    } catch (error) {
      console.error("Sign-out error:", error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      Account
      {currentUser ? (
        <>
          <UserDetails userEmail={currentUser.email} />
          <button onClick={handleSignOut}>Sign Out</button>
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
