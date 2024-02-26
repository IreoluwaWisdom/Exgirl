import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth } from "firebase/auth";

const QuantitySelector = ({ itemName, itemPrice }) => {
  const { cart, dispatch } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [isItemInCart, setIsItemInCart] = useState(false);

  useEffect(() => {
    const mergedCartData = JSON.parse(localStorage.getItem("cart")) || {};
    setQuantity(mergedCartData[itemName] || 0);
    setIsItemInCart(mergedCartData.hasOwnProperty(itemName));
  }, [itemName]);

  const increaseQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    updateCart(updatedQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
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
    setQuantity(0); // Set quantity to 0 in component state
    updateCart(0); // Update quantity to 0 in Firestore
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={decreaseQuantity}
          disabled={quantity === 0 || !isItemInCart}
          style={{
            marginRight: "10px",
            color: "white",
            backgroundColor: "#6a0dad",
            borderWidth: "0px",
            fontWeight: "bolder",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={increaseQuantity}
          style={{
            marginLeft: "10px",
            color: "white",
            backgroundColor: "#bb806b",
            borderWidth: "0px",
            fontWeight: "bolder",
            fontSize: "16px",
            width: "40px",
            height: "40px",
            borderRadius: "20px",
          }}
        >
          +
        </button>
      </div>
      <div>
        {isItemInCart ? (
          <>
            <button onClick={() => updateCart(quantity)}>Update Cart</button>
            <button onClick={removeItemFromCart} disabled={quantity === 0}>
              Remove
            </button>
          </>
        ) : (
          <button onClick={() => updateCart(quantity)}>Add to Cart</button>
        )}
        <br />
        <Link to="/cart">View/Edit Cart</Link>
      </div>
    </div>
  );
};

export default QuantitySelector;
