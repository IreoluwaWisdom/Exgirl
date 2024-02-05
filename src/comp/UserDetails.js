import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const UserDetails = ({ userEmail }) => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", userEmail);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserData(userData);
          setEditedUserData(userData);
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Update Firestore document with edited user data
      const userRef = doc(db, "users", userEmail);
      await updateDoc(userRef, editedUserData);

      // Disable editing mode
      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error.message);
      // Handle error
    }
  };

  return (
    <div>
      {userData ? (
        editing ? (
          <div>
            <input
              type="text"
              name="username"
              value={editedUserData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              value={editedUserData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              value={editedUserData.email}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dateOfBirth"
              value={editedUserData.dateOfBirth}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <p>Username: {userData.username}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>Email: {userData.email}</p>
            <p>Date of Birth: {userData.dob}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDetails;
