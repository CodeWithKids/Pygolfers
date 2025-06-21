import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUserPlus, FaClock, FaRegClock, FaUserTie } from 'react-icons/fa';
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
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f9d0631?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
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
];

const Events = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
  });

  // Load events (in a real app, this would be an API call)
  useEffect(() => {
    // Simulate API call
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
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
            <h1>Upcoming Python Events</h1>
            <p>Join our community events to learn, compete, and connect with fellow Python enthusiasts</p>
          </motion.div>
        </div>
      </section>

      <section className="events-main">
        <div className="container">
          <EventFilters 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            currentUser={currentUser}
          />
          
          <div className="events-grid">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegisterClick={handleRegisterClick}
                  currentUser={currentUser}
                />
              ))
            ) : (
              <div className="no-events">
                <p>No upcoming events match your filters. Check back later for new events!</p>
              </div>
            )}
          </div>

          {pastEvents.length > 0 && (
            <>
              <h2 className="past-events-title">Past Events</h2>
              <div className="events-grid past-events">
                {pastEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isPast={true}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </>
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
