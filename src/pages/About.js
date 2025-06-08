import React from 'react';
import { FaPython, FaTrophy, FaUsers, FaLightbulb, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About PyGolfers <span>🐍⛳</span></h1>
        <p className="tagline">Where Kids Become Coding Champions!</p>
      </header>

      <main className="about-content">
        <section className="about-section">
          <h2>Welcome to PyGolfers!</h2>
          <p>PyGolfers is a fun and friendly place where kids become coding champions! Our mission is to make learning Python exciting, creative, and rewarding for everyone ages 8–14.</p>
          <p>PyGolfers borrows the concept of golf—but with code! In traditional golf, the goal is to get the ball in the hole using as few strokes as possible. In PyGolfers, the "golf course" is a coding puzzle, and your "strokes" are lines of Python code. Just like in golf, the challenge is to solve each puzzle using the shortest, most efficient solution you can—the fewer lines of code you write, the better your score! This playful approach turns every Python puzzle into a fun game of skill and strategy, making coding feel like a creative adventure rather than just another lesson.</p>
        </section>

        <section className="about-section">
          <h2>Why PyGolfers?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-container">
                <FaLightbulb className="feature-icon" style={{ color: '#36B6A8' }} />
              </div>
              <h3>Learn by Playing</h3>
              <p>Coding is like solving a puzzle or playing a game.</p>
            </div>
            <div className="feature-card">
              <div className="icon-container">
                <FaTrophy className="feature-icon" style={{ color: '#FFD43B' }} />
              </div>
              <h3>Challenge Yourself</h3>
              <p>Can you make your code even shorter or smarter?</p>
            </div>
            <div className="feature-card">
              <div className="icon-container">
                <FaPython className="feature-icon" style={{ color: '#F76C7B' }} />
              </div>
              <h3>Earn Badges & Trophies</h3>
              <p>Show off your skills and rise up the leaderboard!</p>
            </div>
            <div className="feature-card">
              <div className="icon-container">
                <FaUsers className="feature-icon" style={{ color: '#24304A' }} />
              </div>
              <h3>Friendly Community</h3>
              <p>Share your solutions, get tips, and cheer each other on.</p>
            </div>
            <div className="feature-card">
              <div className="icon-container">
                <FaLightbulb className="feature-icon" style={{ color: '#36B6A8' }} />
              </div>
              <h3>Boost Problem-Solving Skills</h3>
              <p>Each puzzle helps you think creatively and logically.</p>
            </div>
            <div className="feature-card">
              <div className="icon-container">
                <FaUsers className="feature-icon" style={{ color: '#FFD43B' }} />
              </div>
              <h3>Safe and Supportive</h3>
              <p>PyGolfers is a positive space where everyone can learn at their own pace.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Who is PyGolfers for?</h2>
          <ul className="who-list">
            <li>Kids who are curious about computers and coding</li>
            <li>Parents and teachers looking for a safe, positive way to introduce programming</li>
            <li>Anyone who loves a good challenge!</li>
          </ul>
        </section>

        <section className="about-section values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value">
              <h3>Creativity</h3>
              <p>There's always more than one way to solve a problem.</p>
            </div>
            <div className="value">
              <h3>Fun</h3>
              <p>Learning should make you smile!</p>
            </div>
            <div className="value">
              <h3>Teamwork</h3>
              <p>We help each other grow and celebrate everyone's progress.</p>
            </div>
          </div>
        </section>

        <section className="about-section creators">
          <h2>Meet the Creators</h2>
          <p>PyGolfers was built by a team who loves coding, teaching, and making learning joyful. We believe everyone can be a coder—and we're here to help you on your journey.</p>
        </section>

        <div className="cta-section">
          <h3>Ready to start your coding adventure?</h3>
          <Link to="/" className="home-button">
            <FaHome /> Go to Home Page
          </Link>
        </div>
      </main>
    </div>
  );
};

export default About;
