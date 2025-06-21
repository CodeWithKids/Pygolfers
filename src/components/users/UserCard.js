import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaTrophy, FaCode, FaUserFriends, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdTrophy } from 'react-icons/io';
import { RiMedalFill } from 'react-icons/ri';
import './UserCard.css';

const UserCard = ({ user, onFollow, isFollowing = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
    }
  };

  const toggleBio = (e) => {
    e.stopPropagation();
    setShowFullBio(!showFullBio);
  };

  const handleFollowClick = (e) => {
    e.stopPropagation();
    if (onFollow) onFollow(user.id, !isFollowing);
  };

  return (
    <motion.div
      className={`user-card ${user.role?.toLowerCase()}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={`User profile for ${user.name}`}
    >
      <div className="user-card-header">
        <div className="user-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          {user.isVerified && <span className="verified-badge" aria-label="Verified user">✓</span>}
        </div>
        
        <div className="user-info">
          <h3 className="user-name">
            {user.name}
            {user.role === 'teacher' && <span className="role-badge teacher" aria-label="Teacher">👨‍🏫</span>}
            {user.role === 'student' && <span className="role-badge student" aria-label="Student">👩‍🎓</span>}
          </h3>
          <p className="user-username">@{user.username}</p>
          <div className="user-stats">
            <span className="stat">
              <FaStar className="stat-icon" />
              <span>{user.stats?.stars || 0}</span>
            </span>
            <span className="stat">
              <IoMdTrophy className="stat-icon" />
              <span>{user.stats?.trophies || 0}</span>
            </span>
            <span className="stat">
              <FaCode className="stat-icon" />
              <span>{user.stats?.projects || 0}</span>
            </span>
          </div>
        </div>
        
        <button 
          className={`follow-button ${isFollowing ? 'following' : ''}`}
          onClick={handleFollowClick}
          aria-label={isFollowing ? 'Unfollow user' : 'Follow user'}
        >
          {isFollowing ? (
            <>
              <FaUserFriends className="follow-icon" /> Following
            </>
          ) : (
            <>
              <FaUserFriends className="follow-icon" /> Follow
            </>
          )}
        </button>
      </div>
      
      <div className="user-card-body">
        <div className={`user-bio ${showFullBio ? 'expanded' : ''}`}>
          <p>
            {showFullBio ? user.bio : `${user.bio?.substring(0, 100)}${user.bio?.length > 100 ? '...' : ''}`}
            {user.bio?.length > 100 && (
              <button 
                className="read-more" 
                onClick={toggleBio}
                aria-expanded={showFullBio}
                aria-label={showFullBio ? 'Show less' : 'Read more'}
              >
                {showFullBio ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </div>
        
        {user.skills && user.skills.length > 0 && (
          <div className="user-skills">
            <h4>Skills</h4>
            <div className="skill-tags">
              {user.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="user-achievements">
          {user.achievements?.slice(0, 3).map((achievement, index) => (
            <div key={index} className="achievement-badge" title={achievement.name}>
              <RiMedalFill className="achievement-icon" />
              <span className="achievement-name">{achievement.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="user-card-footer">
        <div className="user-activity">
          <span>Joined {user.joinDate || 'recently'}</span>
          <span>•</span>
          <span>{user.lastActive || 'Active recently'}</span>
        </div>
        <button 
          className="like-button" 
          aria-label={user.isLiked ? 'Unlike' : 'Like'}
          onClick={(e) => {
            e.stopPropagation();
            // Handle like action
          }}
        >
          {user.isLiked ? (
            <FaHeart className="like-icon liked" />
          ) : (
            <FaRegHeart className="like-icon" />
          )}
          <span className="like-count">{user.likes || 0}</span>
        </button>
      </div>
      
      {/* Animated elements that appear on hover */}
      {isHovered && (
        <div className="hover-elements">
          <div className="hover-orb orb-1"></div>
          <div className="hover-orb orb-2"></div>
          <div className="hover-orb orb-3"></div>
        </div>
      )}
    </motion.div>
  );
};

export default UserCard;
