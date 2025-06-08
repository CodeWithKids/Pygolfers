import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FaPlay, FaSmile, FaCode } from "react-icons/fa";
import About from "./pages/About";

const Home = () => (
  <main className="main-section">
    <section className="intro">
      <h2>Welcome to PyGolfers!</h2>
      <p className="description">
        PyGolfers is a fun coding playground where you solve cool Python puzzles using the fewest lines possible. Challenge yourself, learn new tricks, and become a Python pro!
      </p>
      <button className="start-btn">
        <FaPlay className="icon" /> Start Coding
      </button>
      <div className="illustrations">
        <span role="img" aria-label="golf">⛳️</span>
        <FaSmile className="icon" />
        <FaCode className="icon" />
        <span role="img" aria-label="snake">🐍</span>
      </div>
    </section>
  </main>
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <Link to="/" className="header-link">
            <div className="logo-placeholder">🐍</div>
            <div className="header-content">
              <h1 className="app-title">PyGolfers</h1>
              <p className="tagline">Code Short. Code Smart. Have Fun!</p>
            </div>
          </Link>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        
        <footer className="footer">
          <nav>
            <Link to="/about">About</Link>
            <a href="#contact">Contact</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
          <div className="footer-logo">🐍 PyGolfers</div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
