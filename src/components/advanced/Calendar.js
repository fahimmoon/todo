import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const Calendar = () => {
  const { events, addEvent, updateEvent } = useDashboard();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month');

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const hasEvents = events?.some(event => 
        new Date(event.date).toDateString() === date.toDateString()
      );

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="day-number">{day}</span>
          {hasEvents && <div className="event-indicator"></div>}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-header-cell">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-body">
          {renderCalendarDays()}
        </div>
      </div>

      <style jsx>{`
        .calendar-grid {
          width: 100%;
        }
        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          margin-bottom: 8px;
        }
        .calendar-header-cell {
          padding: 8px 4px;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
        }
        .calendar-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
        }
        .calendar-day {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.2s;
        }
        .calendar-day:hover {
          background-color: #f3f4f6;
        }
        .calendar-day.today {
          background-color: #3b82f6;
          color: white;
        }
        .calendar-day.has-events .event-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
        }
        .calendar-day.today .event-indicator {
          background-color: white;
        }
        .calendar-day.empty {
          cursor: default;
        }
        .day-number {
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
