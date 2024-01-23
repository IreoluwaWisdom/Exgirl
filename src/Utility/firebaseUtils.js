// firebaseUtils.js
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, collection, setDoc } from 'firebase/firestore';

export const updateFirestoreCart = async (userId, cart) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      // Handle the case where the user is not authenticated
      console.error('User not authenticated');
      return;
    }

    const db = getFirestore();
    const userCartRef = doc(collection(db, 'carts'), userId);

    // Update Firestore document with the new cart data
    await setDoc(userCartRef, { cart }, { merge: true });

    console.log('Firestore cart updated successfully');
  } catch (error) {
    console.error('Error updating Firestore cart:', error);
  }
};
