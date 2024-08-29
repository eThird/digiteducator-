import React from 'react';
import './AdminNavbar.css';

const AdminNavbar = ({ pageName, onAddCourse }) => {
  return (
    <div className="admin-navbar">
      <div><h1 className="page-name">{pageName}</h1></div>
    <div className='button-cintainer'>
    <button className="add-course-button" onClick={onAddCourse}>Add Course</button>
    <div className="options">•••</div>
    </div>
    </div>
  );
};

export default AdminNavbar;
