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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">Digit Educator</Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/explore-courses">Explore Courses</Link>
        <Link to="/our-educators">Our Educators</Link>
        <Link to="/menu">Menu</Link>
      </div>
      <div className="navbar-user">
        <button>Hello {username}</button>
      </div>
    </nav>
  );
};

export default Navbar;
