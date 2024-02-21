import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "../styles/Account.css";
import { Link } from "react-router-dom";

const UserDetails = ({ userEmail }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );
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

    // Fetch user data initially only if online
    if (online) {
      fetchUserData();
    }

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
  }, [userEmail, online]);

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
              style={{ marginBottom: "2vh" }}
            />
            <input
              type="text"
              name="phoneNumber"
              value={editedUserData.phoneNumber}
              onChange={handleChange}
              style={{ marginBottom: "2vh" }}
            />
            <input
              type="text"
              name="email"
              value={editedUserData.email}
              onChange={handleChange}
              style={{ marginBottom: "2vh" }}
            />
            <input
              type="date"
              name="dateOfBirth"
              value={editedUserData.dob}
              onChange={handleChange}
              style={{ marginBottom: "4vh" }}
            />
            <br />
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  borderRadius: "15px",
                  padding: "4px 25px",
                  backgroundColor: "darkblue",
                  color: "white",
                  border: "none",
                  fontSize: "80%",
                }}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                marginBottom: "0.5vh",
                fontSize: "85%",
                fontWeight: "bold",
              }}
            >
              Username
              <div style={{ fontWeight: "normal", fontSize: "80%" }}>
                {userData.username}
              </div>
            </div>
            <div
              style={{
                marginBottom: "0.5vh",
                fontSize: "85%",
                fontWeight: "bold",
              }}
            >
              Phone Number
              <div style={{ fontWeight: "normal", fontSize: "80%" }}>
                {userData.phoneNumber}
              </div>
            </div>

            <div
              style={{
                marginBottom: "0.5vh",
                fontSize: "85%",
                fontWeight: "bold",
              }}
            >
              Email{" "}
              <div style={{ fontWeight: "normal", fontSize: "80%" }}>
                {" "}
                {userData.email}
              </div>
            </div>

            <div
              style={{
                marginBottom: "5vh",
                fontSize: "85%",
                fontWeight: "bold",
              }}
            >
              Date of Birth
              <div style={{ fontWeight: "normal", fontSize: "80%" }}>
                {userData.dob}
              </div>
            </div>
            <Link to="/sign-out">
              <button
                style={{
                  padding: "3px 10px",
                  backgroundColor: "darkred",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  position: "relative",
                  right: "3.5vw",
                  fontSize: "80%",
                }}
              >
                Sign Out
              </button>
            </Link>
            <button
              onClick={handleEdit}
              style={{
                padding: "4px 20px",
                backgroundColor: "#6a0dad",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                position: "relative",
                left: "28vw",
                fontSize: "80%",
              }}
            >
              Edit
            </button>
          </div>
        )
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default UserDetails;
