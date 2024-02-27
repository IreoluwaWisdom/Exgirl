import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user data exists in Firestore
      const db = getFirestore();
      const userRef = doc(db, "users", user.email); // Use email as the document ID
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // User data exists in Firestore, redirect to account page
        window.location.href = "/account";
        console.log("User data exists in Firestore");
      } else {
        // User data does not exist in Firestore, redirect to google-sign-up page
        localStorage.setItem("userEmail", user.email);
        window.location.href = "/google-sign-up";
      }
    } catch (error) {
      console.error("Google sign-in error:", error.code, error.message);
      // Handle sign-in error
    }
  };

  return (
    <div>
      <br /> <button onClick={handleGoogleSignIn} style={{border:'none'}}><FcGoogle /></button>
    </div>
  );
};

export default GoogleSignInButton;
