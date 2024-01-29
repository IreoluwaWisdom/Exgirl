import React from "react";
import {Link} from 'react-router-dom';

const SignUpButton = () => {
  return (
    <div>
    <Link to = '/sign-up'>
      <button style = {{backgroundColor:'white', color: '#6A0DAD', borderColor:'#6A0DAD', borderWidth:'1px'}}>
      CREATE AN ACCOUNT
      </button>
      </Link>
    </div>
  );
};
export default SignUpButton;
