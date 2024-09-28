import React from 'react';
import './Footer.css';
import Socialmedialinks_coloured from '../../Components/Socialmedia/Socialmedialinks_coloured';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section footer-brand">
        <img src="https://www.digiteducator.com/Digiteducator%20Logo%20Website.png" alt="Byway Logo" className="footer-logo" />
        <p1 className="footer-text">
          Empowering learners through accessible and engaging online education.
          <br />
          Byway is a leading online learning platform dedicated to providing high-quality, flexible, and affordable educational experiences.
        </p1>
      </div>
      
      <div className="footer-section">
        <h3>Get Help</h3>
        <ul>
          <li>Contact Us</li>
          <li>Latest Articles</li>
          <li>FAQ</li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Top Categories</h3>
        <ul>
          <li>Art & Design</li>
          <li>Business</li>
          <li>IT & Software</li>
          <li>Languages</li>
          <li>Programming</li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Contact Us</h3>
        <address>
          Address: 123 Main Street, Anytown, CA 12345 <br />
          Tel: +1(123) 456-7890 <br />
          Mail: bywayedu@webkul.in
        </address>
        <Socialmedialinks_coloured/>
      </div>
    </footer>
  );
};

export default Footer;
