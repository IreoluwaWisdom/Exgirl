import React, { useEffect, useState } from "react";
import {
  getDocs,
  where,
  query,
  doc,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import Tabs from "../comp/Tab";
import { db } from "../config/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import EmptyCart from "../comp/EmptyCart";
import Showed from "../comp/Showed";
import "../styles/Cart.css";
import Loader from "../comp/Loader";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsWithPrices, setItemsWithPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch cart data for authenticated users
        fetchCart(user);
      } else {
        // Fetch cart data for unauthenticated users
        fetchCart(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    };

    calculateTotalPrice();
  }, [itemsWithPrices]);

  const fetchCart = async (user) => {
    try {
      if (user) {
        const userCartRef = doc(collection(db, "carts"), user.email);

        // Listen for changes to the cart document
        const unsubscribe = onSnapshot(userCartRef, (doc) => {
          const cartDataFromFirestore = doc.exists() ? doc.data().cart : {};

          // Merge cart data from Firestore with local storage
          const mergedCartData = {
            ...(JSON.parse(localStorage.getItem("cart")) || {}),
            ...cartDataFromFirestore,
          };

          // Update local storage and context with merged cart data
          localStorage.setItem("cart", JSON.stringify(mergedCartData));
          dispatch({ type: "SET_CART", payload: mergedCartData });
          setLoading(false);
        });

        return () => unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
      } else {
        // Fetch cart data from local storage directly for unauthenticated users

        // console.log("Fetching cart from local storage...");
        // console.log("Cart data:", JSON.parse(localStorage.getItem("cart")));
        const localCartData = JSON.parse(localStorage.getItem("cart")) || {};
        dispatch({ type: "SET_CART", payload: localCartData });
        setLoading(false);
      }
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
    } else {
      // Query to count the number of documents starting with "cart"
      const cartQuery = query(
        collection(db, "carts"),
        where("__name__", ">=", "cart"),
        where("__name__", "<", "caru"),
      );
      getDocs(cartQuery)
        .then((querySnapshot) => {
          // Calculate the count based on the number of documents
          const count = querySnapshot.size;
          const cartId = `cart${(count + 1).toString().padStart(3, "0")}`;
          const cartRef = doc(collection(db, "carts"), cartId);
          setDoc(cartRef, { cart: updatedCart })
            .then(() => console.log("Cart updated successfully"))
            .catch((error) => console.error("Error updating cart:", error));
        })
        .catch((error) => console.error("Error counting carts:", error));
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (itemsWithPrices.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          display: "block",
          justifyContent: "center",
          // marginTop: "7vh",
        }}
      >
        <Tabs />
        <div style={{ position: "relative", top: "30vh", fontSize: "200%" }}>
          <EmptyCart />
          <Link style={{ color: "black" }} to="/menu">
            {" "}
            Add Item to Cart
          </Link>
          <br />
          <span style={{ color: "" }}>
            <span>
              <FaShoppingCart
                style={{ fill: "none", stroke: "black", strokeWidth: "50px" }}
              />{" "}
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs />

      <div className="cart-container" style={{ marginTop: "7vh" }}>
        {itemsWithPrices.map((item) => (
          <div key={item.itemName} className="cart-item">
            <span className="item-name" style={{ textAlign: "center" }}>
              {item.itemName}
            </span>
            <br />
            <div style={{ fontSize: "80%" }}>
              <span className="item-quantity"> {item.quantity} item</span>
              <span className="item-price"> ₦{item.price}</span>
            </div>
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
        <p style={{ fontWeight: "bold" }} className="cart-total">
          Total Price: ₦{totalPrice.toFixed(2)}
        </p>
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
    </div>
  );
};

export default Cart;
