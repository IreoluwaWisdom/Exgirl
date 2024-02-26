import React from "react";
import { Link } from "react-router-dom";
const Dont = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      Don't have an account?
      <Link to="/sign-up" style={{ marginLeft: "5px", color: "black" }}>
        Sign Up{" "}
      </Link>
    </div>
  );
};
export default Dont;
