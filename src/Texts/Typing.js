import React, { useState, useEffect } from 'react';
import '../styles/TypingAnimation.css'; // Import CSS for styling the animation

const TypingAnimation = () => {
  const [text, setText] = useState('');
  const phrase = 'Hello, World!'; // Change to your desired phrase
  const typingSpeed = 100; // Adjust typing speed as needed
  const backspaceSpeed = 50; // Adjust backspacing speed as needed

  useEffect(() => {
    let currentPhrase = '';
    let isTyping = true;

    const typeText = () => {
      if (isTyping) {
        if (currentPhrase.length < phrase.length) {
          currentPhrase += phrase.charAt(currentPhrase.length);
          setText(currentPhrase);
          setTimeout(typeText, typingSpeed);
        } else {
          isTyping = false;
          setTimeout(backspaceText, 1500); // Delay before backspacing
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
          setTimeout(typeText, typingSpeed); // Restart typing
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

export default TypingAnimation;