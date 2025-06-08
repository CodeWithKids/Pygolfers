import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import './RegistrationForm.css';

const LearnerRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    parentEmail: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState('');
  const navigate = useNavigate();

  // Generate a fun, kid-friendly username
  const generateUsername = () => {
    const adjectives = ['Happy', 'Clever', 'Swift', 'Brave', 'Wise', 'Jolly', 'Smart', 'Funny', 'Daring', 'Magic'];
    const animals = ['Tiger', 'Dolphin', 'Owl', 'Fox', 'Panda', 'Koala', 'Puppy', 'Kitty', 'Dragon', 'Unicorn'];
    const number = Math.floor(100 + Math.random() * 900); // Random 3-digit number
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    
    const username = `${adjective}${animal}${number}`.toLowerCase();
    
    setFormData(prev => ({
      ...prev,
      username: username
    }));
    
    setGeneratedUsername(username);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.parentEmail && !/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Please enter a valid email address';
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
      <div className="registration-container success-container">
        <div className="success-message">
          <div className="success-icon">
            <FaCheck />
          </div>
          <h2>Welcome to PyGolfers!</h2>
          <p>Your account has been created successfully.</p>
          
          <div className="account-details">
            <p><strong>Username:</strong> {formData.username}</p>
            <p className="important-note">
              <FaExclamationTriangle /> Please write down your username and password in a safe place.
            </p>
          </div>
          
          <div className="button-group">
            <button 
              onClick={() => navigate('/challenges')} 
              className="btn btn-primary"
            >
              Start Coding!
            </button>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="registration-card">
        <Link to="/register" className="back-link">
          <FaArrowLeft /> Back to Registration Options
        </Link>
        
        <h1>Create Your Learner Account</h1>
        <p className="subtitle">Join PyGolfers and start your coding adventure!</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className={`form-group ${errors.username ? 'error' : ''}`}>
            <label htmlFor="username">Choose a Username</label>
            <div className="input-with-button">
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="cool_coder123"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={generateUsername}
              >
                Generate
              </button>
            </div>
            {generatedUsername && (
              <p className="hint">
                We've suggested a fun username for you! Feel free to keep it or type your own.
              </p>
            )}
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group password-group">
            <div className="form-group ${errors.password ? 'error' : ''}">
              <label htmlFor="password">Create a Password</label>
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
          
          <div className={`form-group ${errors.parentEmail ? 'error' : ''}`}>
            <label htmlFor="parentEmail">
              Parent/Guardian or Teacher Email (Optional)
              <span className="optional"> - For account recovery only</span>
            </label>
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              placeholder="parent@example.com"
              value={formData.parentEmail}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.parentEmail && (
              <span className="error-message">{errors.parentEmail}</span>
            )}
            <p className="hint">
              Adding an email will help you recover your account if you forget your password.
            </p>
          </div>
          
          <div className="form-group privacy-notice">
            <p className="small-text">
              By signing up, you agree to our <Link to="/terms">Terms of Service</Link> and 
              acknowledge our <Link to="/privacy">Privacy Policy</Link>.
            </p>
            <p className="small-text">
              For users under 13, we comply with COPPA. A parent or guardian's email may be required 
              for account recovery purposes.
            </p>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="login-redirect">
          Already have an account? <Link to="/login" className="login-link">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default LearnerRegistration;
