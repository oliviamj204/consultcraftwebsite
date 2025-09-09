import React from 'react';
import './consultcove.css';

const ConsultCoveSection = () => {
  return (
    <div className="consultcove-section">
      {/* Centered top content */}
      <div className="consultcove-intro">
        <div className="coming-soon">Coming Soon</div>
        <h1 className="consultcove-title">CONSULTCOVE</h1>
        <p className="consultcove-subtitle">
          The future of professional consulting. Connect with industry experts across all fields
          for personalized guidance and strategic insights.
        </p>
      </div>

      {/* Side-by-side content */}
      <div className="consultcove-content">
        <div className="consultcove-text">
          <h2 className="consultcove-heading">Tranforming The Consulting World</h2>
          <p className="consultcove-paragraph">
            ConsultCove will transform how businesses and individuals access expert and freelance
            consulting services. Our platform will connect you with verified consultants and
            experts across every industry and expertise area you can imagine!
          </p>
          <ul className="consultcove-list">
            <li>Expert consultants available across all industries</li>
            <li>Secure, confidential consultation and collaboration environment</li>
            <li>Flexible Scheduling and pricing models</li>
            <li>AI-powered consultant matching and session assistance</li>
            <li>Quality Assurance and satisfaction guaranteed</li>
          </ul>

          {/* Buttons */}
          <div className="consultcove-buttons">
            <a
              href="/products/consultcove"
              target="_blank"
              rel="noopener noreferrer"
              className="consultcove-btn"
            >
              Learn More
            </a>
            <a
              href="https://forms.gle/ZXrV4KpEVZwbu4hR6"
              target="_blank"
              rel="noopener noreferrer"
              className="consultcove-btn"
            >
              Get Early Access
            </a>
          </div>
        </div>

        <div className="consultcove-image">
          <img src="/asset/cc.avif" alt="ConsultCove App Preview" />
        </div>
      </div>
    </div>
  );
};

export default ConsultCoveSection;
