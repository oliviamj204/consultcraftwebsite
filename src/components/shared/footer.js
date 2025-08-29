'use client';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import Link
import './footer.css';
import { FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // navigate to home
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Left Section */}
        <div className="footer-section left">
 <div className="logo-section">
      <div className="logo-link" onClick={handleLogoClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div className="logo-icon">
          <img src="/asset/logo.png" alt="ConsultCraft Logo" />
        </div>
        <h2 className="company-name">ConsultCraft Inc</h2>
      </div>
    </div>

          <div className="contact-info">
            <div className="email-section">
              <svg className="email-icon" width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M18 0H2C0.9 0 0 0.9 0 2v12c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V2c0-1.1-0.9-2-2-2zM18 4l-8 5L2 4V2l8 5 8-5v2z" fill="white" />
              </svg>
              <span className="email">info@consultcraftinc.com</span>
            </div>
          </div>

          <div className="socials-section">
            <span className="socials-label">Socials</span>
            <div className="footer-socials">
  <a 
    href="https://www.youtube.com/@consultcraftinc" 
    className="footer-social-icon youtube" 
    aria-label="YouTube" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaYoutube />
  </a>

  <a 
    href="https://www.instagram.com/consultcraft.inc/" 
    className="footer-social-icon instagram" 
    aria-label="Instagram" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaInstagram />
  </a>

  <a 
    href="https://www.linkedin.com/company/consultcraft-inc/posts/?feedView=all" 
    className="footer-social-icon linkedin" 
    aria-label="LinkedIn" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaLinkedin />
  </a>
</div>

          </div>
        </div>

        {/* Center Section */}
        <div className="footer-section center">
          <h3 className="footer-heading">Links</h3>
          <ul className="footer-links">
            <li><Link to="/"onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
            <li><Link to="/about"onClick={() => window.scrollTo(0, 0)}>About</Link></li>
            <li><Link to="/products/sportscove"onClick={() => window.scrollTo(0, 0)}>Products</Link></li>
            <li><Link to="/contact"onClick={() => window.scrollTo(0, 0)}>Contact</Link></li>
            <li><Link to="/termscondition"onClick={() => window.scrollTo(0, 0)}>T&C</Link></li>
            <li><Link to="/privacypolicy"onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
          </ul>
          <div className="footer-bottom">
            ConsultCraft Inc © 2024–2025 All Rights Reserved
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-section right">
          <h3 className="footer-heading">Mailing Address</h3>
          <p className="footer-address">
            <img src="/asset/destination.png" alt="Location" className="location-icon" />
            US - 4520 W Oakeller Avenue Tampa, FL 33611 Suite #13348
          </p>
          <p className="footer-address">
            <img src="/asset/destination.png" alt="Location" className="location-icon" />
            Canada - PO Box 73553, Vancouver RPO Downtown, BC, V6E 4L9, Canada
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
