import React, { useState, useEffect } from 'react';
import { FaSortUp, FaSortDown, FaTrophy } from 'react-icons/fa';
import '../styles/Leaderboard.css';

// Mock data for the leaderboard
const mockUsers = [
  {
    id: 1,
    username: 'codeMaster',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/80?img=1',
    score: 1250,
    solved: 42,
    joinDate: '2022-01-15',
  },
  {
    id: 2,
    username: 'pythonPro',
    name: 'Sam Wilson',
    avatar: 'https://i.pravatar.cc/80?img=2',
    score: 1180,
    solved: 38,
    joinDate: '2022-02-20',
  },
  {
    id: 3,
    username: 'jsNinja',
    name: 'Taylor Swift',
    avatar: 'https://i.pravatar.cc/80?img=3',
    score: 1100,
    solved: 35,
    joinDate: '2022-03-10',
  },
  {
    id: 4,
    username: 'dataWizard',
    name: 'Jordan Lee',
    avatar: 'https://i.pravatar.cc/80?img=4',
    score: 980,
    solved: 32,
    joinDate: '2022-01-30',
  },
  {
    id: 5,
    username: 'algoKing',
    name: 'Chris Martin',
    avatar: 'https://i.pravatar.cc/80?img=5',
    score: 920,
    solved: 30,
    joinDate: '2022-02-15',
  },
];

const Leaderboard = () => {
  const [users, setUsers] = useState(mockUsers);
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-header">
        <FaTrophy style={{ marginRight: '10px' }} />
        Leaderboard
      </h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th 
              onClick={() => handleSort('score')}
              style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {!isMobile ? 'Score' : '🏆'} {getSortIcon('score')}
            </th>
            <th 
              onClick={() => handleSort('solved')}
              style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {!isMobile ? 'Solved' : '✅'} {getSortIcon('solved')}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="rank-cell">{index + 1}</td>
              <td className="user-cell" style={{ padding: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="avatar"
                    style={{
                      width: isMobile ? '32px' : '24px',
                      height: isMobile ? '32px' : '24px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #4a90e2',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ minWidth: isMobile ? '100px' : 'auto' }}>
                    <div style={{ 
                      fontWeight: 500,
                      fontSize: isMobile ? '0.9em' : '1em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: isMobile ? '150px' : 'none'
                    }}>
                      {isMobile ? user.name.split(' ')[0] : user.name}
                    </div>
                    {!isMobile && (
                      <div style={{ fontSize: '0.75em', color: '#666' }}>@{user.username}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="score-cell">{user.score}</td>
              <td>{user.solved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
