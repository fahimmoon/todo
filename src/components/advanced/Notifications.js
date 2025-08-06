import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const Notifications = () => {
  const { notifications } = useDashboard();
  const [filter, setFilter] = useState('all');

  const defaultNotifications = [
    {
      id: 1,
      type: 'task',
      title: 'Task Due Soon',
      message: 'Complete quarterly report by end of day',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Upcoming Meeting',
      message: 'Team standup in 30 minutes',
      time: '30 min ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'New features available in your dashboard',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ];

  const allNotifications = notifications || defaultNotifications;
  const filteredNotifications = filter === 'all' 
    ? allNotifications 
    : allNotifications.filter(notif => notif.type === filter);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task':
        return '✓';
      case 'meeting':
        return '📅';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <div className="flex space-x-1">
          {['all', 'task', 'meeting', 'system'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                filter === type
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-colors ${
              notification.read
                ? 'bg-gray-50 border-gray-200'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-sm">{getNotificationIcon(notification.type)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notification.title}
                  </p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(notification.priority)}`}>
                    {notification.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500">
                  {notification.time}
                </p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">🔕</div>
          <p className="text-sm text-gray-500">No notifications</p>
        </div>
      )}

      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Notifications
      </button>
    </div>
  );
};

export default Notifications;
