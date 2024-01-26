import React from "react";
import {Link} from 'react-router-dom';

const SignInButton = () => {
  return (
    <div>
    <Link to = '/sign-in'>
      <button>
      Sign in
      </button>
      </Link>
    </div>
  );
};
export default SignInButton;
