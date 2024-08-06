// src/pages/Login/login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        navigate('/home');
    } else {
        setError('Wrong email id or password');
    }
};

  return (
    <div className='main-container'>
    <div className="login-container">
      <div className="login-left">
        <h1>Grow up your skills by online courses with Digit Educator</h1>
        <img src="/DE-logo.png" alt="1k+ Reviews" />
        <p id='weblink'>Visit www.digiteducator.com for more</p>
      </div>
      <div className="login-right">
        <h2>Sign-in</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
   
    </div>
    
  );
};

export default Login;
