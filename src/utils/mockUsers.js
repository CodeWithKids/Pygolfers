// Mock Users for PyGolfers Application
// Use these for testing and development

export const mockStudents = [
  {
    id: 'student_1',
    username: 'alex_coder',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=32',
    age: 12,
    grade: '7th Grade',
    isAuthenticated: false,
    dateJoined: '2024-01-10',
    stats: {
      totalPoints: 1250,
      challengesCompleted: 45,
      currentStreak: 12,
      longestStreak: 28,
      rank: 5,
      level: 15
    },
    classrooms: [
      { id: 1, name: 'Python Explorers', code: 'ABC123' },
      { id: 2, name: 'JavaScript Masters', code: 'XYZ789' }
    ],
    achievements: [
      { id: 1, name: 'First Challenge', icon: '🏆', earned: true },
      { id: 2, name: 'Week Streak', icon: '🔥', earned: true },
      { id: 3, name: 'Code Master', icon: '⭐', earned: false }
    ],
    bio: 'Love coding and playing games! Python is my favorite language.',
    favoriteLanguage: 'Python',
    website: ''
  },
  {
    id: 'student_2',
    username: 'emma_pythonista',
    name: 'Emma Martinez',
    email: 'emma.martinez@email.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=45',
    age: 11,
    grade: '6th Grade',
    isAuthenticated: false,
    dateJoined: '2024-02-15',
    stats: {
      totalPoints: 890,
      challengesCompleted: 32,
      currentStreak: 7,
      longestStreak: 15,
      rank: 12,
      level: 10
    },
    classrooms: [
      { id: 1, name: 'Python Explorers', code: 'ABC123' }
    ],
    achievements: [
      { id: 1, name: 'First Challenge', icon: '🏆', earned: true },
      { id: 2, name: 'Week Streak', icon: '🔥', earned: true }
    ],
    bio: 'Aspiring game developer. I want to create my own video games!',
    favoriteLanguage: 'Python',
    website: ''
  },
  {
    id: 'student_3',
    username: 'ben_coder_kid',
    name: 'Benjamin Lee',
    email: 'ben.lee@email.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=12',
    age: 13,
    grade: '8th Grade',
    isAuthenticated: false,
    dateJoined: '2023-12-05',
    stats: {
      totalPoints: 2150,
      challengesCompleted: 78,
      currentStreak: 25,
      longestStreak: 45,
      rank: 2,
      level: 22
    },
    classrooms: [
      { id: 1, name: 'Python Explorers', code: 'ABC123' },
      { id: 2, name: 'JavaScript Masters', code: 'XYZ789' },
      { id: 3, name: 'Web Development Bootcamp', code: 'WEB456' }
    ],
    achievements: [
      { id: 1, name: 'First Challenge', icon: '🏆', earned: true },
      { id: 2, name: 'Week Streak', icon: '🔥', earned: true },
      { id: 3, name: 'Code Master', icon: '⭐', earned: true },
      { id: 4, name: 'Top 10', icon: '🥇', earned: true }
    ],
    bio: 'Competitive coder and Python enthusiast. Always looking for new challenges!',
    favoriteLanguage: 'Python',
    website: 'https://bencodeskids.com'
  },
  {
    id: 'student_4',
    username: 'sophia_dev',
    name: 'Sophia Patel',
    email: 'sophia.patel@email.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=25',
    age: 10,
    grade: '5th Grade',
    isAuthenticated: false,
    dateJoined: '2024-03-01',
    stats: {
      totalPoints: 450,
      challengesCompleted: 18,
      currentStreak: 5,
      longestStreak: 9,
      rank: 25,
      level: 6
    },
    classrooms: [
      { id: 1, name: 'Python Explorers', code: 'ABC123' }
    ],
    achievements: [
      { id: 1, name: 'First Challenge', icon: '🏆', earned: true }
    ],
    bio: 'Just started coding and loving it!',
    favoriteLanguage: 'Python',
    website: ''
  }
];

export const mockTeachers = [
  {
    id: 'teacher_1',
    username: 'ms_ada_lovelace',
    name: 'Ms. Ada Lovelace',
    email: 'ada.lovelace@pygolfers.edu',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=44',
    isAuthenticated: false,
    dateJoined: '2023-09-01',
    subject: 'Computer Science',
    school: 'Riverside Middle School',
    yearsTeaching: 8,
    stats: {
      totalStudents: 85,
      totalClassrooms: 4,
      challengesCreated: 34,
      averageStudentProgress: 78
    },
    classrooms: [
      { 
        id: 1, 
        name: 'Python Explorers', 
        code: 'ABC123',
        students: 25,
        subject: 'Python Programming',
        grade: '8th Grade'
      },
      { 
        id: 5, 
        name: 'Advanced Python', 
        code: 'ADV999',
        students: 20,
        subject: 'Advanced Python',
        grade: '9th Grade'
      }
    ],
    bio: 'Passionate about teaching kids to code. Believe every child can be a programmer!',
    certifications: ['Google CS Educator', 'Python Institute Certified', 'Code.org Facilitator'],
    website: 'https://msadateaches.com'
  },
  {
    id: 'teacher_2',
    username: 'mr_john_doe',
    name: 'Mr. John Doe',
    email: 'john.doe@pygolfers.edu',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=15',
    isAuthenticated: false,
    dateJoined: '2023-10-15',
    subject: 'Computer Science',
    school: 'Lincoln Academy',
    yearsTeaching: 5,
    stats: {
      totalStudents: 65,
      totalClassrooms: 3,
      challengesCreated: 28,
      averageStudentProgress: 82
    },
    classrooms: [
      { 
        id: 2, 
        name: 'JavaScript Masters', 
        code: 'XYZ789',
        students: 22,
        subject: 'JavaScript',
        grade: '9th Grade'
      },
      { 
        id: 6, 
        name: 'Web Development 101', 
        code: 'WEB101',
        students: 18,
        subject: 'Web Development',
        grade: '8th Grade'
      }
    ],
    bio: 'Making computer science fun and accessible for all students!',
    certifications: ['CS Teaching Certificate', 'JavaScript Specialist'],
    website: ''
  },
  {
    id: 'teacher_3',
    username: 'dr_sarah_smith',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@pygolfers.edu',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=47',
    isAuthenticated: false,
    dateJoined: '2023-08-20',
    subject: 'Mathematics & Computer Science',
    school: 'Tech Prep High School',
    yearsTeaching: 12,
    stats: {
      totalStudents: 120,
      totalClassrooms: 5,
      challengesCreated: 52,
      averageStudentProgress: 85
    },
    classrooms: [
      { 
        id: 3, 
        name: 'Web Development Bootcamp', 
        code: 'WEB456',
        students: 30,
        subject: 'Web Development',
        grade: '10th Grade'
      },
      { 
        id: 4, 
        name: 'Data Structures & Algorithms', 
        code: 'DSA789',
        students: 25,
        subject: 'Computer Science',
        grade: '11th Grade'
      }
    ],
    bio: 'PhD in Computer Science. Love introducing students to algorithmic thinking!',
    certifications: ['PhD Computer Science', 'AP CS Certified', 'Google Educator Level 2'],
    website: 'https://drsarahteaches.com'
  }
];

export const mockParents = [
  {
    id: 'parent_1',
    username: 'parent_johnson',
    name: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=22',
    isAuthenticated: false,
    dateJoined: '2024-01-12',
    children: [
      {
        id: 'student_1',
        name: 'Alex Johnson',
        username: 'alex_coder',
        avatar: 'https://i.pravatar.cc/150?img=32',
        age: 12,
        grade: '7th Grade',
        totalPoints: 1250,
        challengesCompleted: 45,
        currentStreak: 12,
        classrooms: ['Python Explorers', 'JavaScript Masters'],
        recentActivity: [
          { type: 'challenge', title: 'Completed FizzBuzz Challenge', date: '2024-01-20', points: 50 },
          { type: 'achievement', title: 'Earned Week Streak badge', date: '2024-01-19', points: 100 },
          { type: 'classroom', title: 'Joined JavaScript Masters', date: '2024-01-18', points: 0 }
        ],
        achievements: [
          { id: 1, name: 'First Challenge', icon: '🏆', description: 'Complete your first challenge', earned: true },
          { id: 2, name: 'Week Streak', icon: '🔥', description: 'Code for 7 days straight', earned: true }
        ],
        progress: {
          pythonSkills: 75,
          problemSolving: 68,
          codeOptimization: 82
        }
      }
    ],
    relationshipType: 'Father',
    phone: '+1 (555) 123-4567',
    bio: 'Proud parent supporting my child\'s coding journey!'
  },
  {
    id: 'parent_2',
    username: 'parent_martinez',
    name: 'Maria Martinez',
    email: 'maria.martinez@email.com',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=38',
    isAuthenticated: false,
    dateJoined: '2024-02-16',
    children: [
      {
        id: 'student_2',
        name: 'Emma Martinez',
        username: 'emma_pythonista',
        avatar: 'https://i.pravatar.cc/150?img=45',
        age: 11,
        grade: '6th Grade',
        totalPoints: 890,
        challengesCompleted: 32,
        currentStreak: 7,
        classrooms: ['Python Explorers'],
        recentActivity: [
          { type: 'challenge', title: 'Completed Palindrome Checker', date: '2024-03-10', points: 75 },
          { type: 'challenge', title: 'Completed Array Basics', date: '2024-03-09', points: 50 }
        ],
        achievements: [
          { id: 1, name: 'First Challenge', icon: '🏆', description: 'Complete your first challenge', earned: true },
          { id: 2, name: 'Week Streak', icon: '🔥', description: 'Code for 7 days straight', earned: true }
        ],
        progress: {
          pythonSkills: 65,
          problemSolving: 72,
          codeOptimization: 58
        }
      }
    ],
    relationshipType: 'Mother',
    phone: '+1 (555) 234-5678',
    bio: 'Encouraging my daughter to explore STEM!'
  },
  {
    id: 'parent_3',
    username: 'parent_lee',
    name: 'David Lee',
    email: 'david.lee@email.com',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=51',
    isAuthenticated: false,
    dateJoined: '2023-12-08',
    children: [
      {
        id: 'student_3',
        name: 'Benjamin Lee',
        username: 'ben_coder_kid',
        avatar: 'https://i.pravatar.cc/150?img=12',
        age: 13,
        grade: '8th Grade',
        totalPoints: 2150,
        challengesCompleted: 78,
        currentStreak: 25,
        classrooms: ['Python Explorers', 'JavaScript Masters', 'Web Development Bootcamp'],
        recentActivity: [
          { type: 'achievement', title: 'Reached Top 10!', date: '2024-03-08', points: 200 },
          { type: 'challenge', title: 'Completed Advanced Algorithms', date: '2024-03-07', points: 150 },
          { type: 'challenge', title: 'Completed Recursion Challenge', date: '2024-03-06', points: 100 }
        ],
        achievements: [
          { id: 1, name: 'First Challenge', icon: '🏆', description: 'Complete your first challenge', earned: true },
          { id: 2, name: 'Week Streak', icon: '🔥', description: 'Code for 7 days straight', earned: true },
          { id: 3, name: 'Code Master', icon: '⭐', description: 'Complete 50+ challenges', earned: true },
          { id: 4, name: 'Top 10', icon: '🥇', description: 'Reach top 10 on leaderboard', earned: true }
        ],
        progress: {
          pythonSkills: 92,
          problemSolving: 88,
          codeOptimization: 95
        }
      },
      {
        id: 'student_5',
        name: 'Olivia Lee',
        username: 'liv_codes',
        avatar: 'https://i.pravatar.cc/150?img=29',
        age: 9,
        grade: '4th Grade',
        totalPoints: 320,
        challengesCompleted: 12,
        currentStreak: 3,
        classrooms: ['Python Beginners'],
        recentActivity: [
          { type: 'challenge', title: 'Completed Hello World', date: '2024-03-05', points: 25 },
          { type: 'classroom', title: 'Joined Python Beginners', date: '2024-03-01', points: 0 }
        ],
        achievements: [
          { id: 1, name: 'First Challenge', icon: '🏆', description: 'Complete your first challenge', earned: true }
        ],
        progress: {
          pythonSkills: 35,
          problemSolving: 40,
          codeOptimization: 28
        }
      }
    ],
    relationshipType: 'Father',
    phone: '+1 (555) 345-6789',
    bio: 'Father of two amazing coders! Proud to see them learn and grow.'
  }
];

// Login credentials for testing
export const mockLoginAccounts = [
  {
    username: 'student1',
    password: 'student123',
    email: 'alex.johnson@email.com',
    role: 'student',
    userData: {
      id: 'student_1',
      username: 'student1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?img=32',
      age: 12,
      grade: '7th Grade',
      isAuthenticated: true,
      stats: {
        totalPoints: 1250,
        challengesCompleted: 45,
        currentStreak: 12,
        rank: 5,
        level: 15
      }
    }
  },
  {
    username: 'teacher1',
    password: 'teacher123',
    email: 'ada.lovelace@pygolfers.edu',
    role: 'teacher',
    userData: {
      id: 'teacher_1',
      username: 'teacher1',
      name: 'Ms. Ada Lovelace',
      email: 'ada.lovelace@pygolfers.edu',
      role: 'teacher',
      avatar: 'https://i.pravatar.cc/150?img=44',
      isAuthenticated: true,
      subject: 'Computer Science',
      school: 'Riverside Middle School',
      stats: {
        totalStudents: 85,
        totalClassrooms: 4,
        challengesCreated: 34,
        averageProgress: 78
      }
    }
  },
  {
    username: 'parent1',
    password: 'parent123',
    email: 'michael.johnson@email.com',
    role: 'parent',
    userData: {
      id: 'parent_1',
      username: 'parent1',
      name: 'Michael Johnson',
      email: 'michael.johnson@email.com',
      role: 'parent',
      avatar: 'https://i.pravatar.cc/150?img=22',
      isAuthenticated: true,
      relationshipType: 'Father',
      children: [
        {
          id: 'student_1',
          name: 'Alex Johnson',
          username: 'alex_coder',
          avatar: 'https://i.pravatar.cc/150?img=32',
          age: 12,
          grade: '7th Grade',
          totalPoints: 1250,
          challengesCompleted: 45,
          currentStreak: 12
        }
      ]
    }
  }
];

// Default test accounts for quick login (for account switcher)
export const dummyAccounts = {
  student: {
    id: 'student_1',
    username: 'alex_coder',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=32',
    age: 12,
    grade: '7th Grade',
    isAuthenticated: true,
    stats: {
      totalPoints: 1250,
      challengesCompleted: 45,
      currentStreak: 12,
      rank: 5,
      level: 15
    }
  },
  teacher: {
    id: 'teacher_1',
    username: 'ms_ada_lovelace',
    name: 'Ms. Ada Lovelace',
    email: 'ada.lovelace@pygolfers.edu',
    role: 'teacher',
    avatar: 'https://i.pravatar.cc/150?img=44',
    isAuthenticated: true,
    subject: 'Computer Science',
    school: 'Riverside Middle School',
    stats: {
      totalStudents: 85,
      totalClassrooms: 4,
      challengesCreated: 34,
      averageProgress: 78
    }
  },
  parent: {
    id: 'parent_1',
    username: 'parent_johnson',
    name: 'Michael Johnson',
    email: 'michael.johnson@email.com',
    role: 'parent',
    avatar: 'https://i.pravatar.cc/150?img=22',
    isAuthenticated: true,
    relationshipType: 'Father',
    children: [
      {
        id: 'student_1',
        name: 'Alex Johnson',
        username: 'alex_coder',
        avatar: 'https://i.pravatar.cc/150?img=32',
        age: 12,
        grade: '7th Grade',
        totalPoints: 1250,
        challengesCompleted: 45,
        currentStreak: 12
      }
    ]
  }
};

// Mock classroom data
export const mockClassrooms = [
  {
    id: 1,
    name: 'Python Explorers',
    code: 'ABC123',
    teacher: 'Ms. Ada Lovelace',
    teacherId: 'teacher_1',
    subject: 'Python Programming',
    grade: '8th Grade',
    description: 'Learn Python programming from basics to advanced concepts',
    students: 25,
    activeStudents: 18,
    createdDate: '2023-09-15',
    challenges: [
      { id: 1, title: 'FizzBuzz Challenge', difficulty: 'easy', completionRate: 92 },
      { id: 2, title: 'Palindrome Checker', difficulty: 'medium', completionRate: 68 },
      { id: 3, title: 'Prime Number Generator', difficulty: 'hard', completionRate: 45 }
    ]
  },
  {
    id: 2,
    name: 'JavaScript Masters',
    code: 'XYZ789',
    teacher: 'Mr. John Doe',
    teacherId: 'teacher_2',
    subject: 'JavaScript',
    grade: '9th Grade',
    description: 'Master JavaScript and build interactive web applications',
    students: 22,
    activeStudents: 20,
    createdDate: '2023-10-20',
    challenges: [
      { id: 4, title: 'Array Manipulation', difficulty: 'easy', completionRate: 88 },
      { id: 5, title: 'DOM Manipulation', difficulty: 'medium', completionRate: 72 }
    ]
  },
  {
    id: 3,
    name: 'Web Development Bootcamp',
    code: 'WEB456',
    teacher: 'Dr. Sarah Smith',
    teacherId: 'teacher_3',
    subject: 'Web Development',
    grade: '10th Grade',
    description: 'Full-stack web development with HTML, CSS, and JavaScript',
    students: 30,
    activeStudents: 28,
    createdDate: '2023-11-01',
    challenges: [
      { id: 6, title: 'Build a Portfolio', difficulty: 'medium', completionRate: 85 },
      { id: 7, title: 'Responsive Design', difficulty: 'medium', completionRate: 78 }
    ]
  }
];

// Mock challenges
export const mockChallenges = [
  {
    id: 1,
    title: 'FizzBuzz Challenge',
    description: 'Print numbers 1-100, but for multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".',
    difficulty: 'easy',
    points: 50,
    par: 100,
    timeLimit: 30,
    category: 'Loops & Conditionals',
    tags: ['loops', 'conditionals', 'basic'],
    completions: 1250,
    averageScore: 85,
    createdBy: 'teacher_1',
    createdDate: '2023-09-20'
  },
  {
    id: 2,
    title: 'Palindrome Checker',
    description: 'Write a function that checks if a given string is a palindrome (reads the same forwards and backwards).',
    difficulty: 'medium',
    points: 75,
    par: 80,
    timeLimit: 45,
    category: 'Strings',
    tags: ['strings', 'algorithms', 'functions'],
    completions: 850,
    averageScore: 78,
    createdBy: 'teacher_1',
    createdDate: '2023-10-05'
  },
  {
    id: 3,
    title: 'Prime Number Generator',
    description: 'Create a function to generate all prime numbers up to a given number n.',
    difficulty: 'hard',
    points: 100,
    par: 60,
    timeLimit: 60,
    category: 'Algorithms',
    tags: ['algorithms', 'optimization', 'math'],
    completions: 420,
    averageScore: 72,
    createdBy: 'teacher_3',
    createdDate: '2023-11-15'
  },
  {
    id: 4,
    title: 'Array Manipulation',
    description: 'Implement various array operations like sorting, filtering, and mapping.',
    difficulty: 'easy',
    points: 60,
    par: 90,
    timeLimit: 40,
    category: 'Arrays',
    tags: ['arrays', 'methods', 'basic'],
    completions: 980,
    averageScore: 88,
    createdBy: 'teacher_2',
    createdDate: '2023-12-01'
  }
];

// Mock events
export const mockEvents = [
  {
    id: 1,
    title: 'Code Golf Championship 2024',
    description: 'Annual coding competition where students compete to write the shortest code solutions',
    date: '2024-04-15',
    time: '2:00 PM - 5:00 PM',
    location: 'Virtual Event',
    type: 'competition',
    organizer: 'PyGolfers Team',
    maxParticipants: 100,
    currentParticipants: 67,
    registrationDeadline: '2024-04-10',
    prizes: ['Gold Badge', 'Silver Badge', 'Bronze Badge', 'Gift Cards'],
    ageGroup: '8-14 years'
  },
  {
    id: 2,
    title: 'Python Basics Workshop',
    description: 'Learn Python fundamentals with hands-on exercises and expert guidance',
    date: '2024-03-25',
    time: '3:00 PM - 4:30 PM',
    location: 'Community Tech Center',
    type: 'workshop',
    organizer: 'Ms. Ada Lovelace',
    maxParticipants: 30,
    currentParticipants: 22,
    registrationDeadline: '2024-03-23',
    prerequisites: 'None - Beginners welcome!',
    ageGroup: '8-12 years'
  },
  {
    id: 3,
    title: 'Web Development Study Group',
    description: 'Collaborative study session for students learning web development',
    date: '2024-03-20',
    time: '4:00 PM - 5:30 PM',
    location: 'School Library',
    type: 'study-group',
    organizer: 'Dr. Sarah Smith',
    maxParticipants: 15,
    currentParticipants: 12,
    registrationDeadline: '2024-03-19',
    topics: ['HTML', 'CSS', 'Responsive Design'],
    ageGroup: '10-14 years'
  }
];

// Export all mock data
export default {
  students: mockStudents,
  teachers: mockTeachers,
  parents: mockParents,
  dummyAccounts,
  classrooms: mockClassrooms,
  challenges: mockChallenges,
  events: mockEvents
};
