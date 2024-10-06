import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Link to CSS
import Navbar from '../../Components/Navbar/Navbar'; // Importing the Navbar
import DisplayCategory from '../../Components/DisplayCategory/DisplayCategory';
import FeaturedCourses from '../../Components/FeaturedCourses/FeaturedCourses';
import Footer from '../../Components/Footer/Footer';
import AboutCompany from '../../Components/AboutCompany/AboutCompany';
import StudentFeedback from '../../Components/StudentFeedback/StudentFeedback';
import playicon from '../../Assets/Playicon.png';
import manThumbsUp from '../../Assets/manthumbsup.png';
import yellowCircle from '../../Assets/yellowcircle.png';
import orangeStar from '../../Assets/orangestar.png';
import digitalPlatformIcon from '../../Assets/digitalplatformicon.png';
import optimalIcon from '../../Assets/optimalicon.png';
import favourableIcon from '../../Assets/favourableicon.png';
import effectiveInteractionIcon from '../../Assets/efffectiveinteractionicon.png';
import flexibleTimeIcon from '../../Assets/Flexibletimeicon.png';
import reliableIcon from '../../Assets/reliableicon.png';
import paypalIcon from '../../Assets/Paypalicon.png';
import facebookIcon from '../../Assets/Facebookicon2.png';
import shutterstockIcon from '../../Assets/Shutterstockicon.png';
import slackIcon from '../../Assets/Slackicon.png';
import bookAndPeople from '../../Assets/bookandpeople.png';
import tick from '../../Assets/tick.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    { id: 1, title: 'React for Beginners' },
    { id: 2, title: 'Advanced JavaScript' },
    { id: 3, title: 'CSS Grid Masterclass' }
  ]);

  const handleSearch = (query) => {
    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setCourses(filteredCourses);
  };

  const handleJoinCourse = () => {
    navigate('/courses');
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
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
          <p>Don't just learn, experience. Don't just get qualified, get hired. Join DigitEducator and embark on a journey towards a successful career</p>
          <div className="cta-container">
            <button className="cta-button" onClick={handleJoinCourse}>
              JOIN COURSE
            </button>
            <div className="play-button">
              <img src={playicon} alt="Play Button" />
              <span>See how it works?</span>
            </div>
          </div>
        </div>
        <div className="image-content">
          <img src={manThumbsUp} alt="Man thumbs up" />
          <img src={yellowCircle} alt="Yellow Circle" className="yellow-circle" />
          <img src={orangeStar} alt="Orange Star" className="orange-star" />
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
            <img src={digitalPlatformIcon} alt="Digital Platform Icon" />
            <h3>Assured Success</h3>
            <p>Land your dream job. We believe in you and invest in your future.</p>
          </div>
          <div className="why-card">
            <img src={optimalIcon} alt="Optimal Ideation Icon" />
            <h3>Learn from the Best</h3>
            <p>Gain insights from industry experts with 10+ years of experience at leading companies.</p>
          </div>
          <div className="why-card">
            <img src={favourableIcon} alt="Favorable Setting Icon" />
            <h3>Build your portfolio</h3>
            <p>Project-based learning to build a portfolio, showcase tangible results to the recruiters.</p>
          </div>
          <div className="why-card">
            <img src={effectiveInteractionIcon} alt="Effective Interaction Icon" />
            <h3>Do, Learn, Succeed</h3>
            <p>Immerse yourself in practical projects which make the theory come to life and validated by experts.</p>
          </div>
          <div className="why-card">
            <img src={flexibleTimeIcon} alt="Flexible Time Icon" />
            <h3>Flexible Time</h3>
            <p>Learn any time-anywhere</p>
          </div>
          <div className="why-card">
            <img src={reliableIcon} alt="Reliable Icon" />
            <h3>Reliable</h3>
            <p>Meets the needs and expectations of everyone it serves.</p>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="companies-section">
        <h2>Trusted By The Top 100+ Companies & Universities</h2>
        <div className="company-logos">
          <img src={paypalIcon} alt="PayPal" />
          <img src={facebookIcon} alt="Facebook" />
          <img src={shutterstockIcon} alt="Shutterstock" />
          <img src={slackIcon} alt="Slack" />
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
          <img src={bookAndPeople} alt="Books and people" />
        </div>
        <div className='GrrowText-contetn'>
          <h2>Grow your skill with Digit Educator</h2>
          <p>Stop the theory trap! Get insider knowledge from industry veterans.</p>
          <div className='bennifits'>
            <img src={tick} alt="Tick" />
            <h5>Assured Success</h5>
          </div>
          <div className='bennifits'>
            <img src={tick} alt="Tick" />
            <h5>Learn from the Best</h5>
          </div>
          <div className='bennifits'>
            <img src={tick} alt="Tick" />
            <h5>Do, Learn, Succeed</h5>
          </div>
          <div className='bennifits'>
            <img src={tick} alt="Tick" />
            <h5>Find Your Perfect Fit</h5>
          </div>
          <button onClick={handleJoinCourse}>Explore course</button>
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
