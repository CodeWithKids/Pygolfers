import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaArrowLeft, FaCheck, FaSpinner, FaShieldAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Rate limiting check
    if (attempts >= 3) {
      newErrors.api = 'Too many reset attempts. Please wait 15 minutes before trying again.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setAttempts(prev => prev + 1);
      
      // Simulate API call with better security
      setTimeout(() => {
        console.log('Password reset requested for:', email);
        setIsLoading(false);
        setIsSubmitted(true);
        setResendTimer(60); // 60 seconds before resend allowed
      }, 1500);
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setIsLoading(true);
      setTimeout(() => {
        console.log('Resending password reset for:', email);
        setIsLoading(false);
        setResendTimer(60);
      }, 1000);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="forgot-password-container">
        <motion.div 
          className="forgot-password-card success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          >
            <FaCheck />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Check Your Email</h2>
            <p>We've sent a password reset link to <strong>{email}</strong></p>
            
            <div className="email-tips">
              <div className="tip-item">
                <FaExclamationTriangle className="tip-icon" />
                <span>Check your spam folder if you don't see it</span>
              </div>
              <div className="tip-item">
                <FaClock className="tip-icon" />
                <span>Link expires in 1 hour for security</span>
              </div>
              <div className="tip-item">
                <FaShieldAlt className="tip-icon" />
                <span>For security, we can't confirm if this email exists</span>
              </div>
            </div>
            
            <div className="success-actions">
              <button 
                onClick={handleResend} 
                disabled={resendTimer > 0 || isLoading}
                className="resend-btn"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="spinner" />
                    Sending...
                  </>
                ) : resendTimer > 0 ? (
                  `Resend in ${resendTimer}s`
                ) : (
                  'Resend Email'
                )}
              </button>
              
              <Link to="/login" className="back-to-login">
                <FaArrowLeft /> Back to Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <motion.div 
        className="forgot-password-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="forgot-password-header">
          <div className="pygolfers-logo">
            <h1>PyGolfers</h1>
          </div>
          <h2>Reset Your Password</h2>
          <p>Enter your email address and we'll send you a secure link to reset your password.</p>
        </div>
        
        <AnimatePresence>
          {errors.api && (
            <motion.div
              className="alert alert-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {errors.api}
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleBlur}
              placeholder="Enter your email address"
              className="forgot-password-input"
              disabled={isLoading}
              autoComplete="email"
              autoFocus
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert" aria-live="polite">
                {errors.email}
              </span>
            )}
          </div>
          
          <motion.button 
            type="submit" 
            className="reset-button"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <FaSpinner className="spinner" />
                Sending Reset Link...
              </>
            ) : (
              <>
                <FaEnvelope />
                Send Reset Link
              </>
            )}
          </motion.button>
          
          <div className="help-section">
            <p className="help-text">
              Remember your password? <Link to="/login">Sign In</Link>
            </p>
            <p className="help-text">
              Need help? <Link to="/contact">Contact Support</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
