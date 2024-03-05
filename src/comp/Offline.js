import React, { useState, useEffect } from "react";
// import './OfflineAlert.css'; // Import CSS file for styling

const OfflineAlert = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsSlowConnection(false); // Reset slow connection flag on online event
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const connectionTestImage = new Image();
    connectionTestImage.onload = () => {
      setIsSlowConnection(false); // Reset slow connection flag on successful image load
    };
    connectionTestImage.onerror = () => {
      setIsSlowConnection(true); // Set slow connection flag on image load error
    };
    connectionTestImage.src = require("../assets/jollof-rice.jpg");
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    (!isOnline || isSlowConnection) && (
      <div
        className={`offline-alert ${isSlowConnection ? "slow-connection" : ""}`}
      >
        {isSlowConnection
          ? "Slow internet connection."
          : "No internet connection."}
      </div>
    )
  );
};

export default OfflineAlert;
