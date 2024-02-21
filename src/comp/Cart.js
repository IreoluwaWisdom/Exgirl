import React, { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";

const Cart = ({ user }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {},
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading state

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRef = db.collection("users").doc(user.email);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const userCart = userData.cart || {};
          setCart(userCart);
          localStorage.setItem("cart", JSON.stringify(userCart)); // Update local storage here
        } else {
          // If user document doesn't exist, clear cart data from local storage
          setCart({});
          localStorage.removeItem("cart");
        }

        // Calculate total price
        let calculatedTotalPrice = 0;

        const itemIds = Object.keys(cart);
        for (const itemId of itemIds) {
          const itemDoc = await db.collection("menu").doc(itemId).get();
          if (itemDoc.exists) {
            const itemData = itemDoc.data();
            const itemPrice = itemData.price || 0;
            const itemQuantity = cart[itemId] || 0;
            calculatedTotalPrice += itemPrice * itemQuantity;
          }
        }

        // Update state with total price
        setTotalPrice(calculatedTotalPrice);

        // Update Firestore with total price
        await userRef.update({ totalPrice: calculatedTotalPrice });

        // Set loading to false after cart data is fetched
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching or calculating cart:", error);
        // Set loading to false if there's an error
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [user, cart]);

  useEffect(() => {
    const handleCartChange = (event) => {
      const updatedCart = JSON.parse(event.newValue);
      setCart(updatedCart);
    };

    window.addEventListener("storage", handleCartChange);

    return () => {
      window.removeEventListener("storage", handleCartChange);
    };
  }, []);

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  if (Object.keys(cart).length === 0) {
    return <p>Empty cart</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {Object.keys(cart).map((itemName) => (
        <div key={itemName}>
          <p>
            {itemName}: {cart[itemName]}
          </p>
          {/* Add edit functionality if needed */}
        </div>
      ))}
      <p>Total Price: {totalPrice}</p>
    </div>
  );
};

export default Cart;
