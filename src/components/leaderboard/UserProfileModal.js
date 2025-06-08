import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaLink, 
  FaStar, 
  FaCode, 
  FaClock, 
  FaMemory, 
  FaChartLine,
  FaUserPlus,
  FaUserCheck,
  FaBookmark,
  FaRegBookmark,
  FaShareAlt,
  FaFlag
} from 'react-icons/fa';

const UserProfileModal = ({ user, onClose, onFollowToggle, onBookmarkToggle }) => {
  if (!user) return null;

  const codeQuality = Math.min(100, Math.max(60, Math.floor(
    60 + 
    (user.challengesCompleted * 0.2) + 
    (user.score * 0.0005) + 
    (Math.random() * 20)
  )));

  return (
    <AnimatePresence>
      <motion.div 
        className="user-profile-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="user-profile-modal"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="close-modal" onClick={onClose}>
            <FaTimes />
          </button>
          
          <div className="user-profile-header">
            <div className="user-avatar-container">
              <img 
                src={user.avatar} 
                alt={user.username} 
                className="profile-avatar"
              />
              <span className={`user-status ${user.isOnline ? 'online' : 'offline'}`}></span>
            </div>
            
            <div className="user-info">
              <h2>{user.fullName || user.username}</h2>
              <p className="username">@{user.username}</p>
              
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-value">{user.rank}</span>
                  <span className="stat-label">Rank</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{user.score.toLocaleString()}</span>
                  <span className="stat-label">Points</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{user.challengesCompleted}</span>
                  <span className="stat-label">Challenges</span>
                </div>
              </div>
              
              <div className="user-actions">
                <button 
                  className={`action-btn ${user.isFollowing ? 'following' : ''}`}
                  onClick={() => onFollowToggle(user.id)}
                >
                  {user.isFollowing ? <><FaUserCheck /> Following</> : <><FaUserPlus /> Follow</>}
                </button>
                <button 
                  className="action-btn bookmark"
                  onClick={() => onBookmarkToggle(user.id)}
                >
                  {user.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <button className="action-btn">
                  <FaShareAlt />
                </button>
                <button className="action-btn report">
                  <FaFlag />
                </button>
              </div>
            </div>
          </div>
          
          <div className="user-profile-content">
            <div className="profile-section">
              <h3>About</h3>
              <div className="about-details">
                <p><strong>Country:</strong> {user.country || 'Not specified'}</p>
                <p><strong>Primary Language:</strong> {user.primaryLanguage || 'Not specified'}</p>
                <p><strong>Member since:</strong> {new Date(user.joinDate).toLocaleDateString()}</p>
                <p><strong>Last active:</strong> {new Date(user.lastActive).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Performance</h3>
              <div className="performance-metrics">
                <div className="metric">
                  <div className="metric-icon"><FaClock /></div>
                  <div>
                    <div className="metric-label">Avg. Execution Time</div>
                    <div className="metric-value">{user.performance?.avgExecutionTime || 'N/A'}</div>
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-icon"><FaMemory /></div>
                  <div>
                    <div className="metric-label">Avg. Memory Usage</div>
                    <div className="metric-value">{user.performance?.avgMemoryUsage || 'N/A'}</div>
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-icon"><FaCode /></div>
                  <div>
                    <div className="metric-label">Avg. Code Length</div>
                    <div className="metric-value">{user.performance?.avgCodeLength || 'N/A'}</div>
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-icon"><FaChartLine /></div>
                  <div>
                    <div className="metric-label">Success Rate</div>
                    <div className="metric-value">{user.performance?.successRate || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Code Quality</h3>
              <div className="code-quality-meter">
                <div 
                  className="code-quality-fill" 
                  style={{ width: `${codeQuality}%` }}
                >
                  <span>{codeQuality}%</span>
                </div>
              </div>
              <div className="code-quality-details">
                <p>Based on code efficiency, readability, and best practices</p>
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Badges & Achievements</h3>
              <div className="badges-container">
                {user.badges?.length > 0 ? (
                  user.badges.map((badge, index) => (
                    <span key={index} className={`badge ${badge}`}>
                      {badge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  ))
                ) : (
                  <p>No badges yet</p>
                )}
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Activity Heatmap</h3>
              <div className="activity-heatmap">
                {Array.from({ length: 12 }).map((_, week) => (
                  <div key={week} className="heatmap-week">
                    {Array.from({ length: 7 }).map((_, day) => {
                      const activity = Math.floor(Math.random() * 5);
                      return (
                        <div 
                          key={day} 
                          className={`heatmap-day level-${activity}`}
                          data-tooltip={`${activity} contributions on day ${week * 7 + day}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="heatmap-legend">
                <span>Less</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`legend-block level-${i}`} />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfileModal;
