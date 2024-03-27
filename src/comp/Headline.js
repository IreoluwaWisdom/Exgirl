import React from "react";
import tag from "../assets/tag.png";

const Headline = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vw",
        backgroundImage: `url(${tag})`,
        backgroundSize: "cover",
        color: "white",
        marginBottom: "5vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0 , 0, 0.5)",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            lineHeight: "1.2em",
            width: "100vw",
            textAlign: "",
          }}
        >
          Explore THE EXECUTIVES{" "}
        </div>

        <div style={{ fontSize: "20px", lineHeight: "1.5em", color: "white" }}>
          Get a taste that is beyond your past! Delight your senses and leave
          you craving for more, like a devoted ex!
        </div>
      </div>
    </div>
  );
};
export default Headline;
