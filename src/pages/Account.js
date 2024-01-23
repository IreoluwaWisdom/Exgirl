import React from 'react';
import { useAuth } from '../context/AuthContext';
import SignUpButton from '../Buttons/SignUpButton';
import Continuing from '../Texts/Continuing';
import UserDetails from '../comp/UserDetails';
import QuantitySelector from '../comp/QuantitySelector';

const Account = () => {
  const { currentUser, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear user data from local storage
       localStorage.clear();

    } catch (error) {
      console.error('Sign-out error:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h1>Account</h1>
      {currentUser ? (
        <>
          <UserDetails userData={currentUser} />
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <h5>You are using Guest Mode</h5>
          <SignUpButton />
          <Continuing />
        </>
      )}
    </div>
  );
};

export default Account;
