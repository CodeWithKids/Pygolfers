import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserGraduate, FaChalkboardTeacher, FaUserFriends, FaKey, FaUserAlt, FaShieldAlt, FaUsers, FaChartLine, FaBook, FaUserShield, FaSignInAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'learner'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const roles = [
    { 
      id: 'learner', 
      title: 'I\'m a Learner', 
      icon: <FaUserGraduate className="role-main-icon" />,
      description: 'Start coding with Python through fun golfing challenges and track your progress.',
      color: '#36B6A8',
      popular: true,
      features: [
        { text: 'Interactive Tutorials', icon: '🧩' },
        { text: 'Progress Tracking', icon: '📈' },
        { text: 'Earn Badges', icon: '🏅' }
      ],
      benefits: [
        'Learn to Code: Interactive lessons designed for beginners.',
        'Join a Community: Connect with other learners and educators.',
        'Safe & Secure: COPPA compliant and student privacy focused.'
      ]
    },
    { 
      id: 'teacher', 
      title: 'I\'m a Teacher', 
      icon: <FaChalkboardTeacher className="role-main-icon" />,
      description: 'Create classrooms, assign challenges, and monitor student progress with our educator tools.',
      color: '#F76C7B',
      features: [
        { text: 'Classroom Management', icon: <FaUsers className="feature-icon-svg" /> },
        { text: 'Student Analytics', icon: <FaChartLine className="feature-icon-svg" /> },
        { text: 'Lesson Plans', icon: <FaBook className="feature-icon-svg" /> }
      ],
      benefits: [
        'Engage Students: Interactive coding challenges that make learning fun.',
        'Track Progress: Monitor student performance with detailed analytics.',
        'Save Time: Ready-to-use lesson plans and resources.'
      ]
    },
    { 
      id: 'parent', 
      title: 'I\'m a Parent', 
      icon: <FaUserFriends className="role-main-icon" />,
      description: 'Support your child\'s coding journey and track their learning progress.',
      color: '#FFD43B',
      features: [
        { text: 'Progress Reports', icon: '📋' },
        { text: 'Activity Tracking', icon: <FaChartLine className="feature-icon-svg" /> },
        { text: 'Safe Environment', icon: <FaShieldAlt className="feature-icon-svg" /> }
      ],
      benefits: [
        'Stay Informed: Regular updates on your child\'s progress.',
        'Safe Learning: COPPA compliant platform designed for kids.',
        'Encourage Growth: Celebrate achievements and milestones.'
      ]
    },
    { 
      id: 'guest', 
      title: 'Try as Guest', 
      icon: <FaUserAlt className="role-main-icon" />,
      description: 'Explore PyGolfers with limited access. No account required.',
      color: '#607D8B',
      features: [
        { text: 'No Commitment', icon: '🔓' },
        { text: 'Sample Content', icon: '🎮' },
        { text: 'Upgrade Anytime', icon: '🔄' }
      ],
      benefits: [
        'Try Before You Commit: Explore our platform features.',
        'Sample Challenges: Get a taste of our coding exercises.',
        'Easy Upgrade: Convert to a full account anytime.'
      ]
    }
  ];

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
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if ((formData.role === 'teacher' || formData.role === 'parent') && !formData.email) {
      newErrors.email = 'Email is required for this role';
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
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
    
    // Scroll to top if there are errors
    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration data:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      // Scroll to top to show success message
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="registration-container success-container">
        <motion.div 
          className="success-message"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#36B6A8"/>
            </svg>
          </div>
          <h2>Welcome to PyGolfers!</h2>
          <p>Your {formData.role} account has been created successfully.</p>
          
          <div className="success-actions">
            <button 
              onClick={() => navigate('/challenges')} 
              className="btn btn-primary"
            >
              Start Exploring
            </button>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <motion.div 
        className="registration-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="registration-header">
          <h1>Join PyGolfers</h1>
          <p className="subtitle">Start your Python coding adventure today!</p>
        </div>

        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div 
              className="alert alert-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Please fix the errors in the form to continue.
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="registration-form registration-grid" autoComplete="on" aria-label="Registration Form">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Alex Johnson"
                value={formData.fullName}
                onChange={handleChange}
                className={`input-unified${errors.fullName ? ' error' : ''}`}
                autoComplete="name"
                aria-label="Full Name"
                required
                tabIndex={1}
              />
            </div>
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="cool_coder123"
                value={formData.username}
                onChange={handleChange}
                className={`input-unified${errors.username ? ' error' : ''}`}
                autoComplete="username"
                aria-label="Username"
                required
                tabIndex={2}
              />
            </div>
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email {formData.role === 'learner' && '(Optional)'}</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`input-unified${errors.email ? ' error' : ''}`}
                autoComplete="email"
                aria-label="Email"
                tabIndex={3}
                required={formData.role === 'teacher' || formData.role === 'parent'}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="password-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-unified${errors.password ? ' error' : ''}`}
                  autoComplete="new-password"
                  aria-label="Password"
                  required
                  tabIndex={4}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-unified${errors.confirmPassword ? ' error' : ''}`}
                  autoComplete="new-password"
                  aria-label="Confirm Password"
                  required
                  tabIndex={5}
                />
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <div className="role-selection">
              {roles.map((role, index) => (
                <motion.div 
                  key={role.id}
                  className={`role-option ${formData.role === role.id ? 'active' : ''} ${role.popular ? 'popular' : ''}`}
                  onClick={() => setFormData({...formData, role: role.id})}
                  style={{
                    '--role-color': role.color,
                    borderColor: formData.role === role.id ? role.color : '#e2e8f0',
                    background: formData.role === role.id ? `${role.color}08` : 'white',
                    '--role-hover': `${role.color}15`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ 
                    y: -4,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {formData.role === role.id && (
                    <motion.div 
                      className="selected-indicator"
                      style={{ backgroundColor: role.color }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    </motion.div>
                  )}
                  {role.popular && (
                    <motion.div 
                      className="popular-badge" 
                      style={{ backgroundColor: role.color }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    >
                      Most Popular
                    </motion.div>
                  )}
                  <motion.div 
                    className="role-icon" 
                    style={{ 
                      color: role.color, 
                      backgroundColor: `${role.color}15` 
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {role.icon}
                  </motion.div>
                  <div className="role-details">
                    <h3>
                      {role.title}
                    </h3>
                    <p className="role-description">{role.description}</p>
                    <ul className="role-features">
                      {role.features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <span className="feature-icon">{feature.icon}</span>
                          <span>{feature.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
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
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>

          <div className="form-footer">
            <div className="benefits-section">
              <h3>Why Choose PyGolfers?</h3>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <FaShieldAlt />
                  </div>
                  <h4>Safe & Secure</h4>
                  <p>COPPA compliant with robust privacy controls</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <FaUserGraduate />
                  </div>
                  <h4>Kid-Friendly</h4>
                  <p>Designed specifically for young learners</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <FaChartLine />
                  </div>
                  <h4>Track Progress</h4>
                  <p>Monitor learning journey with detailed analytics</p>
                </div>
              </div>
            </div>
            
            <div className="auth-actions">
              <p className="login-prompt">
                Already have an account? <Link to="/login" className="login-link">
                  <FaSignInAlt className="inline-icon" /> Log in here
                </Link>
              </p>
              <p className="terms">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="text-link">Terms</Link> and{' '}
                <Link to="/privacy" className="text-link">Privacy Policy</Link>.
                <br />
                <FaShieldAlt className="inline-icon" />{' '}
                <small>COPPA compliant and student privacy focused</small>
              </p>
            </div>
          </div>
          <button type="submit" className="btn btn-primary register-btn" disabled={isSubmitting} tabIndex={6}>
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </button>
        </form>
      </motion.div>
      
      <div className="decoration-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
};

export default Registration;
