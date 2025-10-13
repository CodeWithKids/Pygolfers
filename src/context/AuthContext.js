import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockLoginAccounts } from '../utils/mockUsers';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check localStorage for persisted user
    const savedUser = localStorage.getItem('pygolfers_user');
    return savedUser ? JSON.parse(savedUser) : { isAuthenticated: false, role: null };
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser.isAuthenticated) {
      localStorage.setItem('pygolfers_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('pygolfers_user');
    }
  }, [currentUser]);

  const login = (username, password) => {
    // Find matching account
    const account = mockLoginAccounts.find(
      acc => (acc.username === username || acc.email === username) && acc.password === password
    );

    if (account) {
      setCurrentUser(account.userData);
      return { success: true, user: account.userData };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const signup = (userData, role) => {
    // In a real app, this would call your backend API
    // For now, we'll create a user object and log them in
    
    const newUser = {
      id: `${role}_${Date.now()}`,
      username: userData.email.split('@')[0],
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: role,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      isAuthenticated: true,
      ...(role === 'student' && {
        age: userData.age,
        grade: userData.grade,
        stats: {
          totalPoints: 0,
          challengesCompleted: 0,
          currentStreak: 0,
          rank: 0,
          level: 1
        }
      }),
      ...(role === 'teacher' && {
        subject: userData.subject,
        school: userData.school,
        stats: {
          totalStudents: 0,
          totalClassrooms: 0,
          challengesCreated: 0,
          averageProgress: 0
        }
      }),
      ...(role === 'parent' && {
        relationshipType: userData.relationshipType,
        phone: userData.phone,
        children: []
      })
    };

    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser({ isAuthenticated: false, role: null });
    localStorage.removeItem('pygolfers_user');
  };

  const updateUser = (updates) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: currentUser.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

