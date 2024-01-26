import React, { useState, useEffect } from 'react';
import { FaUser, FaUtensils, FaShoppingCart } from 'react-icons/fa'; // Import icons
import Accordion from './Accordion'; // Assume you have an Accordion component

const HowItWorks = () => {
  const [stepClicked, setStepClicked] = useState([false, false, false]); // State to track step click status
  const [activeStepIndex, setActiveStepIndex] = useState(null); // State to track active step
  const [handPosition, setHandPosition] = useState({ top: 0, left: 0 }); // State to control hand icon position
  const [showHand, setShowHand] = useState(false); // State to control hand icon visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHand(true); // Show hand icon after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, []);

  const handleStepClick = (index) => {
    setStepClicked((prev) => {
      const newState = [...prev];
      newState[index] = true; // Update clicked step
      return newState;
    });
    setShowHand(false); // Hide hand icon when step is clicked
  };

  useEffect(() => {
    if (activeStepIndex !== null) {
      const stepElement = document.getElementById(`step-${activeStepIndex}`);
      if (stepElement) {
        const { offsetTop, offsetLeft, offsetWidth } = stepElement;
        const handLeft = offsetLeft + offsetWidth + 10; // Adjust as needed
        const handTop = offsetTop + 5; // Adjust as needed
        setHandPosition({ top: handTop, left: handLeft });
      }
    }
  }, [activeStepIndex]);

  const steps = [
    {
      icon: <FaUser />,
      title: 'Step 1: Register for an account',
      content: 'Details about registering for an account...',
      clicked: stepClicked[0],
      onClick: () => handleStepClick(0),
    },
    {
      icon: <FaUtensils />,
      title: 'Step 2: Browse the menu',
      content: 'Details about browsing the menu...',
      clicked: stepClicked[1],
      onClick: () => handleStepClick(1),
    },
    {
      icon: <FaShoppingCart />,
      title: 'Step 3: Place your order',
      content: 'Details about placing an order...',
      clicked: stepClicked[2],
      onClick: () => handleStepClick(2),
    },
    // Add more steps as needed
  ];

  return (
    <div className="how-it-works-container">
      <h2>How it Works</h2>
      {showHand && (
        <FaUser
          className="hand-icon"
          style={{ top: handPosition.top, left: handPosition.left }}
        />
      )} {/* Show hand icon */}
      <Accordion items={steps} setActiveStepIndex={setActiveStepIndex} />
    </div>
  );
};

export default HowItWorks;
