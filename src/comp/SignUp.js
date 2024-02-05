import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dobDayMonth, setDOB] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dobError, setDOBError] = useState("");

  const validateEmail = (email) => {
    // Regular expression for email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    return passwordPattern.test(password);
  };

  const validateDOB = (dob) => {
    // Regular expression for DD/MM format validation
    const dobPattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])$/;
    return dobPattern.test(dob);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setDOBError("");

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least six characters long and include at least one number, one uppercase letter, one lowercase letter, and one symbol",
      );
      return;
    }

    // Validate date of birth format
    if (!validateDOB(dobDayMonth)) {
      setDOBError("Please enter a valid date of birth in DD/MM format");
      return;
    }

    // Continue with sign up process if all validations pass
    const auth = getAuth();
    const db = getFirestore();

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Store additional user details in Firestore
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
      setMessage(`Verification email sent to ${userCredential.user.email}. `);
    } catch (error) {
      console.error("Signup error:", error.code, error.message);

      // Handle specific errors
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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p>{emailError}</p>}
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p>{passwordError}</p>}
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date of Birth (DD/MM):
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
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
