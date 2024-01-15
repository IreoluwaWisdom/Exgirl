// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Logic to add item to the cart
      return [...state, action.payload];
    case 'UPDATE_QUANTITY':
      // Logic to update quantity of an item in the cart
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    case 'REMOVE_FROM_CART':
      // Logic to remove item from the cart
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

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
