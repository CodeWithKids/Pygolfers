import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUserPlus, FaClock, FaRegClock, FaUserTie } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EventCard = ({ event, onRegisterClick, isPast = false, currentUser }) => {
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

  const getStatusBadge = () => {
    if (isPast) return 'Completed';
    if (event.status === 'full') return 'Fully Booked';
    const spotsLeft = event.maxParticipants - event.registeredParticipants;
    return spotsLeft < 5 ? `Only ${spotsLeft} spots left!` : 'Register Now';
  };

  const isUserRegistered = currentUser && 
    event.registeredUsers && 
    event.registeredUsers.some(user => user.id === currentUser.id);

  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegisterClick) {
      onRegisterClick(event);
    }
  };

  return (
    <motion.div 
      className={`event-card ${isPast ? 'past' : ''} ${event.status === 'full' ? 'full' : ''}`}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        {!isPast && (
          <div className="event-status">
            <span className={`status-badge ${event.status}`}>
              {event.status === 'open' ? 'Open' : 'Fully Booked'}
            </span>
          </div>
        )}
      </div>
      
      <div className="event-content">
        <div className="event-date">
          <FaCalendarAlt className="icon" />
          <span>{formatDate(event.date)}</span>
          <FaClock className="icon" />
          <span>{formatTime(event.time)}</span>
        </div>
        
        <h3 className="event-title">
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h3>
        
        <div className="event-organizer">
          <FaUserTie className="icon" />
          <span>Organized by {event.organizer}</span>
        </div>
        
        <div className="event-location">
          <FaMapMarkerAlt className="icon" />
          <span>{event.location}</span>
        </div>
        
        <p className="event-description">
          {event.description.length > 100 
            ? `${event.description.substring(0, 100)}...` 
            : event.description}
        </p>
        
        <div className="event-meta">
          <div className="event-participants">
            <FaUsers className="icon" />
            <span>{event.registeredParticipants} / {event.maxParticipants} participants</span>
          </div>
          
          {!isPast && (
            <div className="event-actions">
              {isUserRegistered ? (
                <span className="registered-badge">Registered ✓</span>
              ) : (
                <button 
                  className={`register-button ${event.status === 'full' ? 'disabled' : ''}`}
                  onClick={handleRegister}
                  disabled={event.status === 'full'}
                >
                  {getStatusBadge()}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
