import React from 'react';
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
import AchievementSystem from '../../components/AchievementSystem';
import '../../styles/Profile.css';

const Profile = () => {
  // Mock user data for demonstration
  const user = {
    id: 1,
    name: 'Alex Johnson',
    username: 'alex_coder',
    title: 'Python Enthusiast',
    location: 'San Francisco, CA',
    bio: 'I love coding in Python and solving code golf challenges! I\'ve been learning for 2 years and enjoy sharing solutions with the community.',
    avatar: 'https://i.pravatar.cc/150?img=1',
    joinedDate: '2023-01-15',
    stats: {
      rank: 15,
      challengesCompleted: 42,
      score: 1250
    },
    github: 'alexjohnson',
    twitter: 'alex_codes',
    website: 'alexjohnson.dev',
    badges: ['Code Golf Champion', 'Speed Demon', 'Solution Sharer']
  };

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
            <button className="btn btn-primary">
              <FaEnvelope /> Message
            </button>
            <button className="btn btn-secondary">
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
      
      {/* Achievement System */}
      <AchievementSystem 
        user={user} 
        challengesCompleted={user?.stats?.challengesCompleted || 0}
        totalScore={user?.stats?.score || 0}
      />
    </div>
  );
};

export default Profile;