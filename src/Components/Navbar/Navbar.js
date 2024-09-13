import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src="/DE-logo.png" alt="DigitEducator Logo" />
        <span>DigitEducator</span>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#blog">Blog</a></li>
        <li className="dropdown">
          <a href="#pages" className="dropbtn">Pages</a>
          <div className="dropdown-content">
            <a href="#page1">Page 1 (add link here)</a>
            <a href="#page2">Page 2 (add link here)</a>
            <a href="#page3">Page 3 (add link here)</a>
          </div>
        </li>
        <li><a href="#login">Login / Register</a></li>
        <li className="search-icon">
          <img src="/search.png" alt="Search" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
