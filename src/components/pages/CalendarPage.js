import React from 'react';
import Calendar from '../Calendar';
import { CalendarIcon, ClockIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';

const CalendarPage = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Standup',
      time: '9:00 AM',
      date: 'Today',
      type: 'meeting',
      attendees: 5,
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Project Review',
      time: '2:00 PM',
      date: 'Today',
      type: 'meeting',
      attendees: 8,
      location: 'Virtual'
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '10:00 AM',
      date: 'Tomorrow',
      type: 'presentation',
      attendees: 12,
      location: 'Main Hall'
    },
    {
      id: 4,
      title: 'Sprint Planning',
      time: '11:30 AM',
      date: 'Dec 20',
      type: 'planning',
      attendees: 6,
      location: 'Room B'
    },
    {
      id: 5,
      title: 'One-on-One with Manager',
      time: '3:00 PM',
      date: 'Dec 22',
      type: 'meeting',
      attendees: 2,
      location: 'Office'
    }
  ];

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'presentation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'planning':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const quickStats = [
    { label: 'Today\'s Events', value: '3', color: 'text-blue-600' },
    { label: 'This Week', value: '12', color: 'text-green-600' },
    { label: 'This Month', value: '47', color: 'text-purple-600' },
    { label: 'Meeting Hours', value: '24h', color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600">Manage your schedule and events</p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Today
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Add Event
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <div className="lg:col-span-2">
          <Calendar />
          
          {/* Calendar Legend */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Event Types</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Meetings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Presentations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Planning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Deadlines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <ClockIcon className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
            </div>
            
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border ${getEventColor(event.type)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <span className="text-xs font-medium px-2 py-1 bg-white bg-opacity-70 rounded">
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-xs opacity-90">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{event.date}</span>
                      <ClockIcon className="h-3 w-3 ml-2" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <UserGroupIcon className="h-3 w-3" />
                      <span>{event.attendees} attendees</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📅 Schedule a meeting
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                🔄 Set recurring event
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📊 View analytics
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📧 Send invites
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                🎯 Set reminder
              </button>
            </div>
          </div>

          {/* Calendar Insights */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">This Week's Insights</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Busiest Day</span>
                <span className="text-sm font-medium text-gray-900">Wednesday</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Free Hours</span>
                <span className="text-sm font-medium text-green-600">18 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Meeting Load</span>
                <span className="text-sm font-medium text-orange-600">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Focus Time</span>
                <span className="text-sm font-medium text-blue-600">6 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
