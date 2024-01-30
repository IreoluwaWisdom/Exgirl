import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUtensils, FaShoppingCart } from 'react-icons/fa';
import Accordion from './Accordion';
import '../styles/HowItWorks.css';
import SignUpButton from '../Buttons/SignUpButton';
import SignInButton from '../Buttons/SignInButton';

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
      title: 'Register for an account',
      content: (
        <div className="step-content">
          <SignUpButton />
          <span className="or-divider">OR</span>
          <SignInButton />
        </div>
      ),
      clicked: stepClicked[0],
      onClick: () => handleStepClick(0),
    },
    {
      icon: <FaUtensils />,
      title: 'Browse the menu',
      content: (
        <div className="step-content">
          <button className="menu-button">
            <Link to="/menu" className="menu-link">Menu</Link>
          </button>
        </div>
      ),
      clicked: stepClicked[1],
      onClick: () => handleStepClick(1),
    },
    {
      icon: <FaShoppingCart />,
      title: 'Checkout your cart',
      content: (
        <div className="step-content">
          <button className="cart-button">
            <Link to="/cart" className="cart-link">Head to cart</Link>
          </button>
        </div>
      ),
      clicked: stepClicked[2],
      onClick: () => handleStepClick(2),
    },
  ];

  return (
    <div className="how-it-works-container">
      <h2 className="heading">How it Works</h2>
      <Accordion items={steps} setActiveStepIndex={setActiveStepIndex} />
    </div>
  );
};

export default HowItWorks;