import React, { useState, useEffect } from 'react';
import { 
  FaComments, 
  FaHeart, 
  FaShare, 
  FaCode, 
  FaUser, 
  FaClock, 
  FaThumbsUp, 
  FaReply,
  FaEdit,
  FaTrash,
  FaFilter,
  FaSearch,
  FaPlus,
  FaTag,
  FaTrophy,
  FaStar,
  FaBookmark,
  FaFlag,
  FaUsers,
  FaLightbulb,
  FaQuestionCircle,
  FaExclamationTriangle,
  FaEye,
  FaThumbtack,
  FaFire,
  FaCrown,
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaGithub,
  FaPython
} from 'react-icons/fa';
import './CommunityForum.css';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportedPost, setReportedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'discussion',
    tags: [],
    isPinned: false,
    challengeId: null
  });
  const [newComment, setNewComment] = useState('');
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);

  // Enhanced mock data with safety features and educational content
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        title: 'How to optimize FizzBuzz solution?',
        content: 'I\'ve been working on the FizzBuzz challenge and I\'m trying to get my solution under par. Any tips for making it more concise?',
        author: {
          id: 1,
          name: 'Alex Johnson',
          avatar: 'https://i.pravatar.cc/150?img=1',
          role: 'learner',
          badges: ['Code Golf Champion', 'Speed Demon'],
          reputation: 1250,
          isVerified: true
        },
        category: 'help',
        tags: ['fizzbuzz', 'optimization', 'code-golf'],
        challengeId: 1,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        likes: 12,
        views: 45,
        isLiked: false,
        isBookmarked: false,
        isPinned: false,
        isTrending: true,
        isReported: false,
        hasBestAnswer: false,
        comments: [
          {
            id: 1,
            content: 'Try using list comprehension! It can make your code much shorter.',
            author: {
              id: 2,
              name: 'Sarah Wilson',
              avatar: 'https://i.pravatar.cc/150?img=2',
              role: 'teacher',
              reputation: 2100,
              isVerified: true
            },
            createdAt: '2024-01-15T11:00:00Z',
            likes: 5,
            isLiked: false,
            isBestAnswer: true,
            replies: [
              {
                id: 1,
                content: 'Thanks! That helped a lot.',
                author: {
                  id: 1,
                  name: 'Alex Johnson',
                  avatar: 'https://i.pravatar.cc/150?img=1',
                  role: 'learner'
                },
                createdAt: '2024-01-15T11:15:00Z',
                likes: 2,
                isLiked: false
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: '🎉 Welcome to PyGolfers Community!',
        content: 'Welcome to our amazing community! Here you can share solutions, ask questions, and learn together. Remember to be kind and helpful to everyone!',
        author: {
          id: 3,
          name: 'PyGolfers Team',
          avatar: 'https://i.pravatar.cc/150?img=3',
          role: 'moderator',
          badges: ['Community Moderator', 'Helpful Mentor'],
          reputation: 5000,
          isVerified: true
        },
        category: 'announcement',
        tags: ['welcome', 'community', 'guidelines'],
        challengeId: null,
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-10T09:00:00Z',
        likes: 45,
        views: 200,
        isLiked: true,
        isBookmarked: true,
        isPinned: true,
        isTrending: false,
        isReported: false,
        hasBestAnswer: false,
        comments: []
      },
      {
        id: 3,
        title: 'Share your best Palindrome solution!',
        content: 'Just completed the Palindrome challenge and I\'m curious to see how others approached it. Here\'s my solution:',
        author: {
          id: 4,
          name: 'Emma Davis',
          avatar: 'https://i.pravatar.cc/150?img=4',
          role: 'learner',
          badges: ['Under Par Master'],
          reputation: 980,
          isVerified: false
        },
        category: 'solution',
        tags: ['palindrome', 'solution-sharing', 'code-review'],
        challengeId: 2,
        createdAt: '2024-01-14T15:20:00Z',
        updatedAt: '2024-01-14T15:20:00Z',
        likes: 15,
        views: 78,
        isLiked: true,
        isBookmarked: true,
        isPinned: false,
        isTrending: true,
        isReported: false,
        hasBestAnswer: false,
        solution: {
          code: 'def is_palindrome(s):\n    return s == s[::-1]',
          language: 'python',
          characterCount: 35,
          lineCount: 1,
          score: 95
        },
        comments: []
      },
      {
        id: 4,
        title: 'Python tips for beginners',
        content: 'I\'ve been learning Python for a few months now and wanted to share some tips that helped me improve my code golf skills:',
        author: {
          id: 5,
          name: 'Lisa Rodriguez',
          avatar: 'https://i.pravatar.cc/150?img=5',
          role: 'teacher',
          badges: ['Helpful Mentor', 'Solution Sharer'],
          reputation: 1800,
          isVerified: true
        },
        category: 'tips',
        tags: ['python', 'beginners', 'tips', 'learning'],
        challengeId: null,
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z',
        likes: 25,
        views: 156,
        isLiked: false,
        isBookmarked: false,
        isPinned: false,
        isTrending: false,
        isReported: false,
        hasBestAnswer: false,
        comments: []
      }
    ];
    
    setPosts(mockPosts);
  }, []);

  const categories = [
    { id: 'all', label: 'All Posts', icon: FaComments },
    { id: 'discussion', label: 'General Discussion', icon: FaComments },
    { id: 'help', label: 'Help & Support', icon: FaQuestionCircle },
    { id: 'solution', label: 'Solution Sharing', icon: FaCode },
    { id: 'tips', label: 'Tips & Tricks', icon: FaLightbulb },
    { id: 'announcement', label: 'Announcements', icon: FaExclamationTriangle },
    { id: 'trending', label: 'Trending', icon: FaFire }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = filter === 'all' || 
      (filter === 'trending' ? post.isTrending : post.category === filter);
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'most-liked':
        return b.likes - a.likes;
      case 'most-commented':
        return b.comments - a.comments;
      case 'trending':
        return b.isTrending - a.isTrending;
      default:
        return 0;
    }
  });

  // Pin posts at the top
  const pinnedPosts = sortedPosts.filter(post => post.isPinned);
  const regularPosts = sortedPosts.filter(post => !post.isPinned);
  const finalPosts = [...pinnedPosts, ...regularPosts];

  const handleCreatePost = (e) => {
    e.preventDefault();
    const post = {
      id: Date.now(),
      ...newPost,
      author: {
        id: 1,
        name: 'Current User',
        avatar: 'https://i.pravatar.cc/150?img=32',
        role: 'learner',
        badges: [],
        reputation: 500,
        isVerified: false
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      views: 0,
      isLiked: false,
      isBookmarked: false,
      isPinned: false,
      isTrending: false,
      isReported: false,
      hasBestAnswer: false
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'discussion', tags: [], isPinned: false, challengeId: null });
    setShowCreatePost(false);
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    );
    
    setPosts(updatedPosts);
  };

  const handleBookmarkPost = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    );
    
    setPosts(updatedPosts);
  };

  const handleReportPost = (postId) => {
    setReportedPost(postId);
    setShowReportModal(true);
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (reportReason.trim()) {
      // In a real app, this would send to moderation system
      console.log(`Reported post ${reportedPost} for: ${reportReason}`);
      setShowReportModal(false);
      setReportReason('');
      setReportedPost(null);
      alert('Thank you for reporting. Our moderation team will review this content.');
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getCategoryIcon = (category) => {
    const categoryData = categories.find(cat => cat.id === category);
    return categoryData ? categoryData.icon : FaComments;
  };

  const getCategoryColor = (category) => {
    const colors = {
      discussion: '#3B82F6',
      help: '#EF4444',
      solution: '#10B981',
      tips: '#F59E0B',
      announcement: '#8B5CF6',
      trending: '#FF6B6B'
    };
    return colors[category] || '#6B7280';
  };

  return (
    <div className="community-forum">
      <div className="forum-header">
        <h1>Community Forum</h1>
        <p>Connect with fellow Python learners, share solutions, and get help!</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreatePost(true)}
        >
          <FaPlus /> Create Post
        </button>
      </div>

      <div className="forum-content">
        {/* Enhanced Sidebar */}
        <div className="forum-sidebar">
          <div className="search-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="categories-section">
            <h3>Categories</h3>
            <div className="categories-list">
              {categories.map(category => {
                const IconComponent = category.icon;
                return (
                  <button 
                    key={category.id}
                    className={`category-item ${filter === category.id ? 'active' : ''}`}
                    onClick={() => setFilter(category.id)}
                  >
                    <IconComponent />
                    <span>{category.label}</span>
                    <span className="post-count">
                      {category.id === 'all' ? posts.length : 
                       category.id === 'trending' ? posts.filter(p => p.isTrending).length :
                       posts.filter(p => p.category === category.id).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="quick-stats">
            <h3>Community Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <FaUsers />
                <span>1,234 Members</span>
              </div>
              <div className="stat-item">
                <FaComments />
                <span>5,678 Posts</span>
              </div>
              <div className="stat-item">
                <FaCode />
                <span>2,345 Solutions</span>
              </div>
              <div className="stat-item">
                <FaShieldAlt />
                <span>Safe Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="forum-main">
          <div className="posts-header">
            <h2>
              {filter === 'all' ? 'All Posts' : 
               filter === 'trending' ? 'Trending Posts' :
               categories.find(c => c.id === filter)?.label}
              <span className="post-count">({finalPosts.length})</span>
            </h2>
            <div className="sort-options">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-commented">Most Commented</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          <div className="posts-list">
            {finalPosts.map(post => {
              const CategoryIcon = getCategoryIcon(post.category);
              return (
                <div key={post.id} className={`post-card ${post.isPinned ? 'pinned' : ''} ${post.isTrending ? 'trending' : ''}`}>
                  {post.isPinned && (
                    <div className="pinned-badge">
                      <FaThumbtack /> Pinned
                    </div>
                  )}
                  {post.isTrending && (
                    <div className="trending-badge">
                      <FaFire /> Trending
                    </div>
                  )}
                  
                  <div className="post-header">
                    <div className="post-category">
                      <CategoryIcon style={{ color: getCategoryColor(post.category) }} />
                      <span>{post.category}</span>
                    </div>
                    <div className="post-meta">
                      <span className="post-time">{formatTimeAgo(post.createdAt)}</span>
                      <span className="post-views">{post.views} views</span>
                    </div>
                  </div>

                  <div className="post-content">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.content}</p>
                    
                    {post.tags.length > 0 && (
                      <div className="post-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">
                            <FaTag /> {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {post.solution && (
                      <div className="solution-preview">
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setSelectedSolution(post.solution);
                            setShowSolutionModal(true);
                          }}
                        >
                          <FaCode /> View Solution
                        </button>
                        <span className="solution-stats">
                          {post.solution.characterCount} chars • Score: {post.solution.score}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="post-footer">
                    <div className="post-author">
                      <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
                      <div className="author-info">
                        <span className="author-name">
                          {post.author.name}
                          {post.author.isVerified && <FaCheckCircle className="verified-badge" />}
                        </span>
                        <div className="author-badges">
                          {post.author.badges.slice(0, 2).map(badge => (
                            <span key={badge} className="badge">{badge}</span>
                          ))}
                          <span className="reputation">{post.author.reputation} pts</span>
                        </div>
                      </div>
                    </div>

                    <div className="post-actions">
                      <button 
                        className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <FaHeart />
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        className="action-btn"
                        onClick={() => setSelectedPost(post)}
                      >
                        <FaComments />
                        <span>{post.comments.length}</span>
                      </button>
                      <button className="action-btn">
                        <FaShare />
                      </button>
                      <button 
                        className={`action-btn ${post.isBookmarked ? 'bookmarked' : ''}`}
                        onClick={() => handleBookmarkPost(post.id)}
                      >
                        <FaBookmark />
                      </button>
                      <button 
                        className="action-btn report-btn"
                        onClick={() => handleReportPost(post.id)}
                        title="Report this post"
                      >
                        <FaFlag />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-content report-modal">
            <div className="modal-header">
              <h2><FaFlag /> Report Post</h2>
              <button 
                className="close-btn"
                onClick={() => setShowReportModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmitReport} className="modal-body">
              <div className="form-group">
                <label>Reason for reporting:</label>
                <textarea 
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Please describe why you're reporting this post..."
                  rows="4"
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <FaFlag /> Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="modal-overlay">
          <div className="modal-content create-post-modal">
            <div className="modal-header">
              <h2>Create New Post</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreatePost(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="What's your post about?"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                >
                  <option value="discussion">General Discussion</option>
                  <option value="help">Help & Support</option>
                  <option value="solution">Solution Sharing</option>
                  <option value="tips">Tips & Tricks</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Content</label>
                <textarea 
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Share your thoughts, ask questions, or provide solutions..."
                  rows="6"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input 
                  type="text" 
                  value={newPost.tags.join(', ')}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                  placeholder="python, code-golf, optimization"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreatePost(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;