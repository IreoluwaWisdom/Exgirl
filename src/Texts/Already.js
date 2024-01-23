import React from "react";
import {Link} from 'react-router-dom'

const Already = () => {
  return (
    <div>
      Already have an account? 
      <Link to = '/sign-in'>Login</Link>
    </div>
  );
};
export default Already;
