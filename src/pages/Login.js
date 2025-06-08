import React, { useState } from 'react';
import { FaUser, FaLock, FaArrowRight, FaUserPlus } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const from = location.state?.from?.pathname || '/';
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Login attempt with:', formData);
        setIsLoading(false);
        // In a real app, set auth state here
        navigate(from, { replace: true });
      }, 1000);
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p className="subtitle">Sign in to continue your Python learning journey</p>
        </div>
        {message && (
          <div className="login-alert" style={{background:'#F76C7B', color:'#fff', borderRadius:'8px', padding:'0.75rem 1rem', marginBottom:'1rem', textAlign:'center'}}>
            {message}
          </div>
        )}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className={`input-with-icon ${errors.username ? 'error' : ''}`}>
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username or Email"
                className="login-input"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <div className={`input-with-icon ${errors.password ? 'error' : ''}`}>
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" name="remember" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          
          <motion.button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
            <FaArrowRight className="button-icon" />
          </motion.button>
          

        </form>
        
        <div className="register-cta">
          Don't have an account? <Link to="/register">Sign up <FaUserPlus /></Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
