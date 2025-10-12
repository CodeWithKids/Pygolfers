import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaCode, 
  FaGraduationCap, 
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaTrophy,
  FaBell,
  FaPlay,
  FaChartLine,
  FaBookOpen,
  FaUser,
  FaTimesCircle,
  FaFilter,
  FaCopy,
  FaCheck
} from 'react-icons/fa';
import '../styles/Classrooms.css';

export default function Classrooms() {
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState([]);
  const [joinedClassrooms, setJoinedClassrooms] = useState([]);
  const [showJoin, setShowJoin] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [activeClassroom, setActiveClassroom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('challenges');

  // Mock data for demonstration
  useEffect(() => {
    // Mock available classrooms (all classrooms in the system)
    const mockClassrooms = [
      {
        id: 1,
        name: 'Python Explorers',
        code: 'ABC123',
        teacher: 'Ms. Ada Lovelace',
        subject: 'Python Programming',
        grade: '8th Grade',
        students: 15,
        description: 'Learn Python programming from basics to advanced concepts',
        isJoined: true,
        challenges: [
          { 
            id: 1, 
            title: 'FizzBuzz Challenge', 
            description: 'Print numbers 1-100 with Fizz/Buzz rules.',
            difficulty: 'easy',
            status: 'completed',
            score: 95,
            points: 50,
            dueDate: '2024-01-20'
          },
          { 
            id: 2, 
            title: 'Palindrome Checker', 
            description: 'Write a function that checks if a string is a palindrome.',
            difficulty: 'medium',
            status: 'in-progress',
            score: null,
            points: 75,
            dueDate: '2024-01-25'
          },
          { 
            id: 3, 
            title: 'Prime Number Generator', 
            description: 'Create a function to generate prime numbers up to n.',
            difficulty: 'hard',
            status: 'not-started',
            score: null,
            points: 100,
            dueDate: '2024-01-30'
          }
        ],
        announcements: [
          {
            id: 1,
            title: 'New Challenge Available',
            message: 'Check out the new Palindrome Checker challenge!',
            date: '2024-01-15',
            priority: 'normal',
            read: false
          },
          {
            id: 2,
            title: 'Class Schedule Update',
            message: 'Next class will be on Tuesday instead of Monday.',
            date: '2024-01-14',
            priority: 'high',
            read: true
          }
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
        description: 'Master JavaScript and build interactive web applications',
        isJoined: true,
        challenges: [
          { 
            id: 4, 
            title: 'Array Manipulation', 
            description: 'Implement various array operations.',
            difficulty: 'easy',
            status: 'completed',
            score: 88,
            points: 60,
            dueDate: '2024-01-22'
          },
          { 
            id: 5, 
            title: 'DOM Manipulation', 
            description: 'Create interactive elements using the DOM API.',
            difficulty: 'medium',
            status: 'not-started',
            score: null,
            points: 80,
            dueDate: '2024-01-28'
          }
        ],
        announcements: [
          {
            id: 3,
            title: 'Project Deadline',
            message: 'Remember to submit your final project by Friday.',
            date: '2024-01-16',
            priority: 'high',
            read: false
          }
        ]
      },
      {
        id: 3,
        name: 'Web Development Bootcamp',
        code: 'WEB456',
        teacher: 'Ms. Sarah Smith',
        subject: 'Web Development',
        grade: '10th Grade',
        students: 20,
        description: 'Full-stack web development with HTML, CSS, and JavaScript',
        isJoined: false,
        challenges: [],
        announcements: []
      },
      {
        id: 4,
        name: 'Data Structures & Algorithms',
        code: 'DSA789',
        teacher: 'Dr. Michael Brown',
        subject: 'Computer Science',
        grade: '11th Grade',
        students: 18,
        description: 'Learn essential data structures and algorithms',
        isJoined: false,
        challenges: [],
        announcements: []
      }
    ];

    setClassrooms(mockClassrooms);
    setJoinedClassrooms(mockClassrooms.filter(c => c.isJoined));
  }, []);

  const handleJoinClassroom = (e) => {
    e.preventDefault();
    const found = classrooms.find(c => c.code === joinCode.toUpperCase());
    if (found && !found.isJoined) {
      const updatedClassrooms = classrooms.map(c => 
        c.id === found.id ? { ...c, isJoined: true, students: c.students + 1 } : c
      );
      setClassrooms(updatedClassrooms);
      setJoinedClassrooms(updatedClassrooms.filter(c => c.isJoined));
      setShowJoin(false);
      setJoinCode('');
      alert(`Successfully joined ${found.name}!`);
    } else if (found && found.isJoined) {
      alert('You are already a member of this classroom.');
    } else {
      alert('Invalid classroom code.');
    }
  };

  const handleStartChallenge = (challenge) => {
    // Navigate to challenge detail page
    navigate(`/challenge/${challenge.id}`);
  };

  const copyClassCode = (code) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
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

  const getProgressPercentage = (classroom) => {
    if (!classroom.challenges || classroom.challenges.length === 0) return 0;
    const completed = classroom.challenges.filter(c => c.status === 'completed').length;
    return Math.round((completed / classroom.challenges.length) * 100);
  };

  const filteredClassrooms = classrooms.filter(classroom => {
    const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || classroom.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['all', ...new Set(classrooms.map(c => c.subject))];

  if (activeClassroom) {
    const progress = getProgressPercentage(activeClassroom);
    const completedChallenges = activeClassroom.challenges.filter(c => c.status === 'completed').length;
    const unreadAnnouncements = activeClassroom.announcements.filter(a => !a.read).length;

    return (
      <div className="classrooms-page">
        <div className="classroom-detail-page">
          <button 
            className="btn btn-secondary back-btn"
            onClick={() => setActiveClassroom(null)}
          >
            ← Back to Classrooms
          </button>

          <div className="classroom-header">
            <div className="classroom-header-content">
              <div className="classroom-icon-large">
                <FaGraduationCap />
              </div>
              <div className="classroom-header-info">
                <h1>{activeClassroom.name}</h1>
                <p className="classroom-description">{activeClassroom.description}</p>
                <div className="classroom-meta">
                  <span><FaUser /> {activeClassroom.teacher}</span>
                  <span><FaBookOpen /> {activeClassroom.subject}</span>
                  <span><FaUsers /> {activeClassroom.students} students</span>
                  <span className="classroom-code-display">
                    Code: <strong>{activeClassroom.code}</strong>
                    <button 
                      className="btn-icon"
                      onClick={() => copyClassCode(activeClassroom.code)}
                      title="Copy classroom code"
                    >
                      {codeCopied ? <FaCheck /> : <FaCopy />}
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="classroom-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaCode />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{activeClassroom.challenges.length}</span>
                  <span className="stat-label">Challenges</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaCheckCircle />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{completedChallenges}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaChartLine />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{progress}%</span>
                  <span className="stat-label">Progress</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaBell />
                </div>
                <div className="stat-content">
                  <span className="stat-value">{unreadAnnouncements}</span>
                  <span className="stat-label">New Announcements</span>
                </div>
              </div>
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
              {unreadAnnouncements > 0 && (
                <span className="badge">{unreadAnnouncements}</span>
              )}
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'challenges' && (
              <div className="challenges-section">
                {activeClassroom.challenges.length > 0 ? (
                  <div className="challenges-grid">
                    {activeClassroom.challenges.map(challenge => (
                      <div key={challenge.id} className="challenge-card">
                        <div className="challenge-card-header">
                          <div className="challenge-title-group">
                            <h3>{challenge.title}</h3>
                            <span 
                              className="difficulty-badge"
                              style={{ backgroundColor: getDifficultyColor(challenge.difficulty) }}
                            >
                              {challenge.difficulty}
                            </span>
                          </div>
                          <span className="points-badge">
                            <FaTrophy /> {challenge.points} pts
                          </span>
                        </div>
                        <div className="challenge-card-body">
                          <p>{challenge.description}</p>
                          <div className="challenge-meta">
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(challenge.status) }}
                            >
                              {challenge.status === 'not-started' ? 'Not Started' : 
                               challenge.status === 'in-progress' ? 'In Progress' : 'Completed'}
                            </span>
                            {challenge.score && (
                              <span className="score-badge">
                                Score: {challenge.score}%
                              </span>
                            )}
                          </div>
                          <div className="challenge-footer">
                            <span className="due-date">
                              <FaClock /> Due: {challenge.dueDate}
                            </span>
                            <button 
                              className={`btn ${challenge.status === 'completed' ? 'btn-outline' : 'btn-primary'}`}
                              onClick={() => handleStartChallenge(challenge)}
                            >
                              <FaPlay /> {challenge.status === 'completed' ? 'Review' : 
                                        challenge.status === 'in-progress' ? 'Continue' : 'Start'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaCode className="empty-icon" />
                    <p>No challenges available yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="announcements-section">
                {activeClassroom.announcements.length > 0 ? (
                  <div className="announcements-list">
                    {activeClassroom.announcements.map(announcement => (
                      <div 
                        key={announcement.id}
                        className={`announcement-card ${announcement.read ? 'read' : 'unread'}`}
                      >
                        <div className="announcement-header">
                          <div className="announcement-title-group">
                            <h3>{announcement.title}</h3>
                            <span 
                              className="priority-badge"
                              style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                            >
                              {announcement.priority}
                            </span>
                          </div>
                          <span className="announcement-date">{announcement.date}</span>
                        </div>
                        <p className="announcement-message">{announcement.message}</p>
                        {!announcement.read && <div className="unread-indicator"></div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaBell className="empty-icon" />
                    <p>No announcements yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="classrooms-page">
      <div className="page-header">
        <div>
          <h1>My Classrooms</h1>
          <p>Join classrooms and access your coding challenges</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowJoin(true)}
        >
          <FaPlus /> Join Classroom
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input 
            type="text"
            placeholder="Search classrooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <select 
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="classrooms-tabs">
        <button className="tab-btn active">
          Joined ({joinedClassrooms.length})
        </button>
        <button className="tab-btn">
          Available ({classrooms.filter(c => !c.isJoined).length})
        </button>
      </div>

      <div className="classrooms-grid">
        {filteredClassrooms.map(classroom => {
          const progress = getProgressPercentage(classroom);
          const completedChallenges = classroom.challenges.filter(c => c.status === 'completed').length;
          
          return (
            <div key={classroom.id} className="classroom-card">
              <div className="classroom-card-header">
                <div className="classroom-icon">
                  <FaGraduationCap />
                </div>
                <div className="classroom-info">
                  <h3>{classroom.name}</h3>
                  <p>{classroom.teacher}</p>
                </div>
                {classroom.isJoined && (
                  <span className="joined-badge">
                    <FaCheckCircle /> Joined
                  </span>
                )}
              </div>
              <div className="classroom-card-body">
                <p className="classroom-description">{classroom.description}</p>
                <div className="classroom-details">
                  <span><FaBookOpen /> {classroom.subject}</span>
                  <span><FaUsers /> {classroom.students} students</span>
                  <span>Code: <strong>{classroom.code}</strong></span>
                </div>
                {classroom.isJoined && classroom.challenges.length > 0 && (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{completedChallenges}/{classroom.challenges.length} challenges</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="classroom-card-footer">
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveClassroom(classroom)}
                >
                  <FaEye /> View Classroom
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredClassrooms.length === 0 && (
        <div className="empty-state">
          <FaGraduationCap className="empty-icon" />
          <p>No classrooms found</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowJoin(true)}
          >
            <FaPlus /> Join a Classroom
          </button>
        </div>
      )}

      {/* Join Classroom Modal */}
      {showJoin && (
        <div className="modal-overlay" onClick={() => setShowJoin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Join Classroom</h2>
              <button 
                className="close-btn"
                onClick={() => setShowJoin(false)}
              >
                <FaTimesCircle />
              </button>
            </div>
            <form onSubmit={handleJoinClassroom}>
              <div className="form-group">
                <label htmlFor="joinCode">Classroom Code</label>
                <input 
                  id="joinCode"
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="Enter 6-character code (e.g., ABC123)"
                  required
                  maxLength={6}
                />
                <small>Ask your teacher for the classroom code</small>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowJoin(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaPlus /> Join Classroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Import FaEye icon
const FaEye = () => (
  <svg viewBox="0 0 576 512" fill="currentColor" style={{ width: '1em', height: '1em' }}>
    <path d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"/>
  </svg>
);