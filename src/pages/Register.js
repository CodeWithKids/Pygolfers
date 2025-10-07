import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaCheckCircle, 
  FaSpinner,
  FaCalendarAlt,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner',
    birthdate: '',
    parentEmail: '',
    gradeLevel: '',
    schoolName: '',
    subjectTaught: '',
    verificationCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    birthdate: false,
    parentEmail: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [age, setAge] = useState(null);
  const [requiresParentalConsent, setRequiresParentalConsent] = useState(false);
  
  // Calculate age when birthdate changes
  useEffect(() => {
    if (formData.birthdate) {
      const today = new Date();
      const birthDate = new Date(formData.birthdate);
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setAge(calculatedAge - 1);
      } else {
        setAge(calculatedAge);
      }
      
      setRequiresParentalConsent(calculatedAge < 13);
    } else {
      setAge(null);
      setRequiresParentalConsent(false);
    }
  }, [formData.birthdate]);
  
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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation based on role
    if (formData.role === 'learner' && !formData.email) {
      // Email optional for learners
    } else if (formData.role !== 'learner' && !formData.email) {
      newErrors.email = 'Email is required for teachers and parents';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
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
    
    // Age verification for learners
    if (formData.role === 'learner') {
      if (!formData.birthdate) {
        newErrors.birthdate = 'Date of birth is required';
      } else if (age !== null && age < 8) {
        newErrors.birthdate = 'You must be at least 8 years old to join PyGolfers';
      } else if (age !== null && age > 14) {
        newErrors.birthdate = 'PyGolfers is designed for kids aged 8-14';
      }
      
      // Parental consent for kids under 13
      if (requiresParentalConsent && !formData.parentEmail) {
        newErrors.parentEmail = 'Parent/Guardian email is required for users under 13';
      } else if (formData.parentEmail && !/\S+@\S+\.\S+/.test(formData.parentEmail)) {
        newErrors.parentEmail = 'Parent email is invalid';
      }
    }
    
    // Additional validation for teachers
    if (formData.role === 'teacher') {
      if (!formData.schoolName.trim()) {
        newErrors.schoolName = 'School/Organization name is required';
      }
      if (!formData.verificationCode.trim()) {
        newErrors.verificationCode = 'Teacher verification code is required';
      }
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
            <input
              type="text"
              name="username"
              placeholder="Username"
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
            <input
              type="email"
              name="email"
              placeholder="Email (Optional for learners)"
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

          {/* Role Selection */}
          <div className="form-group">
            <label className="form-label">I am a:</label>
            <div className="role-selection">
              <div className="role-options">
                <label className={`role-option ${formData.role === 'learner' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="learner"
                    checked={formData.role === 'learner'}
                    onChange={handleChange}
                  />
                  <div className="role-card">
                    <div className="role-icon">👨‍🎓</div>
                    <div className="role-info">
                      <h4>Learner</h4>
                      <p>Ages 8-14</p>
                      <span className="popular-badge">Most Popular</span>
                    </div>
                  </div>
                </label>
                
                <label className={`role-option ${formData.role === 'teacher' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={formData.role === 'teacher'}
                    onChange={handleChange}
                  />
                  <div className="role-card">
                    <div className="role-icon">👩‍🏫</div>
                    <div className="role-info">
                      <h4>Teacher</h4>
                      <p>Educator</p>
                    </div>
                  </div>
                </label>
                
                <label className={`role-option ${formData.role === 'parent' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="parent"
                    checked={formData.role === 'parent'}
                    onChange={handleChange}
                  />
                  <div className="role-card">
                    <div className="role-icon">👨‍👩‍👧‍👦</div>
                    <div className="role-info">
                      <h4>Parent</h4>
                      <p>Guardian</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Age Verification for Learners */}
          {formData.role === 'learner' && (
            <>
              <div className={`form-group ${errors.birthdate ? 'error' : ''}`}>
                <input
                  type="date"
                  name="birthdate"
                  placeholder="Date of Birth"
                  value={formData.birthdate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.birthdate}
                  aria-describedby={errors.birthdate ? 'birthdate-error' : undefined}
                />
                {errors.birthdate && (
                  <span id="birthdate-error" className="error-message">
                    {errors.birthdate}
                  </span>
                )}
                {age !== null && (
                  <div className="age-display">
                    <span className={`age-badge ${age < 8 || age > 14 ? 'invalid' : 'valid'}`}>
                      Age: {age} years old
                    </span>
                  </div>
                )}
              </div>

              {/* Parental Consent Notice */}
              {requiresParentalConsent && (
                <div className="parental-consent-notice">
                  <FaShieldAlt className="consent-icon" />
                  <div className="consent-content">
                    <h4>Parental Consent Required</h4>
                    <p>Since you're under 13, we need your parent or guardian's email address for COPPA compliance.</p>
                  </div>
                </div>
              )}

              {/* Parent Email for Kids Under 13 */}
              {requiresParentalConsent && (
                <div className={`form-group ${errors.parentEmail ? 'error' : ''}`}>
                  <input
                    type="email"
                    name="parentEmail"
                    placeholder="Parent/Guardian email address"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.parentEmail}
                    aria-describedby={errors.parentEmail ? 'parent-email-error' : undefined}
                  />
                  {errors.parentEmail && (
                    <span id="parent-email-error" className="error-message">
                      {errors.parentEmail}
                    </span>
                  )}
                </div>
              )}
            </>
          )}

          {/* Teacher-specific fields */}
          {formData.role === 'teacher' && (
            <>
              <div className={`form-group ${errors.schoolName ? 'error' : ''}`}>
                <input
                  type="text"
                  name="schoolName"
                  placeholder="School or Organization name"
                  value={formData.schoolName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.schoolName}
                  aria-describedby={errors.schoolName ? 'school-error' : undefined}
                />
                {errors.schoolName && (
                  <span id="school-error" className="error-message">
                    {errors.schoolName}
                  </span>
                )}
              </div>

              <div className={`form-group ${errors.verificationCode ? 'error' : ''}`}>
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="Teacher verification code"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.verificationCode}
                  aria-describedby={errors.verificationCode ? 'verification-error' : undefined}
                />
                {errors.verificationCode && (
                  <span id="verification-error" className="error-message">
                    {errors.verificationCode}
                  </span>
                )}
                <div className="help-text">
                  <FaInfoCircle /> Contact us to get your teacher verification code
                </div>
              </div>
            </>
          )}

          <div
            className={`form-group ${errors.password ? 'error' : ''} ${
              touched.password && formData.password ? 'touched' : ''
            }`}
          >
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
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
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
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
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
