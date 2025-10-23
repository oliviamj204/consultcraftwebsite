'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsCoveSubmenuOpen, setSportsCoveSubmenuOpen] = useState(false); // NEW STATE
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeAllMenus();
  };

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  
  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setSportsCoveSubmenuOpen(false); // Reset submenu state
  };

  const toggleDropdown = () => { // NEW: Combined dropdown toggling logic
    setDropdownOpen(prev => !prev);
    setSportsCoveSubmenuOpen(false); // Close submenu if main dropdown is closed
  };

  const toggleSportsCoveSubmenu = (e) => { // NEW: Handler for SportsCove click
    e.preventDefault(); // Prevent NavLink from immediately navigating
    setSportsCoveSubmenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setSportsCoveSubmenuOpen(false); // Also close submenu on outside click
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
        <span className="navbar-brand">ConsultCraft</span>
      </div>

      <div className="hamburger" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {mobileMenuOpen && (
        <div className="mobile-overlay">
          <div className="close-btn" onClick={closeAllMenus}>
            <FaTimes />
          </div>
          <ul className="mobile-links">
            <li><NavLink to="/" end onClick={closeAllMenus}>Home</NavLink></li>

            <li className="mobile-parent-link">
              <NavLink to="/products/sportscove" onClick={closeAllMenus}>SportsCove</NavLink>
              <ul className="mobile-sub-menu">
                <li>
                  <NavLink to="/sctribe" onClick={closeAllMenus}>SportsCove Tribe</NavLink>
                </li>
              </ul>
            </li>

            <li><NavLink to="/products/consultcove" onClick={closeAllMenus}>ConsultCove</NavLink></li>
            <li><NavLink to="/about" onClick={closeAllMenus}>About</NavLink></li>
            <li><NavLink to="/insights" onClick={closeAllMenus}>Insights</NavLink></li>
            <li><NavLink to="/contact" onClick={closeAllMenus}>Contact</NavLink></li>
          </ul>
        </div>
      )}

      <ul className="navbar-links">
        <li><NavLink to="/" end className="nav-link" onClick={closeAllMenus}>Home</NavLink></li>
        <li><NavLink to="/about" className="nav-link" onClick={closeAllMenus}>About</NavLink></li>

        <li ref={dropdownRef} className="nav-link dropdown">
          <span
            className="nav-link-text"
            onClick={toggleDropdown} // Use the new toggleDropdown
          >
            Products
          </span>

          {dropdownOpen && (
            <div className="dropdown-menu">
              
              {/* This is the SportsCove link, now with a click handler */}
              <NavLink
                to="/products/sportscove"
                className="dropdown-item-link" // Keep existing class for styling
                onClick={toggleSportsCoveSubmenu} // Use new handler
              >
                SportsCove
              </NavLink>
              
              {/* Render SportsCove Tribe only if sportsCoveSubmenuOpen is true */}
              {sportsCoveSubmenuOpen && (
                <NavLink
                  to="/sctribe"
                  className="dropdown-item nested-sub-item" // NEW CLASS for indentation
                  onClick={closeAllMenus}
                >
                  SportsCove Tribe
                </NavLink>
              )}

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
        
        <li><NavLink to="/insights" className="nav-link" onClick={closeAllMenus}>Insights</NavLink></li>
        <li><NavLink to="/contact" className="nav-link" onClick={closeAllMenus}>Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;