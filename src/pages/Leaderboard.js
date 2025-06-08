import React from 'react';
import EnhancedLeaderboard from '../components/leaderboard/EnhancedLeaderboard';
import '../styles/EnhancedLeaderboard.css';
import '../styles/EnhancedLeaderboardTable.css';
import '../styles/EnhancedLeaderboardGrid.css';

const Leaderboard = () => {
  return (
    <div className="leaderboard-page">
      <EnhancedLeaderboard />
    </div>
  );
};

export default Leaderboard;
