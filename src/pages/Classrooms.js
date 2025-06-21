import React, { useState } from 'react';
import '../styles/Buttons.css';

// Demo roles: in a real app, get this from user profile/auth
const DEMO_ROLE = 'teacher'; // or 'student'

function generateClassCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

const initialClassrooms = [
  // Demo classroom
  {
    id: 1,
    name: 'Python Explorers',
    code: 'ABC123',
    teacher: 'Ms. Ada',
    students: ['Ben', 'Lila'],
    challenges: [
      { id: 1, title: 'FizzBuzz', description: 'Print numbers 1-100 with Fizz/Buzz rules.' }
    ]
  }
];

export default function Classrooms() {
  const [classrooms, setClassrooms] = useState(initialClassrooms);
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [activeClassroom, setActiveClassroom] = useState(null);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDesc, setChallengeDesc] = useState('');

  // Teacher creates classroom
  function handleCreateClassroom(e) {
    e.preventDefault();
    const code = generateClassCode();
    setClassrooms([
      ...classrooms,
      {
        id: Date.now(),
        name: newClassName,
        code,
        teacher: 'You',
        students: [],
        challenges: []
      }
    ]);
    setInviteCode(code);
    setShowCreate(false);
    setNewClassName('');
  }

  // Student joins classroom
  function handleJoinClassroom(e) {
    e.preventDefault();
    const found = classrooms.find(c => c.code === joinCode.toUpperCase());
    if (found) {
      found.students.push('You');
      setClassrooms([...classrooms]);
      setActiveClassroom(found);
      setShowJoin(false);
      setJoinCode('');
    } else {
      alert('Invalid code');
    }
  }

  // Teacher adds challenge
  function handleAddChallenge(e) {
    e.preventDefault();
    if (!challengeTitle) return;
    activeClassroom.challenges.push({
      id: Date.now(),
      title: challengeTitle,
      description: challengeDesc
    });
    setClassrooms([...classrooms]);
    setChallengeTitle('');
    setChallengeDesc('');
  }

  // UI
  if (activeClassroom) {
    return (
      <div className="classroom-detail">
        <h2>{activeClassroom.name}</h2>
        <div className="class-code">Class Code: <b>{activeClassroom.code}</b></div>
        <div>Teacher: {activeClassroom.teacher}</div>
        <div>Students: {activeClassroom.students.join(', ')}</div>
        <h3>Coding Challenges</h3>
        <ul>
          {activeClassroom.challenges.map(ch => (
            <li key={ch.id}><b>{ch.title}</b>: {ch.description}</li>
          ))}
        </ul>
        {DEMO_ROLE === 'teacher' && (
          <form onSubmit={handleAddChallenge} className="challenge-form">
            <input value={challengeTitle} onChange={e => setChallengeTitle(e.target.value)} placeholder="Challenge Title" required />
            <input value={challengeDesc} onChange={e => setChallengeDesc(e.target.value)} placeholder="Description" />
            <button type="submit" className="button button-primary">Add Challenge</button>
          </form>
        )}
        <button className="button button-secondary" onClick={() => setActiveClassroom(null)}>Back to Classrooms</button>
      </div>
    );
  }

  return (
    <div className="classrooms-page">
      <h1>Classrooms</h1>
      {DEMO_ROLE === 'teacher' && (
        <button className="button button-primary" onClick={() => setShowCreate(true)}>Create Classroom</button>
      )}
      <button className="button button-yellow" onClick={() => setShowJoin(true)}>Join Classroom</button>
      <ul className="classroom-list">
        {classrooms.map(c => (
          <li key={c.id}>
            <span>{c.name}</span> <span className="class-code">[{c.code}]</span>
            <button className="button button-secondary" onClick={() => setActiveClassroom(c)}>View</button>
          </li>
        ))}
      </ul>
      {/* Create Classroom Modal */}
      {showCreate && (
        <div className="modal">
          <form className="modal-content" onSubmit={handleCreateClassroom}>
            <h2>Create Classroom</h2>
            <input value={newClassName} onChange={e => setNewClassName(e.target.value)} placeholder="Classroom Name" required />
            <button type="submit" className="button button-primary">Create</button>
            <button type="button" className="button button-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
          </form>
        </div>
      )}
      {/* Join Classroom Modal */}
      {showJoin && (
        <div className="modal">
          <form className="modal-content" onSubmit={handleJoinClassroom}>
            <h2>Join Classroom</h2>
            <input value={joinCode} onChange={e => setJoinCode(e.target.value)} placeholder="Enter Class Code" required />
            <button type="submit" className="button button-yellow">Join</button>
            <button type="button" className="button button-secondary" onClick={() => setShowJoin(false)}>Cancel</button>
          </form>
        </div>
      )}
      {/* Show invite code after creation */}
      {inviteCode && (
        <div className="invite-code-banner">
          Classroom created! Invite students with code: <b>{inviteCode}</b>
          <button className="button button-secondary" onClick={() => {navigator.clipboard.writeText(inviteCode); setInviteCode('');}}>Copy Code</button>
        </div>
      )}
    </div>
  );
}
