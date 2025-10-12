import React, { useState, useEffect } from 'react';
import { FaTrophy, FaMedal, FaStar, FaFire, FaCode, FaUsers, FaChartLine, FaClock, FaLightbulb, FaRocket } from 'react-icons/fa';
import './AchievementSystem.css';

const AchievementSystem = ({ user, challengesCompleted = 0, totalScore = 0 }) => {
  const [achievements, setAchievements] = useState([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);

  // Define achievement categories and criteria
  const achievementDefinitions = [
    // Code Golf Achievements
    {
      id: 'first_solution',
      name: 'First Steps',
      description: 'Complete your first coding challenge',
      icon: FaCode,
      category: 'code-golf',
      rarity: 'common',
      criteria: { challengesCompleted: 1 },
      points: 10,
      color: '#10B981'
    },
    {
      id: 'under_par_master',
      name: 'Under Par Master',
      description: 'Solve 10 challenges under par',
      icon: FaTrophy,
      category: 'code-golf',
      rarity: 'rare',
      criteria: { underParCount: 10 },
      points: 50,
      color: '#F59E0B'
    },
    {
      id: 'code_golf_champion',
      name: 'Code Golf Champion',
      description: 'Solve 50 challenges with optimal solutions',
      icon: FaMedal,
      category: 'code-golf',
      rarity: 'epic',
      criteria: { challengesCompleted: 50 },
      points: 100,
      color: '#8B5CF6'
    },
    
    // Progress Achievements
    {
      id: 'dedicated_learner',
      name: 'Dedicated Learner',
      description: 'Complete challenges for 7 consecutive days',
      icon: FaClock,
      category: 'progress',
      rarity: 'rare',
      criteria: { consecutiveDays: 7 },
      points: 75,
      color: '#06B6D4'
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Solve 5 challenges in under 5 minutes each',
      icon: FaFire,
      category: 'progress',
      rarity: 'epic',
      criteria: { fastSolves: 5 },
      points: 100,
      color: '#EF4444'
    },
    
    // Community Achievements
    {
      id: 'helpful_mentor',
      name: 'Helpful Mentor',
      description: 'Help 5 other learners with their challenges',
      icon: FaUsers,
      category: 'community',
      rarity: 'rare',
      criteria: { helpsGiven: 5 },
      points: 75,
      color: '#84CC16'
    },
    {
      id: 'solution_sharer',
      name: 'Solution Sharer',
      description: 'Share 10 creative solutions with the community',
      icon: FaLightbulb,
      category: 'community',
      rarity: 'epic',
      criteria: { solutionsShared: 10 },
      points: 100,
      color: '#F97316'
    },
    
    // Special Achievements
    {
      id: 'perfect_score',
      name: 'Perfect Score',
      description: 'Achieve a perfect score on any challenge',
      icon: FaStar,
      category: 'special',
      rarity: 'legendary',
      criteria: { perfectScores: 1 },
      points: 200,
      color: '#EAB308'
    },
    {
      id: 'python_master',
      name: 'Python Master',
      description: 'Master all Python concepts and techniques',
      icon: FaRocket,
      category: 'special',
      rarity: 'legendary',
      criteria: { masteryLevel: 100 },
      points: 500,
      color: '#EC4899'
    }
  ];

  // Check achievement progress
  const checkAchievements = () => {
    const unlocked = [];
    
    achievementDefinitions.forEach(achievement => {
      let isUnlocked = false;
      
      switch (achievement.id) {
        case 'first_solution':
          isUnlocked = challengesCompleted >= achievement.criteria.challengesCompleted;
          break;
        case 'under_par_master':
          // This would need to track under-par solutions
          isUnlocked = false; // Placeholder
          break;
        case 'code_golf_champion':
          isUnlocked = challengesCompleted >= achievement.criteria.challengesCompleted;
          break;
        case 'dedicated_learner':
          // This would need to track consecutive days
          isUnlocked = false; // Placeholder
          break;
        case 'speed_demon':
          // This would need to track solve times
          isUnlocked = false; // Placeholder
          break;
        case 'helpful_mentor':
          // This would need to track help given
          isUnlocked = false; // Placeholder
          break;
        case 'solution_sharer':
          // This would need to track shared solutions
          isUnlocked = false; // Placeholder
          break;
        case 'perfect_score':
          // This would need to track perfect scores
          isUnlocked = false; // Placeholder
          break;
        case 'python_master':
          // This would need to track mastery level
          isUnlocked = false; // Placeholder
          break;
        default:
          isUnlocked = false;
      }
      
      if (isUnlocked) {
        unlocked.push(achievement);
      }
    });
    
    setUnlockedAchievements(unlocked);
  };

  useEffect(() => {
    checkAchievements();
  }, [challengesCompleted, totalScore]);

  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'common': return 'rarity-common';
      case 'rare': return 'rarity-rare';
      case 'epic': return 'rarity-epic';
      case 'legendary': return 'rarity-legendary';
      default: return 'rarity-common';
    }
  };

  const getProgressPercentage = (achievement) => {
    if (!achievement || !achievement.criteria) return 0;
    
    switch (achievement.id) {
      case 'first_solution':
        return Math.min(100, (challengesCompleted / achievement.criteria.challengesCompleted) * 100);
      case 'code_golf_champion':
        return Math.min(100, (challengesCompleted / achievement.criteria.challengesCompleted) * 100);
      default:
        return 0;
    }
  };

  return (
    <div className="achievement-system">
      <div className="achievement-header">
        <h2>Achievements</h2>
        <div className="achievement-stats">
          <div className="stat">
            <span className="stat-number">{unlockedAchievements && Array.isArray(unlockedAchievements) ? unlockedAchievements.length : 0}</span>
            <span className="stat-label">Unlocked</span>
          </div>
          <div className="stat">
            <span className="stat-number">{achievementDefinitions.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {unlockedAchievements && Array.isArray(unlockedAchievements) 
                ? unlockedAchievements.reduce((sum, a) => sum + (a?.points || 0), 0)
                : 0}
            </span>
            <span className="stat-label">Points</span>
          </div>
        </div>
      </div>

      <div className="achievement-categories">
        {['code-golf', 'progress', 'community', 'special'].map(category => (
          <div key={category} className="achievement-category">
            <h3 className="category-title">
              {category === 'code-golf' && 'Code Golf'}
              {category === 'progress' && 'Progress'}
              {category === 'community' && 'Community'}
              {category === 'special' && 'Special'}
            </h3>
            
            <div className="achievements-grid">
              {achievementDefinitions
                .filter(achievement => achievement.category === category)
                .map(achievement => {
                  const isUnlocked = unlockedAchievements && Array.isArray(unlockedAchievements) && 
                    unlockedAchievements.some(a => a && a.id === achievement.id);
                  const progress = getProgressPercentage(achievement);
                  const IconComponent = achievement.icon;
                  
                  return (
                    <div 
                      key={achievement.id} 
                      className={`achievement-card ${getRarityClass(achievement.rarity)} ${isUnlocked ? 'unlocked' : 'locked'}`}
                    >
                      <div className="achievement-icon" style={{ color: achievement.color }}>
                        <IconComponent />
                      </div>
                      
                      <div className="achievement-content">
                        <h4 className="achievement-name">{achievement.name}</h4>
                        <p className="achievement-description">{achievement.description}</p>
                        
                        {!isUnlocked && (
                          <div className="achievement-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <span className="progress-text">{Math.round(progress)}%</span>
                          </div>
                        )}
                        
                        <div className="achievement-points">
                          <span className="points">{achievement.points} pts</span>
                          <span className={`rarity ${achievement.rarity}`}>{achievement.rarity}</span>
                        </div>
                      </div>
                      
                      {isUnlocked && (
                        <div className="unlocked-badge">
                          <FaTrophy />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;
