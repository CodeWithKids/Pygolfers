import React, { useState, useEffect, useMemo } from 'react';
import { FaTrophy, FaSearch, FaFilter, FaTimes, FaChevronDown, 
  FaChevronUp, FaChevronLeft, FaChevronRight, FaSort, FaSortUp, FaSortDown, FaUser, FaStar, 
  FaRegStar, FaRegBookmark, FaBookmark, FaShare, FaFlag, 
  FaTable, FaThLarge, FaMoon, FaSun, FaSyncAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfileModal from './UserProfileModal';
import Badge from './Badge';
import Heatmap from './Heatmap';

// Demo data constants
const countries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'BR', 'IN', 'CN'];
const languages = ['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Rust'];

// Mock data generation
const generateMockUsers = (count = 15) => {
  const demoUsers = [
    { name: 'Ava Carter', username: 'ava_c', avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Liam Smith', username: 'liam_smith', avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Sofia Lee', username: 'sofia.lee', avatar: 'https://i.pravatar.cc/150?img=33' },
    { name: 'Noah Kim', username: 'noahkim', avatar: 'https://i.pravatar.cc/150?img=23' },
    { name: 'Mia Patel', username: 'mia.patel', avatar: 'https://i.pravatar.cc/150?img=29' },
    { name: 'Ethan Chen', username: 'ethan_chen', avatar: 'https://i.pravatar.cc/150?img=41' },
    { name: 'Zara Müller', username: 'zara.m', avatar: 'https://i.pravatar.cc/150?img=53' },
    { name: 'Lucas Rossi', username: 'lucasr', avatar: 'https://i.pravatar.cc/150?img=18' },
    { name: 'Chloe Dubois', username: 'chloe.d', avatar: 'https://i.pravatar.cc/150?img=44' },
    { name: 'Mason Okafor', username: 'mason_ok', avatar: 'https://i.pravatar.cc/150?img=60' },
    { name: 'Layla Singh', username: 'laylasingh', avatar: 'https://i.pravatar.cc/150?img=9' },
    { name: 'Elijah Brown', username: 'elijahb', avatar: 'https://i.pravatar.cc/150?img=25' },
    { name: 'Isabella Wang', username: 'isaw', avatar: 'https://i.pravatar.cc/150?img=35' },
    { name: 'Mateo Silva', username: 'mateo_s', avatar: 'https://i.pravatar.cc/150?img=16' },
    { name: 'Amara Johnson', username: 'amara.j', avatar: 'https://i.pravatar.cc/150?img=61' }
  ];
  const countries = ['Kenya', 'Tanzania', 'Uganda', 'Nigeria', 'Ghana', 'South Africa', 'Rwanda', 'US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'BR', 'IN', 'CN'];
  const languages = [
    'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'Django', 'Flask', 'Requests', 'BeautifulSoup', 'PyTorch'
  ];
  return demoUsers.slice(0, count).map((user, i) => ({
    id: i + 1,
    rank: i + 1,
    username: user.username,
    name: user.name,
    avatar: user.avatar,
    country: countries[i % countries.length],
    language: languages[i % languages.length],
    score: 9800 - i * 350 + Math.floor(Math.random() * 200), // descending scores
    scoreChange: Math.floor(Math.random() * 100) - 45, // -45 to +54
    challengesCompleted: 200 - i * 10 + Math.floor(Math.random() * 10),
    challengesWon: 50 - i * 2 + Math.floor(Math.random() * 3),
    joinDate: new Date(Date.now() - (i * 1000 * 60 * 60 * 24 * 20)), // each joined 20 days apart
    isFollowing: i % 4 === 0,
    isBookmarked: i % 5 === 0,
    badges: [
      ...(i < 3 ? [`top-${i + 1}`] : []),
      ...(i % 5 === 0 ? ['elite'] : []),
      ...(i % 3 === 0 ? ['dedicated'] : []),
      ...(i % 7 === 0 ? ['influencer'] : [])
    ],
    isCurrentUser: i === 5 // Mark one user as current user for demo
  }));
};

const EnhancedLeaderboard = () => {
  // State
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Show demo data on mount
  useEffect(() => {
    const demoUsers = generateMockUsers(10);
    setUsers(demoUsers);
    setFilteredUsers(demoUsers);
    setLoading(false);
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    country: '',
    language: '',
    minScore: '',
    maxScore: '',
    minChallenges: ''
  });

  // Helper functions
  const renderTableView = () => (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('rank')}>
              Rank
              <span className={`sort-icon ${sortConfig.key === 'rank' ? 'active' : ''}`}>
                {sortConfig.key === 'rank' ? 
                  sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown /> 
                  : <FaSort />
                }
              </span>
            </th>
            <th onClick={() => handleSort('username')}>
              User
              <span className={`sort-icon ${sortConfig.key === 'username' ? 'active' : ''}`}>
                {sortConfig.key === 'username' ? 
                  sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown /> 
                  : <FaSort />
                }
              </span>
            </th>
            <th onClick={() => handleSort('score')}>
              Score
              <span className={`sort-icon ${sortConfig.key === 'score' ? 'active' : ''}`}>
                {sortConfig.key === 'score' ? 
                  sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown /> 
                  : <FaSort />
                }
              </span>
            </th>
            <th onClick={() => handleSort('challengesCompleted')}>
              Challenges
              <span className={`sort-icon ${sortConfig.key === 'challengesCompleted' ? 'active' : ''}`}>
                {sortConfig.key === 'challengesCompleted' ? 
                  sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown /> 
                  : <FaSort />
                }
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td className="rank-cell">
                <span className={`rank rank-${user.rank}`}>{user.rank}</span>
              </td>
              <td className="user-cell">
                <img src={user.avatar} alt={user.username} className="user-avatar" />
                <div className="user-info">
                  <div className="username">
                    {user.username}
                    {user.isCurrentUser && <FaUser className="current-user-icon" />}
                  </div>
                  <div className="user-handle">@{user.username}</div>
                </div>
              </td>
              <td className="score-cell">
                {user.score}
                <span className={`score-change ${user.scoreChange >= 0 ? 'positive' : 'negative'}`}>
                  {user.scoreChange >= 0 ? '+' : ''}{user.scoreChange}
                </span>
              </td>
              <td>
                <div className="challenges-completed">
                  {user.challengesCompleted}
                  <span className="challenges-won">{user.challengesWon} won</span>
                </div>
              </td>
              <td className="actions">
                <button 
                  className={`button button-primary icon-btn ${user.isFollowing ? 'active' : ''}`} 
                  onClick={(e) => handleFollowToggle(user, e)}
                >
                  {user.isFollowing ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <button 
                  className={`button button-secondary icon-btn ${user.isBookmarked ? 'active' : ''}`} 
                  onClick={(e) => handleBookmarkToggle(user, e)}
                >
                  {user.isBookmarked ? <FaStar /> : <FaRegStar />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGridView = () => (
    <div className="grid-view">
      {paginatedUsers.map(user => (
        <motion.div 
          key={user.id} 
          className="user-card"
          whileHover={{ scale: 1.02 }}
          onClick={() => handleUserClick(user)}
        >
          <div className="card-header">
            <div className="rank-badge">
              {user.rank}
            </div>
            <div className="user-actions">
              <button 
                className={`icon-btn ${user.isFollowing ? 'active' : ''}`} 
                onClick={(e) => handleFollowToggle(user, e)}
              >
                {user.isFollowing ? <FaBookmark /> : <FaRegBookmark />}
              </button>
              <button 
                className={`icon-btn ${user.isBookmarked ? 'active' : ''}`} 
                onClick={(e) => handleBookmarkToggle(user, e)}
              >
                {user.isBookmarked ? <FaStar /> : <FaRegStar />}
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="username">
              {user.username}
              {user.isCurrentUser && <FaUser className="current-user-icon" />}
            </div>
            <div className="user-handle">@{user.username}</div>
            <div className="user-stats">
              <div className="stat">
                <div className="stat-value">{user.score}</div>
                <div className="stat-label">Score</div>
              </div>
              <div className="stat">
                <div className="stat-value">{user.challengesCompleted}</div>
                <div className="stat-label">Challenges</div>
              </div>
              <div className="stat">
                <div className="stat-value">{user.challengesWon}</div>
                <div className="stat-label">Won</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPagination = () => (
    <div className="pagination">
      <button 
        className="button button-primary page-btn" 
        onClick={() => setCurrentPage(prev => prev - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>
      {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, i) => (
        <button 
          key={i + 1} 
          className={`button button-secondary page-btn ${currentPage === i + 1 ? 'active' : ''}`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button 
        className="button button-primary page-btn" 
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
      >
        <FaChevronRight />
      </button>
    </div>
  );

  // Effects
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          const mockUsers = generateMockUsers(50);
          setUsers(mockUsers);
          setFilteredUsers(mockUsers);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = [...users];

    // Time filter (not shown here)

    // Search filter (by username, name, or country)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(q) ||
        user.name.toLowerCase().includes(q) ||
        user.country.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page on filter/search
  }, [users, searchQuery, timeFilter, sortConfig]);

  useEffect(() => {
    const sorted = [...filteredUsers].sort((a, b) => {
      if (sortConfig.key === 'rank') return a.rank - b.rank;
      if (sortConfig.key === 'username') return a.username.localeCompare(b.username);
      if (sortConfig.key === 'score') return a.score - b.score;
      if (sortConfig.key === 'challengesCompleted') return a.challengesCompleted - b.challengesCompleted;
      return 0;
    });
    setFilteredUsers(sortConfig.direction === 'asc' ? sorted : sorted.reverse());
  }, [filteredUsers, sortConfig]);

  // Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setSortConfig({
        key,
        direction: 'asc'
      });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      language: '',
      minScore: '',
      maxScore: '',
      minChallenges: ''
    });
  };

  const handleFollowToggle = (user, e) => {
    e.stopPropagation();
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, isFollowing: !u.isFollowing } : u
    ));
  };

  const handleBookmarkToggle = (user, e) => {
    e.stopPropagation();
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, isBookmarked: !u.isBookmarked } : u
    ));
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Calculate paginated users
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Main render
  return (
    <div className={`enhanced-leaderboard ${darkMode ? 'dark' : ''}`}>
      <div className="leaderboard-header">
        <h1>
          <FaTrophy className="trophy-icon" />
          Leaderboard
        </h1>
        <p className="subtitle">
          Track your progress and compete with other users
        </p>
      </div>

      <div className="controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, username, or country..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="button button-secondary clear-search-btn" onClick={handleClearSearch} aria-label="Clear search">
              <FaTimes />
            </button>
          )}
        </div>

        <div className="view-controls">
          <button 
            className={`button button-secondary view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <FaTable />
            Table
          </button>
          <button 
            className={`button button-secondary view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FaThLarge />
            Grid
          </button>
        </div>

        <div className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
          <FaFilter />
          Filters
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="advanced-filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-row">
              <div className="filter-group">
                <label>Country</label>
                <select 
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Language</label>
                <select 
                  name="language"
                  value={filters.language}
                  onChange={handleFilterChange}
                >
                  <option value="">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Min Score</label>
                <input 
                  type="number" 
                  name="minScore" 
                  placeholder="Min" 
                  value={filters.minScore}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label>Max Score</label>
                <input 
                  type="number" 
                  name="maxScore" 
                  placeholder="Max" 
                  value={filters.maxScore}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label>Min Challenges</label>
                <input 
                  type="number" 
                  name="minChallenges" 
                  placeholder="Min" 
                  value={filters.minChallenges}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="filter-actions">
              <button 
                className="button button-pink filter-btn clear-filters"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {viewMode === 'table' ? renderTableView() : renderGridView()}
      {renderPagination()}
      
      <AnimatePresence>
        {selectedUser && (
          <UserProfileModal 
            user={selectedUser} 
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedLeaderboard;
