import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Tabs from "../comp/Tab";

const OngoingOrders = () => {
  const { currentUser } = useAuth();
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        try {
          const ordersRef = collection(db, "orders");
          const q = query(
            ordersRef,
            where("userEmail", "==", currentUser.email),
          );
          const querySnapshot = await onSnapshot(q, (snapshot) => {
            const ongoing = [];
            const completed = [];
            snapshot.forEach((doc) => {
              const order = { id: doc.id, ...doc.data() };
              if (order.status === "completed") {
                completed.push(order);
              } else {
                ongoing.push(order);
              }
            });
            setOngoingOrders(ongoing);
          });
          return () => querySnapshot();
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();

    // Clean up
    return () => {};
  }, [currentUser, db]);

  return (
    <div>
      <Tabs />
      <div style={{ marginBottom: "30vh", marginTop: "5vh" }}>
        <h5 style={{ color: "#6a0dad" }}>Ongoing Orders</h5>
        {currentUser ? (
          <div>
            {ongoingOrders.length > 0 ? (
              <div style={{ fontSize: "80%" }}>
                {ongoingOrders.map((order) => (
                  <div key={order.id} style={styles.orderContainer}>
                    <h6>Order ID: {order.id}</h6>

                    <p>
                      <strong style={{ color: "#6a0dad" }}>
                        Delivery Date:
                      </strong>{" "}
                      {order.deliveryDate}
                    </p>
                    <p>
                      <strong style={{ color: "#6a0dad" }}>
                        Delivery Time:
                      </strong>{" "}
                      {order.deliveryTime}
                    </p>
                    <p>
                      <strong style={{ color: "#6a0dad" }}>Location:</strong>{" "}
                      {order.location}
                    </p>
                    <p>
                      <strong style={{ color: "#6a0dad" }}>Items:</strong>
                    </p>
                    <ul>
                      {Object.entries(order.items.cart)
                        .filter(([item, quantity]) => quantity > 0) // Filter out items with quantity 0
                        .map(([item, quantity]) => (
                          <li key={item}>
                            {item}: {quantity}
                          </li>
                        ))}
                    </ul>
                    <p>
                      <strong style={{ color: "#6a0dad" }}>Total Price:</strong>{" "}
                      ₦{order.items.totalPrice.toFixed(2)}
                    </p>
                    <hr style={{ ...styles.hr, borderColor: "#6a0dad" }} />
                  </div>
                ))}
              </div>
            ) : (
              <p>No ongoing orders found for the current user.</p>
            )}
          </div>
        ) : (
          <p>Please sign in to view ongoing orders.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  orderContainer: {
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #6a0dad",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(106, 13, 173, 0.3)", // Box shadow with color #6a0dad
  },
  hr: {
    margin: "10px 0",
    border: "none",
    borderBottom: "1px solid #ccc",
  },
};

export default OngoingOrders;
