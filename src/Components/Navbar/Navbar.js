import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavLinkClick = (section) => {
        switch (section) {
            case 'home':
                navigate('/'); // Navigate to Home
                break;
            case 'courses':
                navigate('/courses'); // Navigate to Courses
                break;
            case 'about':
                navigate('/about'); // Navigate to About
                break;
            default:
                break;
        }
        setMobileMenuOpen(false); // Close mobile menu after clicking a link
    };

    const handleLogout = async () => {
        try {
            // Call the backend API to logout
            const response = await fetch('http://127.0.0.1:8000/api/logout/', {
                method: 'POST',
                credentials: 'include', // Ensure cookies are sent
            });

            if (response.ok) {
                // Clear local storage and cookies on the client-side
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('token');
                localStorage.removeItem('user_id'); // If you're storing the user ID in localStorage

                // Redirect to the landing page
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown
    };

    return (
        <nav className="navbar">
            <div className="navbar_logo">
                <Link to="/">
                    <img
                        src="https://www.digiteducator.com/Digiteducator%20Logo%20Website.png"
                        alt="DigitEducator Logo"
                    />
                </Link>
            </div>
            <div className={`nav-container ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="nav-links">
                    <li><a onClick={() => handleNavLinkClick('home')}>Home</a></li>
                    <li><a onClick={() => handleNavLinkClick('courses')}>Courses</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a onClick={() => handleNavLinkClick('about')}>About</a></li>
                </ul>
                {/* Include the login-register section inside nav-container for mobile view */}
                <div className="login-register-mobile">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="login-register-button">Student Dashboard</Link>
                            <a onClick={handleLogout} className="login-register-button">Logout</a>
                        </>
                    ) : (
                        <Link to="/login" className="login-register-button">Login / Register</Link>
                    )}
                </div>
            </div>

            {/* Keep the login-register for desktop view outside */}
            <div className="login-register-desktop">
                {isLoggedIn ? (
                    <>
                        <img
                            src='./study.png'
                            className='login-register-desktop-icon'
                            alt='login-register-desktop-icon'
                            onClick={toggleDropdown} // Toggle dropdown on click
                        />
                        {showDropdown && ( // Show dropdown only if toggle is true
                            <div className="dropdown-menu">
                                <Link to="/StudentDashboard" className="login-register-button">Student Dashboard</Link>
                                <a onClick={handleLogout} className="login-register-button">Logout</a>
                            </div>
                        )}
                    </>
                ) : (
                    <Link to="/login" className="login-register-button">Login / Register</Link>
                )}
            </div>

            <div
                className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default Navbar;
