import React from 'react';
import './AboutCompany.css'; // Import the CSS file for styling
import aboutData from '../AboutCompany/about.json'; // Importing the JSON file with video link

const AboutCompany = () => {
  return (
    <div className="about-company-section">
      <h2 className="about-title">About <span>Company</span></h2>
      <p className="about-description">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s....
      </p>

      <div className="about-video-container">
        <iframe 
          className="about-video" 
          src={aboutData.videoLink} 
          title="About video" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      <div className="enrollment-section">
        
        <img src={`${process.env.PUBLIC_URL}/bluedisk.png`} alt="Blue circle" className="blue-circle"/>
        <img src={`${process.env.PUBLIC_URL}/girlwithbooks.png`} alt="Student" className="student-image"/>

        <div className="enrollment-content">
          <h1>Effortless Enrollment</h1>
          <p>Lorem ipsum is simply dummy text of the printing and typesetting industry...</p>
        <div className='Enrolment-list'>
          <div className='number-div'>01</div>
          <div>Choose a Program</div>
        </div>
        <div className='Enrolment-list'>
          <div className='number-div'>02</div>
          <div>Choose a Program</div>
        </div>
        <div className='Enrolment-list'>
          <div className='number-div'>03</div>
          <div>Choose a Program</div>
        </div>
        <div className='Enrolment-list'>
          <div className='number-div'>04</div>
          <div>Choose a Program</div>
        </div>
        <div className='Enrolment-list'>
          <div className='number-div'>05</div>
          <div>Choose a Program</div>
        </div>
        </div>

        <img src={`${process.env.PUBLIC_URL}/leftdownarrow.png`} alt="Left Down Arrow" className="left-arrow1"/>
        <img src={`${process.env.PUBLIC_URL}/leftdownarrow.png`} alt="Left Down Arrow" className="left-arrow2"/>
        <img src={`${process.env.PUBLIC_URL}/rightdownarrow.png`} alt="Right Down Arrow" className="right-arrow1"/>
        <img src={`${process.env.PUBLIC_URL}/rightdownarrow.png`} alt="Right Down Arrow" className="right-arrow2"/>
      </div>
    </div>
  );
}

export default AboutCompany;
