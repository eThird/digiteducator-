import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Link to CSS
import Navbar from '../../Components/Navbar/Navbar'; // Importing the Navbar
import DisplayCategory from '../../Components/DisplayCategory/DisplayCategory';
import FeaturedCourses from '../../Components/FeaturedCourses/FeaturedCourses';
import Footer from '../../Components/Footer/Footer';
import AboutCompany from '../../Components/AboutCompany/AboutCompany';
import StudentFeedback from '../../Components/StudentFeedback/StudentFeedback';

const LandingPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    // Add your course data here. Example:
    { id: 1, title: 'React for Beginners' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'CSS Grid Masterclass' }
    // Add more courses as necessary
  ]);

  // Handle course search functionality
  const handleSearch = (query) => {
    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setCourses(filteredCourses);
  };

  // Join Course Handler
  const handleJoinCourse = () => {
    navigate('/courses'); // Replace with the actual path of your courses page
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100; // Adjust this value as needed
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="landing-container">
      <Navbar scrollToSection={scrollToSection} onSearch={handleSearch} />

      {/* Header Section */}
      <div className="header-section" id="home">
        <div className="text-content">
          <h1>
            <span className="regular-text">Worlds</span> <span className="highlight-text">Most</span><br />
            <span className="blue-bold-text">Actionable</span><span className="regular-text"> career</span><br />
            <span className="regular-text">development courses</span>
          </h1>
          <p>Don't just learn, experience. Don't just get qualified, get hired. Join DigitEducator and embark on a journey towards a successful career</p>
          <div className="cta-container">
            <button className="cta-button" onClick={handleJoinCourse}>
              JOIN COURSE
            </button>
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
        <div className="stat-item">250 <br /> Total Instructors</div>
        <div className="stat-item">35K+ <br /> Total Students</div>
      </div>

      {/* Why we are best section */}
      <div className="why-best-section">
        <h2>
          <span className="bold-text-blue-text">Why we are </span>
          <span className="regular-text">best from others?</span>
        </h2>
      
        <div className="why-cards">
          <div className="why-card">
            <img src="./digitalplatformicon.png" alt="Digital Platform Icon" />
            <h3>Assured Success</h3>
            <p>Land your dream job. We believe in you and invest in your future.</p>
          </div>
          <div className="why-card">
            <img src="./optimalicon.png" alt="Optimal Ideation Icon" />
            <h3>Learn from the Best</h3>
            <p>Gain insights from industry experts with 10+ years of experience at leading companies. </p>
          </div>
          <div className="why-card">
            <img src="./favourableicon.png" alt="Favorable Setting Icon" />
            <h3>Build your portfolio</h3>
            <p>Project based learning to build portfolio, showcase tangible results to the recruiters.</p>
          </div>
          <div className="why-card">
            <img src="./efffectiveinteractionicon.png" alt="Effective Interaction Icon" />
            <h3>Do, Learn, Succeed</h3>
            <p>Immerse yourself in practical projects which make the theory come to life and validated by experts.</p>
          </div>
          <div className="why-card">
            <img src="./Flexibletimeicon.png" alt="Flexible Time Icon" />
            <h3>Flexible Time</h3>
            <p>Learn any time-any where</p>
          </div>
          <div className="why-card">
            <img src="./reliableicon.png" alt="Reliable Icon" />
            <h3>Reliable</h3>
            <p>meets the needs and expectations of everyone it serves. </p>
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

      {/* Category and Course Sections */}
      <div className='category-section'>
        <DisplayCategory />
      </div>

      <div className='course-section' id="course-section">
        <FeaturedCourses courses={courses} />
      </div>

      {/* Skill Growth Section */}
      <div className='GrowYourSkill-Section'>
        <div className='GrrowImage-contetn'>
          <img src="./bookandpeople.png" alt="books and people" />
        </div>
        <div className='GrrowText-contetn'>
          <h2>Grow us your skill 
          with Digit Educator</h2>
          <p>Stop the theory trap! Get insider knowledge from industry veterans.</p>
          <div className='bennifits'>
            <img src="./tick.png" alt="Tick" />
            <h5>Assured Success</h5>
          </div>
          <div className='bennifits'>
            <img src="./tick.png" alt="Tick" />
            <h5>Learn from the Best</h5>
          </div>
          <div className='bennifits'>
            <img src="./tick.png" alt="Tick" />
            <h5>Do, Learn, Succeed</h5>
          </div>
          <div className='bennifits'>
            <img src="./tick.png" alt="Tick" />
            <h5>Find Your Perfect Fit</h5>
          </div>
          <button  onClick={handleJoinCourse}>Explore course</button>
        </div>
      </div>

      {/* About Section */}
      <div className='About-section' id="about">
        <AboutCompany />
      </div>

      {/* Feedback Section */}
      <div className='feedback-section'>
        <StudentFeedback />
      </div>

      {/* Footer Section */}
      <div className='Footer-container'>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
