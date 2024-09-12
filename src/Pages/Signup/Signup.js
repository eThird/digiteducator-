import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Check if passwords match
    if (name === "password" || name === "confirmPassword") {
      setPasswordsMatch(formData.password === value || formData.confirmPassword === value);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      passwordsMatch
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Send data to Django backend
      const response = await fetch("/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        // If the response is OK, handle success
        setSuccess("Account created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Handle errors from the Django API
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong, please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image">
        <img src="/girlstuding.png" alt="Girl Studying" />
      </div>
      <div className="signup-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <div className="input-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email ID"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="password-fields">
            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className={`input-field ${!passwordsMatch ? "error" : ""}`}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="signup-btn" type="submit" disabled={!isFormValid() || loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
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
  );
};

export default Signup;
