// Checkout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// Assuming you have MonnifySDK available in your project
const MonnifySDK = window.MonnifySDK;

const Checkout = () => {
  const { currentUser } = useAuth();
  const [deliveryTime, setDeliveryTime] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleCheckout = async () => {
    try {
      if (currentUser && currentUser.email) {
        const userRef = doc(db, 'users', currentUser.email);

        // Fetch user data including totalPrice from Firestore
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const totalPrice = userData.totalPrice || 0;
 const cart = userData.cart || {};
          // Update Firestore subdocument with checkout information
          await updateDoc(userRef, {
            checkout: {
              deliveryTime,
              location,
              message,
              confirmPin,
            },
          });

          MonnifySDK.initialize({
            amount: totalPrice, // Convert to kobo (MonnifySDK uses the smallest currency unit)
            currency: "NGN",
            reference: new String((new Date()).getTime()),
            customerFullName: "Ireoluwa", // replace with actual customer name
            customerEmail: "wisdomireoluwa@gmail.com", // replace with actual customer email
            apiKey: "MK_TEST_7M2J17JK93", // replace with your Monnify API key
            contractCode: "3362135433", // replace with your Monnify Contract Code
            paymentDescription: "Your Payment Description",

            onComplete: function(response) {
              // Implement what happens when the transaction is completed.
              console.log(response);

              // After successful payment, update Firestore with 'paid' status, move items to 'order' subdocument
              updateFirestoreAfterPayment(userRef, cart);
            },
            // ... other Monnify callback functions
          });

          console.log('Order processed successfully');
          // Redirect to a success page or display a success message
        }
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const updateFirestoreAfterPayment = async (userRef, cart) => {
    try {
      // Update Firestore with 'paid' status, move items to 'order' subdocument
      await updateDoc(userRef, {
        status: 'paid',
        order: cart,
        cart: {}, // Clear the cart after successful payment
      });
    } catch (error) {
      console.error('Error updating Firestore after payment:', error);
    }
  };

 

  return (
    <div>
      <h2>Checkout</h2>
      <form>
        <label>
          Time to be Delivered:
          <input type="text" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <label>
          Message to Delivery Personnel:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <br />
        <label>
          Confirm Delivery with Pin (optional):
          <input type="text" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleCheckout}>Checkout</button>
      </form>
      <Link to="/cart">
        <button>Back to Cart</button>
      </Link>
    </div>
  );
};

export default Checkout;
