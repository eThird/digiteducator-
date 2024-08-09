import React, { useRef } from 'react';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Coursepage from '../Course/Coursepage';

const Home = () => {
  const coursePageRef = useRef(null);

  const handleExploreMoreClick = () => {
    coursePageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <Navbar />
        <div className='home-elements'>
          <div className="home-left">
            <h1>Grow up your skills by online courses with Digit Educator</h1>
            <div className="home-left-bottom">
              <button className="explore-path-btn">
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
              <img src="/Calander.png" alt="Calendar Icon" className="calendar-icon" />
              <span>2k Assisted Student</span>
            </div>
            <img src="/graph.png" alt="Graph Icon" className="graph-icon" />
          </div>
        </div>
      </div>

      <button className="explore-more-btn" onClick={handleExploreMoreClick}>
        <img src="/ExploreMore.png" alt="Explore More" />
      </button>

      <div className="social-media-icons">
        <a href="https://x.com/DigitEducator" target="_blank" rel="noopener noreferrer">
          <img src="/Twitter.png" alt="Twitter" />
        </a>
        <a href="https://www.instagram.com/digiteducator/" target="_blank" rel="noopener noreferrer">
          <img src="/Instagram.png" alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/company/digiteducator/" target="_blank" rel="noopener noreferrer">
          <img src="/LinkedIn.png" alt="LinkedIn" />
        </a>
        <a href="https://www.youtube.com/@DigitEducator" target="_blank" rel="noopener noreferrer">
          <img src="/YouTube.png" alt="YouTube" />
        </a>
        <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
          <img src="/Reddit.png" alt="Reddit" />
        </a>
      </div>

      <div ref={coursePageRef}>
        <Coursepage />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
