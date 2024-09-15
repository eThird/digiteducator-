import React, { useState, useEffect } from 'react';
import './PopularMentors.css'; // Import the CSS file
import mentorsData from '../PopularMentors/mentorsdata.json'; // Import the JSON file directly

const PopularMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    setMentors(mentorsData); // Set the JSON data into state
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
                    <span> {mentor.students} Students</span>
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
