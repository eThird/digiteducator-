import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ scrollToSection }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

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
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setShowDropdown(false); // Close dropdown on logout
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown
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

        {/* Include the login-register section inside nav-container for mobile view */}
        <div className="login-register-mobile">
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="login-register-button">Student Dashboard</a>
              <a onClick={handleLogout} className="login-register-button">Logout</a>
            </>
          ) : (
            <a href="/login" className="login-register-button">Login / Register</a>
          )}
        </div>
      </div>

      {/* Keep the login-register for desktop view outside */}
      <div className="login-register-desktop">
        {isLoggedIn ? (
          <>
            <img 
              src='./study.png' 
              className='login-register-desktop-icon' 
              alt='login-register-desktop-icon' 
              onClick={toggleDropdown} // Toggle dropdown on click
            />
            {showDropdown && ( // Show dropdown only if toggle is true
              <div className="dropdown-menu">
                <a href="/dashboard" className="login-register-button">Student Dashboard</a>
                <a onClick={handleLogout} className="login-register-button">Logout</a>
              </div>
            )}
          </>
        ) : (
          <a href="/login" className="login-register-button">Login / Register</a>
        )}
      </div>

      <div
        className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
