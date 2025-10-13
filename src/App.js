import React, { useState, useEffect } from "react";
import "./styles/Buttons.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPlay, FaUser, FaCog, FaSignOutAlt, FaChevronDown, FaTrophy, FaCode, FaUsers, FaChartLine, FaStar, FaQuoteLeft, FaGithub, FaTwitter, FaDiscord, FaGraduationCap, FaChalkboardTeacher, FaUserFriends, FaShieldAlt, FaHeart, FaGamepad, FaMedal, FaRocket, FaBell } from "react-icons/fa";
import { motion } from 'framer-motion';
import CodePreview from './components/CodePreview';
import './components/CodePreview.css';
import "./App.css";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Classrooms from "./pages/Classrooms";
import './styles/Classrooms.css';
import Contact from "./pages/Contact";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/profile/Profile";
import ProfileSettings from "./pages/profile/ProfileSettings";
import Events from "./pages/Events";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ParentDashboard from "./components/ParentDashboard";
import CommunityForum from "./components/CommunityForum";
import { AuthProvider, useAuth } from "./context/AuthContext";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    className="feature-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
  >
    <div className="feature-icon">
      <Icon />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

const Testimonial = ({ quote, author, role, avatar, rating }) => (
  <motion.div 
    className="testimonial-card"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="testimonial-rating">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={i < rating ? 'star filled' : 'star'} />
      ))}
    </div>
    <FaQuoteLeft className="quote-icon" />
    <p className="testimonial-quote">{quote}</p>
    <div className="testimonial-author">
      <img src={avatar} alt={author} className="testimonial-avatar" />
      <div>
        <h4>{author}</h4>
        <span>{role}</span>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.app-header');
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const userTypes = [
    {
      role: 'Learner',
      icon: FaGraduationCap,
      title: 'I\'m a Learner',
      description: 'Solve fun Python challenges and earn cool badges!',
      color: '#36B6A8', // Teal - Primary color
      features: ['Code Golf Challenges', 'Achievement Badges', 'Leaderboards', 'Safe Community']
    },
    {
      role: 'Teacher',
      icon: FaChalkboardTeacher,
      title: 'I\'m a Teacher',
      description: 'Create classrooms and track student progress.',
      color: '#F76C7B', // Pink - Accent color
      features: ['Classroom Management', 'Student Analytics', 'Custom Challenges', 'Progress Reports']
    },
    {
      role: 'Parent',
      icon: FaUserFriends,
      title: 'I\'m a Parent',
      description: 'Support your child\'s coding journey safely.',
      color: '#FFD43B', // Yellow - Secondary color
      features: ['Progress Monitoring', 'Safety Features', 'Achievement Tracking', 'Parent Dashboard']
    }
  ];

  const features = [
    {
      icon: FaGamepad,
      title: 'Learn Through Play',
      description: 'Turn coding into a fun game! Solve challenges with the fewest characters possible.'
    },
    {
      icon: FaTrophy,
      title: 'Earn Cool Badges',
      description: 'Collect achievement badges as you master new Python skills and techniques.'
    },
    {
      icon: FaUsers,
      title: 'Safe Community',
      description: 'Connect with other young coders in a moderated, kid-friendly environment.'
    },
    {
      icon: FaRocket,
      title: 'Level Up Fast',
      description: 'Track your progress and see how you\'re becoming a Python champion!'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Pick a Fun Challenge',
      description: 'Choose from our collection of kid-friendly Python challenges! Start easy and work your way up.'
    },
    {
      number: '02',
      title: 'Write Your Code',
      description: 'Create the shortest Python solution you can! The fewer characters, the better your score.'
    },
    {
      number: '03',
      title: 'See Your Score',
      description: 'Get instant feedback! See if you beat the "par" and how you compare to other kids.'
    },
    {
      number: '04',
      title: 'Earn Badges & Level Up',
      description: 'Collect cool achievement badges and watch your Python skills grow!'
    }
  ];

  const testimonials = [
    {
      quote: "PyGolfers made Python so much fun! I love earning badges and competing with my friends. My code is getting shorter and shorter!",
      author: 'Emma, Age 12',
      role: 'Student',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5
    },
    {
      quote: "As a teacher, I love how PyGolfers engages my students. They're excited about coding and actually look forward to our Python lessons!",
      author: 'Ms. Rodriguez',
      role: 'Computer Science Teacher',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5
    },
    {
      quote: "My daughter has learned so much Python through PyGolfers. The safety features give me peace of mind, and she loves the achievement system!",
      author: 'Sarah Wilson',
      role: 'Parent',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 5
    }
  ];
  
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Where Kids Become <span className="highlight">Python Champions</span>!
          </h1>
          <p className="hero-subtitle">
            Master Python through fun code golf challenges! Write the shortest code possible, 
            earn cool badges, and compete with friends in a safe, kid-friendly environment.
          </p>
          <div className="hero-buttons">
            <Link to="/challenges" className="hero-button primary-button">
              <FaPlay className="icon" /> Start Coding
            </Link>
            <Link to="/about" className="hero-button secondary-button">
              Learn More
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">5K+</span>
              <span className="stat-label">Young Coders</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Fun Challenges</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25K+</span>
              <span className="stat-label">Solutions</span>
            </div>
            <div className="stat-item safety-badge">
              <FaShieldAlt className="safety-icon" />
              <span className="stat-label">COPPA Safe</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <motion.div 
            className="code-editor-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CodePreview />
          </motion.div>
        </div>
      </section>

      {/* Who Is PyGolfers For Section */}
      <section className="user-types-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Who Is PyGolfers For?</h2>
            <p>Join thousands of families learning Python together!</p>
          </motion.div>
          <div className="user-types-grid">
            {userTypes.map((userType, index) => {
              const IconComponent = userType.icon;
              return (
                <motion.div 
                  key={userType.role}
                  className="user-type-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="user-type-icon" style={{ color: userType.color }}>
                    <IconComponent />
                  </div>
                  <h3>{userType.title}</h3>
                  <p className="user-type-description">{userType.description}</p>
                  <ul className="user-type-features">
                    {userType.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <FaStar className="feature-bullet" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/register" 
                    className="user-type-button"
                    style={{ backgroundColor: userType.color }}
                  >
                    Get Started
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="features-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Kids Love PyGolfers!</h2>
          <p>Join thousands of young coders who are having fun while mastering Python</p>
        </motion.div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>How It Works</h2>
            <p>Get started with PyGolfers in just a few simple steps</p>
          </motion.div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>What Kids & Families Say</h2>
            <p>Join our community of young coders and their families</p>
          </motion.div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <Testimonial 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>


    </main>
  );
};

const NavBar = ({ currentUser, setCurrentUser, switchAccount }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Close mobile menu when resizing to desktop
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  

  // Toggle mobile menu
  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Close user menu when mobile menu is toggled
    if (newMenuState && isUserMenuOpen) {
      setIsUserMenuOpen(false);
    }
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    const newUserMenuState = !isUserMenuOpen;
    setIsUserMenuOpen(newUserMenuState);
    
    // Close mobile menu when user menu is toggled (on mobile)
    if (newUserMenuState && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  // Handle keyboard navigation for dropdown menus
  const handleKeyDown = (e, menuType) => {
    if (e.key === 'Escape') {
      if (menuType === 'user' && isUserMenuOpen) {
        e.preventDefault();
        setIsUserMenuOpen(false);
        // Focus the menu toggle button when closing with Escape
        document.querySelector('.user-menu-toggle')?.focus();
      } else if (menuType === 'main' && isMenuOpen) {
        e.preventDefault();
        setIsMenuOpen(false);
        // Focus the menu toggle button when closing with Escape
        document.querySelector('.menu-toggle')?.focus();
      }
    }
  };
  
  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      const isClickInsideNav = e.target.closest('.main-nav') || 
                             e.target.closest('.menu-toggle') ||
                             e.target.closest('.user-menu-toggle');
      
      if (isMenuOpen && !isClickInsideNav) {
        setIsMenuOpen(false);
      }
      
      if (isUserMenuOpen && !e.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };
    
    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen, isUserMenuOpen]);

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (isUserMenuOpen && !e.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };
  
  // Close menu when route changes
  React.useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Initialize notifications based on user role
  React.useEffect(() => {
    if (currentUser.isAuthenticated) {
      const mockNotifications = generateMockNotifications(currentUser.role);
      setNotifications(mockNotifications);
    }
  }, [currentUser.role, currentUser.isAuthenticated]);

  // Generate mock notifications based on user role
  const generateMockNotifications = (role) => {
    const baseNotifications = [
      {
        id: 1,
        type: 'system',
        title: 'Welcome to PyGolfers!',
        message: 'Get started with your first coding challenge',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        priority: 'low'
      }
    ];

    if (role === 'teacher') {
      return [
        ...baseNotifications,
        {
          id: 2,
          type: 'submission',
          title: 'New Challenge Submission',
          message: 'Emma Johnson submitted "Hello World" challenge',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          read: false,
          priority: 'high'
        },
        {
          id: 3,
          type: 'achievement',
          title: 'Student Achievement',
          message: 'Alex Smith earned the "Code Master" badge',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          read: false,
          priority: 'medium'
        }
      ];
    } else if (role === 'parent') {
      return [
        ...baseNotifications,
        {
          id: 2,
          type: 'progress',
          title: 'Child Progress Update',
          message: 'Your child completed 3 challenges this week',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'achievement',
          title: 'Child Achievement',
          message: 'Your child earned a new badge!',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          read: true,
          priority: 'low'
        }
      ];
    } else if (role === 'student') {
      return [
        ...baseNotifications,
        {
          id: 2,
          type: 'challenge',
          title: 'New Challenge Available',
          message: 'Check out the new "Python Basics" challenge',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          read: false,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'achievement',
          title: 'Congratulations!',
          message: 'You earned the "First Steps" badge',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          read: true,
          priority: 'low'
        }
      ];
    }

    return baseNotifications;
  };

  // Get unread notification count
  const getUnreadNotificationCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };
  
  // Handle logout
  const handleLogout = () => {
    // In a real app, you would call your auth service here
    setCurrentUser(prev => ({
      ...prev,
      isAuthenticated: false
    }));
    setIsUserMenuOpen(false);
    navigate('/');
  };

  // Always return teal color for the PyGolfers text
  const getTitleColor = () => {
    return '#36B6A8'; // Always teal
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="header-link" onClick={closeMenu}>
          <h1 className="app-title" style={{ color: getTitleColor() }}>PyGolfers</h1>
        </Link>
        
        {/* Mobile Header Actions - Notification & Profile */}
        {isMobile && currentUser.isAuthenticated && (
          <div className="mobile-header-actions">
            <button 
              className="mobile-notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <FaBell />
              {getUnreadNotificationCount() > 0 && (
                <span className="notification-badge">{getUnreadNotificationCount()}</span>
              )}
            </button>
            <button 
              className="mobile-profile-btn"
              onClick={toggleUserMenu}
              title="Profile Menu"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="mobile-avatar"
              />
            </button>
          </div>
        )}
        
        <div className="nav-container">
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          
          <nav 
            id="main-navigation"
            className={`main-nav ${isMenuOpen ? 'active' : ''}`}
            aria-hidden={!isMenuOpen}
            onKeyDown={(e) => handleKeyDown(e, 'main')}
          >
            <ul className="nav-links">
              {/* Teacher-specific menu items */}
              {currentUser.isAuthenticated && currentUser.role === 'teacher' ? (
                <>
                  <li>
                    <Link 
                      to="/teacher-dashboard" 
                      className={`nav-link ${location.pathname === '/teacher-dashboard' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/challenges" 
                      className={`nav-link ${location.pathname.startsWith('/challenges') ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Challenges
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/community" 
                      className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/events" 
                      className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Contact
                    </Link>
                  </li>
                </>
              ) : currentUser.isAuthenticated && currentUser.role === 'parent' ? (
                <>
                  <li>
                    <Link 
                      to="/parent-dashboard" 
                      className={`nav-link ${location.pathname === '/parent-dashboard' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      <FaUser /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/community" 
                      className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/events" 
                      className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Contact
                    </Link>
                  </li>
                </>
              ) : currentUser.isAuthenticated && currentUser.role === 'student' ? (
                <>
                  <li>
                    <Link 
                      to="/student-dashboard" 
                      className={`nav-link ${location.pathname === '/student-dashboard' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      <FaUser /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/challenges" 
                      className={`nav-link ${location.pathname.startsWith('/challenges') ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Challenges
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/classrooms" 
                      className={`nav-link ${location.pathname === '/classrooms' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Classrooms
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/leaderboard" 
                      className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/community" 
                      className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/events" 
                      className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Contact
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* Default menu for non-authenticated users and students */}
                  <li>
                    <Link 
                      to="/" 
                      className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/about" 
                      className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/challenges" 
                      className={`nav-link ${location.pathname.startsWith('/challenges') ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Challenges
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/leaderboard" 
                      className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/events" 
                      className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/community" 
                      className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact" 
                      className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                      onClick={closeMenu}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
            
            {/* Notification Icon for All Authenticated Users */}
            {currentUser.isAuthenticated && (
              <div className="nav-notifications">
                <button 
                  className="notification-btn"
                  onClick={() => setShowNotifications(!showNotifications)}
                  title="Notifications"
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <FaBell />
                  {getUnreadNotificationCount() > 0 && (
                    <span className="notification-badge">
                      {getUnreadNotificationCount()}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="notifications-dropdown">
                    <div className="notifications-header">
                      <h3>Notifications</h3>
                      <button 
                        className="btn btn-link"
                        onClick={markAllNotificationsAsRead}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="notifications-list">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="notification-icon">
                            {notification.type === 'submission' && <FaCode />}
                            {notification.type === 'achievement' && <FaTrophy />}
                            {notification.type === 'system' && <FaBell />}
                            {notification.type === 'progress' && <FaChartLine />}
                            {notification.type === 'challenge' && <FaPlay />}
                          </div>
                          <div className="notification-content">
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <span className="notification-time">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          {!notification.read && <div className="unread-indicator" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {isMobile && currentUser.isAuthenticated && (
              <div className="mobile-user-section">
                <div className="mobile-user-profile">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.username} 
                    className="mobile-user-avatar"
                  />
                  <div className="mobile-user-info">
                    <span className="mobile-username">{currentUser.name}</span>
                    <span className="mobile-user-role">{currentUser.role}</span>
                  </div>
                </div>
                <div className="mobile-user-actions">
                  <Link 
                    to="/profile" 
                    className="mobile-action-btn"
                    onClick={closeMenu}
                  >
                    <FaUser /> Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="mobile-action-btn"
                    onClick={closeMenu}
                  >
                    <FaCog /> Settings
                  </Link>
                  <button 
                    className="mobile-action-btn logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            )}
            
            {isMobile && !currentUser.isAuthenticated && (
              <div className="mobile-auth-buttons">
                <Link 
                  to="/login" 
                  className="button outline small"
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="button primary small"
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
          
          {!isMobile && (
            <div className="desktop-auth-buttons">
              {currentUser.isAuthenticated ? (
                <div className="user-menu-container">
                  <button 
                    className="user-menu-toggle button secondary small"
                    onClick={toggleUserMenu}
                    onKeyDown={(e) => handleKeyDown(e, 'user')}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    aria-label="User menu"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.username} 
                      className="user-avatar"
                      width="32"
                      height="32"
                      loading="lazy"
                    />
                    <span className="username">{currentUser.username}</span>
                    <FaChevronDown className={`dropdown-arrow ${isUserMenuOpen ? 'open' : ''}`} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="user-dropdown" role="menu">
                      <Link 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={closeMenu}
                        role="menuitem"
                        tabIndex="0"
                      >
                        <FaUser className="icon" /> Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="dropdown-item"
                        onClick={closeMenu}
                        role="menuitem"
                        tabIndex="0"
                      >
                        <FaCog className="icon" /> Settings
                      </Link>
                      <button 
                        className="dropdown-item"
                        onClick={handleLogout}
                        role="menuitem"
                        tabIndex="0"
                      >
                        <FaSignOutAlt className="icon" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="button outline small"
                    onClick={closeMenu}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    className="button primary small"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
          
          {/* Development Account Switcher */}
          {currentUser.isAuthenticated && (
            <div className="account-switcher">
              <span className="switcher-label">Switch Account:</span>
              <button 
                className={`switcher-btn ${currentUser.role === 'student' ? 'active' : ''}`}
                onClick={() => switchAccount('student')}
                title="Switch to Student account"
              >
                Student
              </button>
              <button 
                className={`switcher-btn ${currentUser.role === 'teacher' ? 'active' : ''}`}
                onClick={() => switchAccount('teacher')}
                title="Switch to Teacher account - Access Teacher Dashboard"
              >
                Teacher
              </button>
              <button 
                className={`switcher-btn ${currentUser.role === 'parent' ? 'active' : ''}`}
                onClick={() => switchAccount('parent')}
                title="Switch to Parent account - Access Parent Dashboard"
              >
                Parent
              </button>
            </div>
          )}
        </div>
        
        {/* Mobile User Dropdown */}
        {isMobile && currentUser.isAuthenticated && isUserMenuOpen && (
          <div className="mobile-user-dropdown">
            <Link 
              to="/profile" 
              className="mobile-dropdown-item"
              onClick={() => { closeMenu(); setIsUserMenuOpen(false); }}
            >
              <FaUser className="icon" /> Profile
            </Link>
            <Link 
              to="/settings" 
              className="mobile-dropdown-item"
              onClick={() => { closeMenu(); setIsUserMenuOpen(false); }}
            >
              <FaCog className="icon" /> Settings
            </Link>
            <button 
              className="mobile-dropdown-item logout"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const App = () => {
  // Dummy accounts for testing
  const dummyAccounts = {
    student: {
      id: '1',
      username: 'student123',
      name: 'Alex Johnson',
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?img=32',
      isAuthenticated: true
    },
    teacher: {
      id: '2',
      username: 'teacher123',
      name: 'Dr. Sarah Williams',
      role: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=44',
      isAuthenticated: true
    },
    parent: {
      id: '3',
      username: 'parent123',
      name: 'Michael Chen',
      role: 'parent',
      avatar: 'https://i.pravatar.cc/150?img=22',
      isAuthenticated: true
    }
  };

  const [currentUser, setCurrentUser] = useState({ isAuthenticated: false, role: null }); // Default to unauthenticated

  // Function to switch between dummy accounts
  const switchAccount = (accountType) => {
    setCurrentUser(dummyAccounts[accountType]);
  };

  return (
    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} switchAccount={switchAccount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
<Route path="/classrooms" element={
  <ProtectedRoute isAuthenticated={currentUser.isAuthenticated} message="Please log in to access classrooms.">
    <Classrooms />
  </ProtectedRoute>
} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration setCurrentUser={setCurrentUser} />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/challenges" element={<Challenges currentUser={currentUser} />} />
          <Route path="/challenge/:id" element={
  <ProtectedRoute isAuthenticated={currentUser.isAuthenticated} message="Sign in to attempt this coding challenge!">
    <ChallengeDetail />
  </ProtectedRoute>
} />
          <Route path="/leaderboard" element={
            <ProtectedRoute isAuthenticated={currentUser.isAuthenticated} message="Please log in to view the leaderboard.">
              <Leaderboard currentUser={currentUser} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/events" element={<Events currentUser={currentUser} />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/community" element={<CommunityForum />} />
        </Routes>
        <footer className="footer">
          <div className="footer-content container">
            <div className="footer-row">
              <div className="footer-brand">
                <span className="footer-logo">PyGolfers</span>
                <span className="footer-separator">•</span>
                <a 
                  href="https://codewithkids.africa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="code-with-kids-link"
                >
                  Powered by Code With Kids
                </a>
              </div>
              <div className="footer-copyright">
                &copy; {new Date().getFullYear()} PyGolfers. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
