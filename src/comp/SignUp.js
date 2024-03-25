import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignUp.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FaUserPlus } from "react-icons/fa";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { FaCheckCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setGenderError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least five characters long");
      return;
    }

    if (!gender) {
      setGenderError("Please select your gender");
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await sendEmailVerification(userCredential.user);

      const userDetails = {
        username,
        email,
        phoneNumber,
        gender,
        hearAboutUs,
      };

      const userRef = doc(collection(db, "users"), email);

      await setDoc(userRef, userDetails);

      setMessage(`Verification email sent to ${userCredential.user.email}. `);
    } catch (error) {
      console.error("Signup error:", error.code, error.message);

      if (error.code === "auth/weak-password") {
        setPasswordError("Please choose a stronger password.");
      } else if (error.code === "auth/email-already-in-use") {
        setEmailError("The email address is already in use.");
      } else {
        setMessage("An error occurred during sign-up.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
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
              required
              style={{ borderRadius: "30px" }}
            />
            {emailError && (
              <p style={{ color: "red", fontSize: "60%" }}>{emailError}</p>
            )}
          </label>
          <br />
          <label>
            Password
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "30px" }}
              required
            />
            {passwordError && (
              <p style={{ color: "red", fontSize: "60%" }}>{passwordError}</p>
            )}
          </label>
          <br />
          <label>
            Username
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderRadius: "30px" }}
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
              style={{ borderRadius: "30px" }}
              required
            />
          </label>
          <br />
          <label>
            Gender
            <br />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ borderRadius: "30px" }}
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {genderError && <p style={{ color: "red" }}>{genderError}</p>}
          </label>
          <br />
          <label>
            How did you hear about us?
            <br />
            <select
              value={hearAboutUs}
              onChange={(e) => setHearAboutUs(e.target.value)}
              style={{ borderRadius: "30px" }}
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
        {message && <p style={{ color: "black" }}>{message}</p>}
      </div>

      <div>
        {showSuccessMessage && (
          <>
            <p>Sign up successful</p>{" "}
            <Link to="/account">
              <button>
                {" "}
                <FaCheckCircle />{" "}
              </button>{" "}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
