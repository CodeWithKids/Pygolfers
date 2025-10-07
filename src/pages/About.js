import React from 'react';
import { 
  FaPython, 
  FaTrophy, 
  FaUsers, 
  FaLightbulb, 
  FaChild, 
  FaGithub, 
  FaTwitter, 
  FaLinkedin 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import './About.css';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Lead Instructor',
    bio: 'Python expert with 10+ years of teaching experience',
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
    bio: 'Former software engineer passionate about education',
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
    bio: 'Dedicated to creating a positive learning environment',
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
    icon: <FaLightbulb className="feature-icon" />,
    title: 'Learn by Doing',
    description: 'Hands-on coding challenges that make learning fun and engaging.'
  },
  {
    id: 2,
    icon: <FaTrophy className="feature-icon" />,
    title: 'Earn Badges',
    description: 'Complete challenges to earn badges and track your progress.'
  },
  {
    id: 3,
    icon: <FaUsers className="feature-icon" />,
    title: 'Join a Community',
    description: 'Connect with other young coders and share your projects.'
  },
  {
    id: 4,
    icon: <FaPython className="feature-icon" />,
    title: 'Master Python',
    description: 'Build a strong foundation in Python programming.'
  }
];

const About = () => {
  return (
    <motion.div 
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <section className="hero-section">
        <div className="container">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            About <span className="highlight">PyGolfers</span> <span role="img" aria-label="snake and golf flag">🐍⛳</span>
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
          <p>PyGolfers borrows the concept of golf—but with code! In traditional golf, the goal is to get the ball in the hole using as few strokes as possible. In PyGolfers, the "golf course" is a coding puzzle, and your "strokes" are lines of Python code. Just like in golf, the challenge is to solve each puzzle using the shortest, most efficient solution you can—the fewer lines of code you write, the better your score! This playful approach turns every Python puzzle into a fun game of skill and strategy, making coding feel like a creative adventure rather than just another lesson.</p>
        </motion.section>

        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            padding: '3rem 2rem'
          }}
        >
          <h2 style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontSize: '2.25rem',
            color: 'var(--dark)'
          }}>
            Why Choose <span style={{ color: 'var(--primary)' }}>PyGolfers</span>?
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            gap: '2rem',
            overflowX: 'auto',
            padding: '1rem 0',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--primary) transparent',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            {features.map((feature) => (
              <motion.div 
                key={feature.id}
                style={{
                  flex: '0 0 auto',
                  width: '280px',
                  background: 'white',
                  borderRadius: 'var(--border-radius)',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: '300px'
                }}
                whileHover={{ 
                  transform: 'translateY(-5px)',
                  boxShadow: 'var(--shadow-md)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'var(--primary)',
                  fontSize: '2rem'
                }}>
                  {React.cloneElement(feature.icon, { style: { fontSize: '2rem' } })}
                </div>
                <h3 style={{
                  color: 'var(--dark)',
                  marginBottom: '1rem',
                  fontSize: '1.4rem',
                  fontWeight: 600
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          {/* Hide scrollbar for Webkit browsers */}
          <style jsx>{"\n            div::-webkit-scrollbar {\n              display: none;\n            }\n          "}</style>
        </motion.section>

        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Who's It For?</h2>
          <p>PyGolfers is perfect for kids who love solving puzzles, playing games, or just trying new things! No experience is needed—just bring your curiosity and creativity.</p>
          <p>Whether you're a complete beginner or already know some Python, PyGolfers has challenges for all skill levels. The only rule? Have fun!</p>
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
                      e.currentTarget.style.background = '#1DA1F2';
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
                      e.currentTarget.style.background = '#0077B5';
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

        <motion.section 
          className="about-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2>Meet the Creators</h2>
          <p>PyGolfers was built by a team who loves coding, teaching, and making learning joyful. We believe everyone can be a coder—and we're here to help you on your journey.</p>
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
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Start Your Coding Journey?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>Join PyGolfers today and start solving fun Python challenges!</p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <motion.a 
              href="/signup" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                background: 'var(--secondary)',
                color: 'var(--dark)',
                textDecoration: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              Sign Up Now
            </motion.a>
            <motion.a 
              href="/" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                background: 'transparent',
                border: '2px solid white',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Back to Home
            </motion.a>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
};

export default About;
