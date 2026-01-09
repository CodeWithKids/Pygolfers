import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPython, 
  FaTrophy, 
  FaUsers, 
  FaLightbulb, 
  FaChild, 
  FaGithub, 
  FaTwitter, 
  FaLinkedin,
  FaCode,
  FaGlobe,
  FaHeart,
  FaShieldAlt,
  FaChevronDown,
  FaUserGraduate,
  FaChartLine,
  FaChevronUp,
  FaPlay,
  FaPause
} from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import './About.css';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Lead Instructor & Founder',
    bio: 'Python expert with 10+ years of teaching experience. Sarah believes coding should be fun and accessible for everyone, especially kids!',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Curriculum Developer',
    bio: 'Former software engineer at top tech companies, now passionate about making coding education engaging and effective for young minds.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Community Manager',
    bio: 'Dedicated to creating a positive, safe, and supportive learning environment where every child feels welcome and encouraged to explore.',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    social: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  }
];

const features = [
  {
    id: 1,
    icon: <FaShieldAlt className="feature-icon" />,
    title: 'Safe & Secure',
    description: 'COPPA compliant with robust privacy controls to protect young learners.'
  },
  {
    id: 2,
    icon: <FaUserGraduate className="feature-icon" />,
    title: 'Kid-Friendly',
    description: 'Designed specifically for young learners with age-appropriate content.'
  },
  {
    id: 3,
    icon: <FaChartLine className="feature-icon" />,
    title: 'Track Progress',
    description: 'Monitor learning journey with detailed analytics and progress reports.'
  },
  {
    id: 4,
    icon: <FaLightbulb className="feature-icon" />,
    title: 'Learn by Doing',
    description: 'Hands-on coding challenges that make learning fun and engaging.'
  },
  {
    id: 5,
    icon: <FaTrophy className="feature-icon" />,
    title: 'Earn Badges',
    description: 'Complete challenges to earn badges and track your achievements.'
  },
  {
    id: 6,
    icon: <FaUsers className="feature-icon" />,
    title: 'Join a Community',
    description: 'Connect with other young coders and share your projects.'
  }
];

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * target);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Interactive FAQ Item Component
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </motion.div>
      </div>
      <motion.div
        className="faq-answer"
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

// Interactive Feature Card Component
const InteractiveFeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  return (
    <motion.div 
      ref={ref}
      className="feature-card interactive"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="feature-icon-container"
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.5 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="feature-title">{feature.title}</h3>
      <motion.p 
        className="feature-description"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      >
        {feature.description}
      </motion.p>
      {isHovered && (
        <motion.div
          className="feature-highlight"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// Interactive Code Golf Demo
const CodeGolfDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [codeIndex, setCodeIndex] = useState(0);
  
  const codeExamples = [
    { lines: 5, code: 'print("Hello, World!")', score: 'Par: 100' },
    { lines: 3, code: 'print("Hi")', score: 'Birdie: 80' },
    { lines: 1, code: 'print("Hi")', score: 'Eagle: 60' }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCodeIndex((prev) => (prev + 1) % codeExamples.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <motion.div 
      className="code-golf-demo"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="demo-header">
        <h3>See Code Golf in Action!</h3>
        <button 
          className="demo-toggle"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <motion.div
        key={codeIndex}
        className="demo-code-block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="code-info">
          <span className="code-lines">{codeExamples[codeIndex].lines} lines</span>
          <span className="code-score">{codeExamples[codeIndex].score}</span>
        </div>
        <pre className="code-snippet">
          <code>{codeExamples[codeIndex].code}</code>
        </pre>
        <div className="code-progress">
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: isPlaying ? '100%' : '0%' }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "PyGolfers made coding fun! I love the challenges and earning badges!",
      author: "Alex, age 12",
      role: "Student",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5
    },
    {
      quote: "My daughter went from hating coding to asking for more challenges every day!",
      author: "Sarah M.",
      role: "Parent",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 5
    },
    {
      quote: "The golf concept is brilliant! It makes coding feel like a game, not homework.",
      author: "Marcus, age 14",
      role: "Student",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero-section">
        <div className="container">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About <span className="highlight">PyGolfers</span>
          </motion.h1>
          <motion.p 
            className="tagline"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Where Kids Become Coding Champions!
          </motion.p>
        </div>
      </section>

      <main className="about-content" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        padding: '0 1rem'
      }}>
        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Welcome to PyGolfers!</h2>
          <p>PyGolfers is a fun and friendly place where kids become coding champions! Our mission is to make learning Python exciting, creative, and rewarding for everyone ages 8–14.</p>
          <p>Founded in 2023, we've created a safe, fun environment where young coders can develop their Python skills while competing with friends and earning cool achievement badges. Our platform is designed specifically for kids and families, with built-in safety features and parental controls that ensure a secure learning experience.</p>
          <p><strong>What is Code Golf?</strong> PyGolfers borrows the concept of golf—but with code! In traditional golf, the goal is to get the ball in the hole using as few strokes as possible. In PyGolfers, the "golf course" is a coding puzzle, and your "strokes" are lines of Python code. Just like in golf, the challenge is to solve each puzzle using the shortest, most efficient solution you can—the fewer lines of code you write, the better your score! This playful approach turns every Python puzzle into a fun game of skill and strategy, making coding feel like a creative adventure rather than just another lesson.</p>
          <p>We believe that learning to code should be joyful, not stressful. That's why we've built PyGolfers with gamification at its core—every challenge completed, every badge earned, and every friend you help brings you closer to becoming a Python champion!</p>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="stats-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stats-container">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              PyGolfers by the Numbers
            </motion.h2>
            <div className="stats-grid">
              <motion.div 
                className="stat-card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="stat-icon">
                  <FaCode />
                </div>
                <div className="stat-number">
                  <AnimatedCounter target={500} suffix="+" />
                </div>
                <div className="stat-label">Challenges Solved</div>
              </motion.div>
              <motion.div 
                className="stat-card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div className="stat-number">
                  <AnimatedCounter target={1000} suffix="+" />
                </div>
                <div className="stat-label">Active Students</div>
              </motion.div>
              <motion.div 
                className="stat-card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="stat-icon">
                  <FaGlobe />
                </div>
                <div className="stat-number">
                  <AnimatedCounter target={50} suffix="+" />
                </div>
                <div className="stat-label">Countries</div>
              </motion.div>
              <motion.div 
                className="stat-card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="stat-icon">
                  <FaHeart />
                </div>
                <div className="stat-number">
                  <AnimatedCounter target={95} suffix="%" />
                </div>
                <div className="stat-label">Parent Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="features-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="section-title">
            Why Choose <span className="highlight">PyGolfers</span>?
          </h2>
          <div className="features-grid">
            {features.map((feature) => (
              <motion.div 
                key={feature.id}
                className="feature-card"
                whileHover={{ 
                  transform: 'translateY(-5px)',
                  boxShadow: 'var(--shadow-md)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Who's It For?</h2>
          <p>PyGolfers is perfect for kids who love solving puzzles, playing games, or just trying new things! No experience is needed—just bring your curiosity and creativity.</p>
          <p>Whether you're a complete beginner or already know some Python, PyGolfers has challenges for all skill levels. Our curriculum is designed to grow with you, from your first "Hello, World!" to building your own games and projects.</p>
          <p><strong>Perfect for:</strong></p>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: '1rem 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <li style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              🎮 Kids who love games and puzzles
            </li>
            <li style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              🧠 Curious minds ready to explore coding
            </li>
            <li style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              👨‍👩‍👧‍👦 Parents looking for safe, educational platforms
            </li>
            <li style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              🎓 Teachers seeking engaging coding curriculum
            </li>
          </ul>
          <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
            The only rule? Have fun while learning!
          </p>
        </motion.section>

        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            padding: '4rem 2rem',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto 3rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              color: 'var(--dark)',
              marginBottom: '1.5rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              Meet Our Team
              <span style={{
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: 'var(--accent)',
                borderRadius: '2px'
              }} />
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              PyGolfers was built by a passionate team who loves coding, teaching, and making learning joyful. 
              We believe everyone can be a coder—and we're here to help you on your journey.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id}
                style={{
                  width: '100%',
                  background: 'white',
                  borderRadius: 'var(--border-radius)',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%'
                }}
                whileHover={{ 
                  transform: 'translateY(-8px)',
                  boxShadow: 'var(--shadow-md)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  border: '4px solid var(--primary)',
                  padding: '4px',
                  background: 'white',
                  position: 'relative'
                }}>
                  <img 
                    src={member.image} 
                    alt={member.name}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>
                <h3 style={{
                  color: 'var(--dark)',
                  marginBottom: '0.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}>
                  {member.name}
                </h3>
                <p style={{
                  color: 'var(--accent)',
                  fontWeight: 500,
                  marginBottom: '1.5rem',
                  fontSize: '1.1rem',
                  position: 'relative',
                  paddingBottom: '1rem',
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  {member.role}
                  <span style={{
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '2px',
                    background: 'var(--accent)',
                    opacity: 0.5
                  }} />
                </p>
                <p style={{
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.7,
                  flex: 1,
                  fontSize: '1.05rem'
                }}>
                  {member.bio}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1.2rem',
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-color)',
                  width: '100%'
                }}>
                  <a 
                    href={member.social.github} 
                    aria-label={`${member.name}'s GitHub`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      background: 'var(--bg-tertiary)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.background = 'var(--dark)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'var(--bg-tertiary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <FaGithub />
                  </a>
                  <a 
                    href={member.social.twitter} 
                    aria-label={`${member.name}'s Twitter`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      background: 'var(--bg-tertiary)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.background = '#36B6A8';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'var(--bg-tertiary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href={member.social.linkedin} 
                    aria-label={`${member.name}'s LinkedIn`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      background: 'var(--bg-tertiary)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.background = '#F76C7B';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'var(--bg-tertiary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          className="testimonials-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="testimonials-container">
            <h2>What Kids & Parents Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="quote-icon">"</div>
                <div className="testimonial-content">
                  <p>"PyGolfers made coding fun! I love the challenges and earning badges!"</p>
                </div>
                <div className="testimonial-author">
                  <img src="https://i.pravatar.cc/150?img=1" alt="Alex" className="author-avatar" />
                  <div className="author-info">
                    <h4>Alex, age 12</h4>
                    <span>Student</span>
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="quote-icon">"</div>
                <div className="testimonial-content">
                  <p>"My daughter went from hating coding to asking for more challenges every day!"</p>
                </div>
                <div className="testimonial-author">
                  <img src="https://i.pravatar.cc/150?img=2" alt="Sarah" className="author-avatar" />
                  <div className="author-info">
                    <h4>Sarah M.</h4>
                    <span>Parent</span>
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <div className="quote-icon">"</div>
                <div className="testimonial-content">
                  <p>"The golf concept is brilliant! It makes coding feel like a game, not homework."</p>
                </div>
                <div className="testimonial-author">
                  <img src="https://i.pravatar.cc/150?img=3" alt="Marcus" className="author-avatar" />
                  <div className="author-info">
                    <h4>Marcus, age 14</h4>
                    <span>Student</span>
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <div className="value" style={{
              background: 'var(--bg-primary)',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{
                color: 'var(--primary)',
                marginBottom: '1rem',
                fontSize: '1.25rem'
              }}>Creativity</h3>
              <p style={{ color: 'var(--text-secondary)' }}>There's always more than one way to solve a problem.</p>
            </div>
            <div className="value" style={{
              background: 'var(--bg-primary)',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{
                color: 'var(--primary)',
                marginBottom: '1rem',
                fontSize: '1.25rem'
              }}>Fun</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Learning should make you smile!</p>
            </div>
            <div className="value" style={{
              background: 'var(--bg-primary)',
              padding: '1.5rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{
                color: 'var(--primary)',
                marginBottom: '1rem',
                fontSize: '1.25rem'
              }}>Teamwork</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We help each other grow and celebrate everyone's progress.</p>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          className="faq-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Is PyGolfers free?</h3>
                <p>Yes! We offer free challenges and basic features. Premium features are available for advanced learners.</p>
              </div>
              <div className="faq-item">
                <h3>What age is PyGolfers for?</h3>
                <p>PyGolfers is designed for kids aged 8-14, but anyone can join and learn!</p>
              </div>
              <div className="faq-item">
                <h3>Do I need Python experience?</h3>
                <p>No! We have beginner-friendly challenges and tutorials to get you started.</p>
              </div>
              <div className="faq-item">
                <h3>Is it safe for kids?</h3>
                <p>Absolutely! We're COPPA compliant with parental controls and moderated community.</p>
              </div>
              <div className="faq-item">
                <h3>Can parents track progress?</h3>
                <p>Yes! Parents can view their child's achievements and progress with permission.</p>
              </div>
              <div className="faq-item">
                <h3>How does code golf work?</h3>
                <p>Like golf, you try to solve coding challenges using the fewest lines of code possible!</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Safety Section */}
        <motion.section 
          className="safety-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="safety-container">
            <h2>🛡️ Safety First</h2>
            <p>PyGolfers is COPPA compliant and designed with kids' safety in mind.</p>
            <div className="safety-features">
              <div className="safety-item">
                <div className="safety-icon">
                  <FaShieldAlt />
                </div>
                <div className="safety-content">
                  <h4>Moderated Community</h4>
                  <p>All content is reviewed by our team</p>
                </div>
              </div>
              <div className="safety-item">
                <div className="safety-icon">
                  <FaChild />
                </div>
                <div className="safety-content">
                  <h4>Parental Controls</h4>
                  <p>Parents can monitor and control access</p>
                </div>
              </div>
              <div className="safety-item">
                <div className="safety-icon">
                  <FaUsers />
                </div>
                <div className="safety-content">
                  <h4>No Personal Data Sharing</h4>
                  <p>We protect your privacy completely</p>
                </div>
              </div>
              <div className="safety-item">
                <div className="safety-icon">
                  <FaHeart />
                </div>
                <div className="safety-content">
                  <h4>Safe Learning Environment</h4>
                  <p>Positive, supportive community for kids</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: 'var(--border-radius)'
          }}
        >
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Become a Python Champion? 🏆</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>Join 1,000+ kids learning to code with PyGolfers!</p>
          
          <div className="cta-options">
            <div className="cta-card">
              <h3>For Kids</h3>
              <p>Start solving challenges today!</p>
              <motion.a 
                href="/signup" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-button primary"
              >
                Sign Up Free
              </motion.a>
            </div>
            <div className="cta-card">
              <h3>For Parents</h3>
              <p>See what your child will learn</p>
              <motion.a 
                href="/contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-button secondary"
              >
                Learn More
              </motion.a>
            </div>
            <div className="cta-card">
              <h3>For Teachers</h3>
              <p>Bring PyGolfers to your classroom</p>
              <motion.a 
                href="/contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cta-button secondary"
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default About;
