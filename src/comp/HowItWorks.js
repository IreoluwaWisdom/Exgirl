import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { FaUser, FaUtensils, FaShoppingCart } from 'react-icons/fa';
import Accordion from './Accordion';
import '../styles/HowItWorks.css'; 
import SignUpButton from '../Buttons/SignUpButton';
import SignInButton from '../Buttons/SignInButton';
// Import your CSS file for styling

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
      title: ' Register for an account',
      content: ( <div style={{marginLeft:'10vw', display: 'flex', textAlign:'center' }}>
  <SignUpButton />
  <span style={{ color: '#6A0DAD', margin: '0 10px' }}>&nbsp;OR&nbsp;</span>
  <SignInButton />
</div>),
      clicked: stepClicked[0],
      onClick: () => handleStepClick(0),
    },
    {
      icon: <FaUtensils />,
      title: (<div> Browse the menu</div>),
      content: (<div > <button style ={{backgroundColor:'#6a0dad', borderColor :'#6a0dad'}}> <Link to = '/menu' style ={{textDecoration:'none', color :'white'}}> Menu</Link></button></div>),
      clicked: stepClicked[1],
      onClick: () => handleStepClick(1),
    },
    {
      icon: <FaShoppingCart />,
      title: ' Checkout your cart',
      content: (<div > <button style ={{backgroundColor:'#6a0dad', borderColor :'#6a0dad'}}> <Link to = '/cart' style ={{textDecoration:'none', color :'white'}}> Head to cart</Link></button></div>),
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
