import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Coursepage.css';

const Coursepage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/courses/')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleEnroll = (courseId) => {
    // Redirect to the OverviewPage with the courseId
    navigate(`/overview/${courseId}`);
  };

  return (
    <div className="course-page">
      <h2 className="title">Popular Courses</h2>
      <div className="courses-container">
        {courses.map(course => (
          <div className="course-card" key={course.id}>
            <img src={course.image} alt={course.title} className="course-image"/>
            <div className="course-content">
              <p className="course-date">{course.date}</p>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <button className="enroll-button" onClick={() => handleEnroll(course.id)}>Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coursepage;
