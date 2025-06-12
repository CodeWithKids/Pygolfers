import React, { useState, useEffect, useMemo } from 'react';
import { FaTrophy, FaSearch, FaFilter, FaTimes, FaChevronDown, 
  FaChevronUp, FaChevronLeft, FaChevronRight, FaSort, FaSortUp, FaSortDown, FaUser, FaStar, 
  FaRegStar, FaRegBookmark, FaBookmark, FaShare, FaFlag, 
  FaTable, FaThLarge, FaMoon, FaSun, FaSyncAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfileModal from './UserProfileModal';
import Badge from './Badge';
import Heatmap from './Heatmap';

// Country and language options for filters
const countries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP', 'BR', 'IN', 'CN'];
const languages = ['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Rust'];

const EnhancedLeaderboard = () => {
  // State
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data from API
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/leaderboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // You might want to set an error state here to show to the user
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
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
        // Fetch leaderboard data from API
        const response = await fetch('/api/leaderboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        // You might want to set an error state here to show to the user
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
