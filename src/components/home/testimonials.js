'use client';

import React, { useState } from 'react';
import './testimonials.css';

const testimonials = [
  {
    name: "Animish",
    title: "Muay Thai Coach",
    location: "Mumbai, India",
    text: "I coach 15 hours a week on my schedule. SportsCove’s marketing tools got me featured as a ‘Super Coach’ in 3 months!",
    rating: 5
  },
  {
    name: "Melissa",
    title: "Learner",
    location: "Tampa, USA",
    text: "Finding a $25/hour skilled yoga coach from India was a blessing. I've improved more in 3 months than 2 years of local coaching.",
    rating: 5
  },
  {
    name: "Jennifer",
    title: "Working Mom",
    location: "Seattle, USA",
    text: "The flexibility is unmatched. I do yoga during lunch breaks with a Vancouver coach who tailors each 60-minute session to my needs.",
    rating: 5
  },
  {
    name: "Rohan",
    title: "College Student",
    location: "Delhi, India",
    text: "Learning cricket from a former Leagues player in the U.S was once a dream, now I'm college team captain, thanks to SportsCove!",
    rating: 5
  },
  {
    name: "Sam",
    title: "KickBoxing Coach",
    location: "Kerala, India",
    text: "I coached just 15 students locally, now I teach kids from Canada, Australia & the UK! I'm on track to triple my income in 6 months.",
    rating: 5
  }
];

const TestimonialsTicker = () => {
  const [paused, setPaused] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`star ${i < rating ? 'filled' : 'empty'}`}
      >
        ★
      </span>
    ));
  };

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">WHAT OUR USERS ARE SAYING</h2>
      <div className="ticker-wrapper">
        <div
          className={`ticker ${paused ? 'paused' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Duplicate testimonials to create infinite scroll effect */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-header">
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-title">
                  {testimonial.title}<br />
                  {testimonial.location}
                </p>
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div
                className="testimonial-rating"
                aria-label={`Rated ${testimonial.rating} out of 5`}
              >
                {renderStars(testimonial.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsTicker;
