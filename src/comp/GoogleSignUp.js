import React, { useState } from "react";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { FaUserPlus } from "react-icons/fa";

const GoogleSignUp = () => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dobDayMonth, setDOB] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dobError, setDOBError] = useState("");

  const validateDOB = (dob) => {
    // Regular expression for DD/MM format validation
    const dobPattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])$/;
    return dobPattern.test(dob);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError("");
    setDOBError("");

    // Validate date of birth format
    if (!validateDOB(dobDayMonth)) {
      setDOBError("Please enter a valid date of birth in DD/MM format");
      return;
    }

    // Continue with sign up process if all validations pass
    const db = getFirestore();

    try {
      // Store user details in Firestore
      const userDetails = {
        username,
        email,
        phoneNumber,
        dob: dobDayMonth, // Only day and month
        hearAboutUs,
      };

      // Add user details to Firestore
      const userRef = doc(collection(db, "users"), email);

      // Set user details in Firestore
      await setDoc(userRef, userDetails);

      // Provide feedback to the user
      setMessage(`Successfully signed up for ${email}`);

      // Redirect the user to the accounts page
      window.location.href = "/account"; // You may choose to redirect to a different page or handle it in a different way
    } catch (error) {
      console.error("Sign-up error:", error);
      setMessage("An error occurred during sign-up.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "5vh" }}>
      <div>
        <FaUserPlus
          style={{ fontSize: "10vw", color: "#6a0dad", marginBottom: "2vh" }}
        />

        <form onSubmit={handleSignUp}>
          <label>
            Email
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "30px" }}
              readOnly // Email field is read-only
            />
            {emailError && <p>{emailError}</p>}
          </label>
          <br />
          <label>
            Username
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Phone Number
            <br />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Date of Birth (DD/MM)
            <br />
            <input
              type="text"
              value={dobDayMonth}
              onChange={(e) => setDOB(e.target.value)}
              required
            />
            {dobError && <p>{dobError}</p>}
          </label>
          <br />
          <label>
            How did you hear about us?
            <br />
            <select
              value={hearAboutUs}
              onChange={(e) => setHearAboutUs(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="Friend">Friend</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Social media">Social media</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: "#6a0dad",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "15px",
              cursor: "pointer",
              width: "50vw",
              margin: "8vw auto",
            }}
          >
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default GoogleSignUp;
