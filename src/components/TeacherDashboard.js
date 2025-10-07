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
  FaAward
} from 'react-icons/fa';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [showCreateClassroom, setShowCreateClassroom] = useState(false);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [analytics, setAnalytics] = useState({});
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
    
    setClassrooms(mockClassrooms);
    
    // Mock analytics
    setAnalytics({
      totalStudents: 5,
      totalChallenges: 5,
      avgProgress: 70,
      topPerformers: [
        { name: 'Carol Davis', score: 95, challengesCompleted: 12 },
        { name: 'Emma Brown', score: 88, challengesCompleted: 10 },
        { name: 'Alice Johnson', score: 82, challengesCompleted: 8 }
      ]
    });
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

  const exportStudentProgress = (classroomId) => {
    const classroom = classrooms.find(c => c.id === classroomId);
    if (!classroom) return;
    
    const csvData = classroom.students.map(student => ({
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

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateClassroom(true)}
          >
            <FaPlus /> Create Classroom
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="analytics-overview">
        <div className="analytics-card">
          <div className="analytics-icon">
            <FaUsers />
          </div>
          <div className="analytics-content">
            <h3>{analytics.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>
        
        <div className="analytics-card">
          <div className="analytics-icon">
            <FaCode />
          </div>
          <div className="analytics-content">
            <h3>{analytics.totalChallenges}</h3>
            <p>Total Challenges</p>
          </div>
        </div>
        
        <div className="analytics-card">
          <div className="analytics-icon">
            <FaChartLine />
          </div>
          <div className="analytics-content">
            <h3>{analytics.avgProgress}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
        
        <div className="analytics-card">
          <div className="analytics-icon">
            <FaTrophy />
          </div>
          <div className="analytics-content">
            <h3>{analytics.topPerformers.length}</h3>
            <p>Top Performers</p>
          </div>
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="classrooms-section">
        <h2>My Classrooms</h2>
        <div className="classrooms-grid">
          {classrooms.map(classroom => (
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
                <p><strong>Students:</strong> {classroom.students.length}</p>
                <p><strong>Challenges:</strong> {classroom.challenges.length}</p>
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
                    <h3>Students ({selectedClassroom.students.length})</h3>
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
                        {selectedClassroom.students.map(student => (
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
                
                {newChallenge.testCases.map((testCase, index) => (
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
                
                {newChallenge.hints.map((hint, index) => (
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
                
                {newChallenge.learningObjectives.map((objective, index) => (
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
