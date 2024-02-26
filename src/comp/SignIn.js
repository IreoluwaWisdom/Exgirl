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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [blinkCount, setBlinkCount] = useState(0);

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

  useEffect(() => {
    if (blinkCount < 5) {
      // Blink for 5 seconds (10 times at 500ms interval)
      const interval = setInterval(() => {
        setIsVisible((prevVisible) => !prevVisible); // Toggle visibility
        setBlinkCount((prevCount) => prevCount + 1); // Increment blink count
      }, 500);

      // Clear the interval on component unmount or when blink count reaches 10
      return () => clearInterval(interval);
    } else {
      setIsVisible(true); // Ensure the message remains visible after blinking
      // Do not reset blink count to keep the message visible
    }
  }, [blinkCount]); // Re-run effect whenever blink count changes

  const handleMessageChange = (newMessage) => {
    setMessage(newMessage);
    setBlinkCount(0); // Reset blink count when a new message is set
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const isEmailVerified = userCredential.user.emailVerified;

      if (!isEmailVerified) {
        handleMessageChange(
          "Email not verified. Please check your email for a verification link.",
        );
        return;
      }

      const db = getFirestore();
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        setMessage("");
        setShowSuccessMessage(true);

        console.log("User Data:", userData);
      } else {
        handleMessageChange("User data not found. An error occurred.");
      }

      console.log("Signed in:", userCredential.user.email);
    } catch (error) {
      console.error("Sign-in error:", error.code, error.message);
      handleMessageChange("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "block",
        justifyContent: "center",
        paddingTop: "8vh",
        paddingBottom: "0vh",
        marginBottom: "0vh",
      }}
    >
      <div style={{ textAlign: "center" }}> Email Sign In</div>
      <br />
      <form onSubmit={handleSignIn}>
        <label style={{ textAlign: "center" }}>
          Email
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              textAlign: "left",
              width: "75vw",
              borderRadius: "30px",
              marginBottom: "5vh",
            }}
          />
        </label>
        <br />
        <label style={{ textAlign: "center" }}>
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              textAlign: "left",
              width: "75vw",
              borderRadius: "30px",
              marginBottom: "5vh",
            }}
          />
        </label>
        <br />
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              width: "50vw",
              borderRadius: "30px",
              backgroundColor: "#6a0dad",
              color: "white",
              border: "none",
              padding: "6px 12px",
            }}
          >
            Sign In
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center", height: "5vh" }}>
        {message && isVisible && (
          <p style={{ textAlign: "center", color: "red", fontSize: "80%" }}>
            {message}
          </p>
        )}
      </div>
      {showSuccessMessage && (
        <>
          <p>Sign in successful</p>{" "}
          <div style={{ textAlign: "center" }}>
            <Link to="/account">
              <button
                style={{
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  borderRadius: "30px",
                  padding: "5px 10px",
                }}
              >
                {" "}
                Confirm
              </button>{" "}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;
