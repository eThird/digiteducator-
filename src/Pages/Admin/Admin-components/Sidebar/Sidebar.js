import React from "react";
import './Sidebar.css';

const Sidebar = ({ onSelectOption }) => {
    return (
        <div className="outer-container">
            <div className="logo">
                <img src="/DE-logo.png" alt="Digit Educator Logo" className="logo-image" />
                <div onClick={() => onSelectOption('AdminDashboard')}>Digit Educator</div>
            </div>
            <div className="Options">
                <div className="Courses" onClick={() => onSelectOption('Courses')}>Courses</div>
                {/* Repeat above div for more options if needed */}
            </div>
            <div className="Bottom">
                <img src="/study.png" alt="User Avatar" />
                <span>Hi, John</span>
                <div className="menu-icon">☰</div>
            </div>
        </div>
    );
}

export default Sidebar;
