import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "../styles/Account.css";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import FaqComponent from "../comp/FaqComponent";
import faqData from "../data/faqData";

// Import default profile pictures
import designerProfilePicture from "../assets/Designer.jpeg";
import businessmanProfilePicture from "../assets/Designer (1).jpeg";
import teacherProfilePicture from "../assets/Designer (2).jpeg";

const profilePictures = [
  { id: 1, src: designerProfilePicture },
  { id: 2, src: businessmanProfilePicture },
  { id: 3, src: teacherProfilePicture },
];

const UserDetails = ({ userEmail }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null,
  );
  const [editing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture") || designerProfilePicture,
  );
  const [selectedPictureId, setSelectedPictureId] = useState(1); // Default selected picture id

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

          // Check if profile picture ID exists in the user data
          if (userData.profilePictureId) {
            // Find the profile picture from the profilePictures array
            const selectedPicture = profilePictures.find(
              (picture) => picture.id === userData.profilePictureId,
            );
            if (selectedPicture) {
              setProfilePicture(selectedPicture.src);
              setSelectedPictureId(userData.profilePictureId);
            }
          }
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

  const handleProfilePictureChange = (id, src) => {
    setSelectedPictureId(id);
    setProfilePicture(src);
  };

  const handleSave = async () => {
    try {
      // Update Firestore document with edited user data
      const userRef = doc(db, "users", userEmail);
      await updateDoc(userRef, editedUserData);

      // Save profile picture URL to Firestore
      // For now, I'm assuming you have a 'profilePicture' field in the user document
      await updateDoc(userRef, {
        profilePicture: profilePicture,
      });

      // Disable editing mode
      setEditing(false);
      localStorage.setItem("userData", JSON.stringify(editedUserData));
      localStorage.setItem("profilePicture", profilePicture);
    } catch (error) {
      console.error("Error updating user data:", error.message);
      // Handle error
    }
  };

  const handleCancel = () => {
    setEditing(false); // Set editing mode to false to cancel changes
  };

  return (
    <div>
      {userData ? (
        editing ? (
          <div>
            {/* Display profile picture options */}
            <div className="profile-picture-options-container">
              {profilePictures.map((picture) => (
                <img
                  key={picture.id}
                  src={picture.src}
                  alt="Profile"
                  className={`profile-picture-option ${
                    selectedPictureId === picture.id ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleProfilePictureChange(picture.id, picture.src)
                  }
                />
              ))}
            </div>
            <input
              type="text"
              name="username"
              value={editedUserData.username}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="phoneNumber"
              value={editedUserData.phoneNumber}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={editedUserData.dob}
              onChange={handleChange}
              className="input-field"
            />
            <div className="button-container">
              <button onClick={handleCancel} className="cancel-button">
                <AiOutlineClose />
              </button>
              <button onClick={handleSave} className="save-button">
                <AiOutlineCheck />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Display profile picture and user information */}
            <div className="profile-picture-container">
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            </div>
            <div className="username-container">
              Username
              <div className="user-info">{userData.username}</div>
            </div>
            <div className="email-container">
              Email
              <div className="user-info">{userData.email}</div>
            </div>
            <div className="phone-number-container">
              Phone Number
              <div className="user-info">{userData.phoneNumber}</div>
            </div>
            <div className="date-of-birth-container">
              Date of Birth
              <div className="user-info">{userData.dob}</div>
              <Link to="/sign-out" className="link">
                <button className="sign-out-button">
                  <FiLogOut />
                </button>
              </Link>
              <button onClick={handleEdit} className="edit-button">
                <MdEdit />
              </button>
              <div className="user-info">
                <FaqComponent faqData={faqData} />
              </div>
            </div>
          </div>
        )
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default UserDetails;
