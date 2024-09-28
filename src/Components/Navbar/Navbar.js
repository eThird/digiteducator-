import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ scrollToSection }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (section) => {
    // Only call scrollToSection if it's passed as a prop
    if (scrollToSection) {
      scrollToSection(section);
      setMobileMenuOpen(false); // Close mobile menu after clicking a link
    }
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
        <a href="/login" className="button">Login / Register</a>
        <div className="search-icon">
          <img src="/search.png" alt="Search" />
        </div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
