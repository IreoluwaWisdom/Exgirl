import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "../styles/FaqComponent.css";
import faqData from "../data/faqData";

const FAQ = () => {
  const [isOpen, setIsOpen] = useState(Array(faqData.length).fill(false)); // State to manage collapsible FAQ items

  // Function to toggle the collapse state of an FAQ item
  const toggleCollapse = (index) => {
    setIsOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="faq-container" style={{ marginBottom: "15vh" }}>
      <h6>Frequently Asked Questions</h6>

      {/* Display all FAQ items */}
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleCollapse(index)}>
            <div>{faq.question}</div>
            <span>{isOpen[index] ? "-" : "+"}</span>
          </div>
          {isOpen[index] && <p>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
