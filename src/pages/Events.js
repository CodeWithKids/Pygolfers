import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUserPlus, FaClock, FaRegClock, FaUserTie, FaThLarge, FaList, FaCalendar, FaStar, FaGamepad } from 'react-icons/fa';
import { motion } from 'framer-motion';
import EventCard from '../components/events/EventCard';
import EventFilters from '../components/events/EventFilters';
import EventRegistrationModal from '../components/events/EventRegistrationModal';
import '../styles/Events.css';

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: 'Python Code Golf Championship',
    description: 'Join us for the annual Python Code Golf Championship! Compete with other Python enthusiasts to solve challenges with the fewest lines of code.',
    date: '2025-07-15',
    time: '14:00',
    location: 'Online',
    organizer: 'PyGolfers Team',
    maxParticipants: 100,
    registeredParticipants: 78,
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    status: 'open'
  },
  {
    id: 2,
    title: 'Beginner Python Workshop',
    description: 'Learn Python from scratch in this hands-on workshop. No prior experience required!',
    date: '2025-07-22',
    time: '10:00',
    location: 'Nairobi Tech Hub',
    organizer: 'Python Kenya',
    maxParticipants: 30,
    registeredParticipants: 30,
    image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    status: 'full'
  },
  {
    id: 3,
    title: 'Advanced Python Patterns',
    description: 'Deep dive into advanced Python patterns and best practices with industry experts.',
    date: '2025-08-05',
    time: '16:00',
    location: 'Online',
    organizer: 'Python Experts',
    maxParticipants: 50,
    registeredParticipants: 32,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    status: 'open'
  },
  {
    id: 4,
    title: 'Monthly Python Meetup',
    description: 'Network with fellow Python developers and share knowledge.',
    date: '2025-06-30',
    time: '18:00',
    location: 'Nairobi Dev Center',
    organizer: 'PyKenya',
    maxParticipants: 40,
    registeredParticipants: 40,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    status: 'completed'
  },
  // Teacher-created events
  {
    id: 5,
    title: 'Python Coding Workshop',
    description: 'Introduction to Python programming for beginners',
    date: '2024-01-15',
    time: '10:00',
    location: 'Virtual',
    organizer: 'Dr. Sarah Williams',
    maxParticipants: 30,
    registeredParticipants: 15,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    status: 'open',
    createdBy: 'teacher123',
    type: 'workshop'
  },
  {
    id: 6,
    title: 'Algorithm Challenge Competition',
    description: 'Competitive programming event for advanced students',
    date: '2024-01-20',
    time: '14:00',
    location: 'School Lab',
    organizer: 'Dr. Sarah Williams',
    maxParticipants: 20,
    registeredParticipants: 20,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    status: 'full',
    createdBy: 'teacher123',
    type: 'competition'
  },
  {
    id: 7,
    title: 'Code Review Session',
    description: 'Peer code review and feedback session',
    date: '2024-01-10',
    time: '15:00',
    location: 'Virtual',
    organizer: 'Dr. Sarah Williams',
    maxParticipants: 15,
    registeredParticipants: 12,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    status: 'completed',
    createdBy: 'teacher123',
    type: 'session'
  },
];

const Events = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid, calendar, list
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
  });

  // Load events (in a real app, this would be an API call)
  useEffect(() => {
    // Simulate API call with loading
    setIsLoading(true);
    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...events];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(event => event.status === filters.status);
    }
    
    // Apply type filter
    if (filters.type !== 'all') {
      const isOnline = filters.type === 'online';
      result = result.filter(event => 
        (isOnline && event.location.toLowerCase() === 'online') ||
        (!isOnline && event.location.toLowerCase() !== 'online')
      );
    }
    
    setFilteredEvents(result);
  }, [filters, events]);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const handleRegistrationSubmit = (formData) => {
    // In a real app, this would be an API call
    console.log('Registration submitted:', formData);
    setIsRegistrationOpen(false);
    
    // Show success message
    alert(`Successfully registered for ${selectedEvent.title}!`);
    
    // Update event registration count
    if (selectedEvent.registeredParticipants < selectedEvent.maxParticipants) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, registeredParticipants: event.registeredParticipants + 1 }
          : event
      );
      setEvents(updatedEvents);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group events by status
  const upcomingEvents = filteredEvents.filter(event => event.status === 'open' || event.status === 'full');
  const pastEvents = filteredEvents.filter(event => event.status === 'completed');

  // Loading skeleton component
  const EventSkeleton = () => (
    <div className="event-card skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-text">
              <h1>
                <span className="logo-icon">🐍⛳</span>
                Python Events & Competitions
              </h1>
              <p>Join our community events to learn, compete, and connect with fellow Python enthusiasts!</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="events-main">
        <div className="container">
          <div className="events-controls">
            <EventFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              currentUser={currentUser}
            />
            
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <FaList />
              </button>
              <button 
                className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                onClick={() => setViewMode('calendar')}
                title="Calendar View"
              >
                <FaCalendar />
              </button>
            </div>
          </div>
          
          <div className={`events-container ${viewMode}`}>
            {isLoading ? (
              <div className="events-grid">
                {[...Array(6)].map((_, index) => (
                  <EventSkeleton key={index} />
                ))}
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className={`events-grid ${viewMode}`}>
                {upcomingEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onRegisterClick={handleRegisterClick}
                    currentUser={currentUser}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="no-events">
                <div className="no-events-content">
                  <FaCalendarAlt className="no-events-icon" />
                  <h3>No upcoming events found</h3>
                  <p>No events match your current filters. Try adjusting your search or check back later for new events!</p>
                  <div className="no-events-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => setFilters({ search: '', status: 'all', type: 'all' })}
                    >
                      Clear Filters
                    </button>
                    <Link to="/community" className="btn btn-primary">
                      <FaGamepad /> Join Community
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {pastEvents.length > 0 && (
            <motion.div 
              className="past-events-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="past-events-header">
                <h2 className="past-events-title">
                  <FaRegClock className="title-icon" />
                  Past Events
                </h2>
                <p className="past-events-subtitle">Relive the memories from our previous events</p>
              </div>
              <div className={`events-grid past-events ${viewMode}`}>
                {pastEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isPast={true}
                    currentUser={currentUser}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {isRegistrationOpen && selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          currentUser={currentUser}
          onClose={() => setIsRegistrationOpen(false)}
          onSubmit={handleRegistrationSubmit}
        />
      )}
    </div>
  );
};

export default Events;
