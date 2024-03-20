import React, { useState } from "react";

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "3vh" }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          style={{
            cursor: "pointer",
            color: value <= rating ? "#6a0dad" : "gray",
            fontSize: "150%",
            borderColor: "#bb806b",
            borderWidth: "105px",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
