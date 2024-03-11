import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth, signInAnonymously, deleteUser } from "firebase/auth";

const QuantitySelector = ({ itemName }) => {
  const { cart, dispatch } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [userUID, setUserUID] = useState("");

  useEffect(() => {
    const mergedCartData = JSON.parse(localStorage.getItem("cart")) || {};
    setQuantity(mergedCartData[itemName] || 0);
    setIsItemInCart(mergedCartData.hasOwnProperty(itemName));

    // Check if user UID exists in local storage
    const storedUID = localStorage.getItem("userUID");
    if (storedUID) {
      setUserUID(storedUID);
    }
  }, [itemName]);

  useEffect(() => {
    // Check if user is authenticated, if not, authenticate anonymously
    const auth = getAuth();
    if (!auth.currentUser) {
      signInAnonymously(auth)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Anonymous user authenticated", user.uid);
          setUserUID(user.uid); // Save user UID locally
          localStorage.setItem("userUID", user.uid); // Save user UID in local storage
        })
        .catch((error) => {
          console.error("Error authenticating anonymously:", error);
        });
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !user.isAnonymous) {
        setUserUID(user.uid);
        localStorage.setItem("userUID", user.uid);
      } else {
        setUserUID("");
        localStorage.removeItem("userUID");
        // If the user is anonymous, delete their data
        deleteUserData();
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteUserData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user && user.isAnonymous) {
        // Delete user data from Firestore
        await deleteDoc(doc(db, "carts", user.uid));
        // Delete the anonymous user
        await deleteUser(user);
        console.log("Anonymous user data deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting anonymous user data:", error);
    }
  };

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

    // Store cart data locally
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update cart in Firestore if user is authenticated and not anonymous
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && !user.isAnonymous) {
      const userCartRef = doc(collection(db, "carts"), user.uid);
      setDoc(userCartRef, { cart: updatedCart }, { merge: true })
        .then(() => console.log("Cart updated successfully"))
        .catch((error) => console.error("Error updating cart:", error));
    }
  };

  const removeItemFromCart = () => {
    setQuantity(0); // Set quantity to 0 in component state
    updateCart(0); // Update quantity to 0 in Firestore

    // Remove item from cart locally
    const updatedCart = { ...cart };
    delete updatedCart[itemName];
    dispatch({ type: "SET_CART", payload: updatedCart });

    // Remove item from Firestore if user is authenticated
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userCartRef = doc(collection(db, "carts"), user.uid);
      setDoc(userCartRef, { cart: updatedCart }, { merge: true })
        .then(() => console.log("Item removed from Firestore"))
        .catch((error) =>
          console.error("Error removing item from Firestore:", error),
        );
    }
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
        {isItemInCart && quantity > 0 ? (
          <>
            <button
              onClick={() => updateCart(quantity)}
              style={{
                borderRadius: "20px",
                color: "white",
                backgroundColor: "#bb806b",
                borderColor: "#bb806b",
                marginRight: "19px",
              }}
            >
              Update Cart
            </button>

            <button
              onClick={removeItemFromCart}
              disabled={quantity === 0}
              style={{
                borderRadius: "20px",
                color: "white",
                backgroundColor: "#6a0dad",
                borderColor: "#6a0dad",
                marginLeft: "13px",
              }}
            >
              Remove
            </button>
          </>
        ) : (
          <button
            onClick={() => updateCart(quantity)}
            style={{
              borderRadius: "20px",
              color: "white",
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
              padding: "4px 8px",
            }}
          >
            Add to Cart
          </button>
        )}
        <br />
        <div style={{ marginTop: "2vh" }}>
          <Link to="/cart" style={{ color: "black", marginTop: "5vh" }}>
            View/Edit Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuantitySelector;
