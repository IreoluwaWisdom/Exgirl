import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignUpButton from '../Buttons/SignUpButton';
import SignInButton from '../Buttons/SignInButton';
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
      Account
      {currentUser ? (
        <>
          <UserDetails userData={currentUser} />
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <h5>You are using Guest Mode</h5>
          <SignInButton/>
          <SignUpButton />
          <Continuing />
          Need Help? Chat with Perry
        </>
      )}
    </div>
  );
};

export default Account;
