import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch('http://localhost:8000/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok) {
      navigate('/home');
    } else {
      setError('Signup failed, please try again.');
    }
  };

  return (
    <div className='signup-page'>
      <div className="signup-container">
        <div className="signup-image">
          <img src="/girlstuding.png" alt="Girl Studying" />
        </div>
        <div className="signup-form">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="name-container">
              <div className="input-container">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={`input-container ${password !== confirmPassword && error ? 'error' : ''}`}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={`input-container ${password !== confirmPassword && error ? 'error' : ''}`}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="signup-button">Sign Up</button>
          </form>
          <div className="social-signup">
            <p>Sign up with</p>
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

export default Signup;
