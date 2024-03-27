import React from "react";
import GoogleSignUp from "../comp/GoogleSignUp";
import Already from "../Texts/Already";

const GoogleSignUpPage = () => {
  return (
    <div
      style={{
        backgroundColor: "#fffdd0",
        marginTop: "10vh",
        marginLeft: "8vw",
        marginRight: "8vw",
        marginBottom: "15vh",
        paddingBottom: "4vh",
        borderRadius: "30px",
        padding: "7vw",
        display: "block",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Google Sign Up */}
      <GoogleSignUp />
      <Already />
    </div>
  );
};
export default GoogleSignUpPage;
