import React, { useState, useEffect } from 'react';
import './PopularMentors.css'; // Import the CSS file

const PopularMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    // Fetch mentors from the Django API
    fetch('http://127.0.0.1:8000/api/instructors/')
      .then(response => response.json())
      .then(data => {
        const formattedMentors = data.map(mentor => ({
          name: mentor.instructor_name,
          photo: mentor.profile_picture,
          rating: mentor.instructor_rating,
          students: mentor.students.length, // Assuming you want the number of students
        }));
        setMentors(formattedMentors);
      })
      .catch(error => console.error('Error fetching mentors:', error));
  }, []);

  return (
    <div className="mentors-container">
      <h2 className="mentors-title">Popular Mentors</h2>
      <div className="mentors-grid">
        {mentors.length === 0 ? (
          <p>Loading mentors...</p>
        ) : (
          mentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <img src={mentor.photo} alt={mentor.name} className="mentor-photo" />
              <div className="mentor-info">
                <div className="mentor-name">{mentor.name}</div>
                <div className="mentor-role">{mentor.role}</div>
                <div className="mentor-rating">
                  <div className='iconRating'>
                    <img src="./star.png" alt="Star Icon" className="mentor-star" />
                    <span className="rating-text">{mentor.rating}</span>
                  </div>
                  <span>{mentor.students} Students</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PopularMentors;
