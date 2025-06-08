import React, { useState } from 'react';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p className="subtitle">We'd love to hear from you! Send us a message or reach out directly.</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-form-container">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows="5"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <FaPaperPlane className="btn-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. We'll get back to you soon!</p>
            </div>
          )}
        </div>
        
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p className="contact-description">
            Have questions or feedback? We're here to help! Reach out to us through any of these channels.
          </p>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon phone">
                <FaPhone />
              </div>
              <div>
                <h4>Phone</h4>
                <a href="tel:+254746187309" className="contact-link">+254 746 187 309</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon email">
                <FaEnvelope />
              </div>
              <div>
                <h4>Email</h4>
                <a href="mailto:info@codewithkids.africa" className="contact-link">info@codewithkids.africa</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon address">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4>Location</h4>
                <p>H138, Olympic Estate, Court C,<br />Kibera, Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
