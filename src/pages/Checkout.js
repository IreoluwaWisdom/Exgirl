import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import "../styles/Checkout.css";
import DateTimeDisplay from "../comp/Date";

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
                updateFirestoreAfterPayment(currentUser.email, cart);
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

  const updateFirestoreAfterPayment = async (userEmail, cart) => {
    try {
      // Fetch the last order ID from Firestore
      const lastOrderQuery = query(
        collection(db, "orders"),
        orderBy("orderId", "desc"),
        limit(1),
      );
      const lastOrderSnapshot = await getDocs(lastOrderQuery);
      let lastOrderId = 0;

      if (!lastOrderSnapshot.empty) {
        lastOrderId = parseInt(
          lastOrderSnapshot.docs[0].data().orderId.replace("exgirl", ""),
        );
      }

      // Increment the last order ID to get the new order ID
      const newOrderId = `exgirl${(lastOrderId + 1).toString().padStart(4, "0")}`;

      // Create the order object
      const orderData = {
        orderId: newOrderId,
        userEmail,
        items: cart.items,
        deliveryDate: cart.checkout.deliveryDate,
        deliveryTime: cart.checkout.deliveryTime,
        location: cart.checkout.location,
        message: cart.checkout.message,
        confirmPin: cart.checkout.confirmPin,
        createdAt: serverTimestamp(),
      };

      // Add the new order to the "orders" collection
      const orderRef = doc(db, "orders", newOrderId);
      await setDoc(orderRef, orderData);

      console.log("Order stored in Firestore after successful payment.");
    } catch (error) {
      console.error("Error storing order in Firestore after payment:", error);
    }
  };

  return (
    <div class="box">
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          marginBottom: "20vh",
          padding: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            color: "#333",
            textAlign: "center",
          }}
        >
          Checkout
        </h2>
        <DateTimeDisplay />

        <form>
          <label style={{ marginBottom: "10px", display: "block" }}>
            Date to be Delivered:
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
              min={new Date().toISOString().split("T")[0]}
            />
          </label>
          <br />
          <label style={{ marginBottom: "10px", display: "block" }}>
            Time to be Delivered:
            <select
              value={deliveryHour}
              onChange={(e) => setDeliveryHour(e.target.value)}
              required
              style={{ width: "49%", padding: "8px", borderRadius: "4px" }}
            >
              {[...Array(13).keys()].map((hour) => (
                <option
                  key={hour}
                  value={(hour + 6).toString().padStart(2, "0")}
                >
                  {(hour + 6).toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            :
            <select
              value={deliveryMinute}
              onChange={(e) => setDeliveryMinute(e.target.value)}
              required
              style={{ width: "49%", padding: "8px", borderRadius: "4px" }}
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
          <label style={{ marginBottom: "10px", display: "block" }}>
            Location:
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
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
          <label style={{ marginBottom: "10px", display: "block" }}>
            Message to Delivery Personnel:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            />
          </label>
          <br />
          <label style={{ marginBottom: "10px", display: "block" }}>
            Confirm Delivery with Pin (optional):
            <input
              type="text"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            />
          </label>
          <br />
          <button
            type="button"
            onClick={handleCheckout}
            style={{
              padding: "5px 19px",
              backgroundColor: "#6a0dad",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              position: "relative",
              right: "9vw",
            }}
          >
            Checkout
          </button>
        </form>
        <Link to="/cart">
          <button
            style={{
              padding: "5px 10px",
              backgroundColor: "#bb806b",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              position: "relative",
              left: "35vw",
            }}
          >
            Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
