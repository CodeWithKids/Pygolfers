import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const EventFilters = ({ filters, onFilterChange, currentUser }) => {
  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
  };

  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const handleTypeChange = (e) => {
    onFilterChange({ type: e.target.value });
  };

  return (
    <div className="event-filters">
      <div className="search-filter">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      <div className="filter-options">
        <div className="filter-group">
          <label htmlFor="status-filter">
            <FaFilter className="filter-icon" /> Status:
          </label>
          <select 
            id="status-filter" 
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="all">All Events</option>
            <option value="open">Open for Registration</option>
            <option value="full">Fully Booked</option>
            <option value="completed">Past Events</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="type-filter">
            <FaFilter className="filter-icon" /> Type:
          </label>
          <select 
            id="type-filter" 
            value={filters.type}
            onChange={handleTypeChange}
          >
            <option value="all">All Types</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
      </div>
      
      {currentUser && (currentUser.role === 'admin' || currentUser.role === 'teacher') && (
        <div className="create-event-button">
          <button className="primary-button">
            + Create New Event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
