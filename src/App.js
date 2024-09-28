import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import FeaturedCourses from './Components/FeaturedCourses/FeaturedCourses';
import LandingPage from './Pages/LandingPage/LandingPage';
import PopularMentors from './Components/PopularMentors/PopularMentors';
import AboutCompany from './Components/AboutCompany/AboutCompany';
import Coursepage from './Pages/Course/Coursepage';
import CourseDetail from './Pages/CourseDetail/CourseDetail';
import CourseOverview from './Pages/CourseOverview/CourseOverview';
import Quiz from './Components/Quiz/Quiz';
import QuizApp from './Components/Quiz/QuizApp';
import Taskdetail from './Components/Taskdetail/Taskdetail';
import ShoppingCart from './Pages/ShoppingCart/ShoppingCart';
import Assessment from './Components/Assessment/Assessment';
import Studymaterial from './Components/Studymaterial/Studymaterial';
import StudentDashboard from './Pages/StudentDashboard/StudentDashboard';
import StudentProfile from './Pages/StudentDashboard/Pages/StudentProfile/StudentProfile';
import EnrolledCourses from './Pages/StudentDashboard/Pages/EnrolledCourses/EnrolledCourses';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect "/" to "/LandingPage" */}
        <Route path="/" element={<Navigate to="/LandingPage" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />        {/* /login - Login page */}
        <Route path="/signup" element={<Signup />} />      {/* /signup - Signup page */}

        {/* Main Pages */}
        <Route path="/home" element={<Home />} />          {/* /home - Home page */}
        <Route path="/courses" element={<Coursepage />} /> {/* /courses - Course page */}
        <Route path="/LandingPage" element={<LandingPage />} /> {/* /LandingPage - Landing page */}

        {/* Footer and other components */}
        <Route path="/footer" element={<Footer />} /> {/* /footer - Footer */}
        <Route path="/FeaturedCourses" element={<FeaturedCourses />} /> {/* /FeaturedCourses - Featured Courses */}
        <Route path="/AboutCompany" element={<AboutCompany />} /> {/* /AboutCompany - About Company */}
        <Route path="/PopularMentors" element={<PopularMentors />} /> {/* /PopularMentors - Popular Mentors */}

        {/* Course Details */}
        <Route path="/CourseDetail" element={<CourseDetail />} /> {/* /CourseDetail - Course Details */}
        <Route path="/course-detail/:courseId" element={<CourseDetail />} /> {/* /course-detail/:courseId - Dynamic Course Details */}
        <Route path="/course-overview/:courseId" element={<CourseOverview />} /> {/* /course-overview/:courseId - Course Overview */}

        {/* Quiz, Task Details and assessment */}
        <Route path="/Quiz" element={<Quiz />} /> {/* /Quiz - Quiz */}
        <Route path="/QuizApp" element={<QuizApp />} /> {/* /QuizApp - Quiz App */}
        <Route path="/Taskdetail" element={<Taskdetail />} /> {/* /Taskdetail - Task Details */}
        <Route path="/Assessment" element={<Assessment/>}/>
        <Route path="/Studymaterial" element={<Studymaterial/>}/>

        {/* Shopping Cart */}
        <Route path="/shoppingcart/:courseId" element={<ShoppingCart />} /> {/* Dynamic ShoppingCart route */}

        {/* student page */}
        <Route path="/StudentDashboard" element={<StudentDashboard/>}/>
        <Route path="/StudentProfile" element={<StudentProfile/>}/>
        <Route path="/EnrolledCourses" element={<EnrolledCourses/>}/>
      </Routes>
    </Router>
  );
};

export default App;
