import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaTrophy, 
  FaChartLine, 
  FaCode, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaEnvelope,
  FaGithub,
  FaTwitter,
  FaGlobe
} from 'react-icons/fa';
import '../../styles/Profile.css';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        // The /api prefix will be proxied to http://localhost:3001 by setupProxy.js
        const response = await fetch(`/api/users/${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message || 'Failed to load profile. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have a username
    if (username) {
      fetchUserProfile();
    } else {
      setError('No username provided');
      setIsLoading(false);
    }
  }, [username]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading profile</h2>
        <p>{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="not-found">
        <h2>User not found</h2>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={`${user.username}'s avatar`} 
              className="avatar"
            />
          ) : (
            <div className="avatar-fallback">
              <FaUser />
            </div>
          )}
        </div>
        
        <div className="profile-info">
          <h1>{user.name || user.username}</h1>
          
          {user.title && <p className="profile-title">{user.title}</p>}
          
          <div className="profile-meta">
            {user.location && (
              <span className="profile-location">
                <FaMapMarkerAlt /> {user.location}
              </span>
            )}
            {user.joinedDate && (
              <span className="join-date">
                <FaCalendarAlt /> Joined {new Date(user.joinedDate).toLocaleDateString()}
              </span>
            )}
          </div>
          
          {user.bio && <p className="profile-bio">{user.bio}</p>}
          
          <div className="profile-stats">
            <div className="stat">
              <FaTrophy className="stat-icon" />
              <span className="stat-value">{user.stats?.rank || 'N/A'}</span>
              <span className="stat-label">Rank</span>
            </div>
            <div className="stat">
              <FaCode className="stat-icon" />
              <span className="stat-value">{user.stats?.challengesCompleted || 0}</span>
              <span className="stat-label">Challenges</span>
            </div>
            <div className="stat">
              <FaChartLine className="stat-icon" />
              <span className="stat-value">{user.stats?.score || 0}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
          
          <div className="profile-actions">
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/messages/${user.username}`)}
            >
              <FaEnvelope /> Message
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate(`/users/${user.username}/challenges`)}
            >
              View Challenges
            </button>
          </div>
          
          {(user.github || user.twitter || user.website) && (
            <div className="social-links">
              {user.github && (
                <a 
                  href={`https://github.com/${user.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaGithub />
                </a>
              )}
              {user.twitter && (
                <a 
                  href={`https://twitter.com/${user.twitter}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaTwitter />
                </a>
              )}
              {user.website && (
                <a 
                  href={user.website.startsWith('http') ? user.website : `https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaGlobe />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
