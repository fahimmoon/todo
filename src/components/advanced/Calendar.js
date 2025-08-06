import React, { useState, useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './Calendar.css';

const Calendar = () => {
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent,
    openModal,
    setActiveModal
  } = useDashboard();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  // Get calendar data
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of month and total days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Previous month days to show
    const prevMonth = new Date(year, month - 1, 0);
    const daysFromPrevMonth = startingDayOfWeek;
    
    // Next month days to show
    const totalCells = 42; // 6 rows × 7 days
    const daysFromNextMonth = totalCells - daysInMonth - daysFromPrevMonth;
    
    const days = [];
    
    // Previous month days
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }
    
    // Next month days
    for (let day = 1; day <= daysFromNextMonth; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }
    
    return days;
  }, [currentDate]);

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = date.toDateString();
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === dateStr;
    });
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Event functions
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const openEventModal = (event = null) => {
    if (event) {
      setActiveModal('edit-event');
    } else {
      setActiveModal('add-event');
    }
    openModal();
  };

  // Get event color
  const getEventColor = (event) => {
    const colorMap = {
      'meeting': '#ef4444',
      'deadline': '#f59e0b',
      'reminder': '#8b5cf6',
      'personal': '#10b981',
      'work': '#3b82f6',
      'appointment': '#ec4899'
    };
    return colorMap[event.type] || '#6b7280';
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const formatSelectedDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="header-left">
          <h3 className="calendar-title">Calendar</h3>
          <span className="events-count">{events.length} events</span>
        </div>
        <div className="header-actions">
          <button 
            className="today-button"
            onClick={goToToday}
            title="Go to Today"
          >
            Today
          </button>
          <button 
            className="add-event-button"
            onClick={() => openEventModal()}
            title="Add Event"
          >
            <span className="add-icon">+</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="calendar-navigation">
        <button 
          className="nav-button"
          onClick={goToPreviousMonth}
          title="Previous Month"
        >
          ‹
        </button>
        <h4 className="current-month">{formatDate(currentDate)}</h4>
        <button 
          className="nav-button"
          onClick={goToNextMonth}
          title="Next Month"
        >
          ›
        </button>
      </div>

      {/* Calendar Content */}
      <div className="calendar-content">
        {/* Calendar Grid */}
        <div className="calendar-grid">
          {/* Days of week header */}
          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="calendar-days">
            {calendarData.map((dayData, index) => {
              const dayEvents = getEventsForDate(dayData.date);
              const isCurrentDay = isToday(dayData.date);
              const isSelectedDay = isSelected(dayData.date);
              
              return (
                <div
                  key={index}
                  className={`
                    calendar-day 
                    ${!dayData.isCurrentMonth ? 'other-month' : ''} 
                    ${isCurrentDay ? 'today' : ''} 
                    ${isSelectedDay ? 'selected' : ''}
                    ${dayEvents.length > 0 ? 'has-events' : ''}
                  `}
                  onClick={() => handleDateClick(dayData.date)}
                  title={dayEvents.length > 0 ? `${dayEvents.length} event(s)` : ''}
                >
                  <span className="day-number">
                    {dayData.date.getDate()}
                  </span>
                  
                  {/* Event indicators */}
                  {dayEvents.length > 0 && (
                    <div className="event-indicators">
                      {dayEvents.slice(0, 3).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="event-dot"
                          style={{ backgroundColor: getEventColor(event) }}
                          title={event.title}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="more-events">
                          +{dayEvents.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="selected-date-panel">
            <div className="panel-header">
              <h4 className="selected-date-title">
                {formatSelectedDate(selectedDate)}
              </h4>
              <button 
                className="close-panel"
                onClick={() => setSelectedDate(null)}
                title="Close Panel"
              >
                ×
              </button>
            </div>
            
            <div className="panel-content">
              {selectedDateEvents.length > 0 ? (
                <div className="events-list">
                  {selectedDateEvents.map(event => (
                    <EventCard 
                      key={event.id}
                      event={event}
                      color={getEventColor(event)}
                      onEdit={() => openEventModal(event)}
                      onDelete={() => deleteEvent(event.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-events">
                  <div className="no-events-icon">📅</div>
                  <p className="no-events-message">No events for this day</p>
                  <button 
                    className="add-event-link"
                    onClick={() => openEventModal()}
                  >
                    Add an event
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Events Summary */}
      <div className="upcoming-events">
        <h4 className="upcoming-title">Upcoming Events</h4>
        <div className="upcoming-list">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3)
            .map(event => (
              <div key={event.id} className="upcoming-event">
                <div 
                  className="event-color-bar"
                  style={{ backgroundColor: getEventColor(event) }}
                />
                <div className="event-info">
                  <span className="event-title">{event.title}</span>
                  <span className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                    {event.time && ` at ${event.time}`}
                  </span>
                </div>
              </div>
            ))}
          
          {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
            <div className="no-upcoming">
              <span className="no-upcoming-icon">🗓️</span>
              <span className="no-upcoming-text">No upcoming events</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, color, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="event-card" style={{ borderLeftColor: color }}>
      <div className="event-card-content">
        <div className="event-header">
          <h5 className="event-title">{event.title}</h5>
          <div className="event-menu">
            <button 
              className="menu-trigger"
              onClick={() => setShowMenu(!showMenu)}
              title="Event Options"
            >
              ⋯
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <button 
                  className="menu-item"
                  onClick={() => {
                    onEdit();
                    setShowMenu(false);
                  }}
                >
                  <span className="menu-icon">✏️</span>
                  Edit Event
                </button>
                <button 
                  className="menu-item delete"
                  onClick={() => {
                    onDelete();
                    setShowMenu(false);
                  }}
                >
                  <span className="menu-icon">🗑️</span>
                  Delete Event
                </button>
              </div>
            )}
          </div>
        </div>
        
        {event.time && (
          <div className="event-time">
            <span className="time-icon">🕐</span>
            {event.time}
          </div>
        )}
        
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
        
        <div className="event-meta">
          <span className="event-type" style={{ color }}>
            {event.type}
          </span>
          {event.location && (
            <span className="event-location">
              <span className="location-icon">📍</span>
              {event.location}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
