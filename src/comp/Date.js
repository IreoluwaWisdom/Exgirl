import React, { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Europe/Paris",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Europe/Paris",
    };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <div style={{ marginBottom: "6vh" }}>
      <h5
        style={{
          textAlign: "left",
          fontSize: "100%",
          marginLeft: "0px",
        }}
      >
        {formatDate(currentDateTime)}
      </h5>
      <h5 style={{ textAlign: "left", fontSize: "100%" }}>
        {formatTime(currentDateTime)}
      </h5>
    </div>
  );
};

export default DateTimeDisplay;
