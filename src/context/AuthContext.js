// AuthContext.js

import React, { useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
