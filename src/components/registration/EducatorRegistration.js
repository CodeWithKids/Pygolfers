import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaChalkboardTeacher, FaSchool, FaArrowLeft, FaCheck } from 'react-icons/fa';
import './RegistrationForm.css';
import './TeacherRegistration.css';

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    gradeLevels: [],
    subjects: [],
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
      
      if (!formData.role) {
        newErrors.role = 'Please select a role';
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
      
      if (formData.role === 'teacher' && !formData.organization.trim()) {
        newErrors.organization = 'School/Organization name is required';
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
        console.log('Educator registration data:', formData);
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
          <p>Your Teacher account has been created successfully.</p>
          
          <div className="account-details">
            <p><strong>Email:</strong> {formData.email}</p>
            {formData.school && <p><strong>School:</strong> {formData.school}</p>}
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
          Teacher Registration
          {currentStep === 1 ? ' (1/2)' : ' (2/2)'}
        </h1>
        
        <p className="subtitle">
          {currentStep === 1 
            ? 'Create your teacher account to manage classrooms and track student progress.'
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
                <div className="welcome-teacher">
                  <h3><FaChalkboardTeacher className="welcome-icon" /> Welcome, Teacher!</h3>
                  <p>We're excited to have you join PyGolfers! Let's get your teacher account set up.</p>
                </div>
              </div>
              
              <div className={`form-group ${errors.fullName ? 'error' : ''}`}>
                <label htmlFor="fullName">Full Name</label>
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
              
              <div className={`form-group ${errors.school ? 'error' : ''}`}>
                <label htmlFor="school">School/Institution Name</label>
                <div className="input-icon">
                  <FaSchool />
                </div>
                <input
                  type="text"
                  id="school"
                  name="school"
                  placeholder="Name of your school or institution"
                  value={formData.school}
                  onChange={handleChange}
                />
                {errors.school && <span className="error-message">{errors.school}</span>}
              </div>
              
              <div className="form-group">
                <label>Grade Levels You Teach</label>
                <div className="checkbox-group">
                  {['Elementary', 'Middle School', 'High School', 'College/University'].map(level => (
                    <label key={level} className="checkbox-label">
                      <input
                        type="checkbox"
                        name="gradeLevels"
                        value={level}
                        checked={formData.gradeLevels.includes(level)}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setFormData(prev => ({
                            ...prev,
                            gradeLevels: checked
                              ? [...prev.gradeLevels, value]
                              : prev.gradeLevels.filter(g => g !== value)
                          }));
                        }}
                        className="sr-only"
                      />
                      <span className="checkbox-custom"></span>
                      {level}
                    </label>
                  ))}
                </div>
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
              
              <div className={`form-group ${errors.termsAgreed ? 'error' : ''}`}>
                <div className="checkbox-group">
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
                    I agree to the <Link to="/terms">Terms of Service</Link> and acknowledge the{' '}
                    <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>
                {errors.termsAgreed && (
                  <span className="error-message">{errors.termsAgreed}</span>
                )}
                
                <p className="small-text" style={{ marginTop: '1rem' }}>
                  By registering, you confirm that you are at least 18 years old and agree to receive 
                  emails from PyGolfers. You can unsubscribe at any time.
                </p>
                
                <p className="small-text">
                  You'll need to verify your teaching status before creating classrooms for students under 13 
                  to comply with COPPA regulations. We'll guide you through this process after registration.
                </p>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </>
          )}
        </form>
        
        <div className="login-redirect">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistration;
