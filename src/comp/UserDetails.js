// UserDetails.js
import React from 'react';

const UserDetails = ({ userData }) => {
  return (
    <div>
      <h3>User Information</h3>
      <p>Email: {userData.email}</p>
      <p> Date of Birth: {userData.dob} 
      Username : {userData.username} </p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserDetails;

