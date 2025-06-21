
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaSortAmountDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/Challenges.css';

const ITEMS_PER_PAGE = 6;

const Challenges = () => {
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [challenges, setChallenges] = useState([]);

  // Simulate API call to fetch challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an actual API call
        // const response = await fetch('/api/challenges');
        // const data = await response.json();
        
        // Simulated API response
        const data = [
          {
            id: 1,
            title: 'FizzBuzz',
            description: 'Print numbers from 1 to N, but for multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for both print "FizzBuzz".',
            difficulty: 'easy',
            par: 4,
            completed: true,
            createdAt: '2025-05-15',
            isNew: false,
          },
          {
            id: 2,
            title: 'Palindrome Checker',
            description: 'Check if a given string is a palindrome (reads the same backward as forward).',
            difficulty: 'easy',
            par: 3,
            completed: false,
            createdAt: '2025-05-20',
            isNew: true,
          },
          {
            id: 3,
            title: 'Prime Number Generator',
            description: 'Generate all prime numbers up to a given number N using the Sieve of Eratosthenes.',
            difficulty: 'medium',
            par: 6,
            completed: false,
            createdAt: '2025-06-01',
            isNew: true,
          },
          {
            id: 4,
            title: 'Maze Solver',
            description: 'Find the shortest path through a 2D maze from start to end using BFS.',
            difficulty: 'hard',
            par: 15,
            completed: false,
            createdAt: '2025-06-05',
            isNew: true,
          },
          {
            id: 5,
            title: 'Anagram Groups',
            description: 'Group anagrams together from a list of strings.',
            difficulty: 'medium',
            par: 8,
            completed: false,
            createdAt: '2025-06-07',
            isNew: true,
          },
          {
            id: 6,
            title: 'Binary Search Tree',
            description: 'Implement a binary search tree with insert, delete, and search operations.',
            difficulty: 'hard',
            par: 12,
            completed: false,
            createdAt: '2025-06-06',
            isNew: true,
          },
          {
            id: 7,
            title: 'URL Shortener',
            description: 'Design a URL shortening service that converts long URLs to short, unique codes.',
            difficulty: 'medium',
            par: 10,
            completed: false,
            createdAt: '2025-06-08',
            isNew: true,
          },
          {
            id: 8,
            title: 'Sudoku Solver',
            description: 'Create a program that can solve any 9x9 Sudoku puzzle using backtracking.',
            difficulty: 'hard',
            par: 15,
            completed: false,
            createdAt: '2025-06-08',
            isNew: true,
          },
          {
            id: 9,
            title: 'Tic-Tac-Toe AI',
            description: 'Build an unbeatable Tic-Tac-Toe AI using the minimax algorithm.',
            difficulty: 'medium',
            par: 12,
            completed: false,
            createdAt: '2025-06-08',
            isNew: true,
          },
          {
            id: 10,
            title: 'Conway\'s Game of Life',
            description: 'Implement the cellular automaton with rules for cell survival, death, and reproduction.',
            difficulty: 'medium',
            par: 14,
            completed: false,
            createdAt: '2025-06-10',
            isNew: true,
          },
          {
            id: 11,
            title: 'Roman Numeral Converter',
            description: 'Convert between Roman numerals and integers in both directions.',
            difficulty: 'easy',
            par: 5,
            completed: false,
            createdAt: '2025-06-11',
            isNew: true,
          },
          {
            id: 12,
            title: 'Graph Path Finder',
            description: 'Implement Dijkstra\'s algorithm to find the shortest path between nodes in a weighted graph.',
            difficulty: 'hard',
            par: 18,
            completed: false,
            createdAt: '2025-06-12',
            isNew: true,
          },
          {
            id: 13,
            title: 'Caesar Cipher',
            description: 'Implement a function that encrypts and decrypts text using the Caesar cipher with a given shift value.',
            difficulty: 'easy',
            par: 4,
            completed: false,
            createdAt: '2025-06-13',
            isNew: true,
          },
          {
            id: 14,
            title: 'Array Flattener',
            description: 'Write a function that flattens a nested array structure into a single-level array.',
            difficulty: 'easy',
            par: 3,
            completed: false,
            createdAt: '2025-06-13',
            isNew: true,
          },
          {
            id: 15,
            title: 'Word Frequency Counter',
            description: 'Create a function that counts the frequency of each word in a given text.',
            difficulty: 'easy',
            par: 5,
            completed: false,
            createdAt: '2025-06-13',
            isNew: true,
          },
          {
            id: 16,
            title: 'Minesweeper',
            description: 'Implement the core logic for the Minesweeper game including board generation and number calculation.',
            difficulty: 'medium',
            par: 16,
            completed: false,
            createdAt: '2025-06-13',
            isNew: true,
          },
          {
            id: 17,
            title: 'Concurrent Web Crawler',
            description: 'Build a web crawler that can crawl multiple pages concurrently while respecting robots.txt rules.',
            difficulty: 'hard',
            par: 25,
            completed: false,
            createdAt: '2025-06-13',
            isNew: true,
          },
          {
            id: 18,
            title: 'Mini Redis Clone',
            description: 'Implement an in-memory key-value store with support for basic Redis-like commands (GET, SET, DEL, EXPIRE, TTL).',
            difficulty: 'hard',
            par: 22,
            completed: false,
            createdAt: '2025-06-13',
            isNew: true,
          },
        ];
        
        setChallenges(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching challenges:', err);
        setError('Failed to load challenges. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const filteredAndSortedChallenges = React.useMemo(() => {
    // Filter challenges
    let result = [...challenges].filter(challenge => {
      const matchesDifficulty = difficultyFilter === 'all' || challenge.difficulty === difficultyFilter;
      const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDifficulty && matchesSearch;
    });

    // Sort challenges
    result.sort((a, b) => {
      switch (sortBy) {
        case 'easiest':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'hardest':
          const reverseDifficultyOrder = { 'easy': 3, 'medium': 2, 'hard': 1 };
          return reverseDifficultyOrder[a.difficulty] - reverseDifficultyOrder[b.difficulty];
        case 'shortest':
          return a.par - b.par;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    return result;
  }, [challenges, difficultyFilter, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedChallenges.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedChallenges = filteredAndSortedChallenges.slice(
    startIndex, 
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleFilterChange = (filter) => {
    setDifficultyFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Helper function to get difficulty badge class
  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'badge-easy';
      case 'medium':
        return 'badge-medium';
      case 'hard':
        return 'badge-hard';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="challenges-container loading-container">
        <div className="loading-spinner"></div>
        <p>Loading challenges...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="challenges-container error-container">
        <div className="error-message">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="challenges-container">
      <h1 className="page-title">Python Challenges</h1>
      
      <div className="challenges-controls">
        <div className="controls-top">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
              aria-label="Search challenges"
            />
            <FaSearch className="search-icon" />
          </div>
          
          <div className="sort-container">
            <FaSortAmountDown className="sort-icon" />
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort challenges by"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="easiest">Easiest First</option>
              <option value="hardest">Hardest First</option>
              <option value="shortest">Shortest Par First</option>
            </select>
          </div>
        </div>
        
        <div className="difficulty-filters">
          <button 
            className={`filter-btn ${difficultyFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
            aria-pressed={difficultyFilter === 'all'}
          >
            All
          </button>
          <button 
            className={`filter-btn ${difficultyFilter === 'easy' ? 'active' : ''} badge-easy`}
            onClick={() => handleFilterChange('easy')}
            aria-pressed={difficultyFilter === 'easy'}
          >
            Easy
          </button>
          <button 
            className={`filter-btn ${difficultyFilter === 'medium' ? 'active' : ''} badge-medium`}
            onClick={() => handleFilterChange('medium')}
            aria-pressed={difficultyFilter === 'medium'}
          >
            Medium
          </button>
          <button 
            className={`filter-btn ${difficultyFilter === 'hard' ? 'active' : ''} badge-hard`}
            onClick={() => handleFilterChange('hard')}
            aria-pressed={difficultyFilter === 'hard'}
          >
            Hard
          </button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div 
          className="challenges-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {paginatedChallenges.length > 0 ? (
            paginatedChallenges.map((challenge) => (
              <motion.div 
                key={challenge.id} 
                className="challenge-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="challenge-header">
                  <h3 className="challenge-title">
                    <Link to={`/challenge/${challenge.id}`} className="challenge-link">
                      {challenge.title}
                    </Link>
                  </h3>
                  <div className="badge-container">
                    <span className={`difficulty-badge ${getDifficultyBadgeClass(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {challenge.isNew && <span className="new-badge">New</span>}
                    {challenge.completed && <span className="completed-badge" title="Completed">✓</span>}
                  </div>
                </div>
                <p className="challenge-description">{challenge.description}</p>
                <div className="challenge-footer">
                  <span className="par-score">Par: {challenge.par} lines</span>
                  <Link 
                    to={`/challenge/${challenge.id}`} 
                    className="start-challenge-btn"
                    aria-label={`Start ${challenge.title} challenge`}
                  >
                    {challenge.completed ? 'View Solution' : 'Start Challenge'}
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-results">
              <img 
                src="/images/no-results.svg" 
                alt="No challenges found" 
                className="no-results-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h3>No challenges found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="clear-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('all');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => handlePageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
          
          <button 
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Challenges;
