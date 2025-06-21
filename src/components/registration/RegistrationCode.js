import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaKey, FaUser, FaLock, FaArrowLeft, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import './RegistrationForm.css';
import './RegistrationCode.css';

const RegistrationCode = () => {
  const [formData, setFormData] = useState({
    registrationCode: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [codeDetails, setCodeDetails] = useState(null);
  const navigate = useNavigate();

  // Mock function to validate registration code
  const validateRegistrationCode = (code) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation - in a real app, this would be an API call
        if (code === 'PYGOLF2023') {
          resolve({
            valid: true,
            type: 'classroom',
            name: 'Mrs. Smith\'s 5th Grade Class',
            expires: '2023-12-31',
            maxStudents: 30
          });
        } else if (code === 'PYGOLF2023FAM') {
          resolve({
            valid: true,
            type: 'family',
            name: 'The Johnson Family',
            expires: '2024-12-31',
            maxStudents: 5
          });
        } else if (!code) {
          resolve({
            valid: false,
            error: 'Please enter a registration code'
          });
        } else {
          resolve({
            valid: false,
            error: 'Invalid or expired registration code. Please check and try again.'
          });
        }
      }, 1000);
    });
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
    
    // Clear code validation if registration code changes
    if (name === 'registrationCode' && codeValidated) {
      setCodeValidated(false);
      setCodeError('');
      setCodeDetails(null);
    }
  };

  const handleValidateCode = async (e) => {
    e.preventDefault();
    
    if (!formData.registrationCode.trim()) {
      setCodeError('Please enter a registration code');
      return;
    }
    
    setIsValidatingCode(true);
    setCodeError('');
    
    try {
      const result = await validateRegistrationCode(formData.registrationCode);
      
      if (result.valid) {
        setCodeValidated(true);
        setCodeDetails(result);
      } else {
        setCodeError(result.error || 'Invalid registration code');
        setCodeValidated(false);
      }
    } catch (error) {
      setCodeError('An error occurred while validating the code. Please try again.');
      setCodeValidated(false);
    } finally {
      setIsValidatingCode(false);
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!codeValidated) {
      handleValidateCode(e);
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Registration with code data:', { ...formData, ...codeDetails });
        setIsSubmitting(false);
        
        // Show success state
        navigate('/registration/success', {
          state: {
            username: formData.username,
            ...codeDetails
          }
        });
      }, 1500);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <Link to="/register" className="back-link">
          <FaArrowLeft /> Back to Registration Options
        </Link>
        
        <h1>Join with a Registration Code</h1>
        <p className="subtitle">
          {codeValidated 
            ? 'Complete your account setup' 
            : 'Enter the code provided by your teacher or parent'}
        </p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          {!codeValidated ? (
            <>
              <div className={`form-group ${codeError ? 'error' : ''}`}>
                <label htmlFor="registrationCode">Registration Code</label>
                <div className="input-icon">
                  <FaKey />
                </div>
                <input
                  type="text"
                  id="registrationCode"
                  name="registrationCode"
                  placeholder="Enter your code here"
                  value={formData.registrationCode}
                  onChange={handleChange}
                  autoComplete="off"
                  autoFocus
                />
                {codeError && <span className="error-message">{codeError}</span>}
                <p className="hint">
                  This code was given to you by your teacher or parent. It looks something like "PYGOLF2023".
                </p>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isValidatingCode}
              >
                {isValidatingCode ? 'Validating Code...' : 'Continue'}
              </button>
              
              <div className="code-help">
                <FaExclamationCircle className="help-icon" />
                <p>Don't have a code? <Link to="/register/learner">Sign up as an individual learner</Link> or ask your teacher/parent for a code.</p>
              </div>
            </>
          ) : (
            <>
              <div className="code-validated">
                <div className="code-validated-icon">
                  <FaCheck />
                </div>
                <h3>Joining: {codeDetails.name}</h3>
                <p className="code-type">
                  {codeDetails.type === 'classroom' ? 'Classroom' : 'Family'} Account
                </p>
                <p className="code-expires">
                  Expires: {codeDetails.expires}
                </p>
              </div>
              
              <div className={`form-group ${errors.username ? 'error' : ''}`}>
                <label htmlFor="username">Choose a Username</label>
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
                  autoFocus
                />
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
              
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
              
              <div className="privacy-notice">
                <p className="small-text">
                  By signing up, you agree to our <Link to="/terms">Terms of Service</Link> and 
                  acknowledge our <Link to="/privacy">Privacy Policy</Link>.
                </p>
                <p className="small-text">
                  For users under 13, we comply with COPPA. Your teacher or parent has already provided
                  consent for you to use this platform.
                </p>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Join Now'}
              </button>
              
              <button 
                type="button" 
                className="btn btn-outline btn-block"
                onClick={() => setCodeValidated(false)}
                disabled={isSubmitting}
              >
                Use a Different Code
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationCode;
