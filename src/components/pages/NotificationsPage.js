import React, { useState } from 'react';
import { BellIcon, CheckIcon, XMarkIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task',
      title: 'Task Deadline Approaching',
      message: 'The "Website Redesign" task is due in 2 hours',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Meeting Reminder',
      message: 'Team standup meeting starts in 15 minutes',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'assignment',
      title: 'New Assignment',
      message: 'You have been assigned to "Mobile App Development" project',
      time: '1 hour ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'Dashboard has been updated with new features',
      time: '3 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You completed 50 tasks this month!',
      time: '1 day ago',
      read: false,
      priority: 'low'
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Weekly Report Due',
      message: 'Your weekly progress report is due tomorrow',
      time: '2 days ago',
      read: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'task':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'meeting':
        return <BellIcon className="h-5 w-5 text-green-500" />;
      case 'assignment':
        return <CheckIcon className="h-5 w-5 text-purple-500" />;
      case 'system':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      case 'achievement':
        return <CheckIcon className="h-5 w-5 text-yellow-500" />;
      case 'reminder':
        return <BellIcon className="h-5 w-5 text-red-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={clearAll}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'read', label: 'Read', count: notifications.length - unreadCount }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'unread' ? 'No unread notifications' : 
               filter === 'read' ? 'No read notifications' : 
               'You have no notifications at the moment'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border-l-4 ${getPriorityColor(notification.priority)} p-4 transition-all hover:shadow-md ${
                !notification.read ? 'bg-blue-50 border-blue-100' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 ml-4">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Mark as read"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete notification"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{notifications.filter(n => n.read).length}</div>
            <div className="text-sm text-gray-500">Read</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <div className="text-sm text-gray-500">Unread</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{notifications.filter(n => n.priority === 'high').length}</div>
            <div className="text-sm text-gray-500">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
