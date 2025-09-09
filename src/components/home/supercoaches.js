import React from 'react';
import './supercoaches.css';

const SuperCoachesSection = () => {
  return (
    <section className="super-coaches-section">
      <a 
        href="https://forms.gle/oLUuAPFHTmJKW6nM9" 
        target="_blank" 
        rel="noopener noreferrer"
        className="waitlist-btn"
      >
        Join SportsCove Waitlist →
      </a>
      
      <p className="waitlist-note">
        Be the first to know when we launch. Early members get exclusive benefits!
      </p>

      <h2 className="super-title">OUR SUPER COACHES</h2>
      <p className="super-description">
        Hand picked Champions, Mentors of the Future. Our Super Coaches are elite athletes and master trainers
        dedicated to unlocking every athlete’s full potential.
      </p>
    </section>
  );
};

export default SuperCoachesSection;
