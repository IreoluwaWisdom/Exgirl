import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

// Assuming you have MonnifySDK available in your project
const MonnifySDK = window.MonnifySDK;

const locations = [
  "Fajol",
  "Obantoko",
  "Asero",
  "Adatan",
  "Eleweran",
  "Somorin",
];

const Checkout = () => {
  const { currentUser } = useAuth();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleCheckout = async () => {
    try {
      if (
        currentUser &&
        currentUser.email &&
        deliveryDate &&
        deliveryTime &&
        location
      ) {
        const currentDate = new Date().toISOString().split("T")[0];
        const currentTime = new Date().getHours() + 1; // GMT+1
        const selectedDateTime = new Date(`${deliveryDate}T${deliveryTime}`);
        const selectedDate = selectedDateTime.toISOString().split("T")[0];
        const selectedTime = selectedDateTime.getHours();

        if (
          selectedDate >= currentDate &&
          selectedTime >= 6 &&
          selectedTime < 18
        ) {
          const userRef = doc(db, "users", currentUser.email);

          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const totalPrice = userData.totalPrice || 0;
            const cart = userData.cart || {};

            await updateDoc(userRef, {
              checkout: {
                deliveryDate,
                deliveryTime,
                location,
                message,
                confirmPin,
              },
            });

            MonnifySDK.initialize({
              amount: totalPrice,
              currency: "NGN",
              reference: new String(new Date().getTime()),
              customerFullName: "Ireoluwa",
              customerEmail: "wisdomireoluwa@gmail.com",
              apiKey: "MK_TEST_7M2J17JK93",
              contractCode: "3362135433",
              paymentDescription: "Your Payment Description",

              onComplete: function (response) {
                console.log(response);
                updateFirestoreAfterPayment(userRef, cart);
              },

              onClose: function (data) {
                console.log(data);
                window.location.href = "/checkout";
              },
            });

            console.log("Order processed successfully");
          }
        } else {
          alert(
            "Please select a future date and a time between 6:00 AM and 6:00 PM.",
          );
        }
      } else {
        alert("Please provide delivery date, time, and location.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const updateFirestoreAfterPayment = async (userRef, cart) => {
    try {
      await updateDoc(userRef, {
        status: "paid",
        order: cart,
        cart: {},
      });
    } catch (error) {
      console.error("Error updating Firestore after payment:", error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form>
        <label>
          Date to be Delivered:
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </label>
        <br />
        <label>
          Time to be Delivered:
          <input
            type="time"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            required
            min="06:00"
            max="18:00"
          />
        </label>
        <br />
        <label>
          Location:
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select Location</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Message to Delivery Personnel:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Delivery with Pin (optional):
          <input
            type="text"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleCheckout}>
          Checkout
        </button>
      </form>
      <Link to="/cart">
        <button>Back to Cart</button>
      </Link>
    </div>
  );
};

export default Checkout;
