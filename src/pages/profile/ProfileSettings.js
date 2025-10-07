import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaGlobe, 
  FaGithub, 
  FaTwitter, 
  FaLinkedinIn,
  FaArrowLeft,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaBell,
  FaPalette,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaExternalLinkAlt,
  FaUserShield,
  FaUsers,
  FaEyeSlash as FaHide,
  FaDownload,
  FaComments,
  FaClock,
  FaCalendar,
  FaTrophy,
  FaChartLine,
  FaFileExport,
  FaInfoCircle,
  FaBan,
  FaUserTimes,
  FaPlus
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ProfileSettings.css';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    socialLinks: {
      website: '',
      github: '',
      twitter: '',
      linkedin: ''
    },
    avatar: null,
    avatarPreview: '',
    // Privacy & Safety
    profileVisibility: 'public',
    allowMessages: 'friends',
    hideRealName: false,
    parentEmail: '',
    parentName: '',
    allowParentAccess: true,
    blockedUsers: [
      { id: 1, username: 'spam_user', name: 'Spam User', blockedDate: '2024-01-15', reason: 'Spam messages' },
      { id: 2, username: 'rude_coder', name: 'Rude Coder', blockedDate: '2024-01-10', reason: 'Inappropriate behavior' }
    ],
    // Notifications
    emailNotifications: true,
    challengeReminders: true,
    eventNotifications: true,
    communityUpdates: true,
    achievementAlerts: true,
    // Preferences
    theme: 'light',
    language: 'en',
    difficultyLevel: 'intermediate',
    emailFrequency: 'weekly'
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  // Load user data from API
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load user data');
        }
        
        const userData = await response.json();
        
        // Update form data with user data from API
        setFormData(prev => ({
          ...prev,
          fullName: userData.fullName || '',
          username: userData.username || '',
          email: userData.email || '',
          bio: userData.bio || '',
          socialLinks: {
            website: userData.website || '',
            github: userData.github || '',
            twitter: userData.twitter || '',
            linkedin: userData.linkedin || ''
          },
          avatar: userData.avatar || null,
          avatarPreview: userData.avatar || ''
        }));
      } catch (error) {
        console.error('Error loading user data:', error);
        // You might want to show an error message to the user here
      }
    };
    
    loadUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  // Password strength calculation
  useEffect(() => {
    if (!formData.newPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.newPassword.length >= 8) strength += 1;
    if (formData.newPassword.match(/[a-z]+/)) strength += 1;
    if (formData.newPassword.match(/[A-Z]+/)) strength += 1;
    if (formData.newPassword.match(/[0-9]+/)) strength += 1;
    if (formData.newPassword.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 1;

    setPasswordStrength(strength);
  }, [formData.newPassword]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: file,
          avatarPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleAvatarChange({ target: { files: [file] } });
    }
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'red' };
      case 2:
      case 3:
        return { label: 'Medium', color: 'yellow' };
      case 4:
      case 5:
        return { label: 'Strong', color: 'green' };
      default:
        return { label: 'Weak', color: 'red' };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.newPassword && formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (formData.newPassword && !formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required to change password';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUnblockUser = (userId) => {
    if (window.confirm('Are you sure you want to unblock this user?')) {
      setFormData(prev => ({
        ...prev,
        blockedUsers: prev.blockedUsers.filter(user => user.id !== userId)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission
      const updateData = new FormData();
      updateData.append('fullName', formData.fullName);
      updateData.append('bio', formData.bio);
      updateData.append('website', formData.socialLinks.website);
      updateData.append('github', formData.socialLinks.github);
      updateData.append('twitter', formData.socialLinks.twitter);
      updateData.append('linkedin', formData.socialLinks.linkedin);
      
      // Only append password if it's being changed
      if (formData.newPassword) {
        updateData.append('currentPassword', formData.currentPassword);
        updateData.append('newPassword', formData.newPassword);
      }
      
      // Append avatar if it's a new file
      if (formData.avatar && formData.avatar instanceof File) {
        updateData.append('avatar', formData.avatar);
      }
      
      // Send update request to API
      const response = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: updateData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      const updatedUser = await response.json();
      
      // Update form data with the server response
      setFormData(prev => ({
        ...prev,
        fullName: updatedUser.fullName,
        bio: updatedUser.bio,
        socialLinks: {
          website: updatedUser.website || '',
          github: updatedUser.github || '',
          twitter: updatedUser.twitter || '',
          linkedin: updatedUser.linkedin || ''
        },
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        avatar: updatedUser.avatar || null,
        avatarPreview: updatedUser.avatar || ''
      }));
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="settings-container">
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="success-toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FaCheckCircle className="success-icon" />
            <span>Profile updated successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="settings-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="header-branding">
          <span className="logo-icon">🐍⛳</span>
          <h1>PyGolfers Settings</h1>
        </div>
        <p className="header-subtitle">Customize your coding profile and preferences</p>
      </div>
      
      <div className="settings-layout">
        <div className="settings-sidebar">
          <button 
            className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="tab-icon" />
            Profile
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <FaLock className="tab-icon" />
            Account
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <FaGlobe className="tab-icon" />
            Social Links
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <FaShieldAlt className="tab-icon" />
            Privacy & Safety
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell className="tab-icon" />
            Notifications
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <FaPalette className="tab-icon" />
            Preferences
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <FaTrash className="tab-icon" />
            Account
          </button>
        </div>
        
        <div className="settings-content">
          <form onSubmit={handleSubmit}>
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h2>Profile Information</h2>
                <p className="section-description">Update your profile details and avatar</p>
                
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    {formData.avatarPreview ? (
                      <img 
                        src={formData.avatarPreview} 
                        alt="Profile preview" 
                        className="avatar"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        <FaUser />
                      </div>
                    )}
                  </div>
                  <div className="avatar-upload-controls">
                    <label className="upload-button">
                      Choose Photo
                      <input 
                        type="file" 
                        onChange={handleAvatarChange}
                        accept="image/*"
                        className="file-input"
                      />
                    </label>
                    <button 
                      type="button" 
                      className="remove-button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          avatar: null,
                          avatarPreview: ''
                        }));
                      }}
                      disabled={!formData.avatarPreview}
                    >
                      <FaTimes /> Remove
                    </button>
                    <p className="avatar-hint">JPG, GIF or PNG. Max size 2MB</p>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Username (cannot be changed)"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    placeholder="Bio - Tell us about yourself..."
                    rows="4"
                    maxLength="200"
                  />
                  <div className="char-count">
                    {formData.bio ? formData.bio.length : 0}/200
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'account' && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                <p className="section-description">Update your email and password</p>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                
                <div className="form-divider">
                  <span>Change Password</span>
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Current Password"
                    />
                  </div>
                  {errors.currentPassword && (
                    <p className="error-message">{errors.currentPassword}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="New Password"
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="error-message">{errors.newPassword}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm New Password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <div className="password-requirements">
                  <p>Password must contain:</p>
                  <ul>
                    <li className={formData.newPassword?.length >= 8 ? 'met' : ''}>
                      At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(formData.newPassword) ? 'met' : ''}>
                      At least one uppercase letter
                    </li>
                    <li className={/[0-9]/.test(formData.newPassword) ? 'met' : ''}>
                      At least one number
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'social' && (
              <div className="settings-section">
                <h2>Social Links</h2>
                <p className="section-description">Add links to your social profiles</p>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaGlobe className="input-icon" />
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.socialLinks.website}
                      onChange={handleSocialLinkChange}
                      placeholder="Website - https://yourwebsite.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaGithub className="input-icon" />
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={formData.socialLinks.github}
                      onChange={handleSocialLinkChange}
                      placeholder="GitHub - github.com/username"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaTwitter className="input-icon" />
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleSocialLinkChange}
                      placeholder="Twitter - twitter.com/username"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaLinkedinIn className="input-icon" />
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleSocialLinkChange}
                      placeholder="LinkedIn - linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Privacy & Safety Tab */}
            {activeTab === 'privacy' && (
              <div className="settings-section">
                <h2>Privacy & Safety</h2>
                <p className="section-description">Control who can see your profile and contact you</p>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaEye className="input-icon" />
                    <select
                      id="profileVisibility"
                      name="profileVisibility"
                      value={formData.profileVisibility}
                      onChange={handleChange}
                    >
                      <option value="public">Public - Everyone can see my profile</option>
                      <option value="friends">Friends Only - Only my friends can see my profile</option>
                      <option value="private">Private - Only I can see my profile</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaComments className="input-icon" />
                    <select
                      id="allowMessages"
                      name="allowMessages"
                      value={formData.allowMessages}
                      onChange={handleChange}
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="none">No one</option>
                    </select>
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="hideRealName"
                      checked={formData.hideRealName}
                      onChange={(e) => setFormData(prev => ({ ...prev, hideRealName: e.target.checked }))}
                    />
                    <span className="checkmark"></span>
                    <FaHide className="checkbox-icon" />
                    Hide my real name from other users
                  </label>
                </div>

                <div className="form-divider">
                  <span>Parent/Guardian Information</span>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="parentEmail"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      placeholder="Parent/Guardian Email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Parent/Guardian Name"
                    />
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="allowParentAccess"
                      checked={formData.allowParentAccess}
                      onChange={(e) => setFormData(prev => ({ ...prev, allowParentAccess: e.target.checked }))}
                    />
                    <span className="checkmark"></span>
                    <FaUserShield className="checkbox-icon" />
                    Allow parent/guardian to view my progress and activity
                  </label>
                </div>

                <div className="form-divider">
                  <span>Blocked Users</span>
                </div>

                <div className="blocked-users-section">
                  {formData.blockedUsers.length === 0 ? (
                    <div className="empty-state">
                      <FaBan className="empty-icon" />
                      <p>No blocked users</p>
                      <span>Users you block won't be able to message you or see your profile.</span>
                    </div>
                  ) : (
                    <div className="blocked-users-list">
                      {formData.blockedUsers.map(user => (
                        <div key={user.id} className="blocked-user-item">
                          <div className="user-info">
                            <div className="user-avatar">
                              <FaUser />
                            </div>
                            <div className="user-details">
                              <h4>{user.name}</h4>
                              <span className="username">@{user.username}</span>
                              <div className="block-info">
                                <span className="block-date">Blocked on {new Date(user.blockedDate).toLocaleDateString()}</span>
                                <span className="block-reason">Reason: {user.reason}</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            type="button"
                            className="unblock-button"
                            onClick={() => handleUnblockUser(user.id)}
                            title="Unblock user"
                          >
                            <FaUserTimes />
                            Unblock
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Preferences</h2>
                <p className="section-description">Choose what notifications you want to receive</p>
                
                <div className="notification-group">
                  <h3>Learning & Progress</h3>
                  <div className="notification-items">
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="achievementAlerts"
                          checked={formData.achievementAlerts}
                          onChange={(e) => setFormData(prev => ({ ...prev, achievementAlerts: e.target.checked }))}
                        />
                        <span className="checkmark"></span>
                        <FaTrophy className="checkbox-icon" />
                        Achievement alerts - Get notified when you earn badges
                      </label>
                    </div>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="challengeReminders"
                          checked={formData.challengeReminders}
                          onChange={(e) => setFormData(prev => ({ ...prev, challengeReminders: e.target.checked }))}
                        />
                        <span className="checkmark"></span>
                        <FaClock className="checkbox-icon" />
                        Challenge reminders - Daily coding reminders
                      </label>
                    </div>
                  </div>
                </div>

                <div className="notification-group">
                  <h3>Social & Community</h3>
                  <div className="notification-items">
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="communityUpdates"
                          checked={formData.communityUpdates}
                          onChange={(e) => setFormData(prev => ({ ...prev, communityUpdates: e.target.checked }))}
                        />
                        <span className="checkmark"></span>
                        <FaUsers className="checkbox-icon" />
                        Community updates - Forum posts and discussions
                      </label>
                    </div>

                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="eventNotifications"
                          checked={formData.eventNotifications}
                          onChange={(e) => setFormData(prev => ({ ...prev, eventNotifications: e.target.checked }))}
                        />
                        <span className="checkmark"></span>
                        <FaCalendar className="checkbox-icon" />
                        Event notifications - Upcoming coding events
                      </label>
                    </div>
                  </div>
                </div>

                <div className="notification-group">
                  <h3>Email Settings</h3>
                  <div className="notification-items">
                    <div className="form-group checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={(e) => setFormData(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                        />
                        <span className="checkmark"></span>
                        <FaBell className="checkbox-icon" />
                        Email notifications - Receive updates via email
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="settings-section">
                <h2>Preferences</h2>
                <p className="section-description">Customize your PyGolfers experience</p>
                
                <div className="form-group">
                  <div className="input-with-icon">
                    <FaPalette className="input-icon" />
                    <select
                      id="theme"
                      name="theme"
                      value={formData.theme}
                      onChange={handleChange}
                    >
                      <option value="light">Light Mode</option>
                      <option value="dark">Dark Mode</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaGlobe className="input-icon" />
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaChartLine className="input-icon" />
                    <select
                      id="difficultyLevel"
                      name="difficultyLevel"
                      value={formData.difficultyLevel}
                      onChange={handleChange}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <select
                      id="emailFrequency"
                      name="emailFrequency"
                      value={formData.emailFrequency}
                      onChange={handleChange}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>

                <div className="form-divider">
                  <span>Code Editor Preferences</span>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaPalette className="input-icon" />
                    <select
                      id="editorTheme"
                      name="editorTheme"
                      value={formData.editorTheme || 'vs-dark'}
                      onChange={handleChange}
                    >
                      <option value="vs-dark">VS Code Dark</option>
                      <option value="vs-light">VS Code Light</option>
                      <option value="monokai">Monokai</option>
                      <option value="solarized-light">Solarized Light</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-with-icon">
                    <FaChartLine className="input-icon" />
                    <select
                      id="fontSize"
                      name="fontSize"
                      value={formData.fontSize || 'medium'}
                      onChange={handleChange}
                    >
                      <option value="small">Small (12px)</option>
                      <option value="medium">Medium (14px)</option>
                      <option value="large">Large (16px)</option>
                      <option value="xlarge">Extra Large (18px)</option>
                    </select>
                  </div>
                </div>

                <div className="form-divider">
                  <span>Accessibility</span>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="screenReaderSupport"
                      checked={formData.screenReaderSupport || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, screenReaderSupport: e.target.checked }))}
                    />
                    <span className="checkmark"></span>
                    <FaInfoCircle className="checkbox-icon" />
                    Enable screen reader support
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="reduceAnimations"
                      checked={formData.reduceAnimations || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, reduceAnimations: e.target.checked }))}
                    />
                    <span className="checkmark"></span>
                    <FaPalette className="checkbox-icon" />
                    Reduce animations for better performance
                  </label>
                </div>
              </div>
            )}
            
            {/* Account Management Tab */}
            {activeTab === 'account' && (
              <div className="settings-section">
                <h2>Account Management</h2>
                <p className="section-description">Manage your account data and settings</p>
                
                <div className="form-divider">
                  <span>Data & Privacy</span>
                </div>

                <div className="privacy-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      // Handle data download
                      console.log('Downloading user data...');
                    }}
                  >
                    <FaDownload className="btn-icon" />
                    Download My Data
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => {
                      // Handle progress export
                      console.log('Exporting progress...');
                    }}
                  >
                    <FaFileExport className="btn-icon" />
                    Export Progress
                  </button>
                </div>

                <div className="form-divider">
                  <span>Danger Zone</span>
                </div>

                <div className="danger-zone">
                  <div className="danger-action">
                    <div className="danger-content">
                      <h4>Deactivate Account</h4>
                      <p>Temporarily disable your account. You can reactivate it anytime by logging back in.</p>
                    </div>
                    <button 
                      type="button" 
                      className="btn-warning"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to deactivate your account? You can reactivate it by logging back in.')) {
                          console.log('Deactivating account...');
                        }
                      }}
                    >
                      Deactivate Account
                    </button>
                  </div>
                  
                  <div className="danger-action">
                    <div className="danger-content">
                      <h4>Delete Account</h4>
                      <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
                    </div>
                    <button 
                      type="button" 
                      className="btn-danger"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone!')) {
                          if (window.confirm('This will delete ALL your data including progress, achievements, and challenges. Type "DELETE" to confirm.')) {
                            console.log('Deleting account...');
                          }
                        }
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="save-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="button-icon" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
