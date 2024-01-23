// Accordion.js
import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className={`accordion-item ${index === activeIndex ? 'active' : ''}`}>
          <div className="accordion-title" onClick={() => toggleAccordion(index)}>
            <div className="accordion-icon">{item.icon}</div>
            <h3>{item.title}</h3>
          </div>
          <div className="accordion-content">{index === activeIndex && <p>{item.content}</p>}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
