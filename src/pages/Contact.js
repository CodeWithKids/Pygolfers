import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';
import '../styles/Layout.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
      setIsSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleInputFocus = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="contact-page">
      <div className="page-container">
        <div className="content-card">
          <div className="contact-header">
            <motion.div 
              className="header-content"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Get in Touch</h1>
              <div className="header-divider"></div>
              <p className="subtitle">
                Have questions or want to collaborate? Drop us a message and we'll get back to you as soon as possible.
              </p>
            </motion.div>
          </div>
          
          <div className="contact-content">
            <motion.div 
              className="contact-form-container glass-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>We typically respond within 24 hours</p>
              </div>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                onSubmit={handleSubmit} 
                className="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="form"
              >
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleInputFocus('name')}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder=" "
                    />
                    <label htmlFor="name" className="floating-label">Your Name *</label>
                    <div className="input-underline"></div>
                  </div>
                  {errors.name && <span className="error-message">
                    <i className="error-icon">!</i> {errors.name}
                  </span>}
                </div>
                
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleInputFocus('email')}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder=" "
                    />
                    <label htmlFor="email" className="floating-label">Email Address *</label>
                    <div className="input-underline"></div>
                  </div>
                  {errors.email && <span className="error-message">
                    <i className="error-icon">!</i> {errors.email}
                  </span>}
                </div>


                <div className="form-group message-group">
                  <div className="input-wrapper">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleInputFocus('message')}
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      rows="4"
                      placeholder=" "
                    ></textarea>
                    <label htmlFor="message" className="floating-label">Your Message *</label>
                    <div className="input-underline"></div>
                  </div>
                  {errors.message && <span className="error-message">
                    <i className="error-icon">!</i> {errors.message}
                  </span>}
                </div>
                
                <div className="form-group" style={{ marginTop: '2.5rem' }}>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    <div className="btn-content">
                      {isSubmitting ? (
                        <>
                          <span className="spin">
                            <FaSpinner />
                          </span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane style={{ transition: 'transform 0.3s ease' }} />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                key="success"
              >
                <motion.div 
                  className="success-icon"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <FaCheckCircle />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Message Sent Successfully!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </motion.p>
                <motion.button 
                  className="back-button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      message: ''
                    });
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPaperPlane style={{ marginRight: '8px' }} />
                  Send another message
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Contact Information</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
            We're here to help and answer any questions you might have. Reach out to us through any of these channels.
          </p>
          
          <div className="contact-items">
            <motion.div 
              className="info-item"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="info-icon">
                <FaPhone />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text)' }}>Phone & WhatsApp</h3>
                <p>+254 746 187 309</p>
                <p style={{ fontSize: '0.9em', color: 'var(--text-light)', marginTop: '0.25rem' }}>Available 9:00 AM - 5:00 PM EAT</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="info-item"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text)' }}>Email Us</h3>
                <p>info@codewithkids.africa</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="info-item"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text)' }}>Visit Us</h3>
                <p>H138, Olympic Estate, Court C</p>
                <p>Kibera, Nairobi, Kenya</p>
                <p style={{ fontSize: '0.9em', color: 'var(--text-light)', marginTop: '0.25rem' }}>By appointment only</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Contact;
