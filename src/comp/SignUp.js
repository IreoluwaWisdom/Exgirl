import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDOB] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const db = getFirestore();

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Send email verification
      await sendEmailVerification(userCredential.user);

      // Store additional user details in Firestore
      const userDetails = {
        username,
        email,
        phoneNumber,
        dob,
      };

      // Add user details to Firestore
      const userRef = doc(collection(db, 'users'), email);

      // Set user details in Firestore
      await setDoc(userRef, userDetails);

      // Provide feedback to the user
      setMessage(`Verification email sent to ${userCredential.user.email}. User details stored in Firestore with ID: ${userRef.id}`);
    } catch (error) {
      console.error('Signup error:', error.code, error.message);

      // Handle specific errors
      if (error.code === 'auth/weak-password') {
        setMessage('Please choose a stronger password.');
      } else if (error.code === 'auth/email-already-in-use') {
        setMessage('The email address is already in use.');
      } else {
        setMessage('An error occurred during sign-up.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" value={dob} onChange={(e) => setDOB(e.target.value)} required/>
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;