import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const Support = () => {
  const { currentUser } = useAuth();
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
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
            setCompletedOrders(completed);
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
    <div style={{ marginBottom: "30vh" }}>
      <h5>Ongoing Orders</h5>
      {currentUser ? (
        <div>
          {ongoingOrders.length > 0 ? (
            <div style={{ fontSize: "80%" }}>
              {ongoingOrders.map((order) => (
                <div key={order.id} style={styles.orderContainer}>
                  <h6>Order ID: {order.id}</h6>

                  <p>
                    <strong>Delivery Date:</strong> {order.deliveryDate}
                  </p>
                  <p>
                    <strong>Delivery Time:</strong> {order.deliveryTime}
                  </p>
                  <p>
                    <strong>Location:</strong> {order.location}
                  </p>
                  <p>
                    <strong>Items:</strong>
                  </p>
                  <ul>
                    {Object.entries(order.items.cart).map(
                      ([item, quantity]) => (
                        <li key={item}>
                          {item}: {quantity}
                        </li>
                      ),
                    )}
                  </ul>
                  <p>
                    <strong>Total Price:</strong> ₦
                    {order.items.totalPrice.toFixed(2)}
                  </p>
                  <hr style={styles.hr} />
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

      <h5>Completed Orders</h5>
      {currentUser ? (
        <div>
          {completedOrders.length > 0 ? (
            <div style={{ fontSize: "80%" }}>
              {completedOrders.map((order) => (
                <div key={order.id} style={styles.orderContainer}>
                  <h6>Order ID: {order.id}</h6>

                  <p>
                    <strong>Delivery Date:</strong> {order.deliveryDate}
                  </p>
                  <p>
                    <strong>Delivery Time:</strong> {order.deliveryTime}
                  </p>
                  <p>
                    <strong>Location:</strong> {order.location}
                  </p>
                  <p>
                    <strong>Items:</strong>
                  </p>
                  <ul>
                    {Object.entries(order.items.cart).map(
                      ([item, quantity]) => (
                        <li key={item}>
                          {item}: {quantity}
                        </li>
                      ),
                    )}
                  </ul>
                  <p>
                    <strong>Total Price:</strong> ₦
                    {order.items.totalPrice.toFixed(2)}
                  </p>
                  <hr style={styles.hr} />
                </div>
              ))}
            </div>
          ) : (
            <p>No completed orders found for the current user.</p>
          )}
        </div>
      ) : (
        <p>Please sign in to view completed orders.</p>
      )}
    </div>
  );
};

const styles = {
  orderContainer: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  hr: {
    margin: "10px 0",
    border: "none",
    borderBottom: "1px solid #ccc",
  },
};

export default Support;
