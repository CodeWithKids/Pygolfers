import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaChartLine, 
  FaTrophy,
  FaBell,
  FaCalendarAlt,
  FaCode,
  FaAward,
  FaFire,
  FaClock,
  FaGraduationCap,
  FaCheckCircle,
  FaExclamationTriangle,
  FaStar,
  FaEye,
  FaDownload,
  FaFilter,
  FaChild,
  FaUserPlus,
  FaEnvelope,
  FaCog,
  FaBook,
  FaGamepad,
  FaChevronRight,
  FaTimesCircle
} from 'react-icons/fa';
import './ParentDashboard.css';

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [realtimeData, setRealtimeData] = useState({
    totalChildren: 0,
    activeChildren: 0,
    totalPoints: 0,
    weeklyProgress: 0
  });

  const getUnreadNotificationCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Mock data for demonstration
  useEffect(() => {
    // Mock children data
    const mockChildren = [
      {
        id: 'child_1',
        name: 'Alex Johnson',
        username: 'alex_coder',
        avatar: 'https://i.pravatar.cc/150?img=32',
        age: 12,
        grade: '7th Grade',
        totalPoints: 1250,
        challengesCompleted: 45,
        currentStreak: 12,
        longestStreak: 28,
        rank: 5,
        level: 15,
        lastActive: '2 hours ago',
        classrooms: [
          { id: 1, name: 'Python Explorers', teacher: 'Ms. Ada Lovelace', progress: 85 },
          { id: 2, name: 'JavaScript Masters', teacher: 'Mr. John Doe', progress: 72 }
        ],
        recentActivity: [
          { 
            id: 1, 
            type: 'challenge', 
            title: 'Completed FizzBuzz Challenge', 
            date: '2024-03-15', 
            points: 50,
            score: 95
          },
          { 
            id: 2, 
            type: 'achievement', 
            title: 'Earned "Week Streak" badge', 
            date: '2024-03-14', 
            points: 100,
            badge: '🔥'
          },
          { 
            id: 3, 
            type: 'classroom', 
            title: 'Joined JavaScript Masters', 
            date: '2024-03-13', 
            points: 0
          }
        ],
        achievements: [
          { id: 1, name: 'First Challenge', icon: '🏆', description: 'Complete first challenge', earned: true },
          { id: 2, name: 'Week Streak', icon: '🔥', description: 'Code for 7 days straight', earned: true },
          { id: 3, name: 'Top 10', icon: '⭐', description: 'Reach top 10', earned: false }
        ],
        weeklyStats: {
          challengesCompleted: 8,
          timeSpent: 12.5, // hours
          pointsEarned: 450,
          daysActive: 6
        },
        skillProgress: {
          python: 78,
          problemSolving: 82,
          codeOptimization: 75
        }
      },
      {
        id: 'child_2',
        name: 'Olivia Johnson',
        username: 'liv_codes',
        avatar: 'https://i.pravatar.cc/150?img=29',
        age: 9,
        grade: '4th Grade',
        totalPoints: 320,
        challengesCompleted: 12,
        currentStreak: 3,
        longestStreak: 7,
        rank: 45,
        level: 5,
        lastActive: '1 day ago',
        classrooms: [
          { id: 3, name: 'Python Beginners', teacher: 'Ms. Emily Brown', progress: 45 }
        ],
        recentActivity: [
          { 
            id: 1, 
            type: 'challenge', 
            title: 'Completed Hello World', 
            date: '2024-03-14', 
            points: 25,
            score: 88
          },
          { 
            id: 2, 
            type: 'classroom', 
            title: 'Joined Python Beginners', 
            date: '2024-03-10', 
            points: 0
          }
        ],
        achievements: [
          { id: 1, name: 'First Challenge', icon: '🏆', description: 'Complete first challenge', earned: true },
          { id: 2, name: 'Week Streak', icon: '🔥', description: 'Code for 7 days straight', earned: false }
        ],
        weeklyStats: {
          challengesCompleted: 3,
          timeSpent: 4.5,
          pointsEarned: 125,
          daysActive: 3
        },
        skillProgress: {
          python: 42,
          problemSolving: 48,
          codeOptimization: 35
        }
      }
    ];

    // Mock notifications
    // Convert children's recent activities into notifications
    const allActivities = mockChildren.flatMap(child => 
      child.recentActivity.map(activity => ({
        id: `${child.id}_${activity.id}`,
        childId: child.id,
        childName: child.name,
        childAvatar: child.avatar,
        type: activity.type,
        message: `${child.name}: ${activity.title}`,
        date: activity.date,
        points: activity.points,
        score: activity.score,
        badge: activity.badge,
        priority: activity.points >= 100 ? 'high' : 'normal',
        read: false
      }))
    );

    // Add some system notifications
    const systemNotifications = [
      {
        id: 'sys_1',
        type: 'system',
        message: 'Welcome to PyGolfers Parent Dashboard!',
        date: '2024-03-10',
        priority: 'low',
        read: true
      }
    ];

    const mockNotifications = [...allActivities, ...systemNotifications].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    setChildren(mockChildren);
    setSelectedChild(mockChildren[0]);
    setNotifications(mockNotifications);

    // Calculate realtime data
    const totalPoints = mockChildren.reduce((sum, child) => sum + child.totalPoints, 0);
    const activeChildren = mockChildren.filter(child => child.lastActive.includes('hour') || child.lastActive.includes('minute')).length;
    const weeklyProgress = Math.round(
      mockChildren.reduce((sum, child) => sum + child.weeklyStats.pointsEarned, 0) / mockChildren.length
    );

    setRealtimeData({
      totalChildren: mockChildren.length,
      activeChildren: activeChildren,
      totalPoints: totalPoints,
      weeklyProgress: weeklyProgress
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="parent-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Parent Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-dashboard">
      {/* Enhanced Header Section */}
      <div className="dashboard-header">
        <div className="header-welcome">
          <div className="header-title-row">
            <div>
              <h1>Welcome back, Parent!</h1>
              <p>Monitor your children's coding journey and celebrate their achievements</p>
            </div>
            <div className="header-notification">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
              >
                <FaBell />
                {getUnreadNotificationCount() > 0 && (
                  <span className="notification-badge">{getUnreadNotificationCount()}</span>
                )}
              </button>
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Activity Notifications</h4>
                    <button 
                      className="btn-link"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifications && notifications.length > 0 ? (
                      notifications.slice(0, 10).map(notification => (
                        <div 
                          key={notification.id}
                          className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="notification-icon">
                            {notification.childAvatar && (
                              <img src={notification.childAvatar} alt={notification.childName} className="child-notification-avatar" />
                            )}
                            {!notification.childAvatar && getNotificationIcon(notification.type)}
                          </div>
                          <div className="notification-content">
                            <p>{notification.message}</p>
                            <div className="notification-meta">
                              <span className="notification-date">{notification.date}</span>
                              {notification.points > 0 && (
                                <span className="notification-points">+{notification.points} pts</span>
                              )}
                              {notification.score && (
                                <span className="notification-score">{notification.score}%</span>
                              )}
                            </div>
                          </div>
                          {!notification.read && <div className="unread-indicator"></div>}
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 10 && (
                    <div className="notifications-footer">
                      <button className="btn-link">View all notifications</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="header-stats">
            <div className="header-stat">
              <span className="stat-number">{realtimeData.totalChildren}</span>
              <span className="stat-label">Children</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{realtimeData.totalPoints}</span>
              <span className="stat-label">Total Points</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{realtimeData.weeklyProgress}</span>
              <span className="stat-label">Weekly Progress</span>
            </div>
          </div>
          <div className="realtime-stats">
            <div className="realtime-stat">
              <FaChild className="realtime-icon" />
              <span className="realtime-text">{realtimeData.activeChildren} active today</span>
            </div>
            <div className="realtime-stat">
              <FaBell className="realtime-icon" />
              <span className="realtime-text">{getUnreadNotificationCount()} new notifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Children List Section */}
        <div className="dashboard-section children-section">
          <div className="section-header">
            <h2>My Children</h2>
            <div className="section-actions">
              <button className="btn btn-secondary">
                <FaUserPlus /> Add Child
              </button>
            </div>
          </div>
          
          <div className="children-list">
            {children && children.length > 0 ? (
              children.map(child => (
                <div 
                  key={child.id} 
                  className={`child-card ${selectedChild?.id === child.id ? 'selected' : ''}`}
                  onClick={() => setSelectedChild(child)}
                >
                  <div className="child-header">
                    <img src={child.avatar} alt={child.name} className="child-avatar" />
                    <div className="child-info">
                      <h3>{child.name}</h3>
                      <p>{child.age} years old • {child.grade}</p>
                      <span className="last-active">Last active: {child.lastActive}</span>
                    </div>
                    <div className="child-stats-quick">
                      <div className="quick-stat">
                        <FaTrophy className="stat-icon" />
                        <span>{child.totalPoints}</span>
                      </div>
                      <div className="quick-stat">
                        <FaFire className="stat-icon" />
                        <span>{child.currentStreak}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No children added yet</p>
                <button className="btn btn-primary">
                  <FaUserPlus /> Add Child
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Selected Child Details */}
        {selectedChild && (
          <>
            {/* Child Overview Stats */}
            <div className="dashboard-section child-overview">
              <div className="section-header">
                <h2>{selectedChild.name}'s Progress</h2>
                <div className="section-actions">
                  <button className="btn btn-outline">
                    <FaDownload /> Export Report
                  </button>
                </div>
              </div>
              
              <div className="overview-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaCode />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{selectedChild.challengesCompleted}</span>
                    <span className="stat-label">Challenges Completed</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaTrophy />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">#{selectedChild.rank}</span>
                    <span className="stat-label">Leaderboard Rank</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaFire />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">{selectedChild.currentStreak}</span>
                    <span className="stat-label">Day Streak</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaAward />
                  </div>
                  <div className="stat-content">
                    <span className="stat-value">Level {selectedChild.level}</span>
                    <span className="stat-label">Current Level</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Child Classrooms */}
            <div className="dashboard-section classrooms-section">
              <div className="section-header">
                <h2>Enrolled Classrooms</h2>
              </div>
              
              <div className="classrooms-list">
                {selectedChild.classrooms && selectedChild.classrooms.length > 0 ? (
                  selectedChild.classrooms.map(classroom => (
                    <div key={classroom.id} className="classroom-item">
                      <div className="classroom-info">
                        <div className="classroom-icon">
                          <FaGraduationCap />
                        </div>
                        <div className="classroom-details">
                          <h4>{classroom.name}</h4>
                          <p>Teacher: {classroom.teacher}</p>
                        </div>
                      </div>
                      <div className="classroom-progress">
                        <span className="progress-label">{classroom.progress}% Complete</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${classroom.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>Not enrolled in any classrooms yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-section activity-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <div className="section-actions">
                  <button className="btn btn-outline">
                    <FaEye /> View All
                  </button>
                </div>
              </div>
              
              <div className="activity-list">
                {selectedChild.recentActivity && selectedChild.recentActivity.length > 0 ? (
                  selectedChild.recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <div className="activity-meta">
                          <span className="activity-date">{activity.date}</span>
                          {activity.points > 0 && (
                            <span className="activity-points">+{activity.points} points</span>
                          )}
                          {activity.score && (
                            <span className="activity-score">Score: {activity.score}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="dashboard-section achievements-section">
              <div className="section-header">
                <h2>Achievements</h2>
              </div>
              
              <div className="achievements-grid">
                {selectedChild.achievements && selectedChild.achievements.length > 0 ? (
                  selectedChild.achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                    >
                      <div className="achievement-icon">
                        {achievement.icon}
                      </div>
                      <div className="achievement-info">
                        <h4>{achievement.name}</h4>
                        <p>{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <div className="earned-badge">
                          <FaCheckCircle />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No achievements yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="dashboard-section weekly-summary">
              <div className="section-header">
                <h2>This Week's Summary</h2>
              </div>
              
              <div className="summary-stats">
                <div className="summary-item">
                  <div className="summary-label">Challenges Completed</div>
                  <div className="summary-value">{selectedChild.weeklyStats.challengesCompleted}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Time Spent Coding</div>
                  <div className="summary-value">{selectedChild.weeklyStats.timeSpent}h</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Points Earned</div>
                  <div className="summary-value">{selectedChild.weeklyStats.pointsEarned}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Days Active</div>
                  <div className="summary-value">{selectedChild.weeklyStats.daysActive}/7</div>
                </div>
              </div>
            </div>

            {/* Skill Progress */}
            <div className="dashboard-section skills-section">
              <div className="section-header">
                <h2>Skill Development</h2>
              </div>
              
              <div className="skills-list">
                <div className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">Python Fundamentals</span>
                    <span className="skill-percentage">{selectedChild.skillProgress.python}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-fill"
                      style={{ width: `${selectedChild.skillProgress.python}%` }}
                    ></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">Problem Solving</span>
                    <span className="skill-percentage">{selectedChild.skillProgress.problemSolving}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-fill"
                      style={{ width: `${selectedChild.skillProgress.problemSolving}%` }}
                    ></div>
                  </div>
                </div>
                <div className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">Code Optimization</span>
                    <span className="skill-percentage">{selectedChild.skillProgress.codeOptimization}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-fill"
                      style={{ width: `${selectedChild.skillProgress.codeOptimization}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
