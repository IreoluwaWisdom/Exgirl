// Cart.js

import React, { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';

const Cart = ({ user }) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRef = db.collection('users').doc(user.email);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setCart(userData.cart || {});
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [user]);

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
