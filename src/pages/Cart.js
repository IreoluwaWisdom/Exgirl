import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Cart = ({ user, itemPrices }) => {
  const [cart, setCart] = useState({});
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
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {Object.keys(cart).map((itemName) => (
        <div key={itemName}>
          <p>{itemName}: {cart[itemName]}</p>
          {/* Add edit functionality if needed */}
        </div>
      ))}
    </div>
  );
};

export default Cart;
