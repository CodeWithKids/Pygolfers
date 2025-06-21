import React from 'react';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div className="page-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Leaderboard</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>See how you rank against other PyGolfers!</p>
      </div>
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
