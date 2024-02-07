import React from "react";
import SignIn from "../comp/SignIn";
import Dont from "../Texts/Dont";
import ForgotPassword from "../comp/ForgotPassword";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In Page</h1>
      <SignIn />
      <Dont />
    </div>
  );
};
export default SignInPage;
