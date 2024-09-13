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
    <div className='login-page'>
      <div className="login-container">
        <div className="login-image">
          <img src="/girlsitting.png" alt="Girl Studying" />
        </div>
        <div className="login-form">
          <h2>Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Username or Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-button">Sign In</button>
          </form>
          <div className="social-login">
            <p>Sign in with</p>
            <div className="social-icons">
              <img src="/facebookicon.png" alt="Facebook" />
              <img src="/googleicon.png" alt="Google" />
              <img src="/microsofticon.png" alt="Microsoft" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;