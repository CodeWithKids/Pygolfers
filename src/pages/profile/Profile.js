import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { 
  FaUser, 
  FaTrophy, 
  FaChartLine, 
  FaCode, 
  FaCalendarAlt, 
  FaEdit, 
  FaGithub, 
  FaTwitter, 
  FaGlobe,
  FaArrowLeft,
  FaChalkboardTeacher,
  FaSchool,
  FaBook,
  FaUsers,
  FaUserGraduate,
  FaUserTie,
  FaUserFriends,
  FaUserShield,
  FaGraduationCap,
  FaBell,
  FaUserCog,
  FaStar,
  FaChild
} from 'react-icons/fa';

import '../../styles/Profile.css';

// User type configuration
const userTypeConfig = {
  teacher: {
    icon: FaChalkboardTeacher,
    badge: 'Teacher',
    color: '#4a6fa5',
    fields: ['school', 'subjects', 'gradeLevels', 'students']
  },
  learner: {
    icon: FaGraduationCap,
    badge: 'Learner',
    color: '#6a4c93',
    fields: ['grade', 'interests', 'learningGoals']
  },
  parent: {
    icon: FaUserFriends,
    badge: 'Parent',
    color: '#4a8c7d',
    fields: ['children', 'notifications', 'monitoring']
  },
  guest: {
    icon: FaUser,
    badge: 'Guest',
    color: '#666',
    fields: []
  }
};

// Mock data - replace with API calls
const mockUser = {
  id: 1,
  username: 'pygolfer123',
  fullName: 'Alex Johnson',
  bio: 'Python enthusiast and code golfer. Love solving problems with minimal code!',
  avatar: 'https://i.pravatar.cc/150?img=32',
  joinDate: '2023-01-15T10:30:00Z',
  userType: 'teacher', // 'learner', 'parent', 'teacher', or 'guest'
  // Learner-specific fields
  goals: [
    { id: 1, name: 'Complete 10 challenges', completed: true },
    { id: 2, name: 'Reach level 5', completed: false },
  ],
  // Parent-specific fields
  children: [
    { id: 1, name: 'John Doe', age: 12 },
    { id: 2, name: 'Jane Doe', age: 10 },
  ],
  // Teacher-specific fields
  school: 'Code Academy',
  subjects: ['Python', 'Computer Science', 'Mathematics'],
  gradeLevels: ['Middle School', 'High School'],
  students: 42,
  // Common fields
  stats: {
    rank: 42,
    score: 8450,
    challengesCompleted: 127,
    solutionsSubmitted: 245,
    averageScore: 87.5,
  },
  achievements: [
    { id: 1, name: 'First Blood', description: 'First challenge completed', icon: '🏆', date: '2023-01-16' },
    { id: 2, name: 'Code Golfer', description: 'Submitted a solution under par', icon: '⛳', date: '2023-02-01' },
    { id: 3, name: 'Educator of the Month', description: 'Top educator for March 2023', icon: '👨‍🏫', date: '2023-03-15' },
  ],
  recentActivity: [
    { id: 1, type: 'challenge', title: 'Palindrome Checker', score: 95, date: '2023-05-20T14:30:00Z' },
    { id: 2, type: 'challenge', title: 'Matrix Rotation', score: 88, date: '2023-05-18T09:15:00Z' },
    { id: 3, type: 'achievement', title: 'Educator of the Month', date: '2023-05-15T16:45:00Z' },
  ],
  socialLinks: {
    github: 'https://github.com/username',
    twitter: 'https://twitter.com/username',
    website: 'https://personal-website.com',
  },
  isCurrentUser: true, // This would come from auth context
};

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('activity');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('guest'); // Set to 'guest' to view guest profiled on username

  useEffect(() => {
    // In a real app, fetch user data based on username
    const fetchUserData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser(mockUser);
      } catch (err) {
        setError('Failed to load profile');
        console.error('Error fetching user data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }


  if (error || !user) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <p>{error || 'User not found'}</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            <FaArrowLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Development-only user type selector
  const UserTypeSelector = () => (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      maxWidth: '200px'
    }}>
      <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>DEV: Switch User Type</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {['guest', 'learner', 'parent', 'teacher'].map((type) => (
          <button
            key={type}
            onClick={() => setUserType(type)}
            style={{
              padding: '5px 10px',
              backgroundColor: userType === type ? userTypeConfig[type]?.color || '#666' : '#f0f0f0',
              color: userType === type ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.2s'
            }}
            title={`Switch to ${type} view`}
          >
            {React.createElement(userTypeConfig[type]?.icon || FaUser, { size: 12 })}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      {process.env.NODE_ENV === 'development' && <UserTypeSelector />}
      <div className="profile-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back
        </button>
        
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} className="avatar" />
          ) : (
            <div className="avatar-fallback">
              <FaUser />
            </div>
          )}
          {user.isCurrentUser && (
            <button 
              className="edit-avatar-btn" 
              onClick={() => console.log('Edit avatar')}
              aria-label="Edit avatar"
            >
              <FaEdit size={12} />
            </button>
          )}
        </div>

        
        <div className="profile-info">
          <h1>
            {user.fullName || user.username}
            {user.userType === 'teacher' && (
              <span className="teacher-badge">
                <FaChalkboardTeacher style={{ marginRight: '4px' }} />
                Teacher
              </span>
            )}
          </h1>
          <p className="username">@{user.username}</p>
          
          {user.bio && <p className="bio">{user.bio}</p>}
          
          {/* Dynamic User Type Info Section */}
          {userType && userType !== 'guest' && (
            <div className="user-type-info" style={{ borderColor: userTypeConfig[userType]?.color || '#666' }}>
              <div className="user-type-header" style={{ backgroundColor: userTypeConfig[userType]?.color || '#666' }}>
                {React.createElement(userTypeConfig[userType]?.icon || FaUser, { 
                  className: "user-type-icon"
                })}
                <h3>{userTypeConfig[userType]?.badge} Profile</h3>
              </div>
              <div className="user-type-details">
                {userType === 'teacher' && (
                  <>
                    <div className="detail">
                      <FaSchool className="detail-icon" />
                      <div>
                        <div className="detail-label">School</div>
                        <div className="detail-value">{user.school}</div>
                      </div>
                    </div>
                    <div className="detail">
                      <FaBook className="detail-icon" />
                      <div>
                        <div className="detail-label">Subjects</div>
                        <div className="detail-value tags">
                          {user.subjects?.map((subject, index) => (
                            <span key={index} className="tag">{subject}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="detail">
                      <FaUsers className="detail-icon" />
                      <div>
                        <div className="detail-label">Grade Levels</div>
                        <div className="detail-value tags">
                          {user.gradeLevels?.map((grade, index) => (
                            <span key={index} className="tag">{grade}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="detail">
                      <FaUserGraduate className="detail-icon" />
                      <div>
                        <div className="detail-label">Students</div>
                        <div className="detail-value">
                          <span className="highlight">{user.students}</span> active learners
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {userType === 'learner' && (
                  <>
                    <div className="detail">
                      <FaGraduationCap className="detail-icon" />
                      <div>
                        <div className="detail-label">Grade</div>
                        <div className="detail-value">{user.grade}</div>
                      </div>
                    </div>
                    <div className="detail">
                      <FaBook className="detail-icon" />
                      <div>
                        <div className="detail-label">Interests</div>
                        <div className="detail-value tags">
                          {user.interests?.map((interest, index) => (
                            <span key={index} className="tag">{interest}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="detail">
                      <FaTrophy className="detail-icon" />
                      <div>
                        <div className="detail-label">Learning Goals</div>
                        <div className="detail-value">
                          <ul className="goals-list">
                            {user.learningGoals?.map((goal, index) => (
                              <li key={index} className="goal-item">
                                <span className="goal-check">✓</span> {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {userType === 'parent' && (
                  <>
                    <div className="detail">
                      <FaUserFriends className="detail-icon" />
                      <div>
                        <div className="detail-label">Children</div>
                        <div className="detail-value">
                          <ul className="children-list">
                            {user.children?.map((child, index) => (
                              <li key={index} className="child-item">
                                <FaUserGraduate className="child-icon" />
                                {child.name} (Age: {child.age})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="detail">
                      <FaBell className="detail-icon" />
                      <div>
                        <div className="detail-label">Notifications</div>
                        <div className="detail-value">
                          {user.notifications ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                    </div>
                    <div className="detail">
                      <FaUserShield className="detail-icon" />
                      <div>
                        <div className="detail-label">Monitoring</div>
                        <div className="detail-value">
                          {user.monitoring ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          <div className="join-date">
            <FaCalendarAlt className="icon" />
            Joined {new Date(user.joinDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          {(user.socialLinks.github || user.socialLinks.twitter || user.socialLinks.website) && (
            <div className="social-links">
              {user.socialLinks.github && (
                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
              {user.socialLinks.twitter && (
                <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
              )}
              {user.socialLinks.website && (
                <a href={user.socialLinks.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                  <FaGlobe />
                </a>
              )}
            </div>
          )}
        </div>
        
        {user.isCurrentUser && (
          <button 
            className="edit-profile-btn"
            onClick={() => navigate('/settings/profile')}
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>
      
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-value">{user.stats.rank}</div>
          <div className="stat-label">Rank</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.stats.score.toLocaleString()}</div>
          <div className="stat-label">Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.stats.challengesCompleted}</div>
          <div className="stat-label">Challenges</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{user.stats.averageScore}%</div>
          <div className="stat-label">Avg. Score</div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={`tab ${activeTab === 'solutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          Solutions
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'activity' && (
          <div className="activity-feed">
            <h3>Recent Activity</h3>
            {user.recentActivity.length > 0 ? (
              <ul className="activity-list">
                {user.recentActivity.map(activity => (
                  <li key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'challenge' ? <FaCode /> : <FaTrophy />}
                    </div>
                    <div className="activity-details">
                      <p className="activity-title">
                        {activity.type === 'challenge' 
                          ? `Completed challenge: ${activity.title}`
                          : `Earned achievement: ${activity.title}`}
                      </p>
                      <p className="activity-meta">
                        {activity.score && <span className="score">{activity.score} points</span>}
                        <span className="date">
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-activity">No recent activity</p>
            )}
          </div>
        )}
        
        {activeTab === 'achievements' && (
          <div className="achievements-grid">
            {user.achievements.length > 0 ? (
              user.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-details">
                    <h4>{achievement.name}</h4>
                    <p>{achievement.description}</p>
                    <div className="achievement-date">
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-achievements">No achievements yet</p>
            )}
          </div>
        )}
        
        {activeTab === 'solutions' && (
          <div className="solutions-list">
            <p className="coming-soon">Your solutions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
