import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "RESET_CART":
      return {};
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {});

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    const setupCartListener = async (user) => {
      if (!user || !user.email) {
        // No user or no email, do not set up listener
        return;
      }

      const unsubscribe = onSnapshot(
        doc(collection(db, "carts"), user.email),
        (snapshot) => {
          const data = snapshot.data();
          dispatch({ type: "SET_CART", payload: data.cart || {} });
        },
      );

      return () => unsubscribe();
    };

    if (!user) {
      // User not authenticated, sign in anonymously
      signInAnonymously(auth)
        .then((userCredential) => {
          const user = userCredential.user;
          setupCartListener(user);
        })
        .catch((error) => {
          console.error("Error signing in anonymously:", error.message);
        });
    } else {
      setupCartListener(user);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
