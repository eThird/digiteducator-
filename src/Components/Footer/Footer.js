import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo-title">
            <img src={`${process.env.PUBLIC_URL}/DE-logo.png`} alt="Digit Educator Logo" className="footer-logo" />
            <h2 className="footer-title">Digit Educator</h2>
          </div>
          <div className="footer-address">
            
            <p>Address: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Tel: +92 2934 1037</p>
            <p>Response hours: 8 to 20</p>
            <p>Email: info@onlearn.com</p>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-categories-links">
            <div className="footer-categories">
              <h3>Categories</h3>
              <ul>
                <li>Counseling</li>
                <li>Health and fitness</li>
                <li>Individual development</li>
                <li>more</li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Links</h3>
              <ul>
                <li>About us</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
