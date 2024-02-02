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
  const [deliveryHour, setDeliveryHour] = useState("06");
  const [deliveryMinute, setDeliveryMinute] = useState("00");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // Function to check if a given time falls within the acceptable range (6:00 AM to 6:00 PM)
  const isAcceptableTime = (hour, minute) => {
    const time = parseInt(hour) + parseInt(minute) / 60;
    return time >= 6 && time < 18;
  };

  const handleCheckout = async () => {
    try {
      if (currentUser && currentUser.email && deliveryDate && location) {
        const currentDate = new Date().toISOString().split("T")[0];
        const selectedDateTime = new Date(
          `${deliveryDate}T${deliveryHour}:${deliveryMinute}`,
        );
        const selectedDate = selectedDateTime.toISOString().split("T")[0];
        const selectedHour = selectedDateTime.getHours();
        const selectedMinute = selectedDateTime.getMinutes();

        if (
          selectedDate >= currentDate &&
          isAcceptableTime(deliveryHour, deliveryMinute)
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
                deliveryTime: `${deliveryHour}:${deliveryMinute}`,
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
          <select
            value={deliveryHour}
            onChange={(e) => setDeliveryHour(e.target.value)}
            required
          >
            {[...Array(13).keys()].map((hour) => (
              <option key={hour} value={(hour + 6).toString().padStart(2, "0")}>
                {(hour + 6).toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          :
          <select
            value={deliveryMinute}
            onChange={(e) => setDeliveryMinute(e.target.value)}
            required
          >
            {[...Array(4).keys()].map((index) => (
              <option
                key={index}
                value={(index * 15).toString().padStart(2, "0")}
              >
                {(index * 15).toString().padStart(2, "0")}
              </option>
            ))}
          </select>
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
