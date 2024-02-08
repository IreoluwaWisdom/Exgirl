import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import EmptyCart from "../comp/EmptyCart";
import Showed from "../comp/Showed";
import "../styles/Cart.css";
import Loader from "../comp/Loader";

const Cart = ({ user }) => {
  const { cart, dispatch } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsWithPrices, setItemsWithPrices] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchCart(user);
      } else {
        setCurrentUser(null);
        dispatch({ type: "RESET_CART" });
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menu"), (snapshot) => {
      const updatedItemsWithPrices = snapshot.docs
        .filter((doc) => cart[doc.id] > 0)
        .map((doc) => ({
          itemName: doc.id,
          price: doc.data().price || 0,
          quantity: cart[doc.id] || 0,
        }));
      setItemsWithPrices(updatedItemsWithPrices);
    });

    return () => unsubscribe();
  }, [cart]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = itemsWithPrices.reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0,
      );
      setTotalPrice(total);
      if (currentUser) {
        const userCartRef = doc(collection(db, "carts"), currentUser.email);
        setDoc(userCartRef, { totalPrice: total }, { merge: true });
      }
    };

    calculateTotalPrice();
  }, [itemsWithPrices, currentUser]);

  const fetchCart = async (currentUser) => {
    try {
      if (!currentUser || !currentUser.email) {
        console.log("No user or email found.");
        return;
      }

      const userCartRef = doc(collection(db, "carts"), currentUser.email);
      const userCartDoc = await getDoc(userCartRef);
      const cartDataFromFirestore = userCartDoc.exists()
        ? userCartDoc.data().cart
        : {};

      const mergedCartData = {
        ...(JSON.parse(localStorage.getItem("cart")) || {}),
        ...cartDataFromFirestore,
      };

      localStorage.setItem("cart", JSON.stringify(mergedCartData));
      dispatch({ type: "SET_CART", payload: mergedCartData });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const increaseQuantity = (itemName) => {
    const updatedCart = { ...cart, [itemName]: (cart[itemName] || 0) + 1 };
    updateCart(updatedCart);
  };

  const decreaseQuantity = (itemName) => {
    if (cart[itemName] > 1) {
      const updatedCart = { ...cart, [itemName]: cart[itemName] - 1 };
      updateCart(updatedCart);
    }
  };

  const removeItem = (itemName) => {
    const updatedCart = { ...cart, [itemName]: 0 };
    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    return (
      <div style={{ marginTop: "7vh" }}>
        <Showed />
      </div>
    );
  }

  if (itemsWithPrices.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {itemsWithPrices.map((item) => (
        <div key={item.itemName} className="cart-item">
          <span className="item-name" style={{ textAlign: "center" }}>
            {item.itemName}
          </span>
          <br />
          <span className="item-quantity">Quantity: {item.quantity}</span>
          <br />
          <span className="item-price">(Price per item: ${item.price})</span>
          <br />
          <button
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
            onClick={() => decreaseQuantity(item.itemName)}
          >
            -
          </button>
          <button
            style={{
              marginRight: "10px",
              color: "white",
              backgroundColor: "#bb806b",
              borderWidth: "0px",
              fontWeight: "bolder",
              fontSize: "16px",
              width: "40px",
              height: "40px",
              borderRadius: "20px",
            }}
            onClick={() => increaseQuantity(item.itemName)}
          >
            +
          </button>
          <button
            style={{
              borderRadius: "20px",
              color: "white",
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
            }}
            onClick={() => removeItem(item.itemName)}
          >
            Remove
          </button>
        </div>
      ))}
      <br />
      <p className="cart-total">Total Price: ${totalPrice.toFixed(2)}</p>
      <div
        style={{
          textAlign: "center",
          position: "relative",
          left: "15%",
          marginBottom: "20vh",
        }}
      >
        <Link
          to="/checkout"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <button
            className="proceed-btn"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
