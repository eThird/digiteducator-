import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Coursepage from './Pages/Course/Coursepage'
import Footer from './Components/Footer/Footer';
import Overview from './Pages/Overviewpage/Overview';
import Pagination from './Components/Paginations/Pagination';
import Tasktracker from './Components/Tasktracker/Tasktracker';
import Sidebar from './Pages/Admin/Admin-components/Sidebar/Sidebar';
import Admin from './Pages/Admin/Admin';
import Createcourse from './Pages/Admin/Adminpages/Createcourse/Createcourse';
import AdminNavbar from './Pages/Admin/Admin-components/AdminNavbar/AdminNavbar';
import AdminDashboard from './Pages/Admin/Adminpages/AdminDashboard/AdminDashboard';
import Coursesdisplay from './Pages/Admin/Adminpages/Coursesdisplay/Coursesdisplay';
import Addtask from './Pages/Admin/Admin-components/Addtask/Addtask';
import Taskdisplay from './Pages/Admin/Adminpages/Taskdisplay/Taskdisplay';
import Signup from './Pages/Signup/Signup';
import DisplayCategory from './Components/DisplayCategory/DisplayCategory';
import FeaturedCourses from './Components/FeaturedCourses/FeaturedCourses';
import StudentFeedback from './Components/StudentFeedback/StudentFeedback';
import LandingPage from './Pages/LandingPage/LandingPage';
import AboutCompany from './Components/AboutCompany/AboutCompany';
import PopularMentors from './Components/PopularMentors/PopularMentors';
import CourseDetail from './Pages/CourseDetail/CourseDetail';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Coursepage" element={<Coursepage/>} />
        <Route path="/Footer" element={<Footer/>} />
        <Route path="/Overview" element={<Overview/>} />
        <Route path="/Pagination" element={<Pagination/>} />
        <Route path="/Tasktracker" element={<Tasktracker/>}/>
        <Route path="/Sidebar" element={<Sidebar/>}/>
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="/Createcourse" element={<Createcourse/>}/>
        <Route path="/AdminNavbar" element={<AdminNavbar/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/Coursesdisplay" element={<Coursesdisplay/>}/>
        <Route path="/Addtask" element={<Addtask/>}/>
        <Route path="/Taskdisplay" element={<Taskdisplay/>}/>
        <Route path="/DisplayCategory" element={<DisplayCategory/>}/>
        <Route path="/FeaturedCourses" element={<FeaturedCourses/>}/>
        <Route path="/StudentFeedback" element={<StudentFeedback/>}/>
        <Route path="/LandingPage" element={<LandingPage/>}/>
        <Route path="/AboutCompany" element={<AboutCompany/>}/>
        <Route path="/PopularMentors" element={<PopularMentors/>}/>
        <Route path="/CourseDetail" element={<CourseDetail/>}/>
        
        
 
      </Routes>
    </Router>
  );
};

export default App;
