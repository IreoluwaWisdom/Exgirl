import React from "react";
import {Link} from 'react-router-dom';

const SignUpButton = () => {
  return (
    <div>
    <Link to = '/sign-up'>
      <button>
      Sign up with email
      </button>
      </Link>
    </div>
  );
};
export default SignUpButton;
