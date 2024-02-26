import React from "react";
import SignUp from "../comp/SignUp";
import Already from "../Texts/Already";
import GoogleSignInButton from "../comp/GoogleButton";

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
    </div>
  );
};
export default SignUpPage;
