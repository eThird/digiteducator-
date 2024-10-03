import React, { useState, useEffect } from "react";
import StudentProfile from "./Pages/StudentProfile/StudentProfile";
import EnrolledCourses from "./Pages/EnrolledCourses/EnrolledCourses";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('Profile');
  const [studentData, setStudentData] = useState(null);
  const userId = localStorage.getItem('userId'); // Assuming you have stored userId in localStorage
  const token = localStorage.getItem('token');

  // Fetch student data from API
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/student/data/${userId}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the token for authentication
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const data = await response.json();
        setStudentData(data); // Save the fetched student data to state
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    if (userId && token) {
      fetchStudentData();
    }
  }, [userId, token]);

  const renderContent = () => {
    switch (selectedOption) {
      case 'Profile':
        return <StudentProfile />;
      case 'My Courses':
        return <EnrolledCourses />;
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
              {studentData && studentData.student_profile_picture ? (
                <img
                  src={studentData.student_profile_picture}
                  alt="student-profile"
                  className="dashboard-student-image"
                />
              ) : (
                <img
                  src="./study.png"
                  alt="default-profile"
                  className="dashboard-student-image"
                />
              )}
            </div>
            <h4>{studentData ? `${studentData.user.first_name} ${studentData.user.last_name}` : 'Loading...'}</h4>
          </div>

          <div className="student-sidebar-options">
            <div
              className={`sidebar-option ${selectedOption === 'Profile' ? 'active' : ''}`}
              onClick={() => setSelectedOption('Profile')}
            >
              Profile
            </div>
            <div
              className={`sidebar-option ${selectedOption === 'My Courses' ? 'active' : ''}`}
              onClick={() => setSelectedOption('My Courses')}
            >
              My Courses
            </div>
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
