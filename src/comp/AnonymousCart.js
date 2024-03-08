import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import Tabs from "../comp/Tab";
import { db } from "../config/firebaseConfig";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Loader from "../comp/Loader";
import Showed from "./Showed";
import EmptyCart from "../comp/EmptyCart";
import { FaShoppingCart } from "react-icons/fa";

const AnonymousUserComponent = () => {
  const { cart, dispatch } = useCart();
  const [itemsWithPrices, setItemsWithPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [documentId, setDocumentId] = useState("");

  //   const [userUUID, setUserUUID] = useState("");

  useEffect(() => {
    // const storedUUID = localStorage.getItem("userUUID");
    // setUserUUID(storedUUID);

    const unsubscribe = onSnapshot(collection(db, "menu"), (snapshot) => {
      const updatedItemsWithPrices = snapshot.docs
        .filter((doc) => cart[doc.id] > 0)
        .map((doc) => ({
          itemName: doc.id,
          price: doc.data().price || 0,
          quantity: cart[doc.id] || 0,
        }));
      setItemsWithPrices(updatedItemsWithPrices);

      // Calculate total price
      const total = updatedItemsWithPrices.reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0,
      );
      setTotalPrice(total);

      // Update local storage with total price
      localStorage.setItem("totalPrice", JSON.stringify(total));
    });

    return () => unsubscribe();
  }, [cart]);

  useEffect(() => {
    // Check if there's a total price stored in local storage
    const storedTotalPrice = JSON.parse(localStorage.getItem("totalPrice"));
    if (storedTotalPrice) {
      setTotalPrice(storedTotalPrice);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const storedDocumentId = localStorage.getItem("documentId");
    if (storedDocumentId) {
      setDocumentId(storedDocumentId);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const saveCartToFirestore = async () => {
    try {
      if (documentId) {
        // If documentId is present, update the existing document
        const cartRef = doc(db, "carts", documentId);
        await setDoc(cartRef, {
          ...cart,
          totalPrice: totalPrice,
        });
        console.log("Cart updated in Firestore successfully!");
      } else {
        // If documentId is not present, create a new document
        const cartsCollectionRef = collection(db, "carts");
        const querySnapshot = await getDocs(cartsCollectionRef);
        const userDocs = querySnapshot.docs.filter((doc) =>
          doc.id.startsWith("user"),
        );
        const userCount = userDocs.length + 1;
        const newDocumentId = `user${userCount.toString().padStart(3, "0")}`;

        const cartRef = doc(db, "carts", newDocumentId);
        await setDoc(cartRef, {
          ...cart,
          totalPrice: totalPrice,
        });

        console.log(
          "Cart saved to Firestore successfully with document ID:",
          newDocumentId,
        );

        setDocumentId(newDocumentId);
        localStorage.setItem("documentId", newDocumentId);
      }
    } catch (error) {
      console.error("Error saving cart to Firestore: ", error);
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
  };

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
          <div
            style={{ marginTop: "7vh", marginBottom: "20vh", fontSize: "16px" }}
          >
            <Showed />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginTop: "7vh" }}>
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
            <div>
              <button
                onClick={() => decreaseQuantity(item.itemName)}
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
              <button
                onClick={() => increaseQuantity(item.itemName)}
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
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.itemName)}
                style={{
                  borderRadius: "20px",
                  color: "white",
                  backgroundColor: "#6a0dad",
                  borderColor: "#6a0dad",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <Link to="/menu" style={{ color: "black" }}>
          Add Item to Cart
        </Link>
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
              onClick={saveCartToFirestore}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>

        <div style={{ marginTop: "7vh", marginBottom: "20vh" }}>
          <Showed />
        </div>
      </div>
    </div>
  );
};

export default AnonymousUserComponent;
