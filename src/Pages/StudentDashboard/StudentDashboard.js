import React, { useState } from "react";
import StudentProfile from "./Pages/StudentProfile/StudentProfile";
import EnrolledCourses from "./Pages/EnrolledCourses/EnrolledCourses";
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('StudentDashboard'); // Corrected variable name

  const renderContent = () => {
    switch (selectedOption) { // Use the corrected variable name here
      case 'Profile':
        return <StudentProfile/>;
      case 'My Courses':
        return <EnrolledCourses/>;

      default:
        return 'student dashboard';
    }
  };

  return (
    <div className="studentdashboard-main-container">
      <div className="studentdashboard-sidebar">
        {/* Profile Image */}
        <div className="student-profile-section">
          <div className="student-image-container">
            <img src="./study.png" alt="student-profile" className="student-image" />
          </div>
          <h4>John Doe</h4>
        </div>

        {/* Sidebar Options */}
        <div className="student-sidebar-options">
          <div className="sidebar-option " onClick={() => setSelectedOption('Profile')}>Profile</div>
          <div className="sidebar-option" onClick={() => setSelectedOption('My Courses')}>My Courses</div>
          
        </div>
      </div>

      <div className="studentdashboard-detail-container">
        {/* This is where the selected option's content will be displayed */}
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentDashboard;
