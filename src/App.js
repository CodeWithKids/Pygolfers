import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import "./App.css";
import { FaPlay, FaUser, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RegistrationTypeSelector from "./components/registration/RegistrationTypeSelector";
import LearnerRegistration from "./components/registration/LearnerRegistration";
import TeacherRegistration from "./components/registration/EducatorRegistration";
import ParentRegistration from "./components/registration/ParentRegistration";
import RegistrationCode from "./components/registration/RegistrationCode";
import GuestRegistration from "./components/registration/GuestRegistration";
import Login from "./pages/Login";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/profile/Profile";
import ProfileSettings from "./pages/profile/ProfileSettings";

const Home = () => (
  <main className="main-section">

    <section className="intro">
      <h2>What is PyGolfers?</h2>
      <p className="description">
        PyGolfers is a fun coding playground where you solve creative Python puzzles using as few lines of code as possible.
        Challenge yourself, earn badges, and climb the leaderboard while having a blast!
      </p>
      
      <div className="get-started">
        <h3>Ready to play?</h3>
        <button className="start-btn">
          <FaPlay className="icon" /> Start Coding
        </button>
      </div>
    </section>

    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <ol className="steps">
          <li className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Pick a Python Puzzle</h3>
              <p>Browse our collection of engaging Python challenges, from string manipulation to algorithm optimization. Each puzzle has a "par" score - the target number of lines to beat!</p>
            </div>
          </li>
          <li className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Write Your Solution</h3>
              <p>Put your Python skills to the test! The goal is to write working code using as few lines as possible. Can you find the most elegant solution?</p>
            </div>
          </li>
          <li className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Run & Validate</h3>
              <p>Submit your code and see if it passes all test cases. Our system will count your lines and compare against the par score. Did you beat it?</p>
            </div>
          </li>
          <li className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Earn & Share</h3>
              <p>Collect unique badges for your achievements, climb the leaderboard, and share your best solutions with the community. Can you become a Python code golf champion?</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section className="join-us">
      <h2>Join the Fun!</h2>
      <p>Whether you're new to coding or already a Python pro, PyGolfers is for you.</p>
      <p>Parents and teachers are welcome too!</p>
      <Link to="/register" className="cta-button">
        <FaPlay className="icon" /> Start Your Adventure
      </Link>
    </section>
  </main>
);

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from your auth context
  const [currentUser, setCurrentUser] = React.useState({
    id: '1',
    username: 'pygolfer123',
    avatar: 'https://i.pravatar.cc/150?img=32',
    isAuthenticated: true
  });

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
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          {isMenuOpen ? '✕' : '☰'}
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
          
          {currentUser.isAuthenticated ? (
            <div className="user-menu-container">
              <button 
                className="user-menu-toggle"
                onClick={toggleUserMenu}
                aria-label={`${isUserMenuOpen ? 'Close' : 'Open'} user menu`}
                aria-expanded={isUserMenuOpen}
                aria-controls="user-dropdown-menu"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <div className="user-avatar">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt="" 
                      aria-hidden="true"
                    />
                  ) : (
                    <FaUser className="avatar-fallback" aria-hidden="true" />
                  )}
                </div>
                <span className="username">{currentUser.username}</span>
                <FaChevronDown 
                  className={`dropdown-icon ${isUserMenuOpen ? 'open' : ''}`} 
                  aria-hidden="true"
                />
              </button>
              
              <div 
                id="user-dropdown-menu"
                className={`user-dropdown ${isUserMenuOpen ? 'open' : ''}`}
                role="menu"
                aria-orientation="vertical"
                aria-hidden={!isUserMenuOpen}
                onKeyDown={(e) => handleKeyDown(e, 'user')}
              >
                <Link 
                  to={`/profile/${currentUser.username}`} 
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => {
                    closeMenu();
                    setIsUserMenuOpen(false);
                  }}
                  tabIndex={isUserMenuOpen ? 0 : -1}
                >
                  <FaUser className="dropdown-icon" aria-hidden="true" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/settings" 
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => {
                    closeMenu();
                    setIsUserMenuOpen(false);
                  }}
                  tabIndex={isUserMenuOpen ? 0 : -1}
                >
                  <FaCog className="dropdown-icon" aria-hidden="true" />
                  <span>Settings</span>
                </Link>
                <div className="dropdown-divider" role="separator"></div>
                <button 
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  tabIndex={isUserMenuOpen ? 0 : -1}
                >
                  <FaSignOutAlt className="dropdown-icon" aria-hidden="true" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="login-btn"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              Log In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<RegistrationTypeSelector />} />
          <Route path="/register/learner" element={<LearnerRegistration />} />
          <Route path="/register/teacher" element={<TeacherRegistration />} />
          <Route path="/register/parent" element={<ParentRegistration />} />
          <Route path="/register/code" element={<RegistrationCode />} />
          <Route path="/register/guest" element={<GuestRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenge/:id" element={<ChallengeDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/settings" element={<ProfileSettings />} />
        </Routes>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logo">🐍 PyGolfers</div>
            <nav className="footer-nav">
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <a href="https://github.com/CodeWithKids/Pygolfers" target="_blank" rel="noopener noreferrer" className="footer-link">
                GitHub
              </a>
            </nav>
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} PyGolfers. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
