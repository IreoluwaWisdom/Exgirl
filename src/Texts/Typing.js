import React, { useState, useEffect } from 'react';
import '../styles/Typing.css'; // Import CSS for styling the animation

const Typing = ({phrase}) => {
  const [text, setText] = useState('');
  // Change to your desired phrase
  const typingSpeed = 500; // Adjust typing speed as needed
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
          setTimeout(backspaceText, 9000); // Delay before backspacing
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
    <div style={{height:'4vh', textAlign:'center'}}>
    <div className="typing-animation">
      <span>{text}</span>
      
    </div>
    </div>
  );
};

export default Typing;