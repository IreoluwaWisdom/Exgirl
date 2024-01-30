import React from "react";
import SignIn from '../comp/SignIn';
import GoogleSignIn from '../comp/GoogleSignIn'
import Guest from '../comp/Guest';

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <SignIn/>
      <Guest/>
      <GoogleSignIn/>
    </div>
  );
};
export default Profile;
