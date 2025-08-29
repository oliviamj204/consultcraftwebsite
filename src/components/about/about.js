import React from 'react';
import './about.css';
import teamImage from './teamexp.jpg'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TeamCarousel from './teamcarousel';

const About = () => {
  return (
    <div className="about-wrapper">
      {/* About Section */}
      <div className="about-page">
        <h1 className="about-title">ABOUT US</h1>
        <p className="about-description">
          ConsultCraft Inc. is a global tech company building innovative web and mobile platforms that connect people in
          sports, business, and education. Founded in 2024 in Vancouver with operations in India and the U.S., our key
          products–SportsCove© and ConsultCove©–empower talent discovery and expert consulting. We leverage technology to
          bridge digital divides and drive meaningful global impact.
        </p>
      </div>

      {/* Team Experience Section */}
      <div className="team-experience-section">
        <div className="team-text">
          <h2>TEAM EXPERINCE</h2>
          <p>
            Our strength lies in our diverse, world-class team spanning continents with exceptional expertise from
            technology, sports, and business. Our global talent includes UK-educated UX designers and experienced engineers
            in India, strategic guidance from prestigious XLRI and Indian Armed Forces alumni with decades of leadership
            experience, and authentic sports expertise from champions and NCAA athletes to manage our U.S. operations.
          </p>
          <p>
            Leading our multinational company is our CEO, an ex-corporate executive with 9+ years of experience at companies
            like Amazon and Apple Inc., and a certified Lean Six Sigma Master Black Belt with $100+MM budget management
            experience. This unique blend of institutional pedigree, technical innovation, and real-world sports knowledge
            positions us to deliver cutting-edge solutions that truly understand both technology and human connection.
          </p>
        </div>
        <div className="team-image">
          <img src={teamImage} alt="ConsultCraft Team" />
        </div>
      </div>
      {/* Core Values Section */}
<div className="core-values-section">
  <h2 className="core-values-title">CORE VALUES</h2>
  <div className="core-values-grid">
    <div className="core-value-card">
      <div className="core-value-icon">💡</div>
      <div className="core-value-content">
        <h3>Empowering</h3>
        <p>
          We uplift users by equipping them with tools, knowledge, and connections to unlock their potential,
          creating sustainable income for coaches and confidence for learners to excel.
        </p>
      </div>
    </div>

    <div className="core-value-card">
      <div className="core-value-icon">💡</div>
      <div className="core-value-content">
        <h3>Inclusive</h3>
        <p>
          We ensure accessibility for users of all levels, backgrounds, and abilities, breaking barriers of geography,
          cost, and physical limitations through innovative virtual and physical solutions.
        </p>
      </div>
    </div>

    <div className="core-value-card">
      <div className="core-value-icon">💡</div>
      <div className="core-value-content">
        <h3>Approachable</h3>
        <p>
          We make world-class expertise accessible to all, simplifying complex training without compromising the depth
          and quality of professional instruction.
        </p>
      </div>
    </div>

    <div className="core-value-card">
      <div className="core-value-icon">💡</div>
      <div className="core-value-content">
        <h3>Expert-Driven</h3>
        <p>
          We connect users with seasoned professionals worldwide, showcasing authentic expertise and upholding the
          highest standards of instruction and mentorship.
        </p>
      </div>
    </div>
  </div>
</div>
{/* Our Story Section */}
<div className="our-story-section">
  <div className="our-story-text">
    <h2>OUR STORY</h2>
    <p>
      At ConsultCraft Inc., we recognized a fundamental problem in the global coaching industry: despite being worth over $16 billion,
      talented coaches worldwide were trapped by geographical limitations, losing up to 40% of their earnings to middlemen, and struggling
      to scale beyond their local reach. We knew there had to be a better way.
    </p>
    <p>
      Founded with the mission to democratize coaching and unlock human potential globally, ConsultCraft Inc. emerged from a simple yet
      powerful belief: expertise should know no boundaries. We watched brilliant coaches limited by location, exceptional athletes unable
      to access the best training, and passionate fitness professionals struggling to turn their skills into sustainable careers.
    </p>
    <p>That's when SportsCove was born!</p>
  </div>

  <div className="our-story-image">
    <img src={require('./ourstry.jpg')} alt="SportsCove" />

  </div>
</div>
<div className="vision-mission-section">
  {/* Top Row */}
  <div className="vision-image">
    <img src={require('./vision.jpg')} alt="Vision" />
  </div>
  <div className="vision-text">
    <h2>OUR VISION</h2>
    <p>
      To be a global leader in innovative and ethical technology, pioneering the seamless integration of virtual and physical experiences
      that transform how the world learns, trains, and excels in sports and business. We envision a future where every professional can build
      sustainable careers through their expertise, while every enthusiast regardless of background or ability has access to world-class training
      and mentorship that transcends all boundaries.
    </p>
  </div>

  {/* Bottom Row */}
  <div className="mission-text">
    <h2>OUR MISSION</h2>
    <p>
      Our mission is to empower professionals to monetize their expertise through coaching, content creation, and sponsorships, while enabling
      enthusiasts and learners to access quality training from a diverse selection of providers anywhere, anytime, and through any medium.
      We bridge virtual and physical training experiences, fostering financial stability and growth for sports and business professionals
      worldwide while democratizing access to elite-level instruction and inspiration.
    </p>
  </div>
  <div className="mission-image">
    <img src={require('./mission.avif')} alt="Mission" />
  </div>
</div>
<TeamCarousel />
    </div>
  );
};

export default About;
