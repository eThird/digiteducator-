import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch username from Django backend
    fetch('/api/get_username')
      .then(response => response.json())
      .then(data => setUsername(data.username))
      .catch(error => console.error('Error fetching username:', error));
  }, []);

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logout button clicked');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/DE-logo.png" alt="Digit Educator Logo" className="logo-image" />
        <Link to="/home">Digit Educator</Link>
      </div>
      <div className="navbar-links">
       {/* Add navbar links here in future */}
      </div>
      <div className="navbar-user">
        <span>Hello, {username}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
