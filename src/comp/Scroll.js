import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisibility);

  const iconStyle = {
    filter:
      "drop-shadow(2px 2px 4px #6a0dad) " /* Apply shadow effect */ +
      "drop-shadow(-2px -2px 4px #fffdd0) " /* Additional shadow layer with red color */ +
      "drop-shadow(2px -2px 4px blue)" /* Additional shadow layer with blue color */ +
      "drop-shadow(2px -2px 4px yellow)" /* Additional shadow layer with yellow color */,
    borderRadius: "30px",
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    fontSize: "120%",
    color: "#6a0dad",
    zIndex: "300",
  };

  return (
    <div
      className="scroll-to-top"
      style={{ position: "fixed", bottom: "12vh", left: "45vw" }}
    >
      {isVisible && (
        <div
          onClick={scrollToTop}
          style={iconStyle} /* Apply combined icon styles */
          className="scroll-to-top-button"
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
