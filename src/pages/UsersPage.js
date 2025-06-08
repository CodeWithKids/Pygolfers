import React, { useState } from 'react';
import UserCard from '../components/users/UserCard';
import { FaSearch, FaFilter, FaUsers, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import './UsersPage.css';

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: 'Alex Johnson',
    username: 'alexcodes',
    role: 'teacher',
    bio: 'Passionate coding instructor with 8+ years of experience teaching Python and web development. Love helping students build amazing projects!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isVerified: true,
    stats: {
      stars: 245,
      trophies: 18,
      projects: 42
    },
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Teaching'],
    achievements: [
      { name: 'Mentor of the Month' },
      { name: '1000+ Students' },
      { name: 'Top Rated Instructor' }
    ],
    joinDate: 'Jan 2022',
    lastActive: '2h ago',
    likes: 128,
    isLiked: false
  },
  {
    id: 2,
    name: 'Sarah Williams',
    username: 'codewithsarah',
    role: 'student',
    bio: 'Aspiring web developer learning Python and JavaScript. Currently working on my portfolio website and some fun side projects!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isVerified: false,
    stats: {
      stars: 89,
      trophies: 7,
      projects: 15
    },
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'React'],
    achievements: [
      { name: 'Python Basics Certified' },
      { name: '10-Day Streak' },
      { name: 'Project of the Week' }
    ],
    joinDate: 'Mar 2023',
    lastActive: '5h ago',
    likes: 42,
    isLiked: true
  },
  {
    id: 3,
    name: 'Michael Chen',
    username: 'mike_dev',
    role: 'student',
    bio: 'High school student passionate about game development. Love creating 2D games with Python and Pygame!',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isVerified: true,
    stats: {
      stars: 156,
      trophies: 12,
      projects: 23
    },
    skills: ['Python', 'Pygame', 'Game Design', 'Algorithms'],
    achievements: [
      { name: 'Game Jam Winner' },
      { name: '30-Day Streak' },
      { name: 'Top Coder' }
    ],
    joinDate: 'Nov 2022',
    lastActive: '1d ago',
    likes: 76,
    isLiked: false
  },
  {
    id: 4,
    name: 'Dr. Emily Parker',
    username: 'dr_emily',
    role: 'teacher',
    bio: 'Computer Science professor specializing in AI and Machine Learning. Love making complex concepts accessible to everyone!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    isVerified: true,
    stats: {
      stars: 512,
      trophies: 32,
      projects: 87
    },
    skills: ['Python', 'Machine Learning', 'Data Science', 'AI', 'Research'],
    achievements: [
      { name: 'Educator of the Year' },
      { name: '5000+ Students' },
      { name: 'Published Author' }
    ],
    joinDate: 'Jun 2021',
    lastActive: '3h ago',
    likes: 243,
    isLiked: false
  }
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users, setUsers] = useState(sampleUsers);

  const handleFollow = (userId, isFollowing) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isLiked: isFollowing } : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="users-page">
      <header className="users-header">
        <h1>Meet Our Community</h1>
        <p>Connect with fellow coders, learn together, and grow your network</p>
      </header>
      
      <div className="users-filters">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search users"
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${roleFilter === 'all' ? 'active' : ''}`}
            onClick={() => setRoleFilter('all')}
            aria-label="Show all users"
          >
            <FaUsers className="filter-icon" /> All
          </button>
          <button 
            className={`filter-btn ${roleFilter === 'student' ? 'active' : ''}`}
            onClick={() => setRoleFilter('student')}
            aria-label="Filter students"
          >
            <FaUserGraduate className="filter-icon" /> Students
          </button>
          <button 
            className={`filter-btn ${roleFilter === 'teacher' ? 'active' : ''}`}
            onClick={() => setRoleFilter('teacher')}
            aria-label="Filter teachers"
          >
            <FaChalkboardTeacher className="filter-icon" /> Teachers
          </button>
        </div>
      </div>
      
      <div className="users-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onFollow={handleFollow}
              isFollowing={user.isLiked}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No users found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
