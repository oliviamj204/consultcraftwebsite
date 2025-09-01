'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // <-- 1. Import useNavigate
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // <-- 2. Initialize useNavigate

  // 3. Add the click handler function
  const handleLogoClick = () => {
    navigate("/"); // navigate to home
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    closeAllMenus(); // Also close any open menus
  };

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Logo - 4. Add the onClick event */}
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
        <span className="navbar-brand">ConsultCraft</span>
      </div>

      {/* ... (rest of the component is the same) ... */}

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay">
          <div className="close-btn" onClick={closeAllMenus}>
            <FaTimes />
          </div>
          <ul className="mobile-links">
            <li><NavLink to="/" end onClick={closeAllMenus}>Home</NavLink></li>
            <li><NavLink to="/products/sportscove" onClick={closeAllMenus}>SportsCove</NavLink></li>
            <li><NavLink to="/products/consultcove" onClick={closeAllMenus}>ConsultCove</NavLink></li>
            <li><NavLink to="/about" onClick={closeAllMenus}>About</NavLink></li>
            <li><NavLink to="/sctribe" onClick={closeAllMenus}>SportsCove Tribe</NavLink></li>
            {/* <li><NavLink to="/insights" onClick={closeAllMenus}>Insights</NavLink></li> */}
            <li><NavLink to="/contact" onClick={closeAllMenus}>Contact</NavLink></li>
          </ul>
        </div>
      )}

      {/* Desktop Links */}
      <ul className="navbar-links">
        <li><NavLink to="/" end className="nav-link" onClick={closeAllMenus}>Home</NavLink></li>
        <li><NavLink to="/about" className="nav-link" onClick={closeAllMenus}>About</NavLink></li>

        {/* Products Dropdown */}
        <li ref={dropdownRef} className="nav-link dropdown">
          <span
            className="nav-link-text"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            Products
          </span>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <NavLink
                to="/products/sportscove"
                className="dropdown-item"
                onClick={closeAllMenus}
              >
                SportsCove
              </NavLink>
              <NavLink
                to="/products/consultcove"
                className="dropdown-item"
                onClick={closeAllMenus}
              >
                ConsultCove
              </NavLink>
            </div>
          )}
        </li>

        <li><NavLink to="/sctribe" className="nav-link" onClick={closeAllMenus}>SportsCove Tribe</NavLink></li>
        {/* <li><NavLink to="/insights" className="nav-link" onClick={closeAllMenus}>Insights</NavLink></li> */}
        <li><NavLink to="/contact" className="nav-link" onClick={closeAllMenus}>Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;