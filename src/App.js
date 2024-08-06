import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Coursepage from './Pages/Course/Coursepage'
import Footer from './Components/Footer/Footer';
import Overviewpage from './Pages/Overviewpage/Overviewpage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Coursepage" element={<Coursepage/>} />
        <Route path="/Footer" element={<Footer/>} />
        <Route path="/Overviewpage" element={<Overviewpage/>}/>

      </Routes>
    </Router>
  );
};

export default App;
