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
  FaVolumeMute,
  FaArrowUp,
  FaCalendarAlt,
  FaShareAlt,
  FaUserPlus,
  FaLink
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
  const [showAssignChallenge, setShowAssignChallenge] = useState(null);
  const [showChallengeSelection, setShowChallengeSelection] = useState(false);
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [teacherEvents, setTeacherEvents] = useState([]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showClassroomCode, setShowClassroomCode] = useState(false);
  const [activeClassroomTab, setActiveClassroomTab] = useState('students');
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    grade: '',
    studentId: ''
  });
  const [announcement, setAnnouncement] = useState({
    subject: '',
    message: '',
    recipients: 'all', // 'all', 'classrooms', 'students'
    selectedClassrooms: [],
    selectedStudents: [],
    deliveryMethod: 'immediate', // 'immediate', 'scheduled'
    scheduledDate: '',
    priority: 'normal' // 'low', 'normal', 'high'
  });
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

    // Mock teacher events data
    const mockEvents = [
      {
        id: 1,
        title: "Python Coding Workshop",
        description: "Introduction to Python programming for beginners",
        date: "2024-01-15",
        time: "10:00 AM",
        location: "Virtual",
        maxParticipants: 30,
        currentParticipants: 15,
        status: "upcoming",
        type: "workshop",
        createdBy: "teacher123"
      },
      {
        id: 2,
        title: "Algorithm Challenge Competition",
        description: "Competitive programming event for advanced students",
        date: "2024-01-20",
        time: "2:00 PM",
        location: "School Lab",
        maxParticipants: 20,
        currentParticipants: 20,
        status: "full",
        type: "competition",
        createdBy: "teacher123"
      },
      {
        id: 3,
        title: "Code Review Session",
        description: "Peer code review and feedback session",
        date: "2024-01-10",
        time: "3:00 PM",
        location: "Virtual",
        maxParticipants: 15,
        currentParticipants: 12,
        status: "completed",
        type: "session",
        createdBy: "teacher123"
      }
    ];
    setTeacherEvents(mockEvents);

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

  const sendAnnouncement = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!announcement.subject.trim() || !announcement.message.trim()) {
      alert('Please fill in both subject and message');
      return;
    }
    
    // Mock announcement sending
    console.log('Sending announcement:', announcement);
    
    // Reset form
    setAnnouncement({
      subject: '',
      message: '',
      recipients: 'all',
      selectedClassrooms: [],
      selectedStudents: [],
      deliveryMethod: 'immediate',
      scheduledDate: '',
      priority: 'normal'
    });
    
    setShowAnnouncementModal(false);
    
    // Show success message (could be replaced with toast notification)
    alert('Announcement sent successfully!');
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

  const assignSelectedChallenges = () => {
    if (!selectedClassroom || selectedChallenges.length === 0) return;
    
    const updatedClassrooms = classrooms.map(c => 
      c.id === selectedClassroom.id 
        ? { 
            ...c, 
            challenges: [
              ...(c.challenges || []), 
              ...selectedChallenges.map(challenge => ({
                ...challenge,
                id: Date.now() + Math.random(), // Ensure unique IDs
                completions: 0,
                avgScore: 0
              }))
            ]
          }
        : c
    );
    
    setClassrooms(updatedClassrooms);
    setSelectedClassroom({ 
      ...selectedClassroom, 
      challenges: [
        ...(selectedClassroom.challenges || []), 
        ...selectedChallenges.map(challenge => ({
          ...challenge,
          id: Date.now() + Math.random(),
          completions: 0,
          avgScore: 0
        }))
      ]
    });
    
    setSelectedChallenges([]);
    setShowChallengeSelection(false);
    
    alert(`Successfully assigned ${selectedChallenges.length} challenge(s) to ${selectedClassroom.name}!`);
  };

  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      createdBy: "teacher123",
      currentParticipants: 0,
      status: "upcoming"
    };
    
    setTeacherEvents(prev => [...prev, newEvent]);
    setShowCreateEvent(false);
    
    alert(`Event "${newEvent.title}" created successfully!`);
  };

  const addStudentToClassroom = (e) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    
    const student = {
      id: Date.now(),
      ...newStudent,
      progress: 0,
      challengesCompleted: 0,
      lastActive: new Date().toISOString().split('T')[0],
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedClassrooms = classrooms.map(c => 
      c.id === selectedClassroom.id 
        ? { ...c, students: [...(c.students || []), student] }
        : c
    );
    
    setClassrooms(updatedClassrooms);
    setSelectedClassroom({ 
      ...selectedClassroom, 
      students: [...(selectedClassroom.students || []), student]
    });
    
    setNewStudent({ name: '', email: '', grade: '', studentId: '' });
    setShowAddStudent(false);
    
    alert(`Student "${student.name}" added to ${selectedClassroom.name} successfully!`);
  };

  const copyClassroomCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Classroom code "${code}" copied to clipboard!`);
  };

  const generateStudentId = () => {
    return `STU${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
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
          <p>Track your classroom performance and student progress</p>
          <div className="header-stats">
            <div className="header-stat">
              <span className="stat-number">{analytics.totalStudents || 0}</span>
              <span className="stat-label">Total Students</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{analytics.totalChallenges || 0}</span>
              <span className="stat-label">Active Challenges</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{analytics.avgProgress || 0}%</span>
              <span className="stat-label">Avg Progress</span>
            </div>
          </div>
          <div className="realtime-stats">
            <div className="realtime-stat">
              <FaUsers className="realtime-icon" />
              <span className="realtime-text">{realtimeData.onlineStudents} students online</span>
            </div>
            <div className="realtime-stat">
              <FaCode className="realtime-icon" />
              <span className="realtime-text">{realtimeData.activeChallenges} active challenges</span>
            </div>
            <div className="realtime-stat">
              <FaClipboardList className="realtime-icon" />
              <span className="realtime-text">{realtimeData.pendingSubmissions} pending submissions</span>
            </div>
            {realtimeData.systemAlerts && realtimeData.systemAlerts.length > 0 && (
              <div className="realtime-stat alert">
                <FaExclamationTriangle className="realtime-icon" />
                <span className="realtime-text">{realtimeData.systemAlerts[0].message}</span>
              </div>
            )}
          </div>
        </div>
        <div className="header-actions">
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

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* Enhanced Analytics Overview */}
        <div className="dashboard-section analytics-overview">
          <div className="section-header">
            <h2>Analytics Overview</h2>
            <div className="section-actions">
              <div className="time-filter">
                <button className={`time-btn ${activeTab === 'week' ? 'active' : ''}`} onClick={() => setActiveTab('week')}>
                  <FaCalendar /> Week
                </button>
                <button className={`time-btn ${activeTab === 'month' ? 'active' : ''}`} onClick={() => setActiveTab('month')}>
                  <FaCalendar /> Month
                </button>
                <button className={`time-btn ${activeTab === 'year' ? 'active' : ''}`} onClick={() => setActiveTab('year')}>
                  <FaCalendar /> Year
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
          
          <div className="analytics-list">
            <div className="analytics-table">
              <div className="table-header">
                <div className="col-title">Metric</div>
                <div className="col-stats">Current Value</div>
                <div className="col-stats">Progress</div>
                <div className="col-stats">Trend</div>
                <div className="col-actions">Actions</div>
              </div>
              
              <div className="analytics-row" onClick={() => setShowStudentDetails(!showStudentDetails)}>
                <div className="col-title">
                  <div className="analytics-info">
                    <div className="analytics-icon primary">
                      <FaUsers />
                    </div>
                    <div className="analytics-details">
                      <h4>Total Students</h4>
                      <p>Active this week: 75% (3 of 4 students)</p>
                    </div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="stat-value">{analytics.totalStudents || 0}</span>
                </div>
                <div className="col-stats">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="trend-indicator positive">
                    <FaArrowUp /> +12%
                  </span>
                </div>
                <div className="col-actions">
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={(e) => { e.stopPropagation(); setShowStudentDetails(!showStudentDetails); }}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>

              <div className="analytics-row" onClick={() => setShowChallengeDetails(!showChallengeDetails)}>
                <div className="col-title">
                  <div className="analytics-info">
                    <div className="analytics-icon secondary">
                      <FaCode />
                    </div>
                    <div className="analytics-details">
                      <h4>Total Challenges</h4>
                      <p>Completion rate: 60% (3 of 5 challenges)</p>
                    </div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="stat-value">{analytics.totalChallenges || 0}</span>
                </div>
                <div className="col-stats">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="trend-indicator positive">
                    <FaArrowUp /> +5
                  </span>
                </div>
                <div className="col-actions">
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={(e) => { e.stopPropagation(); setShowChallengeDetails(!showChallengeDetails); }}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>

              <div className="analytics-row" onClick={() => setShowProgressDetails(!showProgressDetails)}>
                <div className="col-title">
                  <div className="analytics-info">
                    <div className="analytics-icon accent">
                      <FaChartLine />
                    </div>
                    <div className="analytics-details">
                      <h4>Average Progress</h4>
                      <p>Class average (above 70% target)</p>
                    </div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="stat-value">{analytics.avgProgress || 0}%</span>
                </div>
                <div className="col-stats">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${analytics.avgProgress || 0}%`}}></div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="trend-indicator positive">
                    <FaArrowUp /> +8%
                  </span>
                </div>
                <div className="col-actions">
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={(e) => { e.stopPropagation(); setShowProgressDetails(!showProgressDetails); }}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </div>
                </div>
              </div>

              <div className="analytics-row" onClick={() => setShowAchievementDetails(!showAchievementDetails)}>
                <div className="col-title">
                  <div className="analytics-info">
                    <div className="analytics-icon success">
                      <FaTrophy />
                    </div>
                    <div className="analytics-details">
                      <h4>Top Performers</h4>
                      <p>90% above average (3 of 5 students)</p>
                    </div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="stat-value">{analytics.topPerformers?.length || 0}</span>
                </div>
                <div className="col-stats">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="col-stats">
                  <span className="trend-indicator positive">
                    <FaArrowUp /> +3
                  </span>
                </div>
                <div className="col-actions">
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={(e) => { e.stopPropagation(); setShowAchievementDetails(!showAchievementDetails); }}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </div>
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
            </div>
          </div>
          
          <div className="classrooms-list">
            {classrooms && classrooms.length > 0 ? (
              <div className="classrooms-table">
                <div className="table-header">
                  <div className="col-title">Classroom</div>
                  <div className="col-stats">Students</div>
                  <div className="col-stats">Challenges</div>
                  <div className="col-stats">Grade</div>
                  <div className="col-actions">Actions</div>
                </div>
                {classrooms.map(classroom => (
                  <div key={classroom.id} className="classroom-row">
                  <div className="col-title">
                    <div className="classroom-info">
                      <div className="classroom-icon">
                        <FaGraduationCap />
                      </div>
                      <div className="classroom-details">
                        <h4 
                          className="classroom-name-link"
                          onClick={() => setSelectedClassroom(classroom)}
                          title="Click to view classroom details"
                        >
                          {classroom.name}
                        </h4>
                        <p>Code: {classroom.code} • {classroom.subject}</p>
                      </div>
                    </div>
                  </div>
                    <div className="col-stats">
                      <span className="stat-value">{classroom.students?.length || 0}</span>
                    </div>
                    <div className="col-stats">
                      <span className="stat-value">{classroom.challenges?.length || 0}</span>
                    </div>
                    <div className="col-stats">
                      <span className="stat-value">{classroom.grade}</span>
                    </div>
                    <div className="col-actions">
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => setSelectedClassroom(classroom)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => exportStudentProgress(classroom.id)}
                          title="Export Progress"
                        >
                          <FaDownload />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => console.log('Edit classroom', classroom.id)}
                          title="Edit Classroom"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => console.log('Delete classroom', classroom.id)}
                          title="Delete Classroom"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaGraduationCap />
                </div>
                <h3>No Classrooms Yet</h3>
                <p>Create your first classroom to start teaching!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateClassroom(true)}
                >
                  <FaPlus /> Create Your First Classroom
                </button>
              </div>
            )}
          </div>
        </div>


        {/* Challenges Section */}
        <div className="dashboard-section challenges-section">
        <div className="section-header">
          <h2>My Challenges</h2>
          <div className="section-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                // Select all challenges for bulk assignment
                const allChallenges = classrooms.flatMap(classroom => classroom.challenges || []);
                setSelectedChallenges(allChallenges);
                setShowChallengeSelection(true);
              }}
              disabled={classrooms.flatMap(classroom => classroom.challenges || []).length === 0}
            >
              <FaUserCheck /> Bulk Assign
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateChallenge(true)}
            >
              <FaPlus /> Create Challenge
            </button>
          </div>
        </div>
          
          <div className="challenges-list">
            {classrooms.flatMap(classroom => classroom.challenges || []).length > 0 ? (
              <div className="challenges-table">
                <div className="table-header">
                  <div className="col-title">Challenge</div>
                  <div className="col-difficulty">Difficulty</div>
                  <div className="col-stats">Completions</div>
                  <div className="col-stats">Avg Score</div>
                  <div className="col-actions">Actions</div>
                </div>
                {classrooms.flatMap(classroom => classroom.challenges || []).map(challenge => (
                  <div key={challenge.id} className="challenge-row">
                    <div className="col-title">
                      <div className="challenge-info">
                        <div className="challenge-icon">
                          <FaCode />
                        </div>
                        <div className="challenge-details">
                          <h4>{challenge.title}</h4>
                          <p>Par: {challenge.par || 3}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-difficulty">
                      <span className={`difficulty-badge ${challenge.difficulty}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div className="col-stats">
                      <span className="stat-value">{challenge.completions || 0}</span>
                    </div>
                    <div className="col-stats">
                      <span className="stat-value">{challenge.avgScore || 0}%</span>
                    </div>
                    <div className="col-actions">
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => setShowAssignChallenge(challenge)}
                          title="Assign to Classroom"
                        >
                          <FaUserCheck />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => console.log('Edit challenge', challenge.id)}
                          title="Edit Challenge"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => console.log('View challenge', challenge.id)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => {
                            const assignedClassrooms = classrooms.filter(c => 
                              c.challenges?.some(ch => ch.title === challenge.title)
                            );
                            alert(`This challenge is assigned to: ${assignedClassrooms.map(c => c.name).join(', ') || 'No classrooms'}`);
                          }}
                          title="View in Classrooms"
                        >
                          <FaGraduationCap />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => console.log('Delete challenge', challenge.id)}
                          title="Delete Challenge"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaCode />
                </div>
                <h3>No Challenges Yet</h3>
                <p>Create your first coding challenge to get started!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateChallenge(true)}
                >
                  <FaPlus /> Create Your First Challenge
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Teacher Events Section */}
        <div className="dashboard-section teacher-events-section">
          <div className="section-header">
            <h2>My Events</h2>
            <div className="section-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateEvent(true)}
              >
                <FaPlus /> Create Event
              </button>
            </div>
          </div>
          
          <div className="events-list">
            {teacherEvents && teacherEvents.length > 0 ? (
              <div className="events-table">
                <div className="table-header">
                  <div className="col-title">Event</div>
                  <div className="col-stats">Date & Time</div>
                  <div className="col-stats">Participants</div>
                  <div className="col-stats">Status</div>
                  <div className="col-actions">Actions</div>
                </div>
                {teacherEvents.map(event => (
                  <div key={event.id} className="event-row">
                    <div className="col-title">
                      <div className="event-info">
                        <div className="event-icon">
                          <FaCalendarAlt />
                        </div>
                        <div className="event-details">
                          <h4>{event.title}</h4>
                          <p>{event.description}</p>
                          <div className="event-meta">
                            <span className="event-type">{event.type}</span>
                            <span className="event-location">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-stats">
                      <div className="datetime-info">
                        <span className="date">{event.date}</span>
                        <span className="time">{event.time}</span>
                      </div>
                    </div>
                    <div className="col-stats">
                      <div className="participants-info">
                        <span className="participants-count">{event.currentParticipants}/{event.maxParticipants}</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-stats">
                      <span className={`status-badge ${event.status}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="col-actions">
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => console.log('View event', event.id)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => console.log('Edit event', event.id)}
                          title="Edit Event"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => console.log('Manage participants', event.id)}
                          title="Manage Participants"
                        >
                          <FaUsers />
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setTeacherEvents(prev => prev.filter(e => e.id !== event.id));
                            alert(`Event "${event.title}" deleted successfully!`);
                          }}
                          title="Delete Event"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaCalendarAlt />
                </div>
                <h3>No Events Yet</h3>
                <p>Create your first event to engage with students!</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowCreateEvent(true)}
                >
                  <FaPlus /> Create Your First Event
                </button>
              </div>
            )}
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
                <div 
                  className={`tab ${activeClassroomTab === 'students' ? 'active' : ''}`}
                  onClick={() => setActiveClassroomTab('students')}
                >
                  Students
                </div>
                <div 
                  className={`tab ${activeClassroomTab === 'challenges' ? 'active' : ''}`}
                  onClick={() => setActiveClassroomTab('challenges')}
                >
                  Challenges
                </div>
                <div 
                  className={`tab ${activeClassroomTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveClassroomTab('analytics')}
                >
                  Analytics
                </div>
              </div>
              
              <div className="tab-content">
                {activeClassroomTab === 'students' && (
                  <div className="students-section">
                  <div className="section-header">
                    <h3>Students ({selectedClassroom.students?.length || 0})</h3>
                    <div className="section-actions">
                      <button 
                        className="btn btn-outline"
                        onClick={() => setShowClassroomCode(true)}
                        title="Share Classroom Code"
                      >
                        <FaShareAlt /> Share Code
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => setShowAddStudent(true)}
                      >
                        <FaUserPlus /> Add Student
                      </button>
                      <button 
                        className="btn btn-secondary"
                        onClick={() => setShowChallengeSelection(true)}
                      >
                        <FaUserCheck /> Assign Challenges
                      </button>
                      <button 
                        className="btn btn-outline"
                        onClick={() => setShowCreateChallenge(true)}
                      >
                        <FaPlus /> Create Challenge
                      </button>
                    </div>
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
                )}

                {activeClassroomTab === 'challenges' && (
                  <div className="challenges-section">
                    <div className="section-header">
                      <h3>Classroom Challenges ({selectedClassroom.challenges?.length || 0})</h3>
                      <div className="section-actions">
                        <button 
                          className="btn btn-outline"
                          onClick={() => setShowChallengeSelection(true)}
                        >
                          <FaUserCheck /> Assign Challenges
                        </button>
                        <button 
                          className="btn btn-outline"
                          onClick={() => setShowCreateChallenge(true)}
                        >
                          <FaPlus /> Create Challenge
                        </button>
                      </div>
                    </div>
                    
                    <div className="challenges-list">
                      {selectedClassroom.challenges && selectedClassroom.challenges.length > 0 ? (
                        <div className="challenges-table">
                          <div className="table-header">
                            <div className="col-title">Challenge</div>
                            <div className="col-stats">Difficulty</div>
                            <div className="col-stats">Completions</div>
                            <div className="col-stats">Avg Score</div>
                            <div className="col-actions">Actions</div>
                          </div>
                          {selectedClassroom.challenges.map(challenge => (
                            <div key={challenge.id} className="challenge-row">
                              <div className="col-title">
                                <div className="challenge-info">
                                  <div className="challenge-icon">
                                    <FaCode />
                                  </div>
                                  <div className="challenge-details">
                                    <h4>{challenge.title}</h4>
                                    <p>Par: {challenge.par || 3}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-stats">
                                <span className={`difficulty-badge ${challenge.difficulty}`}>
                                  {challenge.difficulty}
                                </span>
                              </div>
                              <div className="col-stats">
                                <span className="stat-value">{challenge.completions || 0}</span>
                              </div>
                              <div className="col-stats">
                                <span className="stat-value">{challenge.avgScore || 0}%</span>
                              </div>
                              <div className="col-actions">
                                <div className="action-buttons">
                                  <button 
                                    className="btn btn-sm btn-outline"
                                    onClick={() => console.log('View challenge', challenge.id)}
                                    title="View Details"
                                  >
                                    <FaEye />
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-outline"
                                    onClick={() => console.log('Edit challenge', challenge.id)}
                                    title="Edit Challenge"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => console.log('Delete challenge', challenge.id)}
                                    title="Delete Challenge"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state">
                          <div className="empty-icon">
                            <FaCode />
                          </div>
                          <h3>No Challenges Assigned</h3>
                          <p>Assign challenges to this classroom to get started!</p>
                          <button 
                            className="btn btn-primary"
                            onClick={() => setShowChallengeSelection(true)}
                          >
                            <FaUserCheck /> Assign Challenges
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeClassroomTab === 'analytics' && (
                  <div className="analytics-section">
                    <div className="section-header">
                      <h3>Classroom Analytics</h3>
                      <div className="section-actions">
                        <button className="btn btn-outline">
                          <FaFileExport /> Export Data
                        </button>
                      </div>
                    </div>
                    
                    <div className="analytics-list">
                      <div className="analytics-table">
                        <div className="table-header">
                          <div className="col-title">Metric</div>
                          <div className="col-stats">Current Value</div>
                          <div className="col-stats">Progress</div>
                          <div className="col-stats">Status</div>
                          <div className="col-actions">Actions</div>
                        </div>
                        
                        <div className="analytics-row">
                          <div className="col-title">
                            <div className="analytics-info">
                              <div className="analytics-icon primary">
                                <FaUsers />
                              </div>
                              <div className="analytics-details">
                                <h4>Total Students</h4>
                                <p>All students enrolled in this classroom</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="stat-value">{selectedClassroom.students?.length || 0}</span>
                          </div>
                          <div className="col-stats">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{width: '100%'}}></div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="status-badge completed">Active</span>
                          </div>
                          <div className="col-actions">
                            <div className="action-buttons">
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => setActiveClassroomTab('students')}
                                title="View Students"
                              >
                                <FaEye />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="analytics-row">
                          <div className="col-title">
                            <div className="analytics-info">
                              <div className="analytics-icon secondary">
                                <FaCode />
                              </div>
                              <div className="analytics-details">
                                <h4>Assigned Challenges</h4>
                                <p>Challenges assigned to this classroom</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="stat-value">{selectedClassroom.challenges?.length || 0}</span>
                          </div>
                          <div className="col-stats">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{width: '75%'}}></div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="status-badge upcoming">Active</span>
                          </div>
                          <div className="col-actions">
                            <div className="action-buttons">
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => setActiveClassroomTab('challenges')}
                                title="View Challenges"
                              >
                                <FaEye />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="analytics-row">
                          <div className="col-title">
                            <div className="analytics-info">
                              <div className="analytics-icon accent">
                                <FaChartLine />
                              </div>
                              <div className="analytics-details">
                                <h4>Average Progress</h4>
                                <p>Class average completion rate</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="stat-value">
                              {selectedClassroom.students ? 
                                Math.round(selectedClassroom.students.reduce((sum, student) => sum + (student.progress || 0), 0) / selectedClassroom.students.length) || 0 
                                : 0
                              }%
                            </span>
                          </div>
                          <div className="col-stats">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{
                                width: `${selectedClassroom.students ? 
                                  Math.round(selectedClassroom.students.reduce((sum, student) => sum + (student.progress || 0), 0) / selectedClassroom.students.length) || 0 
                                  : 0
                                }%`
                              }}></div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="status-badge upcoming">In Progress</span>
                          </div>
                          <div className="col-actions">
                            <div className="action-buttons">
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => console.log('View detailed progress')}
                                title="View Details"
                              >
                                <FaEye />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="analytics-row">
                          <div className="col-title">
                            <div className="analytics-info">
                              <div className="analytics-icon success">
                                <FaTrophy />
                              </div>
                              <div className="analytics-details">
                                <h4>Completed Challenges</h4>
                                <p>Total challenge completions by students</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="stat-value">
                              {selectedClassroom.students ? 
                                selectedClassroom.students.reduce((sum, student) => sum + (student.challengesCompleted || 0), 0) 
                                : 0
                              }
                            </span>
                          </div>
                          <div className="col-stats">
                            <div className="progress-bar">
                              <div className="progress-fill" style={{width: '60%'}}></div>
                            </div>
                          </div>
                          <div className="col-stats">
                            <span className="status-badge completed">Completed</span>
                          </div>
                          <div className="col-actions">
                            <div className="action-buttons">
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => console.log('View completions')}
                                title="View Details"
                              >
                                <FaEye />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

      {/* Assign Challenge Modal */}
      {showAssignChallenge && (
        <div className="modal-overlay">
          <div className="modal-content assign-challenge-modal">
            <div className="modal-header">
              <h2>Assign Challenge: {showAssignChallenge.title}</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAssignChallenge(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="challenge-preview">
                <div className="challenge-info">
                  <div className="challenge-meta">
                    <span className={`difficulty-badge ${showAssignChallenge.difficulty}`}>
                      {showAssignChallenge.difficulty}
                    </span>
                    <span className="par-info">Par: {showAssignChallenge.par || 3}</span>
                  </div>
                  <p className="challenge-description">
                    {showAssignChallenge.description || 'No description available'}
                  </p>
                </div>
              </div>
              
              <div className="assignment-form">
                <h4>Select Classrooms</h4>
                <div className="classroom-selection">
                  {classrooms.map(classroom => (
                    <div key={classroom.id} className="classroom-option">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          value={classroom.id}
                          checked={classroom.challenges?.some(ch => ch.id === showAssignChallenge.id) || false}
                          onChange={(e) => {
                            if (e.target.checked) {
                              // Add challenge to classroom
                              setClassrooms(prev => prev.map(c => 
                                c.id === classroom.id 
                                  ? { ...c, challenges: [...(c.challenges || []), { ...showAssignChallenge, id: Date.now() + Math.random() }] }
                                  : c
                              ));
                            } else {
                              // Remove challenge from classroom
                              setClassrooms(prev => prev.map(c => 
                                c.id === classroom.id 
                                  ? { ...c, challenges: (c.challenges || []).filter(ch => ch.title !== showAssignChallenge.title) }
                                  : c
                              ));
                            }
                          }}
                        />
                        <div className="classroom-details">
                          <h5>{classroom.name}</h5>
                          <p>{classroom.students?.length || 0} students • Grade {classroom.grade}</p>
                          {classroom.challenges?.some(ch => ch.title === showAssignChallenge.title) && (
                            <span className="already-assigned">✓ Already assigned</span>
                          )}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="assignment-settings">
                  <h4>Assignment Settings</h4>
                  <div className="form-group">
                    <label>Due Date</label>
                    <input 
                      type="datetime-local" 
                      className="form-input"
                      defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Attempts</label>
                    <select className="form-input">
                      <option value="unlimited">Unlimited</option>
                      <option value="3">3 attempts</option>
                      <option value="5">5 attempts</option>
                      <option value="10">10 attempts</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Points</label>
                    <input 
                      type="number" 
                      className="form-input"
                      defaultValue={showAssignChallenge.par * 10}
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowAssignChallenge(null)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  const assignedCount = classrooms.filter(c => 
                    c.challenges?.some(ch => ch.title === showAssignChallenge.title)
                  ).length;
                  console.log(`Challenge assigned to ${assignedCount} classroom(s)`);
                  setShowAssignChallenge(null);
                }}
              >
                <FaUserCheck /> Assign Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="modal-overlay">
          <div className="modal-content announcement-modal">
            <div className="modal-header">
              <h2>Send Announcement</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAnnouncementModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={sendAnnouncement}>
              <div className="modal-body">
                {/* Recipients Selection */}
                <div className="form-section">
                  <h4>Recipients</h4>
                  <div className="recipient-options">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="recipients" 
                        value="all"
                        checked={announcement.recipients === 'all'}
                        onChange={(e) => setAnnouncement(prev => ({ ...prev, recipients: e.target.value }))}
                      />
                      <span>All Students</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="recipients" 
                        value="classrooms"
                        checked={announcement.recipients === 'classrooms'}
                        onChange={(e) => setAnnouncement(prev => ({ ...prev, recipients: e.target.value }))}
                      />
                      <span>Specific Classrooms</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="recipients" 
                        value="students"
                        checked={announcement.recipients === 'students'}
                        onChange={(e) => setAnnouncement(prev => ({ ...prev, recipients: e.target.value }))}
                      />
                      <span>Individual Students</span>
                    </label>
                  </div>
                  
                  {/* Classroom Selection */}
                  {announcement.recipients === 'classrooms' && (
                    <div className="selection-list">
                      <h5>Select Classrooms:</h5>
                      {classrooms.map(classroom => (
                        <label key={classroom.id} className="checkbox-label">
                          <input 
                            type="checkbox" 
                            value={classroom.id}
                            checked={announcement.selectedClassrooms.includes(classroom.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAnnouncement(prev => ({
                                  ...prev,
                                  selectedClassrooms: [...prev.selectedClassrooms, classroom.id]
                                }));
                              } else {
                                setAnnouncement(prev => ({
                                  ...prev,
                                  selectedClassrooms: prev.selectedClassrooms.filter(id => id !== classroom.id)
                                }));
                              }
                            }}
                          />
                          <div className="selection-details">
                            <h6>{classroom.name}</h6>
                            <p>{classroom.students?.length || 0} students • Grade {classroom.grade}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {/* Student Selection */}
                  {announcement.recipients === 'students' && (
                    <div className="selection-list">
                      <h5>Select Students:</h5>
                      {classrooms.flatMap(classroom => classroom.students || []).map(student => (
                        <label key={student.id} className="checkbox-label">
                          <input 
                            type="checkbox" 
                            value={student.id}
                            checked={announcement.selectedStudents.includes(student.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAnnouncement(prev => ({
                                  ...prev,
                                  selectedStudents: [...prev.selectedStudents, student.id]
                                }));
                              } else {
                                setAnnouncement(prev => ({
                                  ...prev,
                                  selectedStudents: prev.selectedStudents.filter(id => id !== student.id)
                                }));
                              }
                            }}
                          />
                          <div className="selection-details">
                            <h6>{student.name}</h6>
                            <p>Progress: {student.progress || 0}%</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Announcement Content */}
                <div className="form-section">
                  <h4>Announcement Details</h4>
                  <div className="form-group">
                    <label>Subject *</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={announcement.subject}
                      onChange={(e) => setAnnouncement(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Enter announcement subject"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea 
                      className="form-input form-textarea"
                      value={announcement.message}
                      onChange={(e) => setAnnouncement(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Enter your announcement message"
                      rows="6"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Priority</label>
                    <select 
                      className="form-input"
                      value={announcement.priority}
                      onChange={(e) => setAnnouncement(prev => ({ ...prev, priority: e.target.value }))}
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>
                
                {/* Delivery Options */}
                <div className="form-section">
                  <h4>Delivery Options</h4>
                  <div className="delivery-options">
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="immediate"
                        checked={announcement.deliveryMethod === 'immediate'}
                        onChange={(e) => setAnnouncement(prev => ({ ...prev, deliveryMethod: e.target.value }))}
                      />
                      <span>Send Immediately</span>
                    </label>
                    <label className="radio-label">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="scheduled"
                        checked={announcement.deliveryMethod === 'scheduled'}
                        onChange={(e) => setAnnouncement(prev => ({ ...prev, deliveryMethod: e.target.value }))}
                      />
                      <span>Schedule for Later</span>
                    </label>
                  </div>
                  
                  {announcement.deliveryMethod === 'scheduled' && (
                    <div className="form-group">
                      <label>Scheduled Date & Time</label>
                      <input 
                        type="datetime-local" 
                        className="form-input"
                        value={announcement.scheduledDate}
                        onChange={(e) => setAnnouncement(prev => ({ ...prev, scheduledDate: e.target.value }))}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>
                  )}
                </div>
                
                {/* Preview */}
                <div className="form-section">
                  <h4>Preview</h4>
                  <div className="announcement-preview">
                    <div className="preview-header">
                      <h5>{announcement.subject || 'Announcement Subject'}</h5>
                      <span className={`priority-badge ${announcement.priority}`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <div className="preview-content">
                      <p>{announcement.message || 'Your announcement message will appear here...'}</p>
                    </div>
                    <div className="preview-footer">
                      <small>
                        Recipients: {
                          announcement.recipients === 'all' ? 'All Students' :
                          announcement.recipients === 'classrooms' ? `${announcement.selectedClassrooms.length} Classrooms` :
                          `${announcement.selectedStudents.length} Students`
                        }
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowAnnouncementModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <FaEnvelope /> Send Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Challenge Selection Modal */}
      {showChallengeSelection && selectedClassroom && (
        <div className="modal-overlay">
          <div className="modal-content challenge-selection-modal">
            <div className="modal-header">
              <h2>Assign Challenges to {selectedClassroom.name}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowChallengeSelection(false);
                  setSelectedChallenges([]);
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="challenge-selection-section">
                <h4>Available Challenges</h4>
                <p>Select challenges from your library to assign to this classroom:</p>
                
                <div className="challenges-selection-list">
                  {classrooms.flatMap(classroom => classroom.challenges || []).length > 0 ? (
                    <div className="challenges-grid">
                      {classrooms.flatMap(classroom => classroom.challenges || []).map(challenge => (
                        <div key={challenge.id} className="challenge-selection-card">
                          <div className="challenge-checkbox">
                            <input 
                              type="checkbox" 
                              id={`challenge-${challenge.id}`}
                              checked={selectedChallenges.some(c => c.id === challenge.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedChallenges(prev => [...prev, challenge]);
                                } else {
                                  setSelectedChallenges(prev => prev.filter(c => c.id !== challenge.id));
                                }
                              }}
                            />
                            <label htmlFor={`challenge-${challenge.id}`} className="checkbox-label">
                              <div className="challenge-info">
                                <div className="challenge-icon">
                                  <FaCode />
                                </div>
                                <div className="challenge-details">
                                  <h5>{challenge.title}</h5>
                                  <p>{challenge.description || 'No description available'}</p>
                                  <div className="challenge-meta">
                                    <span className={`difficulty-badge ${challenge.difficulty}`}>
                                      {challenge.difficulty}
                                    </span>
                                    <span className="par-info">Par: {challenge.par || 3}</span>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <FaCode />
                      </div>
                      <h3>No Challenges Available</h3>
                      <p>Create some challenges first to assign them to classrooms.</p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          setShowChallengeSelection(false);
                          setShowCreateChallenge(true);
                        }}
                      >
                        <FaPlus /> Create Challenge
                      </button>
                    </div>
                  )}
                </div>
                
                {selectedChallenges.length > 0 && (
                  <div className="selected-challenges-summary">
                    <h4>Selected Challenges ({selectedChallenges.length})</h4>
                    <div className="selected-list">
                      {selectedChallenges.map(challenge => (
                        <div key={challenge.id} className="selected-challenge">
                          <span>{challenge.title}</span>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => setSelectedChallenges(prev => prev.filter(c => c.id !== challenge.id))}
                          >
                            <FaTimesCircle />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => {
                  setShowChallengeSelection(false);
                  setSelectedChallenges([]);
                }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={assignSelectedChallenges}
                disabled={selectedChallenges.length === 0}
              >
                <FaUserCheck /> Assign {selectedChallenges.length} Challenge{selectedChallenges.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="modal-overlay">
          <div className="modal-content create-event-modal">
            <div className="modal-header">
              <h2>Create New Event</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreateEvent(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const eventData = {
                title: formData.get('title'),
                description: formData.get('description'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location'),
                maxParticipants: parseInt(formData.get('maxParticipants')),
                type: formData.get('type')
              };
              createEvent(eventData);
            }}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Event Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    className="form-input"
                    placeholder="Enter event title"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea 
                    name="description"
                    className="form-input form-textarea"
                    placeholder="Describe your event"
                    rows="4"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input 
                      type="date" 
                      name="date"
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Time *</label>
                    <input 
                      type="time" 
                      name="time"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Location *</label>
                  <input 
                    type="text" 
                    name="location"
                    className="form-input"
                    placeholder="e.g., Virtual, School Lab, Room 101"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Type *</label>
                    <select name="type" className="form-input" required>
                      <option value="">Select event type</option>
                      <option value="workshop">Workshop</option>
                      <option value="competition">Competition</option>
                      <option value="session">Session</option>
                      <option value="seminar">Seminar</option>
                      <option value="meetup">Meetup</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Max Participants *</label>
                    <input 
                      type="number" 
                      name="maxParticipants"
                      className="form-input"
                      min="1"
                      max="100"
                      defaultValue="20"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowCreateEvent(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <FaPlus /> Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudent && selectedClassroom && (
        <div className="modal-overlay">
          <div className="modal-content add-student-modal">
            <div className="modal-header">
              <h2>Add Student to {selectedClassroom.name}</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddStudent(false);
                  setNewStudent({ name: '', email: '', grade: '', studentId: '' });
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={addStudentToClassroom}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Student Name *</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter student's full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    className="form-input"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter student's email"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Grade Level *</label>
                    <select 
                      className="form-input"
                      value={newStudent.grade}
                      onChange={(e) => setNewStudent(prev => ({ ...prev, grade: e.target.value }))}
                      required
                    >
                      <option value="">Select grade</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Student ID</label>
                    <div className="input-with-button">
                      <input 
                        type="text" 
                        className="form-input"
                        value={newStudent.studentId}
                        onChange={(e) => setNewStudent(prev => ({ ...prev, studentId: e.target.value }))}
                        placeholder="Auto-generated if empty"
                      />
                      <button 
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => setNewStudent(prev => ({ ...prev, studentId: generateStudentId() }))}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="form-info">
                  <p><strong>Note:</strong> Students can also join this classroom using the classroom code: <code>{selectedClassroom.code}</code></p>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowAddStudent(false);
                    setNewStudent({ name: '', email: '', grade: '', studentId: '' });
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <FaUserPlus /> Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Classroom Code Modal */}
      {showClassroomCode && selectedClassroom && (
        <div className="modal-overlay">
          <div className="modal-content share-code-modal">
            <div className="modal-header">
              <h2>Share Classroom Code</h2>
              <button 
                className="close-btn"
                onClick={() => setShowClassroomCode(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="classroom-code-section">
                <div className="code-display">
                  <h3>{selectedClassroom.name}</h3>
                  <div className="code-container">
                    <span className="classroom-code">{selectedClassroom.code}</span>
                    <button 
                      className="btn btn-primary"
                      onClick={() => copyClassroomCode(selectedClassroom.code)}
                    >
                      <FaShareAlt /> Copy Code
                    </button>
                  </div>
                </div>
                
                <div className="sharing-instructions">
                  <h4>How students can join:</h4>
                  <ol>
                    <li>Students visit the PyGolfers website</li>
                    <li>They click on "Join Classroom" or "Enter Code"</li>
                    <li>They enter the classroom code: <strong>{selectedClassroom.code}</strong></li>
                    <li>They complete the registration process</li>
                    <li>They will automatically be added to this classroom</li>
                  </ol>
                </div>
                
                <div className="classroom-info">
                  <h4>Classroom Information:</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Classroom Name:</span>
                      <span className="info-value">{selectedClassroom.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Subject:</span>
                      <span className="info-value">{selectedClassroom.subject}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Grade Level:</span>
                      <span className="info-value">{selectedClassroom.grade}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Current Students:</span>
                      <span className="info-value">{selectedClassroom.students?.length || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className="share-options">
                  <h4>Share via:</h4>
                  <div className="share-buttons">
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        const text = `Join my PyGolfers classroom "${selectedClassroom.name}" using code: ${selectedClassroom.code}`;
                        navigator.clipboard.writeText(text);
                        alert('Message copied to clipboard!');
                      }}
                    >
                      <FaEnvelope /> Copy Message
                    </button>
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        const url = `${window.location.origin}/join-classroom?code=${selectedClassroom.code}`;
                        navigator.clipboard.writeText(url);
                        alert('Join link copied to clipboard!');
                      }}
                    >
                      <FaLink /> Copy Join Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowClassroomCode(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
