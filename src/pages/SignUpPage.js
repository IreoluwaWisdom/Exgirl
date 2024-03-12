import React from "react";
import SignUp from "../comp/SignUp";
import Already from "../Texts/Already";
import GoogleSignInButton from "../comp/GoogleButton";
import logo from "../assets/logo.png";

const SignUpPage = () => {
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
      <SignUp />
      OR
      <div style={{ textAlign: "center" }}>
        <GoogleSignInButton />
      </div>
      <Already />
      {/* <div
        style={{
          width: "50vw",
          marginTop: "5vh",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          textAlign: "center",
        }}
      >
        <img src={logo} alt="Logo" style={{ width: "50vw" }} />
      </div> */}
    </div>
  );
};
export default SignUpPage;
