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
  FaTimes
} from 'react-icons/fa';
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
    avatarPreview: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft /> Back
        </button>
        <h1>Account Settings</h1>
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
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    disabled
                  />
                  <p className="input-hint">Username cannot be changed</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ''}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
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
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                
                <div className="form-divider">
                  <span>Change Password</span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                    />
                  </div>
                  {errors.currentPassword && (
                    <p className="error-message">{errors.currentPassword}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="error-message">{errors.newPassword}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
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
                  <label htmlFor="website">
                    <FaGlobe className="social-icon" />
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.socialLinks.website}
                    onChange={handleSocialLinkChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="github">
                    <FaGithub className="social-icon" />
                    GitHub
                  </label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">github.com/</span>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={formData.socialLinks.github}
                      onChange={handleSocialLinkChange}
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="twitter">
                    <FaTwitter className="social-icon" />
                    Twitter
                  </label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">twitter.com/</span>
                    <input
                      type="text"
                      id="twitter"
                      name="twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleSocialLinkChange}
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="linkedin">
                    <FaLinkedinIn className="social-icon" />
                    LinkedIn
                  </label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">linkedin.com/in/</span>
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleSocialLinkChange}
                      placeholder="username"
                    />
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
