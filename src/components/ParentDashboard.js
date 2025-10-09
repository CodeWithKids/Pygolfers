import React, { useState, useEffect } from 'react';
import { 
  FaChild, 
  FaChartLine, 
  FaTrophy, 
  FaCode, 
  FaClock, 
  FaCalendarAlt,
  FaDownload,
  FaEye,
  FaBell,
  FaGraduationCap,
  FaStar,
  FaUsers,
  FaBookOpen,
  FaGamepad,
  FaHeart,
  FaComments,
  FaExclamationTriangle,
  FaCheckCircle,
  FaPlus,
  FaUserPlus,
  FaShieldAlt,
  FaCog,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaTrash,
  FaFlag,
  FaLock,
  FaUnlock,
  FaHistory,
  FaAward,
  FaFire,
  FaThumbsUp,
  FaQuestionCircle,
  FaInfoCircle,
  FaUser,
  FaChartBar,
  FaCalendar,
  FaBook,
  FaMedal,
  FaTimes,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import './ParentDashboard.css';

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [notifications, setNotifications] = useState([]);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showChildProfile, setShowChildProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [realtimeData, setRealtimeData] = useState({
    childrenOnline: 0,
    challengesCompleted: 0,
    achievementsEarned: 0,
    totalTimeSpent: 0
  });
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    grade: '',
    email: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockChildren = [
      {
        id: 1,
        name: 'Emma Johnson',
        age: 12,
        grade: '7th Grade',
        avatar: 'https://i.pravatar.cc/150?img=1',
        joinDate: '2024-01-01',
        totalChallenges: 25,
        completedChallenges: 18,
        achievements: 8,
        currentStreak: 5,
        longestStreak: 12,
        totalTimeSpent: 15.5, // hours
        averageScore: 85,
        favoriteTopics: ['Variables', 'Loops', 'Functions'],
        recentActivity: [
          { date: '2024-01-15', activity: 'Completed "FizzBuzz" challenge', score: 92, time: '8 min' },
          { date: '2024-01-14', activity: 'Earned "Code Golf Champion" badge', score: null, time: null },
          { date: '2024-01-13', activity: 'Completed "Palindrome Checker" challenge', score: 78, time: '12 min' },
          { date: '2024-01-12', activity: 'Started "Prime Numbers" challenge', score: null, time: null },
          { date: '2024-01-11', activity: 'Completed "Variables & Types" challenge', score: 88, time: '6 min' }
        ],
        progressData: {
          week: [65, 70, 75, 80, 85, 88, 85],
          month: [60, 65, 70, 75, 80, 82, 85, 88, 85, 87, 90, 88, 85, 87, 90, 92, 88, 85, 87, 90, 92, 88, 85, 87, 90, 92, 88, 85, 87, 90],
          year: [50, 55, 60, 65, 70, 75, 80, 82, 85, 88, 85, 87]
        },
        challenges: [
          { id: 1, title: 'Hello World', difficulty: 'easy', status: 'completed', score: 95, date: '2024-01-01' },
          { id: 2, title: 'Variables & Types', difficulty: 'easy', status: 'completed', score: 88, date: '2024-01-03' },
          { id: 3, title: 'Loops & Conditions', difficulty: 'medium', status: 'completed', score: 82, date: '2024-01-05' },
          { id: 4, title: 'Functions', difficulty: 'medium', status: 'completed', score: 85, date: '2024-01-08' },
          { id: 5, title: 'Data Structures', difficulty: 'hard', status: 'in-progress', score: null, date: null },
          { id: 6, title: 'Algorithms', difficulty: 'hard', status: 'not-started', score: null, date: null }
        ],
        achievements: [
          { id: 1, name: 'First Steps', description: 'Complete your first coding challenge', earned: '2024-01-01', icon: '🏆' },
          { id: 2, name: 'Code Golf Champion', description: 'Solve 10 challenges under par', earned: '2024-01-14', icon: '🥇' },
          { id: 3, name: 'Speed Demon', description: 'Solve 5 challenges in under 5 minutes', earned: '2024-01-10', icon: '⚡' },
          { id: 4, name: 'Dedicated Learner', description: 'Complete challenges for 7 consecutive days', earned: '2024-01-12', icon: '📚' }
        ]
      },
      {
        id: 2,
        name: 'Alex Johnson',
        age: 10,
        grade: '5th Grade',
        avatar: 'https://i.pravatar.cc/150?img=2',
        joinDate: '2024-01-05',
        totalChallenges: 15,
        completedChallenges: 10,
        achievements: 4,
        currentStreak: 3,
        longestStreak: 7,
        totalTimeSpent: 8.5,
        averageScore: 78,
        favoriteTopics: ['Basic Concepts', 'Simple Loops'],
        recentActivity: [
          { date: '2024-01-14', activity: 'Completed "Simple Calculator" challenge', score: 75, time: '15 min' },
          { date: '2024-01-13', activity: 'Earned "First Steps" badge', score: null, time: null },
          { date: '2024-01-12', activity: 'Completed "Hello World" challenge', score: 80, time: '10 min' }
        ],
        progressData: {
          week: [60, 65, 70, 75, 78, 80, 78],
          month: [50, 55, 60, 65, 70, 72, 75, 78, 75, 77, 80, 78, 75, 77, 80, 82, 78, 75, 77, 80, 82, 78, 75, 77, 80, 82, 78, 75, 77, 80],
          year: [40, 45, 50, 55, 60, 65, 70, 72, 75, 78, 75, 77]
        },
        challenges: [
          { id: 1, title: 'Hello World', difficulty: 'easy', status: 'completed', score: 80, date: '2024-01-05' },
          { id: 2, title: 'Variables & Types', difficulty: 'easy', status: 'completed', score: 75, date: '2024-01-07' },
          { id: 3, title: 'Simple Loops', difficulty: 'easy', status: 'completed', score: 78, date: '2024-01-09' },
          { id: 4, title: 'Basic Functions', difficulty: 'medium', status: 'in-progress', score: null, date: null },
          { id: 5, title: 'Conditional Logic', difficulty: 'medium', status: 'not-started', score: null, date: null }
        ],
        achievements: [
          { id: 1, name: 'First Steps', description: 'Complete your first coding challenge', earned: '2024-01-05', icon: '🏆' },
          { id: 2, name: 'Quick Learner', description: 'Complete 5 challenges in one week', earned: '2024-01-12', icon: '📚' }
        ]
      }
    ];
    
    setChildren(mockChildren);
    setSelectedChild(mockChildren[0]);
    
    // Mock notifications
    setNotifications([
      { id: 1, type: 'achievement', message: 'Emma earned the "Code Golf Champion" badge!', date: '2024-01-14', read: false },
      { id: 2, type: 'progress', message: 'Alex completed the "Simple Calculator" challenge', date: '2024-01-14', read: false },
      { id: 3, type: 'streak', message: 'Emma is on a 5-day coding streak!', date: '2024-01-13', read: true },
      { id: 4, type: 'milestone', message: 'Emma has completed 18 challenges total', date: '2024-01-12', read: true }
    ]);

    // Mock real-time data
    setRealtimeData({
      childrenOnline: 2,
      challengesCompleted: 28,
      achievementsEarned: 12,
      totalTimeSpent: 24
    });
  }, []);

  const addChild = () => {
    if (newChild.name && newChild.age && newChild.grade) {
      const child = {
        id: children.length + 1,
        name: newChild.name,
        age: parseInt(newChild.age),
        grade: newChild.grade,
        avatar: `https://i.pravatar.cc/150?img=${children.length + 3}`,
        joinDate: new Date().toISOString().split('T')[0],
        totalChallenges: 0,
        completedChallenges: 0,
        achievements: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        favoriteTopics: [],
        recentActivity: [],
        progressData: {
          week: [0, 0, 0, 0, 0, 0, 0],
          month: Array(30).fill(0),
          year: Array(12).fill(0)
        },
        challenges: [],
        achievements: []
      };
      setChildren([...children, child]);
      setNewChild({ name: '', age: '', grade: '', email: '' });
      setShowAddChild(false);
    }
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getProgressPercentage = (child) => {
    return Math.round((child.completedChallenges / child.totalChallenges) * 100);
  };

  const getTimeSpentThisWeek = (child) => {
    // Mock calculation - in real app, this would be calculated from actual data
    return Math.round(child.totalTimeSpent * 0.3);
  };

  const getStreakStatus = (child) => {
    if (child.currentStreak >= 7) return 'excellent';
    if (child.currentStreak >= 3) return 'good';
    return 'needs-encouragement';
  };

  const exportProgressReport = (child) => {
    const reportData = {
      childName: child.name,
      reportDate: new Date().toISOString().split('T')[0],
      totalChallenges: child.totalChallenges,
      completedChallenges: child.completedChallenges,
      completionRate: getProgressPercentage(child),
      averageScore: child.averageScore,
      totalTimeSpent: child.totalTimeSpent,
      currentStreak: child.currentStreak,
      achievements: child.achievements.length,
      recentActivity: child.recentActivity.slice(0, 10)
    };
    
    const csvContent = [
      ['Metric', 'Value'],
      ['Child Name', reportData.childName],
      ['Report Date', reportData.reportDate],
      ['Total Challenges', reportData.totalChallenges],
      ['Completed Challenges', reportData.completedChallenges],
      ['Completion Rate (%)', reportData.completionRate],
      ['Average Score', reportData.averageScore],
      ['Total Time Spent (hours)', reportData.totalTimeSpent],
      ['Current Streak (days)', reportData.currentStreak],
      ['Achievements Earned', reportData.achievements],
      ['', ''],
      ['Recent Activity', ''],
      ...reportData.recentActivity.map(activity => [activity.date, activity.activity])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${child.name}_progress_report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement': return <FaTrophy />;
      case 'progress': return <FaChartLine />;
      case 'streak': return <FaFire />;
      case 'milestone': return <FaStar />;
      default: return <FaBell />;
    }
  };

  const getStreakColor = (status) => {
    switch (status) {
      case 'excellent': return '#10B981';
      case 'good': return '#F59E0B';
      case 'needs-encouragement': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <div className="parent-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-welcome">
            <h1>Welcome back, Parent!</h1>
            <p>Track your children's coding progress and achievements</p>
            <div className="realtime-stats">
              <div className="realtime-stat">
                <FaUser className="realtime-icon" />
                <div className="realtime-text">
                  <span className="stat-number">{realtimeData.childrenOnline}</span>
                  <span className="stat-label">Children Online</span>
                </div>
              </div>
              <div className="realtime-stat">
                <FaCode className="realtime-icon" />
                <div className="realtime-text">
                  <span className="stat-number">{realtimeData.challengesCompleted}</span>
                  <span className="stat-label">Challenges Completed</span>
                </div>
              </div>
              <div className="realtime-stat">
                <FaTrophy className="realtime-icon" />
                <div className="realtime-text">
                  <span className="stat-number">{realtimeData.achievementsEarned}</span>
                  <span className="stat-label">Achievements Earned</span>
                </div>
              </div>
              <div className="realtime-stat">
                <FaClock className="realtime-icon" />
                <div className="realtime-text">
                  <span className="stat-number">{realtimeData.totalTimeSpent}h</span>
                  <span className="stat-label">Total Time Spent</span>
                </div>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <div className="nav-notifications">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
                {getUnreadNotificationCount() > 0 && (
                  <span className="notification-badge">{getUnreadNotificationCount()}</span>
                )}
              </button>
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    <button 
                      className="btn btn-sm btn-link"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="notifications-list">
                    {notifications.slice(0, 5).map(notification => (
                      <div 
                        key={notification.id}
                        className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="notification-icon">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="notification-content">
                          <p>{notification.message}</p>
                          <span className="notification-time">{notification.date}</span>
                        </div>
                        {!notification.read && <div className="unread-indicator"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddChild(true)}
            >
              <FaUserPlus /> Add Child
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowDetailedReport(true)}
            >
              <FaDownload /> Detailed Report
            </button>
          </div>
        </div>
      </div>

      {/* Children Overview */}
      <div className="children-overview">
        <h2>Your Children</h2>
        <div className="children-grid">
          {children.map(child => (
            <div 
              key={child.id} 
              className={`child-card ${selectedChild?.id === child.id ? 'selected' : ''}`}
              onClick={() => setSelectedChild(child)}
            >
              <div className="child-avatar">
                <img src={child.avatar} alt={child.name} />
              </div>
              <div className="child-info">
                <h3>{child.name}</h3>
                <p>{child.grade} • Age {child.age}</p>
                <div className="child-stats">
                  <div className="stat">
                    <span className="stat-number">{getProgressPercentage(child)}%</span>
                    <span className="stat-label">Complete</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{child.currentStreak}</span>
                    <span className="stat-label">Day Streak</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">{child.achievements}</span>
                    <span className="stat-label">Badges</span>
                  </div>
                </div>
              </div>
              <div className="child-status">
                <div 
                  className={`streak-indicator ${getStreakStatus(child)}`}
                  style={{ backgroundColor: getStreakColor(getStreakStatus(child)) }}
                >
                  {child.currentStreak} days
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Child Details */}
      {selectedChild && (
        <div className="child-details">
          <div className="details-header">
            <div className="child-summary">
              <img src={selectedChild.avatar} alt={selectedChild.name} className="child-avatar-large" />
              <div className="summary-info">
                <h2>{selectedChild.name}</h2>
                <p>{selectedChild.grade} • Joined {new Date(selectedChild.joinDate).toLocaleDateString()}</p>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <FaCode />
                    <span>{selectedChild.completedChallenges}/{selectedChild.totalChallenges} Challenges</span>
                  </div>
                  <div className="summary-stat">
                    <FaTrophy />
                    <span>{selectedChild.achievements} Achievements</span>
                  </div>
                  <div className="summary-stat">
                    <FaClock />
                    <span>{selectedChild.totalTimeSpent}h Total Time</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => exportProgressReport(selectedChild)}
              >
                <FaDownload /> Export Report
              </button>
              <button className="btn btn-primary">
                <FaEye /> View Profile
              </button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="progress-overview">
            <div className="progress-card">
              <div className="progress-header">
                <h3>Overall Progress</h3>
                <div className="time-range-selector">
                  <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
              <div className="progress-chart">
                <div className="chart-container">
                  <div className="progress-bar-large">
                    <div 
                      className="progress-fill-large" 
                      style={{ width: `${getProgressPercentage(selectedChild)}%` }}
                    ></div>
                    <span className="progress-text-large">{getProgressPercentage(selectedChild)}% Complete</span>
                  </div>
                </div>
                <div className="progress-metrics">
                  <div className="metric">
                    <span className="metric-label">Average Score</span>
                    <span className="metric-value">{selectedChild.averageScore}%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Time This Week</span>
                    <span className="metric-value">{getTimeSpentThisWeek(selectedChild)}h</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Current Streak</span>
                    <span className="metric-value">{selectedChild.currentStreak} days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {selectedChild.recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.score ? <FaCode /> : <FaTrophy />}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.activity}</p>
                      <div className="activity-meta">
                        <span className="activity-date">{activity.date}</span>
                        {activity.score && <span className="activity-score">Score: {activity.score}%</span>}
                        {activity.time && <span className="activity-time">Time: {activity.time}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenges and Achievements */}
          <div className="challenges-achievements">
            <div className="challenges-section">
              <h3>Challenge Progress</h3>
              <div className="challenges-list">
                {selectedChild.challenges.map(challenge => (
                  <div key={challenge.id} className={`challenge-item ${challenge.status}`}>
                    <div className="challenge-info">
                      <h4>{challenge.title}</h4>
                      <span className={`difficulty-badge ${challenge.difficulty}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div className="challenge-status">
                      {challenge.status === 'completed' && (
                        <div className="completion-info">
                          <span className="score">Score: {challenge.score}%</span>
                          <span className="date">{challenge.date}</span>
                        </div>
                      )}
                      {challenge.status === 'in-progress' && (
                        <span className="status-badge in-progress">In Progress</span>
                      )}
                      {challenge.status === 'not-started' && (
                        <span className="status-badge not-started">Not Started</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="achievements-section">
              <h3>Achievements</h3>
              <div className="achievements-list">
                {selectedChild.achievements.map(achievement => (
                  <div key={achievement.id} className="achievement-item">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-info">
                      <h4>{achievement.name}</h4>
                      <p>{achievement.description}</p>
                      <span className="achievement-date">Earned: {achievement.earned}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Sidebar */}
      <div className="notifications-sidebar">
        <h3>Notifications</h3>
        <div className="notifications-list">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-date">{notification.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Report Modal */}
      {showDetailedReport && selectedChild && (
        <div className="modal-overlay">
          <div className="modal-content detailed-report-modal">
            <div className="modal-header">
              <h2>Detailed Progress Report - {selectedChild.name}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowDetailedReport(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="report-sections">
                <div className="report-section">
                  <h3>Academic Performance</h3>
                  <div className="report-grid">
                    <div className="report-item">
                      <span className="report-label">Completion Rate</span>
                      <span className="report-value">{getProgressPercentage(selectedChild)}%</span>
                    </div>
                    <div className="report-item">
                      <span className="report-label">Average Score</span>
                      <span className="report-value">{selectedChild.averageScore}%</span>
                    </div>
                    <div className="report-item">
                      <span className="report-label">Total Time Spent</span>
                      <span className="report-value">{selectedChild.totalTimeSpent} hours</span>
                    </div>
                    <div className="report-item">
                      <span className="report-label">Current Streak</span>
                      <span className="report-value">{selectedChild.currentStreak} days</span>
                    </div>
                  </div>
                </div>
                
                <div className="report-section">
                  <h3>Learning Insights</h3>
                  <div className="insights">
                    <div className="insight-item">
                      <FaHeart className="insight-icon" />
                      <div className="insight-content">
                        <h4>Favorite Topics</h4>
                        <p>{selectedChild.favoriteTopics.join(', ')}</p>
                      </div>
                    </div>
                    <div className="insight-item">
                      <FaChartLine className="insight-icon" />
                      <div className="insight-content">
                        <h4>Learning Pattern</h4>
                        <p>Consistent daily practice with steady improvement</p>
                      </div>
                    </div>
                    <div className="insight-item">
                      <FaStar className="insight-icon" />
                      <div className="insight-content">
                        <h4>Strengths</h4>
                        <p>Problem-solving, persistence, and creative thinking</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="report-section">
                  <h3>Recommendations</h3>
                  <div className="recommendations">
                    <div className="recommendation-item">
                      <FaCheckCircle className="recommendation-icon" />
                      <p>Continue encouraging daily practice to maintain the current streak</p>
                    </div>
                    <div className="recommendation-item">
                      <FaCheckCircle className="recommendation-icon" />
                      <p>Consider exploring more advanced challenges in their favorite topics</p>
                    </div>
                    <div className="recommendation-item">
                      <FaCheckCircle className="recommendation-icon" />
                      <p>Celebrate achievements to maintain motivation and engagement</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowDetailedReport(false)}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => exportProgressReport(selectedChild)}
                >
                  <FaDownload /> Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Child Modal */}
      {showAddChild && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Child</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddChild(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Child's Name</label>
                <input
                  type="text"
                  value={newChild.name}
                  onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                  placeholder="Enter child's name"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={newChild.age}
                  onChange={(e) => setNewChild({...newChild, age: e.target.value})}
                  placeholder="Enter age"
                  className="form-input"
                  min="5"
                  max="18"
                />
              </div>
              
              <div className="form-group">
                <label>Grade</label>
                <input
                  type="text"
                  value={newChild.grade}
                  onChange={(e) => setNewChild({...newChild, grade: e.target.value})}
                  placeholder="e.g., 5th Grade"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Email (Optional)</label>
                <input
                  type="email"
                  value={newChild.email}
                  onChange={(e) => setNewChild({...newChild, email: e.target.value})}
                  placeholder="Enter email address"
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowAddChild(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={addChild}
              >
                <FaUserPlus /> Add Child
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
