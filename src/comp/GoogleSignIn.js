import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);

      // Access the signed-in user
      const user = result.user;

      // Handle successful sign-in, e.g., redirect the user or update state
      console.log('Signed in with Google:', user.displayName);
    } catch (error) {
      console.error('Google Sign-In error:', error.code, error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default GoogleSignIn;
