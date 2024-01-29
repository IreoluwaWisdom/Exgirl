import React, { useState, useEffect } from 'react';
import { FaUser, FaUtensils, FaShoppingCart } from 'react-icons/fa';
import Accordion from './Accordion';
import '../styles/HowItWorks.css'; // Import your CSS file for styling

const HowItWorks = () => {
  const [stepClicked, setStepClicked] = useState([false, false, false]);
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [handPosition, setHandPosition] = useState({ top: 0, left: 0 });
  const [showHand, setShowHand] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHand(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStepClick = (index) => {
    setStepClicked((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    setShowHand(false);
  };

  useEffect(() => {
    if (activeStepIndex !== null) {
      const stepElement = document.getElementById(`step-${activeStepIndex}`);
      if (stepElement) {
        const { offsetTop, offsetLeft, offsetWidth } = stepElement;
        const handLeft = offsetLeft + offsetWidth + 10;
        const handTop = offsetTop + 5;
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
  ];

  return (
    <div className="how-it-works-container">
      <h2 className="heading">How it Works</h2>
      {showHand && (
        <FaUser
          className="hand-icon"
          style={{ top: handPosition.top, left: handPosition.left }}
        />
      )}
      <Accordion items={steps} setActiveStepIndex={setActiveStepIndex} />
    </div>
  );
};

export default HowItWorks;
