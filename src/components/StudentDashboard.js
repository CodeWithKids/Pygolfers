import React, { useState, useEffect } from 'react';
import { 
  FaCode, 
  FaTrophy, 
  FaClock, 
  FaCalendarAlt,
  FaUsers,
  FaGraduationCap,
  FaBell,
  FaEye,
  FaPlay,
  FaBookOpen,
  FaChartLine,
  FaAward,
  FaFire,
  FaStar,
  FaComments,
  FaEnvelope,
  FaDownload,
  FaFilter,
  FaSearch,
  FaChevronRight,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaUser,
  FaGamepad,
  FaMedal,
  FaRocket,
  FaBullseye,
  FaHeart,
  FaFlag,
  FaThumbsUp,
  FaShare,
  FaCopy,
  FaExternalLinkAlt
} from 'react-icons/fa';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [realtimeData, setRealtimeData] = useState({
    activeChallenges: 0,
    completedChallenges: 0,
    currentStreak: 0,
    totalPoints: 0,
    upcomingEvents: 0,
    unreadAnnouncements: 0
  });

  // Mock data for demonstration
  useEffect(() => {
    // Mock classrooms data
    const mockClassrooms = [
      {
        id: 1,
        name: 'Python Explorers',
        code: 'ABC123',
        teacher: 'Ms. Ada Lovelace',
        subject: 'Python Programming',
        grade: '8th Grade',
        students: 15,
        challenges: [
          { id: 1, title: 'FizzBuzz Challenge', difficulty: 'easy', status: 'completed', score: 95 },
          { id: 2, title: 'Palindrome Checker', difficulty: 'medium', status: 'in-progress', score: null },
          { id: 3, title: 'Prime Number Generator', difficulty: 'hard', status: 'not-started', score: null }
        ],
        announcements: [
          { id: 1, title: 'New Challenge Available', message: 'Check out the new Palindrome Checker challenge!', date: '2024-01-15', read: false },
          { id: 2, title: 'Class Schedule Update', message: 'Next class will be on Tuesday instead of Monday.', date: '2024-01-14', read: true }
        ]
      },
      {
        id: 2,
        name: 'JavaScript Masters',
        code: 'XYZ789',
        teacher: 'Mr. John Doe',
        subject: 'JavaScript',
        grade: '9th Grade',
        students: 12,
        challenges: [
          { id: 4, title: 'Array Manipulation', difficulty: 'easy', status: 'completed', score: 88 },
          { id: 5, title: 'DOM Manipulation', difficulty: 'medium', status: 'not-started', score: null }
        ],
        announcements: [
          { id: 3, title: 'Project Deadline', message: 'Remember to submit your final project by Friday.', date: '2024-01-16', read: false }
        ]
      }
    ];

    // Mock challenges data
    const mockChallenges = [
      {
        id: 1,
        title: 'FizzBuzz Challenge',
        description: 'Print numbers 1-100, but for multiples of 3 print "Fizz", multiples of 5 print "Buzz", and multiples of both print "FizzBuzz".',
        difficulty: 'easy',
        points: 50,
        timeLimit: 30,
        status: 'completed',
        score: 95,
        classroom: 'Python Explorers',
        dueDate: '2024-01-20',
        tags: ['loops', 'conditionals', 'basic']
      },
      {
        id: 2,
        title: 'Palindrome Checker',
        description: 'Write a function that checks if a given string is a palindrome.',
        difficulty: 'medium',
        points: 75,
        timeLimit: 45,
        status: 'in-progress',
        score: null,
        classroom: 'Python Explorers',
        dueDate: '2024-01-25',
        tags: ['strings', 'algorithms']
      },
      {
        id: 3,
        title: 'Array Manipulation',
        description: 'Implement various array operations like sorting, filtering, and mapping.',
        difficulty: 'easy',
        points: 60,
        timeLimit: 40,
        status: 'completed',
        score: 88,
        classroom: 'JavaScript Masters',
        dueDate: '2024-01-22',
        tags: ['arrays', 'methods']
      }
    ];

    // Mock events data
    const mockEvents = [
      {
        id: 1,
        title: 'Code Golf Competition',
        description: 'Annual coding competition for all students',
        date: '2024-02-15',
        time: '2:00 PM',
        location: 'School Lab',
        type: 'competition',
        registered: true,
        maxParticipants: 50,
        currentParticipants: 35
      },
      {
        id: 2,
        title: 'Python Workshop',
        description: 'Learn advanced Python concepts',
        date: '2024-01-30',
        time: '3:00 PM',
        location: 'Virtual',
        type: 'workshop',
        registered: false,
        maxParticipants: 30,
        currentParticipants: 20
      },
      {
        id: 3,
        title: 'JavaScript Study Group',
        description: 'Group study session for JavaScript concepts',
        date: '2024-01-25',
        time: '4:00 PM',
        location: 'Library',
        type: 'study-group',
        registered: true,
        maxParticipants: 15,
        currentParticipants: 12
      }
    ];

    // Mock announcements data
    const mockAnnouncements = [
      {
        id: 1,
        title: 'New Challenge Available',
        message: 'Check out the new Palindrome Checker challenge in Python Explorers class!',
        classroom: 'Python Explorers',
        date: '2024-01-15',
        priority: 'normal',
        read: false
      },
      {
        id: 2,
        title: 'Class Schedule Update',
        message: 'Next class will be on Tuesday instead of Monday due to holiday.',
        classroom: 'Python Explorers',
        date: '2024-01-14',
        priority: 'high',
        read: true
      },
      {
        id: 3,
        title: 'Project Deadline Reminder',
        message: 'Remember to submit your final project by Friday. Late submissions will have points deducted.',
        classroom: 'JavaScript Masters',
        date: '2024-01-16',
        priority: 'high',
        read: false
      }
    ];

    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        type: 'achievement',
        message: 'Congratulations! You earned the "Code Golf Champion" badge!',
        date: '2024-01-15',
        read: false
      },
      {
        id: 2,
        type: 'challenge',
        message: 'New challenge "Palindrome Checker" is now available',
        date: '2024-01-14',
        read: true
      },
      {
        id: 3,
        type: 'event',
        message: 'Code Golf Competition registration is now open',
        date: '2024-01-13',
        read: false
      }
    ];

    setClassrooms(mockClassrooms);
    setChallenges(mockChallenges);
    setEvents(mockEvents);
    setAnnouncements(mockAnnouncements);
    setNotifications(mockNotifications);

    // Mock realtime data
    setRealtimeData({
      activeChallenges: 2,
      completedChallenges: 2,
      currentStreak: 7,
      totalPoints: 203,
      upcomingEvents: 2,
      unreadAnnouncements: 2
    });

    setIsLoading(false);
  }, []);

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

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement': return <FaTrophy />;
      case 'challenge': return <FaCode />;
      case 'event': return <FaCalendarAlt />;
      case 'announcement': return <FaBell />;
      default: return <FaBell />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'not-started': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'normal': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const registerForEvent = (eventId) => {
    setEvents(prev => 
      prev.map(e => e.id === eventId ? { ...e, registered: true, currentParticipants: e.currentParticipants + 1 } : e)
    );
  };

  const unregisterFromEvent = (eventId) => {
    setEvents(prev => 
      prev.map(e => e.id === eventId ? { ...e, registered: false, currentParticipants: e.currentParticipants - 1 } : e)
    );
  };

  const markAnnouncementAsRead = (announcementId) => {
    setAnnouncements(prev => 
      prev.map(a => a.id === announcementId ? { ...a, read: true } : a)
    );
  };

  if (isLoading) {
    return (
      <div className="student-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading Student Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Enhanced Header Section */}
      <div className="dashboard-header">
        <div className="header-welcome">
          <h1>Welcome back, Student!</h1>
          <p>Continue your coding journey and explore new challenges</p>
          <div className="header-stats">
            <div className="header-stat">
              <span className="stat-number">{realtimeData.completedChallenges}</span>
              <span className="stat-label">Challenges Completed</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{realtimeData.currentStreak}</span>
              <span className="stat-label">Day Streak</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">{realtimeData.totalPoints}</span>
              <span className="stat-label">Total Points</span>
            </div>
          </div>
          <div className="realtime-stats">
            <div className="realtime-stat">
              <FaCode className="realtime-icon" />
              <span className="realtime-text">{realtimeData.activeChallenges} active challenges</span>
            </div>
            <div className="realtime-stat">
              <FaCalendarAlt className="realtime-icon" />
              <span className="realtime-text">{realtimeData.upcomingEvents} upcoming events</span>
            </div>
            <div className="realtime-stat">
              <FaBell className="realtime-icon" />
              <span className="realtime-text">{realtimeData.unreadAnnouncements} unread announcements</span>
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
                  {notifications && notifications.length > 0 ? (
                    notifications.slice(0, 5).map(notification => (
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
                    ))
                  ) : (
                    <div className="empty-state">
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        
        {/* My Classrooms Section */}
        <div className="dashboard-section classrooms-section">
          <div className="section-header">
            <h2>My Classrooms</h2>
            <div className="section-actions">
              <button className="btn btn-secondary">
                <FaSearch /> Join Classroom
              </button>
            </div>
          </div>
          
          <div className="classrooms-list">
            {classrooms && classrooms.length > 0 ? (
              <div className="classrooms-table">
                <div className="table-header">
                  <div className="col-title">Classroom</div>
                  <div className="col-stats">Challenges</div>
                  <div className="col-stats">Progress</div>
                  <div className="col-stats">Announcements</div>
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
                          <p>{classroom.teacher} • {classroom.subject}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-stats">
                      <span className="stat-value">{classroom.challenges.length}</span>
                    </div>
                    <div className="col-stats">
                      <span className="stat-value">
                        {classroom.challenges.filter(c => c.status === 'completed').length}/{classroom.challenges.length}
                      </span>
                    </div>
                    <div className="col-stats">
                      <span className="stat-value">
                        {classroom.announcements.filter(a => !a.read).length}
                      </span>
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
                          className="btn btn-sm btn-primary"
                          onClick={() => setSelectedClassroom(classroom)}
                          title="Solve Challenges"
                        >
                          <FaCode />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No classrooms joined yet</p>
                <button className="btn btn-primary">
                  <FaSearch /> Join a Classroom
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Challenges Section */}
        <div className="dashboard-section challenges-section">
          <div className="section-header">
            <h2>Active Challenges</h2>
            <div className="section-actions">
              <button className="btn btn-secondary">
                <FaEye /> View All
              </button>
            </div>
          </div>
          
          <div className="challenges-list">
            {challenges.filter(c => c.status === 'in-progress' || c.status === 'not-started').length > 0 ? (
              challenges
                .filter(c => c.status === 'in-progress' || c.status === 'not-started')
                .slice(0, 3)
                .map(challenge => (
                  <div key={challenge.id} className="challenge-item">
                    <div className="challenge-header">
                      <div className="challenge-info">
                        <h4>{challenge.title}</h4>
                        <p>{challenge.classroom}</p>
                      </div>
                      <div className="challenge-meta">
                        <span 
                          className="difficulty-badge"
                          style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                        >
                          {challenge.difficulty}
                        </span>
                        <span className="points">{challenge.points} pts</span>
                      </div>
                    </div>
                    <div className="challenge-description">
                      <p>{challenge.description}</p>
                    </div>
                    <div className="challenge-footer">
                      <div className="challenge-stats">
                        <span><FaClock /> {challenge.timeLimit} min</span>
                        <span><FaCalendarAlt /> Due {challenge.dueDate}</span>
                      </div>
                      <div className="challenge-actions">
                        <button 
                          className={`btn btn-sm ${challenge.status === 'in-progress' ? 'btn-primary' : 'btn-outline'}`}
                        >
                          <FaPlay /> {challenge.status === 'in-progress' ? 'Continue' : 'Start'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="empty-state">
                <p>No active challenges</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="dashboard-section events-section">
          <div className="section-header">
            <h2>Upcoming Events</h2>
            <div className="section-actions">
              <button className="btn btn-secondary">
                <FaEye /> View All
              </button>
            </div>
          </div>
          
          <div className="events-list">
            {events.filter(e => new Date(e.date) >= new Date()).length > 0 ? (
              events
                .filter(e => new Date(e.date) >= new Date())
                .slice(0, 3)
                .map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-header">
                      <div className="event-info">
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                      </div>
                      <div className="event-meta">
                        <span className={`event-type ${event.type}`}>
                          {event.type}
                        </span>
                        {event.registered && (
                          <span className="registered-badge">
                            <FaCheckCircle /> Registered
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="event-details">
                      <div className="event-stats">
                        <span><FaCalendarAlt /> {event.date}</span>
                        <span><FaClock /> {event.time}</span>
                        <span><FaUsers /> {event.location}</span>
                      </div>
                      <div className="event-participants">
                        <span>{event.currentParticipants}/{event.maxParticipants} participants</span>
                      </div>
                    </div>
                    <div className="event-actions">
                      {event.registered ? (
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => unregisterFromEvent(event.id)}
                        >
                          <FaTimesCircle /> Unregister
                        </button>
                      ) : (
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => registerForEvent(event.id)}
                          disabled={event.currentParticipants >= event.maxParticipants}
                        >
                          <FaCheckCircle /> Register
                        </button>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <div className="empty-state">
                <p>No upcoming events</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Announcements Section */}
        <div className="dashboard-section announcements-section">
          <div className="section-header">
            <h2>Recent Announcements</h2>
            <div className="section-actions">
              <button className="btn btn-secondary">
                <FaEye /> View All
              </button>
            </div>
          </div>
          
          <div className="announcements-list">
            {announcements && announcements.length > 0 ? (
              announcements.slice(0, 3).map(announcement => (
                <div 
                  key={announcement.id} 
                  className={`announcement-item ${announcement.read ? 'read' : 'unread'}`}
                  onClick={() => markAnnouncementAsRead(announcement.id)}
                >
                  <div className="announcement-header">
                    <div className="announcement-info">
                      <h4>{announcement.title}</h4>
                      <p>{announcement.classroom}</p>
                    </div>
                    <div className="announcement-meta">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                      >
                        {announcement.priority}
                      </span>
                      {!announcement.read && <div className="unread-indicator"></div>}
                    </div>
                  </div>
                  <div className="announcement-content">
                    <p>{announcement.message}</p>
                  </div>
                  <div className="announcement-footer">
                    <span className="announcement-date">{announcement.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No announcements</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Classroom Detail Modal */}
      {selectedClassroom && (
        <div className="modal-overlay">
          <div className="modal-content classroom-modal">
            <div className="modal-header">
              <h2>{selectedClassroom.name}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedClassroom(null)}
              >
                <FaTimesCircle />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="classroom-info">
                <div className="classroom-teacher">
                  <FaUser />
                  <span>Teacher: {selectedClassroom.teacher}</span>
                </div>
                <div className="classroom-subject">
                  <FaBookOpen />
                  <span>Subject: {selectedClassroom.subject}</span>
                </div>
                <div className="classroom-code">
                  <FaCopy />
                  <span>Code: {selectedClassroom.code}</span>
                </div>
              </div>

              <div className="classroom-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
                  onClick={() => setActiveTab('challenges')}
                >
                  <FaCode /> Challenges
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'announcements' ? 'active' : ''}`}
                  onClick={() => setActiveTab('announcements')}
                >
                  <FaBell /> Announcements
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'challenges' && (
                  <div className="challenges-tab">
                    <h3>Classroom Challenges</h3>
                    <div className="challenges-grid">
                      {selectedClassroom.challenges.map(challenge => (
                        <div key={challenge.id} className="challenge-card">
                          <div className="challenge-card-header">
                            <h4>{challenge.title}</h4>
                            <span 
                              className="difficulty-badge"
                              style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                            >
                              {challenge.difficulty}
                            </span>
                          </div>
                          <div className="challenge-card-body">
                            <div className="challenge-status">
                              <span 
                                className="status-badge"
                                style={{ backgroundColor: getStatusColor(challenge.status) }}
                              >
                                {challenge.status}
                              </span>
                              {challenge.score && (
                                <span className="score">Score: {challenge.score}%</span>
                              )}
                            </div>
                          </div>
                          <div className="challenge-card-footer">
                            <button 
                              className={`btn btn-sm ${challenge.status === 'completed' ? 'btn-outline' : 'btn-primary'}`}
                            >
                              <FaPlay /> {challenge.status === 'completed' ? 'Review' : 'Start'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'announcements' && (
                  <div className="announcements-tab">
                    <h3>Classroom Announcements</h3>
                    <div className="announcements-grid">
                      {selectedClassroom.announcements.map(announcement => (
                        <div 
                          key={announcement.id} 
                          className={`announcement-card ${announcement.read ? 'read' : 'unread'}`}
                        >
                          <div className="announcement-card-header">
                            <h4>{announcement.title}</h4>
                            <span className="announcement-date">{announcement.date}</span>
                          </div>
                          <div className="announcement-card-body">
                            <p>{announcement.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
