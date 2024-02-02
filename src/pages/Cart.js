import React, { useEffect, useState } from 'react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../styles/Cart.css'; // Import the CSS file for styling

const Cart = ({ user }) => {
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsWithPrices, setItemsWithPrices] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Check for user authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the local state
        setCurrentUser(user);
        fetchCart(user);
      } else {
        // User is signed out, clear the local state
        setCurrentUser(null);
        setCart({});
        setItemsWithPrices([]);
      }
    });

    // Cleanup function to unsubscribe from onAuthStateChanged
    return () => {
      unsubscribe();
    };
  }, [user]);

  const fetchCart = async (currentUser) => {
    try {
      if (!currentUser || !currentUser.email) {
        console.log('No user or email found.');
        return;
      }

      const userRef = doc(db, 'users', currentUser.email);
      let cartDataFromFirestore = {};

      try {
        // Attempt to fetch cart data from Firestore
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          cartDataFromFirestore = userData.cart || {};
        }
      } catch (firestoreError) {
        console.error('Error fetching cart data from Firestore:', firestoreError);
      }

      // Get cart data from local storage
      const cartDataFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || {};

      // Merge cart data from local storage with the latest data from Firestore
      const mergedCartData = { ...cartDataFromLocalStorage, ...cartDataFromFirestore };

      // Update local storage with the merged cart data
      localStorage.setItem('cart', JSON.stringify(mergedCartData));

      setCart(mergedCartData);

      // Fetch prices from 'menu' collection
      const pricesPromises = Object.keys(mergedCartData).map(async (itemName) => {
        const menuDoc = await getDoc(doc(db, 'menu', itemName));
        if (menuDoc.exists()) {
          const price = menuDoc.data().price || 0;
          return { itemName, price, quantity: mergedCartData[itemName] || 0 };
        }
        return null;
      });

      const itemsWithPrices = (await Promise.all(pricesPromises)).filter(Boolean);

      // Calculate total price
      const total = itemsWithPrices.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
      setTotalPrice(total);

      // Update Firestore with total price (if there's internet connection)
      if (navigator.onLine && Object.keys(cartDataFromFirestore).length > 0) {
        await setDoc(userRef, { cart: mergedCartData, totalPrice: total }, { merge: true });
      }

      // Update state with items and prices
      setItemsWithPrices(itemsWithPrices);
    } catch (error) {
      console.error('Error fetching cart:', error);
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
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update state with the updated cart
    setCart(updatedCart);

    // Recalculate total price
    const total = itemsWithPrices.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
    setTotalPrice(total);

    // Update Firestore with total price (if there's internet connection)
    if (navigator.onLine) {
      const userRef = doc(db, 'users', currentUser.email);
      setDoc(userRef, { cart: updatedCart, totalPrice: total }, { merge: true });
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {Object.keys(cart).map((itemName) => (
        <div key={itemName} className="cart-item">
          <p className="item-name">
            {itemName}: 
            <span className="item-quantity">{cart[itemName]}</span> 
            <span className="item-price">(Price per item: ${itemsWithPrices.find((item) => item.itemName === itemName)?.price})</span>
            <button onClick={() => increaseQuantity(itemName)}>+</button>
            <button onClick={() => decreaseQuantity(itemName)}>-</button>
            <button onClick={() => removeItem(itemName)}>Remove</button>
          </p>
        </div>
      ))}
      <br/>
      <p className="cart-total">Total Price: ${totalPrice.toFixed(2)}</p>
      <Link to="/checkout">
        <button className="proceed-btn">Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
