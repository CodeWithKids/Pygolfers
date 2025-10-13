import React, { useState } from 'react';
import { FaArrowRight, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';
import { mockLoginAccounts } from '../utils/mockUsers';

const Login = ({ setCurrentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const from = location.state?.from?.pathname || null;
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

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
      newErrors.username = 'Username or email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt with:', formData);
        
        // Check credentials against mock accounts
        const account = mockLoginAccounts.find(
          acc => (acc.username === formData.username || acc.email === formData.username) 
              && acc.password === formData.password
        );
        
        if (account) {
          // Successful login
          setCurrentUser(account.userData);
          setIsLoading(false);
          
          // Redirect based on role or return to previous page
          if (from) {
            navigate(from, { replace: true });
          } else {
            // Default redirects based on role
            switch (account.userData.role) {
              case 'student':
                navigate('/student-dashboard', { replace: true });
                break;
              case 'teacher':
                navigate('/teacher-dashboard', { replace: true });
                break;
              case 'parent':
                navigate('/parent-dashboard', { replace: true });
                break;
              default:
                navigate('/', { replace: true });
            }
          }
        } else {
          // Failed login
          setLoginAttempts(prev => prev + 1);
          setErrors({
            api: loginAttempts >= 2 ? 
              'Too many failed attempts. Please try again in 15 minutes.' :
              'Invalid username or password. Please check your credentials.'
          });
          setIsLoading(false);
        }
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="login-header" variants={itemVariants}>
          <h1>Welcome Back!</h1>
          <p className="subtitle">Sign in to continue your Python learning journey</p>
        </motion.div>
        {message && (
          <motion.div 
          className="login-alert" 
          style={{
            background:'#F76C7B', 
            color:'#fff', 
            borderRadius:'8px', 
            padding:'0.75rem 1rem', 
            marginBottom:'1rem', 
            textAlign:'center'
          }}
          variants={itemVariants}
        >
          {message}
        </motion.div>
        )}
        
        {errors.api && (
          <motion.div 
            className="login-alert" 
            style={{
              background: '#F76C7B', 
              color: '#fff', 
              borderRadius: '8px', 
              padding: '0.75rem 1rem', 
              marginBottom: '1rem', 
              textAlign: 'center'
            }}
            variants={itemVariants}
          >
            {errors.api}
          </motion.div>
        )}
        
        <motion.form className="login-form" onSubmit={handleSubmit} variants={itemVariants}>
          <motion.div className="form-group" variants={itemVariants}>
            <div className={`input-with-icon ${errors.username ? 'error' : ''}`}>
              <input
                type="text"
                name="username"
                placeholder="Username or Email"
                className="login-input"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="username"
                autoFocus
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
            </div>
            {errors.username && (
              <span id="username-error" className="error-message" role="alert" aria-live="polite">
                {errors.username}
              </span>
            )}
          </motion.div>
          
          <motion.div className="form-group" variants={itemVariants}>
            <div className={`input-with-icon ${errors.password ? 'error' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="login-input"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex="-1"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="error-message" role="alert" aria-live="polite">
                {errors.password}
              </span>
            )}
          </motion.div>
          
          <motion.button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <FaArrowRight className="button-icon" />
              </>
            )}
          </motion.button>
          
          <motion.div className="text-center mt-2 mb-2" variants={itemVariants}>
            <Link to="/forgot-password" className="text-sm text-primary hover:text-teal hover:underline">
              Forgot password?
            </Link>
          </motion.div>
          
          <motion.div className="login-footer" variants={itemVariants} style={{ marginTop: '0.5rem' }}>
            <p>Don't have an account?{' '}
              <Link 
                to="/register" 
                className="signup-link"
                onClick={(e) => {
                  if (isLoading) e.preventDefault();
                }}
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
