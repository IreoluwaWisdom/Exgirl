import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig';
import { updateFirestoreCart } from '../Utility/firebaseUtils';


const QuantitySelector = ({ itemName, itemPrice }) => {
  const { currentUser,signOut } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isItemInCart, setIsItemInCart] = useState(false);

  // useEffect to set the initial quantity based on the mergedCartData
  useEffect(() => {
    const mergedCartData = JSON.parse(localStorage.getItem('cart')) || {};
    
    // Set quantity to one if no user is logged in
    if (!currentUser) {
      setQuantity(1);
    } else {
      setQuantity(mergedCartData[itemName] || 1);
      setIsItemInCart(mergedCartData.hasOwnProperty(itemName));
    }
  }, [currentUser, itemName]);


  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    };


  };

   const resetQuantity = () => {
    // Reset quantity to one
    setQuantity(1);
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
          await setDoc(userRef, {
            cart: updatedCart,
            // ... (other fields you may want to update)
          });

          // Store updated cart items in local storage
          localStorage.setItem('cart', JSON.stringify(updatedCart));

          console.log(`${itemName} added to the cart`);

          // Attempt to update Firestore with the latest cart data from local storage
          if (navigator.onLine) {
            await updateFirestoreCart(currentUser.email, updatedCart);
          } else {
            displayNoInternetMessage();
          }
        } else {
          console.error('User data not found in Firestore.');
        }
      } catch (error) {
        // If there is an error updating Firestore, log the error and display a message
        console.error('Error adding item to cart:', error);
        displayNoInternetMessage();
      }
    } else {
      console.log('User not signed in');
    }
  };

  const updateCart = async () => {
    // Similar logic as addToCart, with the difference being the use of 'updateDoc' instead of 'setDoc'
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
            [itemName]:  quantity,
          };

          // Update the cart field in the user's document using 'updateDoc'
          await updateDoc(userRef, {
            cart: updatedCart,
            // ... (other fields you may want to update)
          });

          // Store updated cart items in local storage
          localStorage.setItem('cart', JSON.stringify(updatedCart));

          console.log(`${itemName} updated in the cart`);

          // Attempt to update Firestore with the latest cart data from local storage
          if (navigator.onLine) {
            await updateFirestoreCart(currentUser.email, updatedCart);
          } else {
            displayNoInternetMessage();
          }
        } else {
          console.error('User data not found in Firestore.');
        }
      } catch (error) {
        // If there is an error updating Firestore, log the error and display a message
        console.error('Error updating item in the cart:', error);
        displayNoInternetMessage();
      }
    } else {
      console.log('User not signed in');
    }
  };

  const displayNoInternetMessage = () => {
    // Display a message to the user indicating there is no internet connection
    console.log('No internet connection. Changes will be synced when online.');
  };


  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear user data from local storage
      localStorage.removeItem('userData');
      // Reset quantity after sign-out
      resetQuantity();
    } catch (error) {
      console.error('Sign-out error:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <div style ={{}}>
        <button onClick={decreaseQuantity} style={{ width: '10vw', marginBottom: '5vh' }} disabled={!isItemInCart}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity} style={{ width: '10vw' }}>+</button>
      </div>
      <div>
        {isItemInCart ? (
          <button onClick={updateCart}>Update Cart</button>
        ) : (
          <button onClick={addToCart}>Add to Cart</button>
        )}
        <br />
        <Link to='/cart' style={{ color: 'black' }}>View/Edit Cart</Link>
      </div>
    </div>
  );
};

export default QuantitySelector;
