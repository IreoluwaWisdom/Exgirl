import React from 'react';
import { FaUser, FaUtensils, FaShoppingCart } from 'react-icons/fa'; // Import icons
import Accordion from './Accordion'; // Assume you have an Accordion component

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: 'Step 1: Register for an account',
      content: 'Details about registering for an account...',
    },
    {
      icon: <FaUtensils />,
      title: 'Step 2: Browse the menu',
      content: 'Details about browsing the menu...',
    },
    {
      icon: <FaShoppingCart />,
      title: 'Step 3: Place your order',
      content: 'Details about placing an order...',
    },
    // Add more steps as needed
  ];

  return (
    <div>
      <h2>How it Works</h2>
      <Accordion items={steps} />
    </div>
  );
};

export default HowItWorks;
