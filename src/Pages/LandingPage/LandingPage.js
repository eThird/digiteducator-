import React from 'react';
import './LandingPage.css'; // Link to CSS
import Navbar from '../../Components/Navbar/Navbar'; // Importing the Navbar

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Navbar /> {/* Adding Navbar at the top */}
      
      {/* Header Section */}
      <div className="header-section">
        <div className="text-content">
          <h1>
            Online <span className="highlight-text">Learning</span> you can access anywhere easily!
          </h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          <div className="cta-container">
            <button className="cta-button">Join Course</button>
            <div className="play-button">
              <img src="/playicon.png" alt="Play Button" />
              <span>See how it works?</span>
            </div>
          </div>
        </div>
        <div className="image-content">
          <img src="/manthumbsup.png" alt="Man thumbs up" />
          <img src="/yellowcircle.png" alt="Yellow Circle" className="yellow-circle" />
          <img src="/orangestar.png" alt="Orange Star" className="orange-star" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">150+ <br /> Total Courses</div>
        <div className="stat-item">250 <br /> Total Instructor</div>
        <div className="stat-item">35K+ <br /> Total Student</div>
      </div>

      {/* Why we are best section */}
      <div className="why-best-section">
        <h2>Why <span className="highlight-text">we are</span> best from others?</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
        <div className="why-cards">
          <div className="why-card">
            <img src="./digitalplatformicon.png" alt="Digital Platform Icon" />
            <h3>Digital Platform</h3>
            <p>Lorem Ipsum is simply dummy text...</p>
          </div>
          <div className="why-card">
            <img src="./optimalicon.png" alt="Optimal Ideation Icon" />
            <h3>Optimal Ideation</h3>
            <p>Lorem Ipsum is simply dummy text...</p>
          </div>
          <div className="why-card">
            <img src="./favourableicon.png" alt="Favorable Setting Icon" />
            <h3>Favorable Setting</h3>
            <p>Lorem Ipsum is simply dummy text...</p>
          </div>
          <div className="why-card">
            <img src="./efffectiveinteractionicon.png" alt="Effective Interaction Icon" />
            <h3>Effective Interaction</h3>
            <p>Lorem Ipsum is simply dummy text...</p>
          </div>
          <div className="why-card">
            <img src="./Flexibletimeicon.png" alt="Flexible Time Icon" />
            <h3>Flexible Time</h3>
            <p>Lorem Ipsum is simply dummy text...</p>
          </div>
          <div className="why-card">
            <img src="./reliableicon.png" alt="Reliable Icon" />
            <h3>Reliable</h3>
            <p>Lorem Ipsum is simply dummy text...</p>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="companies-section">
        <h2>Trusted By The Top 100+ Companies & Universities</h2>
        <div className="company-logos">
          <img src="./Paypalicon.png" alt="PayPal" />
          <img src="./Facebookicon2.png" alt="Facebook" />
          <img src="./Shutterstockicon.png" alt="Shutterstock" />
          <img src="./Slackicon.png" alt="Slack" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
