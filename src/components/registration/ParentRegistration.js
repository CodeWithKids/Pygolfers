import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaUserFriends, FaCheck } from 'react-icons/fa';
import './RegistrationForm.css';
import './ParentRegistration.css';

const ParentRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    childrenCount: '1',
    termsAgreed: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.termsAgreed) {
        newErrors.termsAgreed = 'You must agree to the terms and conditions';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(2)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Parent registration data:', formData);
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  if (isSuccess) {
    return (
      <div className="registration-container success-container">
        <div className="success-message">
          <div className="success-icon">
            <FaCheck />
          </div>
          <h2>Welcome to PyGolfers, {formData.fullName.split(' ')[0]}!</h2>
          <p>Your parent account has been created successfully.</p>
          
          <div className="account-details">
            <p><strong>Email:</strong> {formData.email}</p>
            <p className="important-note">
              <FaEnvelope /> We've sent a verification email to your address. Please check your inbox.
            </p>
          </div>
          
          <div className="button-group">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn btn-primary"
            >
              Go to Dashboard
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
        {currentStep === 1 ? (
          <Link to="/register" className="back-link">
            <FaArrowLeft /> Back to Registration Options
          </Link>
        ) : (
          <button onClick={handleBack} className="back-link">
            <FaArrowLeft /> Back to Previous Step
          </button>
        )}
        
        <h1>
          Parent Registration
          {currentStep === 1 ? ' (1/2)' : ' (2/2)'}
        </h1>
        
        <p className="subtitle">
          {currentStep === 1 
            ? 'Create your parent account to support your child\'s coding journey.'
            : 'Set up your account security and preferences.'}
        </p>
        
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: currentStep === 1 ? '50%' : '100%' }}
          />
        </div>
        
        <form onSubmit={currentStep === 1 ? handleNext : handleSubmit} className="registration-form">
          {currentStep === 1 ? (
            <>
              <div className="form-group">
                <div className="role-selection">
                  <h3 className="welcome-parent">
                    <FaUserFriends className="welcome-icon" />
                    Welcome, Parent!
                  </h3>
                  <p className="welcome-message">
                    We're excited to help you support your child's coding journey. Let's get started with your account.
                  </p>
                </div>
              </div>
              
              <div className={`form-group ${errors.fullName ? 'error' : ''}`}>
                <label htmlFor="fullName">Your Full Name</label>
                <div className="input-icon">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>
              
              <div className={`form-group ${errors.email ? 'error' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <div className="input-icon">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="childrenCount">Number of Children</label>
                <div className="input-icon">
                  <FaUserFriends />
                </div>
                <select
                  id="childrenCount"
                  name="childrenCount"
                  value={formData.childrenCount}
                  onChange={handleChange}
                  className="children-select"
                >
                  {[1, 2, 3, 4, '5+'].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'child' : 'children'}
                    </option>
                  ))}
                </select>
                <p className="hint">
                  You can add your children's accounts after registration
                </p>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <div className="form-group password-group">
                <div className={`form-group ${errors.password ? 'error' : ''}`}>
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
              
              <div className={`form-group checkbox-group ${errors.termsAgreed ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  id="termsAgreed"
                  name="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                  className="sr-only"
                />
                <label htmlFor="termsAgreed" className="checkbox-label">
                  <span className="checkbox-custom"></span>
                  I agree to the <Link to="/terms" target="_blank">Terms of Service</Link> and acknowledge the{' '}
                  <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </label>
                {errors.termsAgreed && (
                  <span className="error-message">{errors.termsAgreed}</span>
                )}
                
                <p className="small-text" style={{ marginTop: '1rem' }}>
                  By registering, you confirm that you are the parent or legal guardian of any children you add to this account.
                </p>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Parent Account'}
              </button>
            </>
          )}
        </form>
        
        <div className="login-redirect">
          Already have an account? <Link to="/login" className="login-link">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default ParentRegistration;
