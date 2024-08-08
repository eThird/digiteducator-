import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Coursepage from './Pages/Course/Coursepage'
import Footer from './Components/Footer/Footer';
import Overview from './Pages/Overviewpage/Overview';
import Pagination from './Components/Paginations/Pagination';

import Tasktracker from './Components/Tasktracker/Tasktracker';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Coursepage" element={<Coursepage/>} />
        <Route path="/Footer" element={<Footer/>} />
        <Route path="/Overview" element={<Overview/>} />
        <Route path="/Pagination" element={<Pagination/>} />
        <Route path="/Tasktracker" element={<Tasktracker/>}/>
        

      </Routes>
    </Router>
  );
};

export default App;
