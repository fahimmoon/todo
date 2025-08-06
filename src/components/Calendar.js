import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2021, 4, 19)); // May 2021
  const [selectedDate, setSelectedDate] = useState(19);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const [events] = useState([
    {
      id: 1,
      title: 'Team meeting',
      time: '04:30-05:00 PM',
      date: 19
    },
    {
      id: 2,
      title: 'Meeting with new client',
      time: '11:30-12:30 PM',
      date: 19
    }
  ]);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push({
        date: day.getDate(),
        isCurrentMonth: day.getMonth() === month,
        fullDate: day
      });
    }
    return days;
  };

  const handleDateClick = (date, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(date);
    }
  };

  const hasEvents = (date) => {
    return events.some(event => event.date === date);
  };

  const getCurrentDateEvents = () => {
    return events.filter(event => event.date === selectedDate);
  };

  const days = getDaysInMonth();

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button 
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 text-center text-xs sm:text-sm text-gray-500 mb-2">
        {daysOfWeek.map(day => (
          <span key={day} className="py-1">{day}</span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.slice(0, 35).map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day.date, day.isCurrentMonth)}
            className={`
              aspect-square flex items-center justify-center text-xs sm:text-sm rounded transition-all duration-200
              ${day.isCurrentMonth 
                ? 'text-gray-900 hover:bg-gray-100' 
                : 'text-gray-300'
              }
              ${selectedDate === day.date && day.isCurrentMonth
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : ''
              }
              ${hasEvents(day.date) && day.isCurrentMonth && selectedDate !== day.date
                ? 'bg-indigo-100 text-indigo-600'
                : ''
              }
            `}
          >
            {day.date}
          </button>
        ))}
      </div>

      {/* Events for Selected Date */}
      <div className="space-y-3">
        {getCurrentDateEvents().length > 0 ? (
          getCurrentDateEvents().map((event) => (
            <div 
              key={event.id}
              className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => alert(`Opening: ${event.title}`)}
            >
              <p className="text-xs text-gray-400 mb-1">{event.time}</p>
              <p className="font-semibold text-sm">{event.title}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400 text-sm">
            No events for {months[currentDate.getMonth()]} {selectedDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
