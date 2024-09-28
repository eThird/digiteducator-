import React, { useState } from "react";
import StudentProfile from "./Pages/StudentProfile/StudentProfile";
import EnrolledCourses from "./Pages/EnrolledCourses/EnrolledCourses";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Profile');

  const renderContent = () => {
    switch (selectedOption) {
      case 'Profile':
        return <StudentProfile />;
      case 'My Courses':
        return <EnrolledCourses/>;
      default:
        return 'Student dashboard';
    }
  };

  return (
    <div>
      {/* Include the Navbar component */}
      <Navbar />

      <div className="studentdashboard-main-container">
        <div className="studentdashboard-sidebar">
          <div className="student-profile-section">
            <div className="student-image-container">
              <img src="./study.png" alt="student-profile" className="student-image" />
            </div>
            <h4>John Doe</h4>
            {/* Removed the Share Profile button */}
          </div>

          <div className="student-sidebar-options">
            <div className="sidebar-option" onClick={() => setSelectedOption('Profile')}>Profile</div>
            <div className="sidebar-option" onClick={() => setSelectedOption('My Courses')}>My Courses</div>
          </div>

        </div>

        {/* Render the selected content */}
        <div className="studentdashboard-detail-container">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
