import React from "react";
import "./consultcove.css";
// import logo from "/asset/logo.png"; // Use your logo path here

const ConsultCove = () => {
  return (
    <div className="cc-container">
      {/* <a href="/" className="home-button">Home</a> */}
      <div className="cc-content">
        <img src="/asset/logo.png" alt="ConsultCove Logo" className="cc-logo" />
        <h1 className="coming-soon-text">Launching Soon: Stay Tuned</h1>
      </div>
    </div>
  );
};

export default ConsultCove;
