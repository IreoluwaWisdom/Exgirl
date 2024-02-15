import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "../styles/Account.css";
import { Link } from "react-router-dom";

const UserDetails = ({ userEmail }) => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", userEmail);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserData(userData);
          setEditedUserData(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user data initially
    fetchUserData();

    // Check for online/offline status
    const handleOnlineStatusChange = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
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
      localStorage.setItem("userData", JSON.stringify(editedUserData));
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
              value={editedUserData.dob}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <div
              style={{
                marginBottom: "4vh",
              }}
            >
              Username
              <div>{userData.username}</div>
            </div>
            <div>
              Phone Number
              <div>{userData.phoneNumber}</div>
            </div>

            <div>
              Email <div> {userData.email}</div>
            </div>

            <div style={{ marginBottom: "10vh" }}>
              Date of Birth
              <div>{userData.dob}</div>
            </div>
            <Link to="/sign-out">
              <button
                style={{
                  padding: "5px 13px",
                  backgroundColor: "darkred",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                  position: "relative",
                  right: "5vw",
                }}
              >
                Sign Out
              </button>
            </Link>
            <button
              onClick={handleEdit}
              style={{
                padding: "5px 30px",
                backgroundColor: "#6a0dad",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                position: "relative",
                left: "25vw",
              }}
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserDetails;
