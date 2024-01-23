// src/components/Chatbot.js

import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Initialize Botpress webchat
    window.botpressWebChat.init({
      host: 'https://your-botpress-server-url',
      // Add any other configuration options here
    });
  }, []);

  return <div id="webchat"></div>;
};

export default Chatbot;
