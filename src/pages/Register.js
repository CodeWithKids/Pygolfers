import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Registration data:', formData);
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="register-container success-container">
        <div className="success-message">
          <h2>Welcome to PyGolfers!</h2>
          <p>Your account has been created successfully.</p>
          <p>Check your email to verify your account and get started!</p>
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
        
        <h1>Create Your Account</h1>
        <p className="subtitle">Join PyGolfers and start your coding adventure!</p>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className={`form-group ${errors.username ? 'error' : ''}`}>
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
