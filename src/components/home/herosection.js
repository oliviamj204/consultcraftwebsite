import React from 'react';
import { ReactTyped } from 'react-typed';
import './herosection.css';
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero">
        <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="/moving-star.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

       <div className="overlay"></div>



      <div className="hero-content">
      <h1 className="typed-text">
        Learn&nbsp;
        <ReactTyped
          strings={[
        "<span class='highlight'>Anything,</span>",
        "<span class='highlight'>Anytime,</span>",
        "<span class='highlight'>from Anyone</span>"
      ]}
          typeSpeed={50}
          backSpeed={30}
          loop
        />
      </h1>
      <p className='hero-subtext'>
        ConsultCraft bridges the gap between knowledge seekers and experts
        through our innovative platforms for sports and consulting.
      </p>
      <div className="hero-buttons">
  <Link to="/products/sportscove" className="btn">Explore SportsCove →</Link>
  <Link to="/products/consultcove" className="btn">Learn About ConsultCove</Link>
</div>

      </div>
    </section>
  );
};

export default HeroSection;
