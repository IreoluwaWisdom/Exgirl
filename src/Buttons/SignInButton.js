import React from "react";
import {Link} from 'react-router-dom';

const SignInButton = () => {
  return (
    <div>
    <Link to = '/sign-in'  style ={{ color:'#B8860B'}}>
      
      Sign in
      
      </Link>
    </div>
  );
};
export default SignInButton;
