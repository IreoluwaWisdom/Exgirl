// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const CartContext = createContext();

// Modify CartContext.js

// ... (previous code)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Logic to add item to the cart
      const updatedCart = [...state, action.payload];
      // Update Firestore here with updatedCart
      updateFirestoreCart(updatedCart);
      return updatedCart;
    case 'UPDATE_QUANTITY':
      // Logic to update quantity of an item in the cart
      const updatedCartQuantity = state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      // Update Firestore here with updatedCartQuantity
      updateFirestoreCart(updatedCartQuantity);
      return updatedCartQuantity;
    case 'REMOVE_FROM_CART':
      // Logic to remove item from the cart
      const updatedCartRemove = state.filter((item) => item.id !== action.payload.id);
      // Update Firestore here with updatedCartRemove
      updateFirestoreCart(updatedCartRemove);
      return updatedCartRemove;
    default:
      return state;
  }
};

const updateFirestoreCart = async (userId, cart) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      // Handle the case where the user is not authenticated
      console.error('User not authenticated');
      return;
    }

    const db = getFirestore();
 const userCartRef = doc(collection(db, 'carts'), userId);

    // Update Firestore document with the new cart data
    await setDoc(userCartRef, { cart }, { merge: true });

    console.log('Firestore cart updated successfully');
  } catch (error) {
    console.error('Error updating Firestore cart:', error);
  }
};

// ... (rest of the code)


export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
