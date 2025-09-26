import React from 'react';
import './scfeatures.css'; // You'll style it here

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="launch-badge">Launching in Oct 2025</div>
      <h1 className="main-title">SPORTSCOVE</h1>
      <p className="subtitle">
        The global platform connecting athletes and learners with world-class coaches. Master any sport or wellness activities with personalized training from any coach or supercoach around the world.
      </p>

      <div className="features">
        <div className="feature">
          <span className="icon">💡</span>
          <h3>Expert Coaches/SuperCoaches</h3>
          <p>Connect with certified sports and wellness professionals from around the world</p>
        </div>
        <div className="feature">
          <span className="icon">🗓️</span>
          <h3>Flexible Scheduling</h3>
          <p>Book sessions that fit your schedule, anytime, anywhere, with anyone</p>
        </div>
        <div className="feature">
          <span className="icon">🏆</span>
          <h3>Proven Results</h3>
          <p>Join our growing SportsCove Tribe Community who've achieved their sporting goals</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
