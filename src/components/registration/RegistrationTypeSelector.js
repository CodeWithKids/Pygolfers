import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaKey, FaUserAlt, FaUserShield, FaArrowRight, FaStar, FaCode, FaUsers, FaLock } from 'react-icons/fa';
import './RegistrationTypeSelector.css';

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  }),
  hover: {
    y: -5,
    boxShadow: '0 15px 30px rgba(0,0,0,0.12)'
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const RegistrationTypeSelector = () => {
  useEffect(() => {
    document.body.classList.add('registration-page');
    return () => document.body.classList.remove('registration-page');
  }, []);

  const registrationOptions = [
    {
      id: 'learner',
      title: "I'm a Learner",
      description: "Start coding with Python through fun golfing challenges and track your progress.",
      icon: <FaUserGraduate />,
      path: "/register/learner",
      gradient: 'linear-gradient(135deg, #36B6A8 0%, #2e9c8f 100%)',
      badge: 'Most Popular',
      features: ['Interactive Tutorials', 'Progress Tracking', 'Earn Badges']
    },
    {
      id: 'teacher',
      title: "I'm a Teacher",
      description: "Create classrooms, assign challenges, and monitor student progress with our educator tools.",
      icon: <FaChalkboardTeacher />,
      path: "/register/teacher",
      gradient: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
      features: ['Classroom Management', 'Student Analytics', 'Lesson Plans']
    },
    {
      id: 'parent',
      title: "I'm a Parent",
      description: "Support your child's coding journey and track their learning progress.",
      icon: <FaUserShield />,
      path: "/register/parent",
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      features: ['Progress Reports', 'Activity Tracking', 'Safe Environment']
    },
    {
      id: 'code',
      title: "I Have a Code",
      description: "Join a classroom or family group with a code from your teacher or parent.",
      icon: <FaKey />,
      path: "/register/code",
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      features: ['Quick Join', 'Team Collaboration', 'Shared Progress']
    },
    {
      id: 'guest',
      title: "Try as Guest",
      description: "Explore PyGolfers with limited access. No account required!",
      icon: <FaUserAlt />,
      path: "/register/guest",
      gradient: 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)',
      isGuest: true,
      features: ['No Commitment', 'Sample Content', 'Upgrade Anytime']
    }
  ];

  return (
    <div className="registration-type-container">
      <motion.div 
        className="registration-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Join <span className="gradient-text">PyGolfers</span></h1>
        <p className="subtitle">Start your coding journey today. Select your account type to get started!</p>
      </motion.div>
      
      <motion.div 
        className="registration-cards"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {registrationOptions.slice(0, 4).map((option, index) => (
          <motion.div 
            key={option.id}
            className="registration-card-wrapper"
            custom={index}
            variants={cardVariants}
            whileHover="hover"
          >
            <Link to={option.path} className={`registration-card ${option.id}`}>
              <div className="card-icon" style={{ background: option.gradient }}>
                {option.icon}
              </div>
              {option.badge && <div className="card-badge">{option.badge}</div>}
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              <ul className="card-features">
                {option.features.map((feature, i) => (
                  <li key={i}>
                    <FaStar className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="card-arrow">
                <FaArrowRight />
              </div>
            </Link>
          </motion.div>
        ))}
        
        {/* Guest Card - Centered on its own row */}
        <motion.div 
          className="guest-row"
          custom={4}
          variants={cardVariants}
          whileHover="hover"
        >
          <Link to={registrationOptions[4].path} className="registration-card guest guest-centered">
            <div className="card-icon" style={{ background: registrationOptions[4].gradient }}>
              {registrationOptions[4].icon}
            </div>
            <h3>{registrationOptions[4].title}</h3>
            <p>{registrationOptions[4].description}</p>
            <ul className="card-features">
              {registrationOptions[4].features.map((feature, i) => (
                <li key={i}>
                  <FaStar className="feature-icon" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="card-arrow">
              <FaArrowRight />
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <div className="registration-footer">
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon"><FaCode /></div>
            <h4>Learn to Code</h4>
            <p>Interactive Python lessons designed for beginners</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><FaUsers /></div>
            <h4>Join a Community</h4>
            <p>Connect with other learners and educators</p>
          </div>
          <div className="feature">
            <div className="feature-icon"><FaLock /></div>
            <h4>Safe & Secure</h4>
            <p>COPPA compliant and student privacy focused</p>
          </div>
        </div>
        
        <div className="login-redirect">
          Already have an account? <Link to="/login" className="login-link">Log in here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTypeSelector;
