import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getAuth } from "firebase/auth";
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
        // No user or no email, use local storage only
        const mergedCartData = JSON.parse(localStorage.getItem("cart")) || {};
        dispatch({ type: "SET_CART", payload: mergedCartData });
        return;
      }

      const unsubscribe = onSnapshot(
        doc(collection(db, "carts"), user.email),
        (snapshot) => {
          const data = snapshot.data();
          const cartData = data ? data.cart : {};
          dispatch({ type: "SET_CART", payload: cartData });
        },
      );

      return () => unsubscribe();
    };

    setupCartListener(user);
  }, []); // Dependency array should be empty to run once when component mounts

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
