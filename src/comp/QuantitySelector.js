import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const QuantitySelector = ({itemName}, {itemPrice}) => {
   const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
  if (currentUser) {
    try {
      const userRef = doc(collection(db, 'users'), currentUser.email);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentCart = userData.cart || {};

        // Update the quantity of the specified item in the current cart
        const updatedCart = {
          ...currentCart,
          [itemName]: (currentCart[itemName] || 0) + quantity,
        };

        // Update the cart field in the user's document
        await updateDoc(userRef, {
          cart: updatedCart,
          // ... (other fields you may want to update)
        });

        console.log(`${itemName} added to the cart`);
      } else {
        console.error('User data not found in Firestore.');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  } else {
    console.log('User not signed in');
  }
};



  return (
    <div>
      <div>
        <button onClick={decreaseQuantity} style={{ width: '10vw', marginBottom: '5vh' }}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity} style={{ width: '10vw' }}>+</button>
      </div>
      <div>
        <button onClick={addToCart}>Add to Cart</button>
        <br />
        <Link to='/cart' style={{ color: 'black' }}>View/Edit Cart</Link>
      </div>
    </div>
  );
};

export default QuantitySelector;
