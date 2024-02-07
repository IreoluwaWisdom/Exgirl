import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignOut = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate(); // Import and use useNavigate instead of useHistory

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear user data from local storage
      localStorage.clear();
      // Redirect to the "/account" page after signing out
      navigate("/account");
    } catch (error) {
      console.error("Sign-out error:", error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <div>
        <p>Are you sure you want to sign out?</p>
        <button onClick={handleSignOut}>Yes, Sign Out</button>
        <Link to="/account">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default SignOut;
