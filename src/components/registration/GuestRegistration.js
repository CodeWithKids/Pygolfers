import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSmile, FaArrowLeft, FaGamepad, FaExclamationTriangle } from 'react-icons/fa';
import './RegistrationForm.css';
import './GuestRegistration.css';

// List of fun avatars (emojis)
const AVATARS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮',
  '🐨', '🐯', '🦄', '🐸', '🐵', '🐧', '🐦', '🐤', '🦉', '🦇',
  '🐺', '🐗', '🐴', '🦓', '🦄', '🐝', '🦋', '🐢', '🐍', '🦖',
  '🐙', '🦑', '🦀', '🐡', '🐠', '🐬', '🐳', '🦈', '🐅', '🦒',
  '🦘', '🐘', '🦏', '🦛', '🐪', '🐫', '🦙', '🦌', '🐎', '🦚'
];

const GuestRegistration = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    ageGroup: '8-10',
    termsAgreed: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const selectRandomAvatar = () => {
    // Get a random avatar that's different from the current one
    let newAvatar;
    do {
      newAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    } while (newAvatar === formData.avatar && AVATARS.length > 1);
    
    setFormData(prev => ({
      ...prev,
      avatar: newAvatar
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Please choose a nickname';
    } else if (formData.nickname.length < 2) {
      newErrors.nickname = 'Nickname must be at least 2 characters';
    } else if (formData.nickname.length > 20) {
      newErrors.nickname = 'Nickname is too long (max 20 characters)';
    }
    
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = 'You must agree to the terms to continue';
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
        console.log('Guest registration data:', formData);
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // In a real app, you would set up the guest session here
        const guestSession = {
          id: 'guest_' + Math.random().toString(36).substr(2, 9),
          ...formData,
          isGuest: true,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        };
        
        // Save to localStorage
        localStorage.setItem('pygolfers_guest', JSON.stringify(guestSession));
      }, 1000);
    }
  };

  if (isSuccess) {
    return (
      <div className="registration-container success-container">
        <div className="success-message">
          <div className="avatar-large">
            {formData.avatar}
          </div>
          <h2>Welcome, {formData.nickname}!</h2>
          <p>Your guest account is ready to go. Have fun coding!</p>
          
          <div className="guest-features">
            <div className="feature">
              <FaGamepad className="feature-icon" />
              <div>
                <h4>Start Coding</h4>
                <p>Jump right into fun coding challenges</p>
              </div>
            </div>
            
            <div className="feature">
              <FaExclamationTriangle className="feature-icon" />
              <div>
                <h4>Guest Account</h4>
                <p>Your progress will be saved for 30 days on this device</p>
              </div>
            </div>
          </div>
          
          <div className="button-group">
            <button 
              onClick={() => navigate('/challenges')} 
              className="btn btn-primary"
            >
              Start Playing!
            </button>
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
          
          <p className="upgrade-prompt">
            Want to save your progress across devices? <Link to="/register/learner">Create a free account</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="registration-card guest-card">
        <Link to="/register" className="back-link">
          <FaArrowLeft /> Back to Registration Options
        </Link>
        
        <h1>Try PyGolfers as a Guest</h1>
        <p className="subtitle">Start coding right away - no account needed!</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="avatar-selection">
            <div 
              className="avatar-preview"
              onClick={selectRandomAvatar}
              title="Click to change avatar"
            >
              {formData.avatar}
              <span className="avatar-hint">Click to change</span>
            </div>
            <p className="avatar-instruction">Choose your coding avatar!</p>
          </div>
          
          <div className={`form-group ${errors.nickname ? 'error' : ''}`}>
            <label htmlFor="nickname">Your Nickname</label>
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="e.g., CodeMaster"
              value={formData.nickname}
              onChange={handleChange}
              maxLength="20"
              autoFocus
            />
            {errors.nickname && <span className="error-message">{errors.nickname}</span>}
            <p className="hint">This is how others will see you in the game</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="ageGroup">I am</label>
            <div className="input-icon">
              <FaSmile />
            </div>
            <select
              id="ageGroup"
              name="ageGroup"
              value={formData.ageGroup}
              onChange={handleChange}
              className="age-select"
            >
              <option value="8-10">8-10 years old</option>
              <option value="11-13">11-13 years old</option>
              <option value="14-17">14-17 years old</option>
              <option value="18+">18+ years old</option>
            </select>
            <p className="hint">This helps us show you age-appropriate content</p>
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
          </div>
          
          <div className="guest-notice">
            <FaExclamationTriangle className="notice-icon" />
            <p>
              <strong>Guest accounts are temporary.</strong> Your progress will be saved on this device for 30 days. 
              For full access and to save your progress across devices, consider creating a free account.
            </p>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Guest Session...' : 'Start Playing as Guest'}
          </button>
        </form>
        
        <div className="login-redirect">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default GuestRegistration;
