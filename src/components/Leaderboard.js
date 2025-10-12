import React, { useState, useEffect } from 'react';
import { FaTrophy, FaCrown, FaMedal, FaSearch, FaFilter, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/Leaderboard.css';

// Mock data for the leaderboard
const mockUsers = [
  {
    id: 1,
    username: 'codeMaster',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/80?img=1',
    score: 1250,
    solved: 42,
    joinDate: '2022-01-15',
    rank: 1,
    badge: 'Expert',
    streak: 7,
  },
  {
    id: 2,
    username: 'pythonPro',
    name: 'Sam Wilson',
    avatar: 'https://i.pravatar.cc/80?img=2',
    score: 1180,
    solved: 38,
    joinDate: '2022-02-20',
    rank: 2,
    badge: 'Advanced',
    streak: 5,
  },
  {
    id: 3,
    username: 'jsNinja',
    name: 'Taylor Swift',
    avatar: 'https://i.pravatar.cc/80?img=3',
    score: 1100,
    solved: 35,
    joinDate: '2022-03-10',
    rank: 3,
    badge: 'Advanced',
    streak: 3,
  },
  {
    id: 4,
    username: 'dataWizard',
    name: 'Jordan Lee',
    avatar: 'https://i.pravatar.cc/80?img=4',
    score: 980,
    solved: 32,
    joinDate: '2022-01-30',
    rank: 4,
    badge: 'Intermediate',
    streak: 2,
  },
  {
    id: 5,
    username: 'algoKing',
    name: 'Chris Martin',
    avatar: 'https://i.pravatar.cc/80?img=5',
    score: 920,
    solved: 30,
    joinDate: '2022-02-15',
    rank: 5,
    badge: 'Intermediate',
    streak: 1,
  },
];

const Leaderboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [timeFilter, setTimeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter users based on search and time filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get top 3 for podium
  const topThree = filteredUsers.slice(0, 3);
  const remainingUsers = filteredUsers.slice(3);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <FaCrown className="rank-icon gold" />;
      case 2: return <FaMedal className="rank-icon silver" />;
      case 3: return <FaMedal className="rank-icon bronze" />;
      default: return <span className="rank-number">{rank}</span>;
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Expert': return 'expert';
      case 'Advanced': return 'advanced';
      case 'Intermediate': return 'intermediate';
      case 'Beginner': return 'beginner';
      default: return 'beginner';
    }
  };

  return (
    <div className="leaderboard-container">
      {/* Header */}
      <motion.div 
        className="leaderboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <h1>
            PyGolfers Leaderboard
          </h1>
          <p>Compete with friends and climb the ranks!</p>
        </div>
      </motion.div>


      {/* Filters */}
      <motion.div 
        className="filters-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="time-filters">
          {['all', 'today', 'week', 'month'].map(filter => (
            <button
              key={filter}
              className={`filter-btn ${timeFilter === filter ? 'active' : ''}`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter === 'all' ? 'All Time' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="search-section">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </motion.div>

      {/* Podium for Top 3 */}
      {topThree.length > 0 && (
        <motion.div 
          className="podium-section"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="podium-title">🏆 Top Performers</h2>
          <div className="podium">
            {/* 2nd Place */}
            {topThree[1] && (
              <motion.div 
                className="podium-place second"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="podium-rank">🥈</div>
                <div className="podium-user">
                  <img src={topThree[1].avatar} alt={topThree[1].name} className="podium-avatar" />
                  <h3>{topThree[1].name}</h3>
                  <p className="podium-score">{topThree[1].score}</p>
                  <span className={`badge ${getBadgeColor(topThree[1].badge)}`}>{topThree[1].badge}</span>
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <motion.div 
                className="podium-place first"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="podium-rank">🥇</div>
                <div className="podium-user">
                  <img src={topThree[0].avatar} alt={topThree[0].name} className="podium-avatar" />
                  <h3>{topThree[0].name}</h3>
                  <p className="podium-score">{topThree[0].score}</p>
                  <span className={`badge ${getBadgeColor(topThree[0].badge)}`}>{topThree[0].badge}</span>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <motion.div 
                className="podium-place third"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="podium-rank">🥉</div>
                <div className="podium-user">
                  <img src={topThree[2].avatar} alt={topThree[2].name} className="podium-avatar" />
                  <h3>{topThree[2].name}</h3>
                  <p className="podium-score">{topThree[2].score}</p>
                  <span className={`badge ${getBadgeColor(topThree[2].badge)}`}>{topThree[2].badge}</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Rest of the Leaderboard */}
      {remainingUsers.length > 0 && (
        <motion.div 
          className="leaderboard-table-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="table-title">All Players</h3>
          <div className="table-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Score</th>
                  <th>Solved</th>
                  <th>Badge</th>
                  <th>Streak</th>
          </tr>
        </thead>
        <tbody>
                {remainingUsers.map((user, index) => (
                  <motion.tr 
                    key={user.id}
                    className="leaderboard-row"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="rank-cell">
                      {getRankIcon(user.rank)}
                    </td>
                    <td className="user-cell">
                      <div className="user-info">
                        <img src={user.avatar} alt={user.name} className="user-avatar" />
                        <div className="user-details">
                          <span className="user-name">{user.name}</span>
                          <span className="user-username">@{user.username}</span>
                  </div>
                </div>
              </td>
                    <td className="score-cell">
                      <span className="score-value">{user.score}</span>
                    </td>
                    <td className="solved-cell">
                      <span className="solved-value">{user.solved}</span>
                    </td>
                    <td className="badge-cell">
                      <span className={`badge ${getBadgeColor(user.badge)}`}>{user.badge}</span>
                    </td>
                    <td className="streak-cell">
                      <div className="streak-info">
                        <FaStar className="streak-icon" />
                        <span>{user.streak}</span>
                      </div>
                    </td>
                  </motion.tr>
          ))}
        </tbody>
      </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;
