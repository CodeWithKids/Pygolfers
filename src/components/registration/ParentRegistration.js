import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaChild,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaInfoCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './ParentRegistration.css';

const ParentRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    childUsername: '',
    relationship: 'parent',
    agreeToTerms: false,
    agreeToPrivacy: false,
    receiveUpdates: true
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  React.useEffect(() => {
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password is too weak. Please include uppercase, lowercase, numbers, and special characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.childUsername.trim()) {
      newErrors.childUsername = 'Child\'s PyGolfers username is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send this data to your backend
      console.log('Parent registration data:', formData);
      
      setIsSuccess(true);
      
      // Redirect to parent dashboard after 3 seconds
      setTimeout(() => {
        navigate('/parent-dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return '#ef4444';
    if (passwordStrength === 3) return '#f59e0b';
    return '#10b981';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength === 3) return 'Medium';
    return 'Strong';
  };

  if (isSuccess) {
    return (
      <div className="parent-registration-container">
        <div className="success-container">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="success-icon"
          >
            <FaCheckCircle />
          </motion.div>
          <h2>Registration Successful!</h2>
          <p>Welcome to PyGolfers Parent Portal!</p>
          <div className="success-details">
            <p>✅ Your parent account has been created</p>
            <p>✅ We've sent a verification email to {formData.email}</p>
            <p>✅ You can now monitor your child's progress</p>
          </div>
          <p className="redirect-text">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-registration-container">
      <div className="registration-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </button>
        
        <div className="header-branding">
          <div className="logo-icon">
            <FaShieldAlt />
          </div>
          <h1>Parent Registration</h1>
        </div>
        
        <p className="header-subtitle">
          Create a parent account to monitor your child's coding progress and ensure their safety on PyGolfers.
        </p>
      </div>

      <div className="registration-content">
        <div className="registration-form-container">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-section">
              <h3>Parent Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className={errors.firstName ? 'error' : ''}
                    />
                  </div>
                  {errors.firstName && (
                    <span className="error-message">
                      <FaExclamationTriangle /> {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className={errors.lastName ? 'error' : ''}
                    />
                  </div>
                  {errors.lastName && (
                    <span className="error-message">
                      <FaExclamationTriangle /> {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={errors.phone ? 'error' : ''}
                  />
                </div>
                {errors.phone && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Account Security</h3>
              
              <div className="form-group">
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={errors.password ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill"
                        style={{ 
                          width: `${(passwordStrength / 5) * 100}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <span 
                      className="strength-text"
                      style={{ color: getPasswordStrengthColor() }}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.password}
                  </span>
                )}
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3>Child Information</h3>
              
              <div className="form-group">
                <div className="input-with-icon">
                  <FaChild className="input-icon" />
                  <input
                    type="text"
                    name="childUsername"
                    value={formData.childUsername}
                    onChange={handleChange}
                    placeholder="Child's PyGolfers Username"
                    className={errors.childUsername ? 'error' : ''}
                  />
                </div>
                <div className="form-hint">
                  <FaInfoCircle />
                  <span>Enter your child's existing PyGolfers username to link accounts</span>
                </div>
                {errors.childUsername && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.childUsername}
                  </span>
                )}
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                  >
                    <option value="parent">Parent</option>
                    <option value="guardian">Guardian</option>
                    <option value="grandparent">Grandparent</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Agreements & Preferences</h3>
              
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  I agree to the <Link to="/terms" target="_blank">Terms of Service</Link>
                </label>
                {errors.agreeToTerms && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.agreeToTerms}
                  </span>
                )}
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  I agree to the <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </label>
                {errors.agreeToPrivacy && (
                  <span className="error-message">
                    <FaExclamationTriangle /> {errors.agreeToPrivacy}
                  </span>
                )}
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="receiveUpdates"
                    checked={formData.receiveUpdates}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  I want to receive updates about PyGolfers and my child's progress
                </label>
              </div>
            </div>

            {errors.general && (
              <div className="general-error">
                <FaExclamationTriangle />
                {errors.general}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner" />
                  Creating Account...
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  Create Parent Account
                </>
              )}
            </button>
          </form>
        </div>

        <div className="registration-info">
          <div className="info-card">
            <h3>Why Create a Parent Account?</h3>
            <ul>
              <li>Monitor your child's coding progress</li>
              <li>View their achievements and badges</li>
              <li>Set appropriate learning goals</li>
              <li>Receive progress reports</li>
              <li>Ensure safe online learning</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Safety Features</h3>
            <ul>
              <li>COPPA compliant platform</li>
              <li>Secure parent-child linking</li>
              <li>Privacy controls</li>
              <li>Content moderation</li>
              <li>Age-appropriate challenges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentRegistration;