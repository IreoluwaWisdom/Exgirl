import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const AuthContext = React.createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        // If there is no authenticated user, sign in anonymously
        try {
          const anonymousUser = await signInAnonymously(auth);
          setCurrentUser(anonymousUser);
        } catch (error) {
          console.error("Error signing in anonymously:", error.message);
        }
      } else {
        // If there is an authenticated user, check if it's not anonymous
        if (!user.isAnonymous) {
          // Delete the locally stored document ID
          localStorage.removeItem("documentId");
        }
      }

      if (user) {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userEmail", "==", user.email));
        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() });
        });
        setUserOrders(orders);
      } else {
        setUserOrders([]);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, db]);

  const value = {
    currentUser,
    userOrders,
    signOut: async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign-out error:", error.message);
        // Handle the error, e.g., show an error message to the user
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
