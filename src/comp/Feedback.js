import React, { useState } from "react";
import { addDoc, collection, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (rating > 0) {
        // Increment the rating count for the selected rating
        const ratingsRef = collection(db, "ratings");
        const ratingField = `${rating}-star`; // Field name for the selected rating
        await updateDoc(ratingsRef, { [ratingField]: increment(1) });
        
        // Update the total count and average rating
        await updateDoc(ratingsRef, {
          total: increment(1),
          averageRating: increment(rating)
        });
      }

      // Store feedback in the 'feedbacks' collection anonymously
      const feedbacksRef = collection(db, "feedbacks");
      await addDoc(feedbacksRef, { feedback });

      // Reset the form
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <div>
        <label>Rating: </label>
        <select value={rating} onChange={(e) => handleRatingChange(Number(e.target.value))}>
          <option value={0}>Select Rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>
      <div>
        <label>Feedback: </label>
        <textarea value={feedback} onChange={handleFeedbackChange}></textarea>
      </div>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default FeedbackForm;
