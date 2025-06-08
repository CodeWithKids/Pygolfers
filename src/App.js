import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import { FaPlay } from "react-icons/fa";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RegistrationTypeSelector from "./components/registration/RegistrationTypeSelector";
import LearnerRegistration from "./components/registration/LearnerRegistration";
import TeacherRegistration from "./components/registration/EducatorRegistration";
import ParentRegistration from "./components/registration/ParentRegistration";
import RegistrationCode from "./components/registration/RegistrationCode";
import GuestRegistration from "./components/registration/GuestRegistration";
import Login from "./pages/Login";

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
      <h2>How It Works</h2>
      <ol className="steps">
        <li>Pick a Python puzzle.</li>
        <li>Write your solution in as few lines as you can.</li>
        <li>Run your code and see if you beat the "par" score!</li>
        <li>Collect badges, unlock new challenges, and share your results.</li>
      </ol>
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
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
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
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" className="nav-link" onClick={closeMenu}>About</Link></li>
            <li><a href="#challenges" className="nav-link" onClick={closeMenu}>Challenges</a></li>
            <li><a href="#leaderboard" className="nav-link" onClick={closeMenu}>Leaderboard</a></li>
            <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
          </ul>
          <Link to="/login" className="login-btn">Log In</Link>
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
