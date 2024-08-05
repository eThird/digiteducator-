import React from 'react';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <div className="home-left">
          <h1>Grow up your skills by online courses with Digit Educator</h1>
          <div className="home-left-bottom">
            <button className="explore-path-btn" onClick={() => navigate('/course')}>
              EXPLORE PATH
            </button>
            <div className="reviews">
              <img src="/1k+reviews.png" alt="1k+ Reviews" />
            </div>
          </div>
        </div>
        <div className="home-right">
          <img src="/Studentthumbsup.png" alt="Student Thumbs Up" className="student-img" />
          <div className="student-info">
            <img src="/Calendar.png" alt="Calendar Icon" className="calendar-icon" />
            <span>2k Assisted Student</span>
          </div>
        </div>
      </div>
      <button className="explore-more-btn" onClick={() => navigate('/course')}>
        <img src="/ExploreMore.png" alt="Explore More" />
      </button>
      <div className="social-media-icons">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="/Twitter.png" alt="Twitter" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/Instagram.png" alt="Instagram" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="/LinkedIn.png" alt="LinkedIn" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="/YouTube.png" alt="YouTube" />
        </a>
        <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
          <img src="/Reddit.png" alt="Reddit" />
        </a>
      </div>
    </div>
  );
};

export default Home;
