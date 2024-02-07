import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control the visibility of success message

  useEffect(() => {
    const auth = getAuth();

    // Set persistence to 'local' to keep the user signed in across browser restarts
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current session only.
        console.log("Persistence set to local");
      })
      .catch((error) => {
        console.error("Error setting persistence:", error.code, error.message);
      });
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Check if the user's email is verified
      const isEmailVerified = userCredential.user.emailVerified;

      if (!isEmailVerified) {
        setMessage(
          "Email not verified. Please check your email for a verification link.",
        );
        return;
      }

      // Retrieve additional user data from Firestore based on email
      const db = getFirestore();
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document matching the query (assuming email is unique)
        const userData = querySnapshot.docs[0].data();

        // Set user data in state

        // Reset message state
        setMessage("");

        // Display success message
        setShowSuccessMessage(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 10000000000000);

        // Store user data locally, e.g., in state or local storage
        // You can use localStorage.setItem or your preferred state management technique
        console.log("User Data:", userData);
      } else {
        setMessage("User data not found. An error occurred.");
      }

      // Handle successful sign-in, e.g., redirect the user or update state
      console.log("Signed in:", userCredential.user.email);
    } catch (error) {
      console.error("Sign-in error:", error.code, error.message);
      setMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>

      {/* Display message */}
      {message && <p>{message}</p>}

      {/* Display success message */}
      {showSuccessMessage && (
        <>
          <p>Sign in successful</p>{" "}
          <Link to="/account">
            <button> Confirm</button>{" "}
          </Link>
        </>
      )}
    </div>
  );
};

export default SignIn;
