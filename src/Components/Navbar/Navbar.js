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
        <Link to="/home">Digit Educator</Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
      </div>
      <div className="navbar-user">
        <button>Hello {username}</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
