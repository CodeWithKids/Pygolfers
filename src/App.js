import React, { useState, useEffect } from "react";
import "./styles/Buttons.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaPlay, FaUser, FaCog, FaSignOutAlt, FaChevronDown, FaTrophy, FaCode, FaUsers, FaChartLine, FaStar, FaQuoteLeft, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
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

  
  const features = [
    {
      icon: FaCode,
      title: 'Sharpen Your Skills',
      description: 'Improve your Python knowledge by solving creative challenges with minimal code.'
    },
    {
      icon: FaTrophy,
      title: 'Compete & Learn',
      description: 'Climb the leaderboards and see how your solutions compare to others.'
    },
    {
      icon: FaUsers,
      title: 'Join a Community',
      description: 'Connect with fellow Python enthusiasts and learn from each other.'
    },
    {
      icon: FaChartLine,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed statistics and achievements.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Choose a Challenge',
      description: 'Pick from our collection of Python challenges of varying difficulty levels.'
    },
    {
      number: '02',
      title: 'Write Your Solution',
      description: 'Create the most concise Python solution you can think of.'
    },
    {
      number: '03',
      title: 'Submit & Compare',
      description: 'See how your solution stacks up against others in the community.'
    },
    {
      number: '04',
      title: 'Learn & Improve',
      description: 'Study top solutions to learn new Python tricks and optimizations.'
    }
  ];

  const testimonials = [
    {
      quote: "PyGolfers completely changed how I approach Python. I've become a much more efficient coder!",
      author: 'Alex Johnson',
      role: 'Python Developer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5
    },
    {
      quote: "The community is amazing and the challenges are addictive. Highly recommend for any Python enthusiast.",
      author: 'Sam Wilson',
      role: 'Data Scientist',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5
    },
    {
      quote: "I use PyGolfers to prepare for coding interviews. It's fun and educational!",
      author: 'Taylor Smith',
      role: 'CS Student',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 4
    }
  ];
  
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Master Python with <span className="highlight">Pygolfers</span>
          </h1>
          <p className="hero-subtitle">
            Solve fun coding challenges with the fewest lines possible. 
            Compete with friends, earn badges, and become a Python pro!
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
              <span className="stat-number">10K+</span>
              <span className="stat-label">Developers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Challenges</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Submissions</span>
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

      {/* Features Section */}
      <section className="features-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose PyGolfers?</h2>
          <p>Join thousands of Python developers who are improving their skills through code golf challenges</p>
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
            <h2>What Our Users Say</h2>
            <p>Join our community of passionate Python developers</p>
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

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Start Your Code Golf Journey?</h2>
            <p>Join thousands of developers improving their Python skills with fun and challenging puzzles</p>
            <div className="cta-buttons">
              <Link to="/register" className="button primary large">
                Sign Up Free
              </Link>
              <Link to="/challenges" className="button outline large" style={{ color: 'white', borderColor: 'white' }}>
                Browse Challenges
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const NavBar = ({ currentUser, setCurrentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
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
        
        <div className="nav-container">
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
          >
            {isMenuOpen ? '✕' : ''}
          </button>
          
          <nav 
            id="main-navigation"
            className={`main-nav ${isMenuOpen ? 'active' : ''}`}
            aria-hidden={!isMenuOpen}
            onKeyDown={(e) => handleKeyDown(e, 'main')}
          >
            <ul className="nav-links">
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
                  to="/contact" 
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  Contact
                </Link>
              </li>
            </ul>
            
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
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    username: 'pygolfer123',
    avatar: 'https://i.pravatar.cc/150?img=32',
    isAuthenticated: true
  });
  // ...
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <Router>
      <div className="App">
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
<Route path="/classrooms" element={
  <ProtectedRoute isAuthenticated={currentUser.isAuthenticated} message="Please log in to access classrooms.">
    <Classrooms />
  </ProtectedRoute>
} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/challenges" element={
  <ProtectedRoute isAuthenticated={currentUser.isAuthenticated} message="Sign in to view and solve coding challenges!">
    <Challenges />
  </ProtectedRoute>
} />
          <Route path="/challenge/:id" element={
  <ProtectedRoute isAuthenticated={currentUser.isAuthenticated} message="Sign in to attempt this coding challenge!">
    <ChallengeDetail />
  </ProtectedRoute>
} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<ProfileSettings />} />
        </Routes>
        <footer className="footer">
          <div className="footer-content container">
            <div className="footer-row">
              <div className="footer-logo">
                <span role="img" aria-label="snake">🐍</span> PyGolfers
              </div>
              <div className="footer-copyright">
                &copy; {new Date().getFullYear()} PyGolfers. All rights reserved.
              </div>
              <div className="footer-legal">
                <a href="/privacy">Privacy Policy</a>
                <span className="divider">•</span>
                <a href="/terms">Terms of Service</a>
                <span className="divider">•</span>
                <a href="/cookies">Cookie Policy</a>
              </div>
              <a 
                href="https://github.com/CodeWithKids/Pygolfers" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
