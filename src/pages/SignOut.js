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
      <div style={{ textAlign: "center", position: "relative", top: "30vh" }}>
        <p>Are you sure you want to sign out?</p>

        <Link to="/account">
          <button
            style={{
              position: "relative",
              right: "10vw",
              borderRadius: "40px",
              padding: "6px 30px ",
              border: " none",
              backgroundColor: "#6a0dad",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Cancel
          </button>
        </Link>
        <button
          onClick={handleSignOut}
          style={{
            position: "relative",
            left: "10vw",
            borderRadius: "40px",
            padding: "6px 15px",
            backgroundColor: "darkred",
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Yes, Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOut;
