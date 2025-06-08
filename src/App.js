import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FaPlay } from "react-icons/fa";
import About from "./pages/About";

const Home = () => (
  <main className="main-section">
    <section className="welcome-section">
      <h1>Welcome!</h1>
      <p className="welcome-text">
        Welcome to PyGolfers — the most playful way to learn Python and become a coding champion!
      </p>
    </section>

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
      <button className="cta-button">
        <FaPlay className="icon" /> Start Your Adventure
      </button>
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
