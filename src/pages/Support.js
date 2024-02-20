import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import FeedbackForm from '../comp/Feedback';


const Support = () => {
  const { currentUser } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        try {
          const ordersRef = collection(db, 'orders');
          const q = query(ordersRef, where('userEmail', '==', currentUser.email));
          const querySnapshot = await onSnapshot(q, (snapshot) => {
            const orders = [];
            snapshot.forEach((doc) => {
              orders.push({ id: doc.id, ...doc.data() });
            });
            setUserOrders(orders);
            localStorage.setItem('userOrders', JSON.stringify(orders));
          });
          return () => querySnapshot();
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();

    // Add listener for changes in local storage
    window.addEventListener('storage', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, [currentUser, db]);

  // Function to handle changes in local storage
  const handleLocalStorageChange = (event) => {
    if (event.key === 'userOrders') {
      setUserOrders(JSON.parse(event.newValue));
    }
  };

  return (
    <div style={{marginBottom:'30vh'}}>
      <h2>Orders</h2>
      {currentUser ? (
        <div>
          {userOrders.length > 0 ? (
            <div>
              {userOrders.map(order => (
                <div key={order.id} style={styles.orderContainer}>
                  <h3>Order ID: {order.id}</h3>
                  <p><strong>User Email:</strong> {order.userEmail}</p>
                  <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
                  <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
                  <p><strong>Location:</strong> {order.location}</p>
                  <p><strong>Items:</strong></p>
                  <ul>
                    {Object.entries(order.items.cart).map(([item, quantity]) => (
                      <li key={item}>{item}: {quantity}</li>
                    ))}
                  </ul>
                  <p><strong>Total Price:</strong> ${order.items.totalPrice.toFixed(2)}</p>
                  <hr style={styles.hr}/>

                </div>
              ))}
            </div>
          ) : (
            <p>No orders found for the current user.</p>
          )}
        </div>
      ) : (
        <p>Please sign in to view orders.</p>
      )}
    </div>
  );
};

const styles = {
  orderContainer: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  hr: {
    margin: '10px 0',
    border: 'none',
    borderBottom: '1px solid #ccc',
  }
};

export default Support;
