import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaInfoCircle } from 'react-icons/fa';

const EventRegistrationModal = ({ event, currentUser, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '',
    email: currentUser ? currentUser.email : '',
    phone: currentUser ? currentUser.phone || '' : '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistrationSuccess(true);
      
      // Call the parent's onSubmit after a delay to show success message
      setTimeout(() => {
        onSubmit({
          ...formData,
          eventId: event.id,
          eventTitle: event.title,
          registrationDate: new Date().toISOString()
        });
      }, 1500);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="registration-modal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
          
          {!registrationSuccess ? (
            <>
              <div className="modal-header">
                <h2>Register for {event.title}</h2>
                <p className="event-datetime">
                  {formatDate(event.date)} • {formatTime(event.time)}
                </p>
                <p className="event-location">
                  <FaMapMarkerAlt /> {event.location}
                </p>
                <div className="spots-remaining">
                  {event.maxParticipants - event.registeredParticipants} spots remaining
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="input-icon" /> Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={!!currentUser}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={!!currentUser}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone className="input-icon" /> Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000000"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="notes">
                    <FaInfoCircle className="input-icon" /> Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special requirements or questions?"
                    rows="3"
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="secondary-button"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="primary-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="registration-success">
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <h3>Registration Successful!</h3>
              <p>You're all set for <strong>{event.title}</strong>.</p>
              <p>We've sent a confirmation email to <strong>{formData.email}</strong> with event details.</p>
              <button 
                className="primary-button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventRegistrationModal;
