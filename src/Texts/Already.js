import React from "react";
import { Link } from "react-router-dom";

const Already = () => {
  return (
    <div style={{ fontSize: "80%", textAlign: "center", marginTop: "3px" }}>
      Already have an account?
      <Link to="/sign-in" style={{ marginLeft: "5px", color: "black" }}>
        Sign In
      </Link>
    </div>
  );
};
export default Already;
