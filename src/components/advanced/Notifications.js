import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import './Notifications.css';

const Notifications = () => {
  const {
    groupedNotifications,
    clearAllNotifications,
    markAsRead,
    deleteNotification
  } = useDashboard();

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (notificationId) => {
    setActiveDropdown(activeDropdown === notificationId ? null : notificationId);
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
    setActiveDropdown(null);
  };

  const handleDelete = (id) => {
    deleteNotification(id);
    setActiveDropdown(null);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event':
        return '📅';
      case 'message':
        return '💬';
      case 'reminder':
        return '⏰';
      case 'system':
        return '🔧';
      case 'meeting':
        return '👥';
      default:
        return '📢';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'event':
        return 'type-event';
      case 'message':
        return 'type-message';
      case 'reminder':
        return 'type-reminder';
      case 'system':
        return 'type-system';
      case 'meeting':
        return 'type-meeting';
      default:
        return 'type-default';
    }
  };

  const totalNotifications = Object.values(groupedNotifications).flat().length;
  const unreadCount = Object.values(groupedNotifications).flat().filter(n => !n.isRead).length;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="header-left">
          <h2 className="notifications-title">Notifications</h2>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        {totalNotifications > 0 && (
          <button 
            className="clear-button"
            onClick={clearAllNotifications}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="notifications-content">
        {totalNotifications === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔔</div>
            <p className="empty-message">No notifications</p>
            <p className="empty-description">You're all caught up!</p>
          </div>
        ) : (
          Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date} className="notification-group">
              <div className="group-header">
                <span className="group-date">{date}</span>
                <div className="group-divider"></div>
              </div>
              
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`notification-item ${notification.isRead ? 'read' : 'unread'} ${getTypeColor(notification.type)}`}
                  >
                    <div className="notification-content">
                      <div className="notification-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="notification-body">
                        <div className="notification-header-row">
                          <h3 className="notification-title">
                            {notification.title}
                            {!notification.isRead && <span className="unread-dot"></span>}
                          </h3>
                          <div className="notification-actions">
                            <span className="notification-time">{notification.timestamp}</span>
                            <div className="dropdown-container">
                              <button
                                className="menu-button"
                                onClick={() => toggleDropdown(notification.id)}
                                aria-label="More options"
                              >
                                <span className="menu-dots">⋯</span>
                              </button>
                              
                              {activeDropdown === notification.id && (
                                <div className="dropdown-menu">
                                  {!notification.isRead && (
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                      <span className="dropdown-icon">✓</span>
                                      Mark as read
                                    </button>
                                  )}
                                  <button
                                    className="dropdown-item delete"
                                    onClick={() => handleDelete(notification.id)}
                                  >
                                    <span className="dropdown-icon">🗑️</span>
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="notification-message">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
