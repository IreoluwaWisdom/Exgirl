import React, { useEffect, useState } from 'react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
        console.log('none');
        return;
      }

      const userRef = doc(db, 'users', currentUser.email);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCart(userData.cart || {});

        // Fetch prices from 'menu' collection
        const pricesPromises = Object.keys(userData.cart || {}).map(async (itemName) => {
          const menuDoc = await getDoc(doc(db, 'menu', itemName));
          if (menuDoc.exists()) {
            const price = menuDoc.data().price || 0;
            return { itemName, price, quantity: userData.cart[itemName] || 0 };
          }
          return null;
        });

        const itemsWithPrices = (await Promise.all(pricesPromises)).filter(Boolean);

        // Calculate total price
        const total = itemsWithPrices.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
        setTotalPrice(total);

        // Update Firestore with total price
        await setDoc(userRef, { totalPrice: total }, { merge: true });

        // Update state with items and prices
        setItemsWithPrices(itemsWithPrices);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {itemsWithPrices.map(({ itemName, price, quantity }) => (
        <div key={itemName}>
          <p>{itemName}: {quantity} (Price per item: ${price})</p>
          {/* Add edit functionality if needed */}
        </div>
      ))}

      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
