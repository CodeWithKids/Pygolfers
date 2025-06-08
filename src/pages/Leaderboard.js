import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrophy, 
  FaSearch, 
  FaFilter, 
  FaChevronLeft, 
  FaChevronRight, 
  FaFire, 
  FaCrown, 
  FaUser
} from 'react-icons/fa';
import '../styles/Leaderboard.css';

// Mock data - in a real app, this would come from an API
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i % 70}`, // Using Pravatar for demo
  score: Math.floor(Math.random() * 10000),
  challengesCompleted: Math.floor(Math.random() * 150) + 10,
  rank: i + 1,
  isCurrentUser: i === 5, // Mark one user as current user for demo
}));

// Sort users by score (descending)
mockUsers.sort((a, b) => b.score - a.score);

// Update ranks after sorting
mockUsers.forEach((user, index) => {
  user.rank = index + 1;
});

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this data from an API
        // const response = await fetch(`/api/leaderboard?time=${timeFilter}`);
        // const data = await response.json();
        
        // Simulate API call with timeout
        setTimeout(() => {
          // Filter based on search query
          const filteredUsers = searchQuery 
            ? mockUsers.filter(user => 
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : [...mockUsers];
          
          setUsers(filteredUsers);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load leaderboard. Please try again later.');
        setLoading(false);
        console.error('Error fetching leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, [timeFilter, searchQuery]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Format score with commas
  const formatScore = (score) => {
    return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Get medal emoji based on rank
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return <span className="rank-badge gold"><FaCrown /> 1st</span>;
      case 2:
        return <span className="rank-badge silver">2nd</span>;
      case 3:
        return <span className="rank-badge bronze">3rd</span>;
      default:
        return `#${rank}`;
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1><FaTrophy className="trophy-icon" /> Leaderboard</h1>
        <p className="leaderboard-subtitle">See how you rank against other Python golfers</p>
      </div>

      <div className="leaderboard-controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <span className="filter-label"><FaFilter /> Time Period:</span>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${timeFilter === 'all' ? 'active' : ''}`}
              onClick={() => handleTimeFilterChange('all')}
            >
              All Time
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
              onClick={() => handleTimeFilterChange('month')}
            >
              This Month
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
              onClick={() => handleTimeFilterChange('week')}
            >
              This Week
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      ) : users.length === 0 ? (
        <div className="no-results">
          <p>No users found matching your search.</p>
        </div>
      ) : (
        <>
          <div className="leaderboard-table-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th className="rank-col">Rank</th>
                  <th className="user-col">User</th>
                  <th className="score-col">Score</th>
                  <th className="challenges-col">Challenges</th>
                  <th className="last-active-col">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className={`user-row ${user.isCurrentUser ? 'current-user' : ''} ${user.rank <= 3 ? 'top-three' : ''}`}
                      onClick={(e) => handleUserClick(user.username, e)}
                    >
                      <td className="rank-cell">
                        {getRankBadge(user.rank)}
                      </td>
                      <td className="user-cell">
                        <div className="user-info">
                          <div className="avatar-container">
                            {user.avatar ? (
                              <img 
                                src={user.avatar} 
                                alt={user.username} 
                                className="user-avatar" 
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : (
                              <div className="avatar-fallback">
                                <FaUser className="user-icon" />
                              </div>
                            )}
                            <div className="avatar-fallback" style={{ display: user.avatar ? 'none' : 'flex' }}>
                              <FaUser className="user-icon" />
                            </div>
                          </div>
                          <div className="user-details">
                            <Link 
                              to={`/profile/${user.username}`} 
                              className="username"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {user.username}
                              {user.rank <= 3 && <span className="top-badge">Top {user.rank}</span>}
                              {user.isCurrentUser && <span className="you-badge">You</span>}
                            </Link>
                            {user.title && (
                              <span className="user-title">{user.title}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="score-cell">
                        <span className="score-value">{formatScore(user.score)}</span>
                        {user.rank <= 3 && <FaFire className="fire-icon" />}
                      </td>
                      <td className="challenges-cell">
                        <div className="challenges-count">
                          <span className="count">{user.challengesCompleted}</span>
                          <span className="label">completed</span>
                        </div>
                      </td>
                      <td className="last-active-cell">
                        {user.lastActive ? (
                          <span className="last-active" title={new Date(user.lastActive).toLocaleString()}>
                            {formatLastActive(user.lastActive)}
                          </span>
                        ) : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results-cell">
                      <div className="no-results-message">
                        <FaExclamationTriangle className="no-results-icon" />
                        <p>No users found matching your search.</p>
                        <button 
                          className="clear-filters-btn"
                          onClick={() => {
                            setSearchQuery('');
                            setTimeFilter('all');
                            setCurrentPage(1);
                          }}
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <FaChevronLeft />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show first page, last page, current page, and pages around current page
                if (i === 0 || i === totalPages - 1 || (i >= currentPage - 2 && i <= currentPage + 2)) {
                  return (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                
                // Show ellipsis for large gaps
                if (i === 1 || i === totalPages - 2) {
                  return <span key={i} className="pagination-ellipsis">...</span>;
                }
                
                return null;
              })}
              
              <button 
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
