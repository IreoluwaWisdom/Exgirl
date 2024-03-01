import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "../styles/FaqComponent.css";

const FaqComponent = ({ faqData }) => {
  const [isOpen, setIsOpen] = useState(Array(3).fill(false)); // Show only 3 FAQ items initially

  // Function to toggle the collapse state of an FAQ item
  const toggleCollapse = (index) => {
    setIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="faq-container">
      <h6>FAQs</h6>

      {/* Display limited number of FAQ items initially */}
      {faqData.slice(0, 2).map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleCollapse(index)}>
            <div>{faq.question}</div>
            <span>{isOpen[index] ? "-" : "+"}</span>
          </div>
          {isOpen[index] && <p>{faq.answer}</p>}
        </div>
      ))}

      {/* "See More" link to redirect to FAQ page */}
      <Link to="/faq" className="see-more-link" style={{ color: "black" }}>
        See More
      </Link>
    </div>
  );
};

export default FaqComponent;
