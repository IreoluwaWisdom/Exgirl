// Cart.js

import React, { useEffect, useState } from 'react';
import { db } from '../config/firebaseConfig';

const Cart = ({ user }) => {
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRef = db.collection('users').doc(user.email);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          setCart(userData.cart || {});
        }

        // Calculate total price
        let calculatedTotalPrice = 0;

        const itemIds = Object.keys(cart);
        for (const itemId of itemIds) {
          const itemDoc = await db.collection('menu').doc(itemId).get();
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
      } catch (error) {
        console.error('Error fetching or calculating cart:', error);
      }
    };

    fetchCart();
  }, [user, cart]);

  return (
    <div>
      <h2>Your Cart</h2>
      {Object.keys(cart).map((itemName) => (
        <div key={itemName}>
          <p>{itemName}: {cart[itemName]}</p>
          {/* Add edit functionality if needed */}
        </div>
      ))}
      <p>Total Price: {totalPrice}</p>
    </div>
  );
};

export default Cart;
