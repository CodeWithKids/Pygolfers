import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    // In a real app, you would check for an auth token here
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);
  
  // Handle password strength calculation
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (formData.password.match(/[a-z]+/)) strength += 1;
    if (formData.password.match(/[A-Z]+/)) strength += 1;
    if (formData.password.match(/[0-9]+/)) strength += 1;
    if (formData.password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;
    
    setPasswordStrength(strength);
  }, [formData.password]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call with error handling
        const response = await new Promise((resolve, reject) => {
          setTimeout(() => {
            // In a real app, you would make an actual API call here
            console.log('Registration data:', formData);
            
            // Simulate a successful response
            resolve({ success: true });
            
            // To test error handling, uncomment the following:
            // reject(new Error('Email already in use'));
          }, 1500);
        });
        
        // If we get here, registration was successful
        setIsSuccess(true);
        
        // In a real app, you would:
        // 1. Store the auth token
        // 2. Redirect to dashboard or verification page
        // 3. Show success message
        
      } catch (error) {
        // Handle API errors
        setErrors({
          ...errors,
          api: error.message || 'An error occurred during registration. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 2) return 'var(--color-error)';
    if (passwordStrength < 4) return 'var(--color-warning)';
    return 'var(--color-success)';
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 2) return 'Weak';
    if (passwordStrength < 4) return 'Fair';
    return 'Strong';
  };

  if (isSuccess) {
    return (
      <motion.div
        className="register-container success-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="success-message"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <FaCheckCircle className="success-icon" />
          </motion.div>
          <h2>Welcome to PyGolfers!</h2>
          <p>Your account has been created successfully.</p>
          <p>We've sent a verification link to your email. Please verify your account to get started.</p>
          <div className="success-actions">
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="register-container">
      <motion.div
        className="register-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>

        <header className="register-header">
          <h1>Create Your Account</h1>
          <p className="subtitle">Join PyGolfers and start your coding adventure!</p>
        </header>

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

        <form onSubmit={handleSubmit} className="register-form">
          <div
            className={`form-group ${errors.username ? 'error' : ''} ${
              touched.username && formData.username ? 'touched' : ''
            }`}
          >
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="username"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && (
              <span id="username-error" className="error-message">
                {errors.username}
              </span>
            )}
          </div>

          <div
            className={`form-group ${errors.email ? 'error' : ''} ${
              touched.email && formData.email ? 'touched' : ''
            }`}
          >
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message">
                {errors.email}
              </span>
            )}
          </div>

          <div
            className={`form-group ${errors.password ? 'error' : ''} ${
              touched.password && formData.password ? 'touched' : ''
            }`}
          >
            <div className="input-icon">
              <FaLock />
            </div>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : 'password-hint'}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '' : ''}
              </button>
            </div>

            {formData.password && (
              <div className="password-strength">
                <div
                  className="strength-meter"
                  style={{
                    '--strength': passwordStrength / 5,
                    '--strength-color': getPasswordStrengthColor(),
                  }}
                ></div>
                <span className="strength-label">
                  {getPasswordStrengthLabel()}
                </span>
              </div>
            )}

            {errors.password ? (
              <span id="password-error" className="error-message">
                {errors.password}
              </span>
            ) : (
              <div id="password-hint" className="hint">
                Use 8+ characters with a mix of letters, numbers & symbols
              </div>
            )}
          </div>

          <div
            className={`form-group ${errors.confirmPassword ? 'error' : ''} ${
              touched.confirmPassword && formData.confirmPassword ? 'touched' : ''
            }`}
          >
            <div className="input-icon">
              <FaLock />
            </div>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? '' : ''}
              </button>
            </div>
            {errors.confirmPassword && (
              <span id="confirm-password-error" className="error-message">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>

          <p className="login-link">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

          <div className="divider">or</div>

          <Link to="/login" className="btn btn-outline btn-block">
            Sign in with Google
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
