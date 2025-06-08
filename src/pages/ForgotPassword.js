import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
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
        console.log('Password reset requested for:', email);
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card success">
          <div className="success-icon">
            <FaCheck />
          </div>
          <h2>Check Your Email</h2>
          <p>We've sent a password reset link to <strong>{email}</strong>.</p>
          <p>Please check your inbox and follow the instructions to reset your password.</p>
          <Link to="/login" className="back-to-login">
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <h2>Reset Your Password</h2>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="forgot-password-input"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <button 
            type="submit" 
            className="reset-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          
          <div className="back-to-login">
            <Link to="/login">
              <FaArrowLeft /> Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
