import React, { useState } from "react";
import Sidebar from "./Admin-components/Sidebar/Sidebar";
import AdminNavbar from "./Admin-components/AdminNavbar/AdminNavbar";
import AdminDashboard from "./Adminpages/AdminDashboard/AdminDashboard";
import Coursesdisplay from "./Adminpages/Coursesdisplay/Coursesdisplay";
import CreateCourse from "./Adminpages/Createcourse/Createcourse";
import './Admin.css';

const Admin = () => {
    const [selectedOption, setSelectedOption] = useState('AdminDashboard');

    const renderContent = () => {
        switch (selectedOption) {
            case 'Courses':
                return <Coursesdisplay />;
            case 'CreateCourse':
                return <CreateCourse />;
            case 'AdminDashboard':
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className="main_container">
            <div className="sidebar-container">
                <Sidebar onSelectOption={setSelectedOption} />
            </div>
            <div className="right-container">
                <div className="Navbar-container">
                    <AdminNavbar pageName={selectedOption} onAddCourse={() => setSelectedOption('CreateCourse')} />
                </div>
                <div className="content-container">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default Admin;