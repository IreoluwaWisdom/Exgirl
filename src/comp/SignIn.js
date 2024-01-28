import React, { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  sendEmailVerification,
} from 'firebase/auth';
import { getFirestore, collection, doc, where, query, getDocs } from 'firebase/firestore';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const auth = getAuth();

    // Set persistence to 'local' to keep the user signed in across browser restarts
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current session only.
        console.log('Persistence set to local');
      })
      .catch((error) => {
        console.error('Error setting persistence:', error.code, error.message);
      });

  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check if the user's email is verified
      const isEmailVerified = userCredential.user.emailVerified;

      if (!isEmailVerified) {
        setErrorMessage('Email not verified. Please check your email for a verification link.');
        return;
      }

      // Retrieve additional user data from Firestore based on email
      const db = getFirestore();
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document matching the query (assuming email is unique)
        const userData = querySnapshot.docs[0].data();

        // Set user data in state
        setUserData(userData);

        // Store user data locally, e.g., in state or local storage
        // You can use localStorage.setItem or your preferred state management technique
        console.log('User Data:', userData);
      } else {
        setErrorMessage('User data not found in Firestore.');
      }

      // Handle successful sign-in, e.g., redirect the user or update state
      console.log('Signed in:', userCredential.user.email);
    } catch (error) {
      console.error('Sign-in error:', error.code, error.message);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>

      {/* Display error message */}
      {errorMessage && <p>{errorMessage}</p>}

      {/* Display user data */}
      {userData && (
        <div>
          <h3>User Information</h3>
          <p>Email: {userData.email}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default SignIn;