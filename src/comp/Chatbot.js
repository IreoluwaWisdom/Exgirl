import React, { useEffect } from "react";
import "../styles/Chatbot.css";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: "473b2829-7ad8-4efe-8113-4bf30e724f93",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "473b2829-7ad8-4efe-8113-4bf30e724f93",
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
