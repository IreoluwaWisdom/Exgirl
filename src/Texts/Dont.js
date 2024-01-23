import React from "react";
import {Link} from 'react-router-dom'
const Dont = () => {
  return (
    <div>
      Don't have an account? 
      <Link to = '/sign-up'>Sign Up </Link>
      </div>
  );
};
export default Dont;
