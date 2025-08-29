import React from 'react';
import "./sportscove.css"; 
// import sportsCoveVideo from '/asset/SportsCove Intro Video.mp4'; // Import video file
import TailoredRoles from './tailoredroles';

export default function Sportscove() {
  return (
    <div>
      {/* Background image */}
      <section className="sportscove-hero"></section>

      {/* Info section */}
      <section className="sportsCove-info">
        <h2>WHAT IS SPORTSCOVE ?</h2>
        <div className="sportsCove-card">
          <p>
            <strong>SportsCove</strong> is a Marketplace App and Platform that
            unifies the global sports and wellness industry in a single
            destination, addressing the many challenges faced by athletes,
            coaches, parents, and sports organizations across different
            countries.
          </p>
          <p>
            With <strong>SportsCove</strong>, sports professionals can monetize
            their expertise through coaching, content creation and sponsorships.
            Meanwhile, sports enthusiasts and learners can access quality
            training from a wide selection of providers – fostering financial
            stability and growth for sports professionals worldwide.
          </p>
        </div>
      </section>

      {/* Section: How SportsCove Works */}
      <section className="sc-steps-section">
        <h2 className="sc-steps-title">HOW SPORTSCOVE WORKS</h2>
        <div className="sc-steps-container">
          
          {/* Left side */}
          <div className="sc-steps-left">
            <div className="sc-step">
              <h3 className="step-title">
                <span className="step-number step-1">01</span> Find your Perfect Coach
              </h3>
              <p>
                Browse from a wide range of Super and Regular coaches by sport,
                experience, location (soon), and your own budget.
              </p>
            </div>

            <div className="sc-step">
              <h3 className="step-title">
                <span className="step-number step-2">02</span> Book with Ease
              </h3>
              <p>
                Schedule sports and wellness coaching sessions with just a few clicks: anytime, anywhere. Scheduling, payments, notifications and alerts all integrated for convenience.
              </p>
            </div>

            <div className="sc-step">
              <h3 className="step-title">
                <span className="step-number step-3">03</span> Track your Growth
              </h3>
              <p>
                Monitor your progress, receive personalized feedback, and stay motivated with post-session follow-ups that complete the learning journey.
              </p>
            </div>
          </div>

          {/* Right side - video */}
         {/* Right side - video */}
<div className="sc-steps-right">
  <video className="sc-video" controls>
    <source src="/asset/SportsCove Intro Video.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
        </div>
      </section>

      {/* {see what you can do with sportscove section} */}
      <section className="sc-feature-section">
      <h2 className="sc-feature-title">
        See what you can do with SportsCove.
      </h2>

      <div className="sc-feature-card">
        {/* Left Side */}
        <div className="sc-feature-left">
          <div className="sc-feature-number">01</div>
          <h3 className="sc-feature-heading">
            Coaches Marketplace & <br /> Profiles to Discover
          </h3>
          <p className="sc-feature-description">
            Discover a vibrant marketplace designed exclusively for athletes,
            learners, and sports enthusiasts to find the right coach based on
            expertise, location, and passion. All within their own budget and
            learning curve.
          </p>
          
        </div>

        {/* Right Side */}
        <div className="sc-feature-right">
          <img src="/asset/01.avif" alt="SportsCove Feature" />
        </div>
      </div>

      <div className="sc-feature-card">
        {/* Left Side */}
        <div className="sc-feature-left">
          <div className="sc-feature-number">02</div>
          <h3 className="sc-feature-heading">
            Coach Availability &  <br /> Session Booking System
          </h3>
          <p className="sc-feature-description">
            Users can discover and connect with coaches, enabling them to view availability, price and book sessions directly within seconds, making the experience seamless and complete for both sides.
          </p>
          
        </div>

        {/* Right Side */}
        <div className="sc-feature-right">
          <img src="/asset/02.avif" alt="SportsCove Feature" />
        </div>
      </div>

      <div className="sc-feature-card">
        {/* Left Side */}
        <div className="sc-feature-left">
          <div className="sc-feature-number">03</div>
          <h3 className="sc-feature-heading">
            Post-Session Feedback & <br /> Personalized Task System
          </h3>
          <p className="sc-feature-description">
            Keep progressing even after the session ends with coaches assignments and tasks which cover personalized practices, timely reminders, and a space for reflection. This helps learners stay engaged, track their development, and build consistency between sessions.
          </p>
          
        </div>

        {/* Right Side */}
        <div className="sc-feature-right">
          <img src="/asset/03.avif" alt="SportsCove Feature" />
        </div>
      </div>

      <div className="sc-feature-card">
        {/* Left Side */}
        <div className="sc-feature-left">
          <div className="sc-feature-number">04</div>
          <h3 className="sc-feature-heading">
            Multi-Sport Learning <br /> Experience
          </h3>
          <p className="sc-feature-description">
            Learners can explore and train in multiple sports simultaneously, guided by their favorite coaches—all within one platform. This flexibility encourages diverse skill development and keeps motivation high through personalized, coach-led journeys.
          </p>
          
        </div>

        {/* Right Side */}
        <div className="sc-feature-right">
          <img src="/asset/04.avif" alt="SportsCove Feature" />
        </div>
      </div>
    </section>
    <TailoredRoles />
    </div>
  );
}
