import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login response data:', data); // Log the response data

                localStorage.setItem('token', data.access);
                localStorage.setItem('user_id', data.user_id); // Ensure user_id is in the response
                localStorage.setItem('isLoggedIn', 'true'); // Set login status
                navigate('/Home');
            } else {
                const data = await response.json();
                setError(data.detail || 'Login failed, please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };


    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-image">
                    <img src="/girlsitting.png" alt="Girl Studying" />
                </div>
                <div className="login-form">
                    <h2>Login to your account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={`input-container ${error && 'error'}`}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <div className="social-login">
                        <p>Or login with</p>
                        <div className="social-icons">
                            <img src="/facebookicon.png" alt="Facebook" />
                            <img src="/googleicon.png" alt="Google" />
                            <img src="/microsofticon.png" alt="Microsoft" />
                        </div>
                    </div>
                    <div className="signup-option">
                        Don't have an account? <Link to="/signup" className="signup-text">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
