'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.png';

const Navbar = () => {
  // State for managing the desktop dropdown and the mobile menu visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to detect clicks outside the dropdown
  const navigate = useNavigate();

  // Handler for the logo click: navigates to home and scrolls to top
  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeAllMenus(); // Close any open menus on navigation
  };

  // Toggles the mobile menu open/closed
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  
  // Closes all menus, useful when a link is clicked
  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  // Effect to close the desktop dropdown if a click occurs outside of it
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
      {/* Logo and Brand Name */}
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
        <span className="navbar-brand">ConsultCraft</span>
      </div>

      {/* Hamburger Icon for Mobile View */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Full-screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay">
          <div className="close-btn" onClick={closeAllMenus}>
            <FaTimes />
          </div>
          <ul className="mobile-links">
            <li><NavLink to="/" end onClick={closeAllMenus}>Home</NavLink></li>

            {/* Parent link for SportsCove */}
            <li className="mobile-parent-link">
              <NavLink to="/products/sportscove" onClick={closeAllMenus}>SportsCove</NavLink>
              {/* Nested Sub-menu for SportsCove Tribe */}
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

      {/* Desktop Navigation Links */}
      <ul className="navbar-links">
        <li><NavLink to="/" end className="nav-link" onClick={closeAllMenus}>Home</NavLink></li>
        <li><NavLink to="/about" className="nav-link" onClick={closeAllMenus}>About</NavLink></li>

        {/* Desktop Products Dropdown */}
        <li ref={dropdownRef} className="nav-link dropdown">
          <span
            className="nav-link-text"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            Products
          </span>

          {/* Conditionally rendered dropdown menu */}
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
        <li><NavLink to="/insights" className="nav-link" onClick={closeAllMenus}>Insights</NavLink></li>
        {/* <li><NavLink to="/beacoach" className="nav-link" onClick={closeAllMenus}>Be a Coach</NavLink></li> */}
        <li><NavLink to="/contact" className="nav-link" onClick={closeAllMenus}>Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;