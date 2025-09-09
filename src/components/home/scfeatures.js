import React from 'react';
import './scfeatures.css'; // You'll style it here

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="launch-badge">Launching Soon</div>
      <h1 className="main-title">SPORTSCOVE</h1>
      <p className="subtitle">
        The global platform connecting athletes with world-class coaches. Master your sport with personalized training from anywhere in the world.
      </p>

      <div className="features">
        <div className="feature">
          <span className="icon">💡</span>
          <h3>Expert Coaches</h3>
          <p>Connect with certified professionals from around the world</p>
        </div>
        <div className="feature">
          <span className="icon">🗓️</span>
          <h3>Flexible Scheduling</h3>
          <p>Book sessions that fit your schedule, anytime, anywhere</p>
        </div>
        <div className="feature">
          <span className="icon">🏆</span>
          <h3>Proven Results</h3>
          <p>Join thousands who've achieved their sporting goals</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
