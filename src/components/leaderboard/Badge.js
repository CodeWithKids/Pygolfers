import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Badge = ({ type, tooltip, onClick, className = '' }) => {
  // Define badge configurations
  const badgeConfigs = {
    'top-1': {
      label: '1st Place',
      icon: '🥇',
      color: '#FFD700',
      bgColor: 'rgba(255, 215, 0, 0.1)'
    },
    'top-2': {
      label: '2nd Place',
      icon: '🥈',
      color: '#C0C0C0',
      bgColor: 'rgba(192, 192, 192, 0.1)'
    },
    'top-3': {
      label: '3rd Place',
      icon: '🥉',
      color: '#CD7F32',
      bgColor: 'rgba(205, 127, 50, 0.1)'
    },
    'elite': {
      label: 'Elite Coder',
      icon: '💎',
      color: '#6F42C1',
      bgColor: 'rgba(111, 66, 193, 0.1)'
    },
    'centurion': {
      label: 'Centurion',
      icon: '🏆',
      color: '#28A745',
      bgColor: 'rgba(40, 167, 69, 0.1)'
    },
    'dedicated': {
      label: 'Dedicated',
      icon: '🔥',
      color: '#FD7E14',
      bgColor: 'rgba(253, 126, 20, 0.1)'
    },
    'influencer': {
      label: 'Influencer',
      icon: '📢',
      color: '#E83E8C',
      bgColor: 'rgba(232, 62, 140, 0.1)'
    },
    'fast-solver': {
      label: 'Fast Solver',
      icon: '⚡',
      color: '#FFC107',
      bgColor: 'rgba(255, 193, 7, 0.1)'
    },
    'efficient-coder': {
      label: 'Efficient Coder',
      icon: '📉',
      color: '#20C997',
      bgColor: 'rgba(32, 201, 151, 0.1)'
    },
    'streak-master': {
      label: 'Streak Master',
      icon: '📅',
      color: '#17A2B8',
      bgColor: 'rgba(23, 162, 184, 0.1)'
    },
    'bug-hunter': {
      label: 'Bug Hunter',
      icon: '🐞',
      color: '#DC3545',
      bgColor: 'rgba(220, 53, 69, 0.1)'
    },
    'early-adopter': {
      label: 'Early Adopter',
      icon: '🚀',
      color: '#6F42C1',
      bgColor: 'rgba(111, 66, 193, 0.1)'
    },
    'community-champion': {
      label: 'Community Champion',
      icon: '🤝',
      color: '#20C997',
      bgColor: 'rgba(32, 201, 151, 0.1)'
    },
    'code-reviewer': {
      label: 'Code Reviewer',
      icon: '🔍',
      color: '#17A2B8',
      bgColor: 'rgba(23, 162, 184, 0.1)'
    },
    'perfectionist': {
      label: 'Perfectionist',
      icon: '✨',
      color: '#FFC107',
      bgColor: 'rgba(255, 193, 7, 0.1)'
    }
  };

  // Get the badge configuration or use a default one
  const config = badgeConfigs[type] || {
    label: type || 'Badge',
    icon: '🏅',
    color: '#6C757D',
    bgColor: 'rgba(108, 117, 125, 0.1)'
  };

  // Generate a unique ID for the tooltip
  const tooltipId = `badge-${type}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <div
        id={tooltipId}
        className={`badge ${className}`}
        style={{
          '--badge-color': config.color,
          '--badge-bg-color': config.bgColor,
          cursor: tooltip ? 'help' : 'default'
        }}
        onClick={onClick}
      >
        <span className="badge-icon">{config.icon}</span>
        <span className="badge-label">{config.label}</span>
      </div>
      
      {tooltip && (
        <Tooltip 
          anchorId={tooltipId} 
          content={tooltip} 
          place="top" 
          effect="solid" 
          className="badge-tooltip"
        />
      )}
    </>
  );
};

export default Badge;
