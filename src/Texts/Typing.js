import React, { useState, useEffect } from 'react';
import '../styles/Typing.css'; // Import CSS for styling the animation

const Typing = () => {
  const [text, setText] = useState('');
  const phrases = ['Hello, World!', 'Welcome to our website.', 'Explore our services.', 'Contact us for more information.'];
  const typingSpeed = 100; // Adjust typing speed as needed
  const backspaceSpeed = 50; // Adjust backspacing speed as needed
  const delay = 1500; // Delay between phrases

  useEffect(() => {
    let currentIndex = 0;
    let currentPhrase = '';
    let isTyping = true;

    const typeText = () => {
      if (isTyping) {
        if (currentIndex < phrases[currentIndex].length) {
          currentPhrase += phrases[currentIndex].charAt(currentPhrase.length);
          setText(currentPhrase);
          setTimeout(typeText, typingSpeed);
        } else {
          isTyping = false;
          setTimeout(backspaceText, delay);
        }
      }
    };

    const backspaceText = () => {
      if (!isTyping) {
        if (currentPhrase.length > 0) {
          currentPhrase = currentPhrase.slice(0, -1);
          setText(currentPhrase);
          setTimeout(backspaceText, backspaceSpeed);
        } else {
          isTyping = true;
          currentIndex = (currentIndex + 1) % phrases.length;
          setTimeout(typeText, typingSpeed);
        }
      }
    };

    typeText();

    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <div className="typing-animation">
      <span>{text}</span>
    </div>
  );
};

export default Typing;