import React, { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import EmptyCart from "../comp/EmptyCart";
import Showed from "../comp/Showed";
import "../styles/Cart.css";
import Loader from "../comp/Loader";

const Cart = ({ user }) => {
  const [cart, setCart] = useState({});
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
        setCart({});
        setItemsWithPrices([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const fetchCart = async (currentUser) => {
    try {
      if (!currentUser || !currentUser.email) {
        console.log("No user or email found.");
        return;
      }

      const userRef = doc(db, "users", currentUser.email);
      let cartDataFromFirestore = {};

      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          cartDataFromFirestore = userData.cart || {};
        }
      } catch (firestoreError) {
        console.error(
          "Error fetching cart data from Firestore:",
          firestoreError,
        );
      }

      const cartDataFromLocalStorage =
        JSON.parse(localStorage.getItem("cart")) || {};

      const mergedCartData = {
        ...cartDataFromLocalStorage,
        ...cartDataFromFirestore,
      };

      localStorage.setItem("cart", JSON.stringify(mergedCartData));

      setCart(mergedCartData);

      const pricesPromises = Object.keys(mergedCartData).map(
        async (itemName) => {
          const menuDoc = await getDoc(doc(db, "menu", itemName));
          if (menuDoc.exists()) {
            const price = menuDoc.data().price || 0;
            return { itemName, price, quantity: mergedCartData[itemName] || 0 };
          }
          return null;
        },
      );

      const itemsWithPrices = (await Promise.all(pricesPromises)).filter(
        Boolean,
      );

      const total = itemsWithPrices.reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0,
      );
      setTotalPrice(total);

      localStorage.setItem("itemsWithPrices", JSON.stringify(itemsWithPrices));

      setItemsWithPrices(itemsWithPrices);
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
    const updatedCart = { ...cart };
    delete updatedCart[itemName];
    updateCart(updatedCart);
  };

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);

    const updatedItemsWithPrices = itemsWithPrices.map((item) => {
      const price = updatedCart[item.itemName]
        ? updatedCart[item.itemName] * item.price
        : 0;
      return { ...item, price };
    });

    localStorage.setItem(
      "itemsWithPrices",
      JSON.stringify(updatedItemsWithPrices),
    );

    const total = updatedItemsWithPrices.reduce(
      (acc, { price }) => acc + price,
      0,
    );
    setTotalPrice(total);

    if (navigator.onLine) {
      const userRef = doc(db, "users", currentUser.email);
      setDoc(
        userRef,
        { cart: updatedCart, totalPrice: total },
        { merge: true },
      );
    }
  };

  if (loading) {
    return (
      <div>
        {" "}
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div style={{ marginTop: "7vh" }}>
        <Showed />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {Object.keys(cart).map((itemName) => (
        <div key={itemName} className="cart-item">
          <span className="item-name" style={{ textAlign: "center" }}>
            {itemName}
          </span>
          <br />
          <span className="item-quantity">Quantity: {cart[itemName]}</span>
          <br />
          <span className="item-price">
            (Price per item: $
            {itemsWithPrices.find((item) => item.itemName === itemName)?.price})
          </span>
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
            onClick={() => increaseQuantity(itemName)}
          >
            +
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
            onClick={() => decreaseQuantity(itemName)}
          >
            -
          </button>
          <button
            style={{
              borderRadius: "20px",
              color: "white",
              backgroundColor: "#6a0dad",
              borderColor: "#6a0dad",
            }}
            onClick={() => removeItem(itemName)}
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
          onClick={() => {
            const localTotalPrice =
              JSON.parse(localStorage.getItem("totalPrice")) || totalPrice;
            setTotalPrice(localTotalPrice);
            const userRef = doc(db, "users", currentUser.email);
            setDoc(userRef, { totalPrice: localTotalPrice }, { merge: true });
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
