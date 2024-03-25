import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import StarRating from "./StarRating";
import { AiOutlineCheck } from "react-icons/ai";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Fetch existing rating document if it exists
    fetchRatingDocument();
  }, []);

  const handleRate = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add feedback to Firestore
      const feedbackRef = collection(db, "feedback");
      await addDoc(feedbackRef, {
        rating: rating,
        comment: comment,
        timestamp: new Date().toISOString(),
      });

      // Update ratings in Firestore
      await updateRatings();

      // Clear input fields after submitting
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const fetchRatingDocument = async () => {
    try {
      const ratingDocRef = doc(db, "feedback", "rating");
      const ratingDocSnap = await getDoc(ratingDocRef);
      if (ratingDocSnap.exists()) {
        // Document exists, update state with existing ratings
        const ratingData = ratingDocSnap.data();
        // Do something with the existing ratings if needed
      } else {
        // Document doesn't exist, create a new one with initial ratings
        await initializeRatings();
      }
    } catch (error) {
      console.error("Error fetching rating document:", error);
    }
  };

  const initializeRatings = async () => {
    try {
      const ratingDocRef = doc(db, "feedback", "rating");
      await setDoc(ratingDocRef, {
        average: 0,
        total: 0,
        "1-star": 0,
        "2-star": 0,
        "3-star": 0,
        "4-star": 0,
        "5-star": 0,
      });
    } catch (error) {
      console.error("Error initializing rating document:", error);
    }
  };

  const updateRatings = async () => {
    try {
      // Increment the appropriate star rating field manually
      const ratingDocRef = doc(db, "feedback", "rating");
      const ratingDocSnap = await getDoc(ratingDocRef);
      if (ratingDocSnap.exists()) {
        const ratingData = ratingDocSnap.data();
        const updatedRatingField = `${rating}-star`;
        const currentRatingCount = ratingData[updatedRatingField] || 0;

        // Manually increment the current value by 1
        const updatedRatingCount = currentRatingCount + 1;

        // Update the document with the incremented value
        await updateDoc(ratingDocRef, {
          [updatedRatingField]: updatedRatingCount,
          total: ratingData.total + 1,
        });

        // Recalculate average rating
        await calculateAverageRating();
      }
    } catch (error) {
      console.error("Error updating ratings:", error);
    }
  };

  const calculateAverageRating = async () => {
    try {
      const ratingDocRef = doc(db, "feedback", "rating");
      const ratingDocSnap = await getDoc(ratingDocRef);
      if (ratingDocSnap.exists()) {
        const ratingData = ratingDocSnap.data();
        const total = ratingData.total;
        const sum =
          ratingData["1-star"] * 1 +
          ratingData["2-star"] * 2 +
          ratingData["3-star"] * 3 +
          ratingData["4-star"] * 4 +
          ratingData["5-star"] * 5;
        const average = total > 0 ? sum / total : 0;

        // Update average rating in Firestore
        await setDoc(ratingDocRef, { average: average }, { merge: true });
      }
    } catch (error) {
      console.error("Error calculating average rating:", error);
    }
  };

  return (
    <div style={{ marginLeft: "5vh", textAlign: "center" }}>
      What would you like to tell us?
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "5vh", textAlign: "center" }}
      >
        <label>
          <StarRating onRate={handleRate} />
        </label>
        <label style={{ marginLeft: "5vw" }}>
          <span style={{ marginRight: "10px", fontWeight: "bold" }}>
            {" "}
            Comment:{" "}
          </span>
          <br />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ borderRadius: "30px" }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#bb806b",
            color: "white",
            borderColor: "#bb806b",
            borderRadius: "20px",
            marginLeft: "5vw",
            fontWeight: "bold",
            fontSize: "150%",
          }}
        >
          <AiOutlineCheck />
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
