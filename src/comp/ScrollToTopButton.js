import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "../styles/ScrollToTopButton.css"; // Import CSS file for styling

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show scroll-to-top button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button className="scroll-to-top-button" onClick={scrollToTop}>
          <FaArrowCircleUp className="arrow-icon" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
