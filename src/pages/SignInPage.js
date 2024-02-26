import React from "react";
import SignIn from "../comp/SignIn";
import Dont from "../Texts/Dont";

const SignInPage = () => {
  return (
    <div
      style={{
        backgroundColor: "#fffdd0",
        height: "65vh",
        marginTop: "10vh",
        marginLeft: "8vw",
        marginRight: "8vw",
        marginBottom: "0vh",
        paddingBottom: "0vh",
        borderRadius: "30px",
      }}
    >
      <SignIn />
      <Dont />
    </div>
  );
};
export default SignInPage;
