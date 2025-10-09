import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaPlus, 
  FaChartLine, 
  FaCode, 
  FaTrophy, 
  FaClock, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaDownload,
  FaFilter,
  FaSearch,
  FaGraduationCap,
  FaBookOpen,
  FaAward,
  FaBell,
  FaCalendar,
  FaFileAlt,
  FaCog,
  FaUserCheck,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaChartBar,
  FaClipboardList,
  FaComments,
  FaEnvelope,
  FaVideo,
  FaShare,
  FaCopy,
  FaQrcode,
  FaPrint,
  FaFileExport,
  FaFileImport,
  FaSync,
  FaPlay,
  FaPause,
  FaStop,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showCreateClassroom, setShowCreateClassroom] = useState(false);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Teacher-specific state management
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [showChallengeDetails, setShowChallengeDetails] = useState(false);
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  const [showAchievementDetails, setShowAchievementDetails] = useState(false);
  const [realtimeData, setRealtimeData] = useState({
    onlineStudents: 0,
    activeChallenges: 0,
    pendingSubmissions: 0,
    systemAlerts: []
  });
  const [newClassroom, setNewClassroom] = useState({
    name: '',
    description: '',
    grade: '',
    subject: ''
  });
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    difficulty: 'easy',
    par: 3,
    testCases: [],
    hints: [],
    learningObjectives: []
  });

  // Mock data for demonstration
  useEffect(() => {
    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'submission',
        title: 'New Challenge Submission',
        message: 'Emma Johnson submitted "Hello World" challenge',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'achievement',
        title: 'Student Achievement',
        message: 'Alex Smith earned the "Code Master" badge',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        priority: 'medium'
      },
      {
        id: 3,
        type: 'system',
        title: 'System Update',
        message: 'New features available in the code editor',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        priority: 'low'
      }
    ];

    const mockClassrooms = [
      {
        id: 1,
        name: 'Python Explorers',
        description: 'Introduction to Python programming',
        grade: '6-8',
        subject: 'Computer Science',
        code: 'ABC123',
        students: [
          { id: 1, name: 'Alice Johnson', progress: 75, challengesCompleted: 8, lastActive: '2024-01-15' },
          { id: 2, name: 'Bob Smith', progress: 60, challengesCompleted: 6, lastActive: '2024-01-14' },
          { id: 3, name: 'Carol Davis', progress: 90, challengesCompleted: 12, lastActive: '2024-01-15' }
        ],
        challenges: [
          { id: 1, title: 'Hello World', difficulty: 'easy', completions: 3, avgScore: 85 },
          { id: 2, title: 'Variables & Types', difficulty: 'easy', completions: 2, avgScore: 78 },
          { id: 3, title: 'Loops & Conditions', difficulty: 'medium', completions: 1, avgScore: 72 }
        ],
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        name: 'Advanced Python',
        description: 'Advanced Python concepts and algorithms',
        grade: '9-12',
        subject: 'Computer Science',
        code: 'XYZ789',
        students: [
          { id: 4, name: 'David Wilson', progress: 45, challengesCompleted: 5, lastActive: '2024-01-13' },
          { id: 5, name: 'Emma Brown', progress: 80, challengesCompleted: 10, lastActive: '2024-01-15' }
        ],
        challenges: [
          { id: 4, title: 'Data Structures', difficulty: 'hard', completions: 1, avgScore: 65 },
          { id: 5, title: 'Algorithms', difficulty: 'hard', completions: 0, avgScore: 0 }
        ],
        createdAt: '2024-01-10'
      }
    ];

    // Mock analytics
    const mockAnalytics = {
      totalStudents: 5,
      totalChallenges: 5,
      avgProgress: 70,
      topPerformers: [
        { id: 1, name: 'Carol Davis', score: 95, challengesCompleted: 12, avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: 'Emma Brown', score: 88, challengesCompleted: 10, avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: 'Alice Johnson', score: 82, challengesCompleted: 8, avatar: 'https://i.pravatar.cc/150?img=3' }
      ]
    };
    
    // Set initial data
    setClassrooms(mockClassrooms);
    setAnalytics(mockAnalytics);
    setNotifications(mockNotifications);
    
    // Set real-time data
    setRealtimeData({
      onlineStudents: 23,
      activeChallenges: 5,
      pendingSubmissions: 8,
      systemAlerts: [
        { type: 'warning', message: 'High server load detected' },
        { type: 'info', message: 'New challenge template available' }
      ]
    });
    
    setIsLoading(false);
  }, []);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        ...prev,
        onlineStudents: Math.floor(Math.random() * 30) + 15,
        activeChallenges: Math.floor(Math.random() * 8) + 2,
        pendingSubmissions: Math.floor(Math.random() * 15) + 3
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCreateClassroom = (e) => {
    e.preventDefault();
    const classroom = {
      id: Date.now(),
      ...newClassroom,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      students: [],
      challenges: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setClassrooms([...classrooms, classroom]);
    setNewClassroom({ name: '', description: '', grade: '', subject: '' });
    setShowCreateClassroom(false);
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    
    const challenge = {
      id: Date.now(),
      ...newChallenge,
      completions: 0,
      avgScore: 0
    };
    
    const updatedClassrooms = classrooms.map(c => 
      c.id === selectedClassroom.id 
        ? { ...c, challenges: [...c.challenges, challenge] }
        : c
    );
    
    setClassrooms(updatedClassrooms);
    setSelectedClassroom({ ...selectedClassroom, challenges: [...selectedClassroom.challenges, challenge] });
    setNewChallenge({ title: '', description: '', difficulty: 'easy', par: 3, testCases: [], hints: [], learningObjectives: [] });
    setShowCreateChallenge(false);
  };

  const addTestCase = () => {
    setNewChallenge({
      ...newChallenge,
      testCases: [...newChallenge.testCases, { input: '', expectedOutput: '' }]
    });
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = newChallenge.testCases.map((testCase, i) => 
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setNewChallenge({ ...newChallenge, testCases: updatedTestCases });
  };

  const removeTestCase = (index) => {
    const updatedTestCases = newChallenge.testCases.filter((_, i) => i !== index);
    setNewChallenge({ ...newChallenge, testCases: updatedTestCases });
  };

  const addHint = () => {
    setNewChallenge({
      ...newChallenge,
      hints: [...newChallenge.hints, '']
    });
  };

  const updateHint = (index, value) => {
    const updatedHints = newChallenge.hints.map((hint, i) => 
      i === index ? value : hint
    );
    setNewChallenge({ ...newChallenge, hints: updatedHints });
  };

  const removeHint = (index) => {
    const updatedHints = newChallenge.hints.filter((_, i) => i !== index);
    setNewChallenge({ ...newChallenge, hints: updatedHints });
  };

  const addLearningObjective = () => {
    setNewChallenge({
      ...newChallenge,
      learningObjectives: [...newChallenge.learningObjectives, '']
    });
  };

  const updateLearningObjective = (index, value) => {
    const updatedObjectives = newChallenge.learningObjectives.map((objective, i) => 
      i === index ? value : objective
    );
    setNewChallenge({ ...newChallenge, learningObjectives: updatedObjectives });
  };

  const removeLearningObjective = (index) => {
    const updatedObjectives = newChallenge.learningObjectives.filter((_, i) => i !== index);
    setNewChallenge({ ...newChallenge, learningObjectives: updatedObjectives });
  };

  // Teacher-specific utility functions
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 60) return '#FF9800';
    return '#F44336';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const sendAnnouncement = (announcement) => {
    // Mock announcement sending
    console.log('Sending announcement:', announcement);
    setShowAnnouncementModal(false);
  };

  const generateClassroomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const exportAnalytics = () => {
    const analyticsData = {
      totalStudents: analytics.totalStudents,
      totalChallenges: analytics.totalChallenges,
      avgProgress: analytics.avgProgress,
      topPerformers: analytics.topPerformers,
      exportDate: new Date().toISOString(),
      timeRange: activeTab
    };
    
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${activeTab}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportStudentProgress = (classroomId) => {
    const classroom = classrooms.find(c => c.id === classroomId);
    if (!classroom) return;
    
    const csvData = (classroom.students || []).map(student => ({
      name: student.name,
      progress: student.progress,
      challengesCompleted: student.challengesCompleted,
      lastActive: student.lastActive
    }));
    
    const csvContent = [
      ['Name', 'Progress (%)', 'Challenges Completed', 'Last Active'],
      ...csvData.map(row => [row.name, row.progress, row.challengesCompleted, row.lastActive])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${classroom.name}_progress.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="teacher-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Teacher Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-dashboard">
      {/* Enhanced Header Section */}
      <div className="dashboard-header">
        <div className="header-welcome">
          <h1>Welcome back, Teacher!</h1>
          <p>Manage your classrooms and track student progress</p>
          <div className="header-stats">
            <div className="header-stat">
              <span className="stat-number">{analytics.totalStudents || 0}</span>
              <span className="stat-label">Total Students</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{analytics.activeChallenges || 0}</span>
              <span className="stat-label">Active Challenges</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{analytics.avgProgress || 0}%</span>
              <span className="stat-label">Avg Progress</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn-notification"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <FaBell />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="notification-badge">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowCreateChallenge(true)}
          >
            <FaPlus /> Create Challenge
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowAnnouncementModal(true)}
          >
            <FaEnvelope /> Announcement
          </button>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button 
              className="btn btn-link"
              onClick={markAllNotificationsAsRead}
            >
              Mark all as read
            </button>
          </div>
          <div className="notifications-list">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="notification-icon">
                  {notification.type === 'submission' && <FaCode />}
                  {notification.type === 'achievement' && <FaTrophy />}
                  {notification.type === 'system' && <FaBell />}
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                </div>
                {!notification.read && <div className="unread-indicator" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Activity Bar */}
      <div className="realtime-bar">
        <div className="realtime-item">
          <FaUsers className="realtime-icon" />
          <span>{realtimeData.onlineStudents} students online</span>
        </div>
        <div className="realtime-item">
          <FaCode className="realtime-icon" />
          <span>{realtimeData.activeChallenges} active challenges</span>
        </div>
        <div className="realtime-item">
          <FaClock className="realtime-icon" />
          <span>{realtimeData.pendingSubmissions} pending submissions</span>
        </div>
        {realtimeData.systemAlerts.length > 0 && (
          <div className="realtime-item alert">
            <FaExclamationTriangle className="realtime-icon" />
            <span>{realtimeData.systemAlerts[0].message}</span>
          </div>
        )}
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Enhanced Analytics Overview */}
        <div className="dashboard-section analytics-overview">
          <div className="section-header">
            <h2>Analytics Overview</h2>
            <div className="section-actions">
              <div className="time-filter">
                <button className={`time-btn ${activeTab === 'week' ? 'active' : ''}`} onClick={() => setActiveTab('week')}>
                  Week
                </button>
                <button className={`time-btn ${activeTab === 'month' ? 'active' : ''}`} onClick={() => setActiveTab('month')}>
                  Month
                </button>
                <button className={`time-btn ${activeTab === 'year' ? 'active' : ''}`} onClick={() => setActiveTab('year')}>
                  Year
                </button>
              </div>
              <button className="btn btn-link" onClick={() => window.location.reload()}>
                <FaSync /> Refresh
              </button>
              <button className="btn btn-link" onClick={() => exportAnalytics()}>
                <FaFileExport /> Export
              </button>
            </div>
          </div>
          
          <div className="analytics-grid">
            <div className="analytics-card primary">
              <div className="analytics-header">
                <div className="analytics-icon">
                  <FaUsers />
                </div>
                <div className="analytics-menu">
                  <button className="menu-btn" onClick={() => setShowStudentDetails(!showStudentDetails)}>
                    <FaEye />
                  </button>
                </div>
              </div>
              <div className="analytics-content">
                <h3>{analytics.totalStudents || 0}</h3>
                <p>Total Students</p>
                <div className="analytics-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                  <span className="progress-text">75% active this week</span>
                </div>
                <div className="analytics-trend">
                  <span className="trend-indicator positive">+12%</span>
                  <span className="trend-label">vs last month</span>
                </div>
              </div>
            </div>

            <div className="analytics-card secondary">
              <div className="analytics-header">
                <div className="analytics-icon">
                  <FaCode />
                </div>
                <div className="analytics-menu">
                  <button className="menu-btn" onClick={() => setShowChallengeDetails(!showChallengeDetails)}>
                    <FaEye />
                  </button>
                </div>
              </div>
              <div className="analytics-content">
                <h3>{analytics.totalChallenges || 0}</h3>
                <p>Total Challenges</p>
                <div className="analytics-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '60%'}}></div>
                  </div>
                  <span className="progress-text">60% completion rate</span>
                </div>
                <div className="analytics-trend">
                  <span className="trend-indicator positive">+5</span>
                  <span className="trend-label">this week</span>
                </div>
              </div>
            </div>

            <div className="analytics-card accent">
              <div className="analytics-header">
                <div className="analytics-icon">
                  <FaChartLine />
                </div>
                <div className="analytics-menu">
                  <button className="menu-btn" onClick={() => setShowProgressDetails(!showProgressDetails)}>
                    <FaEye />
                  </button>
                </div>
              </div>
              <div className="analytics-content">
                <h3>{analytics.avgProgress || 0}%</h3>
                <p>Average Progress</p>
                <div className="analytics-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${analytics.avgProgress || 0}%`}}></div>
                  </div>
                  <span className="progress-text">Class average</span>
                </div>
                <div className="analytics-trend">
                  <span className="trend-indicator positive">+8%</span>
                  <span className="trend-label">improvement</span>
                </div>
              </div>
            </div>

            <div className="analytics-card success">
              <div className="analytics-header">
                <div className="analytics-icon">
                  <FaTrophy />
                </div>
                <div className="analytics-menu">
                  <button className="menu-btn" onClick={() => setShowAchievementDetails(!showAchievementDetails)}>
                    <FaEye />
                  </button>
                </div>
              </div>
              <div className="analytics-content">
                <h3>{analytics.topPerformers?.length || 0}</h3>
                <p>Top Performers</p>
                <div className="analytics-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '90%'}}></div>
                  </div>
                  <span className="progress-text">90% above average</span>
                </div>
                <div className="analytics-trend">
                  <span className="trend-indicator positive">+3</span>
                  <span className="trend-label">new achievers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analytics Charts */}
          <div className="analytics-charts">
            <div className="chart-section">
              <h3>Student Progress Over Time</h3>
              <div className="chart-container">
                <div className="chart-placeholder">
                  <FaChartBar className="chart-icon" />
                  <p>Progress chart visualization</p>
                  <small>Interactive chart showing student progress trends</small>
                </div>
              </div>
            </div>
            
            <div className="chart-section">
              <h3>Challenge Completion Rates</h3>
              <div className="chart-container">
                <div className="chart-placeholder">
                  <FaChartLine className="chart-icon" />
                  <p>Completion rate visualization</p>
                  <small>Breakdown by difficulty and topic</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Classrooms Section */}
        <div className="dashboard-section classrooms-section">
          <div className="section-header">
            <h2>My Classrooms</h2>
            <div className="section-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateClassroom(true)}
              >
                <FaPlus /> Create Classroom
              </button>
              <button className="btn btn-secondary btn-sm">
                <FaEye /> View All
              </button>
            </div>
          </div>
          <div className="classrooms-grid">
            {classrooms && classrooms.map(classroom => (
              <div key={classroom.id} className="classroom-card">
                <div className="classroom-header">
                  <h3>{classroom.name}</h3>
                  <div className="classroom-code">
                    Code: <span className="code">{classroom.code}</span>
                  </div>
                </div>
                
                <div className="classroom-info">
                  <p><strong>Grade:</strong> {classroom.grade}</p>
                  <p><strong>Subject:</strong> {classroom.subject}</p>
                  <p><strong>Students:</strong> {classroom.students?.length || 0}</p>
                  <p><strong>Challenges:</strong> {classroom.challenges?.length || 0}</p>
                </div>
                
                <div className="classroom-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setSelectedClassroom(classroom)}
                  >
                    <FaEye /> View Details
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => exportStudentProgress(classroom.id)}
                  >
                    <FaDownload /> Export Progress
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers Section */}
        <div className="dashboard-section top-performers-section">
          <div className="section-header">
            <h2>Top Performers</h2>
            <div className="section-actions">
              <button className="btn btn-link">
                <FaEye /> View All
              </button>
            </div>
          </div>
          <div className="performers-grid">
            {analytics.topPerformers && analytics.topPerformers.slice(0, 3).map((performer, index) => (
              <div key={performer.id} className={`performer-card rank-${index + 1}`}>
                <div className="performer-rank">
                  {index === 0 && <FaTrophy className="trophy gold" />}
                  {index === 1 && <FaTrophy className="trophy silver" />}
                  {index === 2 && <FaTrophy className="trophy bronze" />}
                  <span className="rank-number">#{index + 1}</span>
                </div>
                <div className="performer-avatar">
                  <img 
                    src={performer.avatar || `https://i.pravatar.cc/150?img=${performer.id}`} 
                    alt={performer.name}
                    loading="lazy"
                  />
                </div>
                <div className="performer-info">
                  <h4>{performer.name}</h4>
                  <p className="performer-score">{performer.score} points</p>
                  <p className="performer-challenges">{performer.challengesCompleted} challenges completed</p>
                </div>
                <div className="performer-actions">
                  <button className="btn btn-sm btn-outline">
                    <FaEye /> View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Classroom Detail Modal */}
      {selectedClassroom && (
        <div className="modal-overlay">
          <div className="modal-content classroom-detail-modal">
            <div className="modal-header">
              <h2>{selectedClassroom.name}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedClassroom(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="classroom-tabs">
                <div className="tab active">Students</div>
                <div className="tab">Challenges</div>
                <div className="tab">Analytics</div>
              </div>
              
              <div className="tab-content">
                <div className="students-section">
                  <div className="section-header">
                    <h3>Students ({selectedClassroom.students?.length || 0})</h3>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowCreateChallenge(true)}
                    >
                      <FaPlus /> Add Challenge
                    </button>
                  </div>
                  
                  <div className="students-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Progress</th>
                          <th>Challenges Completed</th>
                          <th>Last Active</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedClassroom.students && selectedClassroom.students.map(student => (
                          <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                                <span className="progress-text">{student.progress}%</span>
                              </div>
                            </td>
                            <td>{student.challengesCompleted}</td>
                            <td>{student.lastActive}</td>
                            <td>
                              <button className="btn btn-sm btn-secondary">
                                <FaChartLine /> View Progress
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Classroom Modal */}
      {showCreateClassroom && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Classroom</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreateClassroom(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateClassroom} className="modal-body">
              <div className="form-group">
                <label>Classroom Name</label>
                <input 
                  type="text" 
                  value={newClassroom.name}
                  onChange={(e) => setNewClassroom({...newClassroom, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newClassroom.description}
                  onChange={(e) => setNewClassroom({...newClassroom, description: e.target.value})}
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Grade Level</label>
                  <select 
                    value={newClassroom.grade}
                    onChange={(e) => setNewClassroom({...newClassroom, grade: e.target.value})}
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="K-2">K-2</option>
                    <option value="3-5">3-5</option>
                    <option value="6-8">6-8</option>
                    <option value="9-12">9-12</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Subject</label>
                  <input 
                    type="text" 
                    value={newClassroom.subject}
                    onChange={(e) => setNewClassroom({...newClassroom, subject: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateClassroom(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Challenge Modal */}
      {showCreateChallenge && (
        <div className="modal-overlay">
          <div className="modal-content create-challenge-modal">
            <div className="modal-header">
              <h2>Create New Challenge</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreateChallenge(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateChallenge} className="modal-body">
              <div className="form-group">
                <label>Challenge Title</label>
                <input 
                  type="text" 
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Difficulty</label>
                  <select 
                    value={newChallenge.difficulty}
                    onChange={(e) => setNewChallenge({...newChallenge, difficulty: e.target.value})}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Par Score</label>
                  <input 
                    type="number" 
                    value={newChallenge.par}
                    onChange={(e) => setNewChallenge({...newChallenge, par: parseInt(e.target.value)})}
                    min="1"
                    max="20"
                  />
                </div>
              </div>
              
              {/* Test Cases */}
              <div className="form-section">
                <div className="section-header">
                  <h4>Test Cases</h4>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={addTestCase}>
                    <FaPlus /> Add Test Case
                  </button>
                </div>
                
                {newChallenge.testCases && newChallenge.testCases.map((testCase, index) => (
                  <div key={index} className="test-case-item">
                    <div className="form-group">
                      <label>Input</label>
                      <input 
                        type="text" 
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                        placeholder="Test input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Expected Output</label>
                      <input 
                        type="text" 
                        value={testCase.expectedOutput}
                        onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                        placeholder="Expected output"
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeTestCase(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Hints */}
              <div className="form-section">
                <div className="section-header">
                  <h4>Hints</h4>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={addHint}>
                    <FaPlus /> Add Hint
                  </button>
                </div>
                
                {newChallenge.hints && newChallenge.hints.map((hint, index) => (
                  <div key={index} className="hint-item">
                    <input 
                      type="text" 
                      value={hint}
                      onChange={(e) => updateHint(index, e.target.value)}
                      placeholder="Hint text"
                    />
                    <button 
                      type="button" 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeHint(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Learning Objectives */}
              <div className="form-section">
                <div className="section-header">
                  <h4>Learning Objectives</h4>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={addLearningObjective}>
                    <FaPlus /> Add Objective
                  </button>
                </div>
                
                {newChallenge.learningObjectives && newChallenge.learningObjectives.map((objective, index) => (
                  <div key={index} className="objective-item">
                    <input 
                      type="text" 
                      value={objective}
                      onChange={(e) => updateLearningObjective(index, e.target.value)}
                      placeholder="Learning objective"
                    />
                    <button 
                      type="button" 
                      className="btn btn-sm btn-danger"
                      onClick={() => removeLearningObjective(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateChallenge(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
