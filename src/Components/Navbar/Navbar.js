import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ scrollToSection }) => {
  // State to track if the student is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (section) => {
    if (scrollToSection) {
      scrollToSection(section);
      setMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  const handleLogout = () => {
    // Logic for logging out the student can go here
    setIsLoggedIn(false);
    // You can also clear local storage or session info here if needed
  };

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <a href="/LandingPage">
          <img
            src="https://www.digiteducator.com/Digiteducator%20Logo%20Website.png"
            alt="DigitEducator Logo"
          />
        </a>
      </div>
      <div className={`nav-container ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><a onClick={() => handleNavLinkClick('home')}>Home</a></li>
          <li><a onClick={() => handleNavLinkClick('course-section')}>Courses</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a onClick={() => handleNavLinkClick('about')}>About</a></li>
        </ul>
      </div>
      <div className="login-register">
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <>
            <a href="/dashboard" className="button">Student Dashboard</a>
            <a onClick={handleLogout} className="button">Logout</a>
          </>
        ) : (
          <a href="/login" className="button">Login / Register</a>
        )}
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
