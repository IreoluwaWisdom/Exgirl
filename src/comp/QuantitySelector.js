import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth } from "firebase/auth";

const QuantitySelector = ({ itemName, itemPrice }) => {
  const { cart, dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isItemInCart, setIsItemInCart] = useState(false);

  useEffect(() => {
    const mergedCartData = JSON.parse(localStorage.getItem("cart")) || {};
    setQuantity(mergedCartData[itemName] || 1);
    setIsItemInCart(mergedCartData.hasOwnProperty(itemName));
  }, [itemName]);

  const increaseQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    updateCart(updatedQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity);
      updateCart(updatedQuantity);
    }
  };

  const updateCart = (updatedQuantity) => {
    const updatedCart = {
      ...cart,
      [itemName]: updatedQuantity,
    };
    dispatch({ type: "SET_CART", payload: updatedCart });

    // Update cart data in Firestore
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userCartRef = doc(collection(db, "carts"), user.email);
      setDoc(userCartRef, { cart: updatedCart }, { merge: true })
        .then(() => console.log("Cart updated successfully"))
        .catch((error) => console.error("Error updating cart:", error));
    }
  };

  const removeItemFromCart = () => {
    const updatedCart = { ...cart };
    delete updatedCart[itemName];
    dispatch({ type: "SET_CART", payload: updatedCart });

    // Update cart data in Firestore
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userCartRef = doc(collection(db, "carts"), user.email);
      setDoc(userCartRef, { cart: updatedCart }, { merge: true })
        .then(() => console.log("Item removed from cart"))
        .catch((error) =>
          console.error("Error removing item from cart:", error),
        );
    }
  };

  return (
    <div>
      <div style={{}}>
        <button
          onClick={decreaseQuantity}
          style={{ width: "10vw", marginBottom: "5vh" }}
          disabled={quantity === 1 || !isItemInCart}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity} style={{ width: "10vw" }}>
          +
        </button>
      </div>
      <div>
        {isItemInCart ? (
          <>
            <button onClick={() => updateCart(quantity)}>Update Cart</button>
            <button onClick={removeItemFromCart}>Remove</button>
          </>
        ) : (
          <button onClick={() => updateCart(quantity)}>Add to Cart</button>
        )}
        <br />
        <Link to="/cart" style={{ color: "black" }}>
          View/Edit Cart
        </Link>
      </div>
    </div>
  );
};

export default QuantitySelector;
