import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
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
  const [cartDocumentId, setCartDocumentId] = useState(null); // State to store the cart document ID

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
          const totalPriceFromFirestore = doc.exists()
            ? doc.data().totalPrice || 0
            : 0; // Retrieve totalPrice from Firestore

          // Merge cart data from Firestore with local storage
          const mergedCartData = {
            ...(JSON.parse(localStorage.getItem("cart")) || {}),
            ...cartDataFromFirestore,
          };

          // Update local storage and context with merged cart data
          localStorage.setItem("cart", JSON.stringify(mergedCartData));
          dispatch({ type: "SET_CART", payload: mergedCartData });
          setTotalPrice(totalPriceFromFirestore);
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
    const auth = getAuth();
    const user = auth.currentUser;

    // Update local storage and context
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({ type: "SET_CART", payload: updatedCart });

    if (user) {
      const userCartRef = doc(collection(db, "carts"), user.email);
      const updatedTotalPrice = itemsWithPrices.reduce(
        (acc, { itemName, price }) =>
          acc + (updatedCart[itemName] || 0) * price,
        0,
      );

      // Update Firestore with updated cart and totalPrice
      setDoc(
        userCartRef,
        { cart: updatedCart, totalPrice: updatedTotalPrice },
        { merge: true },
      )
        .then(() => console.log("Cart updated successfully"))
        .catch((error) => console.error("Error updating cart:", error));
    }
  };

  const generateDocumentId = async () => {
    const cartQuery = query(
      collection(db, "carts"),
      where("__name__", ">=", "cart"),
    );
    const snapshot = await getDocs(cartQuery);
    const cartCount = snapshot.size;
    return `cart${cartCount + 1}`;
  };

  const proceedToCheckout = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if user is authenticated
    if (user) {
      // Redirect authenticated user to checkout page
      window.location.href = "/checkout";
    } else {
      try {
        let newCartDocumentId = localStorage.getItem("cartDocumentId");

        // Generate a new document ID if one doesn't exist locally
        if (!newCartDocumentId) {
          newCartDocumentId = await generateDocumentId();

          // Store the new document ID locally
          localStorage.setItem("cartDocumentId", newCartDocumentId);
          console.log("New document ID generated:", newCartDocumentId);
        }

        // Save cart state for unauthenticated user in Firestore
        const cartRef = doc(collection(db, "carts"), newCartDocumentId);
        await setDoc(cartRef, { cart, totalPrice }, { merge: true });

        console.log("Cart saved successfully for unauthenticated user");

        // Store the new cart document ID as the email for unauthenticated users
        localStorage.setItem("newCartDocumentId", newCartDocumentId);
        console.log("New cart document ID stored:", newCartDocumentId);

        window.location.href = "/checkout";
      } catch (error) {
        console.error("Error saving cart for unauthenticated user:", error);
      }
    }

    // Proceed to checkout logic here
    // You can redirect the user to the checkout page or handle it as required
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
          <button
            className="proceed-btn"
            style={{ textDecoration: "none", fontWeight: "bold" }}
            onClick={proceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
