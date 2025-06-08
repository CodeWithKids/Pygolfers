import React, { useState } from 'react';
import { FaUser, FaLock, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt with:', formData);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-placeholder">
            <span role="img" aria-label="PyGolfers Logo">⛳🐍</span>
          </div>
          <h1>Welcome Back to PyGolfers!</h1>
          <p>Ready to continue your coding adventure?</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className={`form-group ${errors.username ? 'error' : ''}`}>
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="login-input"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="login-input"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
            {!isLoading && <FaArrowRight className="button-icon" />}
          </button>
        </form>
        
        <div className="register-cta">
          <p>New to PyGolfers? <Link to="/register">Create an account <FaUserPlus /></Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
