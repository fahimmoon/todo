import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Dashboard Context
const DashboardContext = createContext();

// Custom hook to use Dashboard Context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Dashboard Provider Component
export const DashboardProvider = ({ children }) => {
  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Upcoming event',
      message: 'Landing Design Meeting | Time: 30 min',
      timestamp: '2 hours ago',
      type: 'event',
      isRead: false,
      date: new Date().toLocaleDateString()
    },
    {
      id: 2,
      title: 'Message | Product design',
      message: 'Message from Ken Smith',
      timestamp: '4 hours ago',
      type: 'message',
      isRead: true,
      date: new Date().toLocaleDateString()
    },
    {
      id: 3,
      title: 'Task reminder',
      message: 'Complete project documentation',
      timestamp: 'Yesterday',
      type: 'reminder',
      isRead: false,
      date: new Date(Date.now() - 86400000).toLocaleDateString()
    }
  ]);

  // Quick Actions State
  const [quickActions, setQuickActions] = useState([
    {
      id: 1,
      title: 'Stay organized',
      description: 'A clear structure for your notes',
      icon: '📝',
      color: 'indigo'
    },
    {
      id: 2,
      title: 'Sync your notes',
      description: 'Ensure post notes over syncspace',
      icon: '🔄',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Collaborate and share',
      description: 'Share notes with colleagues',
      icon: '👥',
      color: 'green'
    }
  ]);

  // Calendar Events State
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team meeting',
      time: '04:30-05:00 PM',
      date: new Date(2025, 7, 6), // August 6, 2025
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Project review',
      time: '11:30-12:30 PM',
      date: new Date(2025, 7, 6), // August 6, 2025
      type: 'review'
    },
    {
      id: 3,
      title: 'Client presentation',
      time: '02:00-03:00 PM',
      date: new Date(2025, 7, 8), // August 8, 2025
      type: 'presentation'
    }
  ]);

  // Calendar State
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Modal States
  const [modals, setModals] = useState({
    addAction: false,
    actionDetails: false,
    addEvent: false
  });

  // Notification Functions
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: 'Just now',
      isRead: false,
      date: new Date().toLocaleDateString(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  // Quick Actions Functions
  const addQuickAction = (action) => {
    const newAction = {
      id: Date.now(),
      ...action
    };
    setQuickActions(prev => [...prev, newAction]);
  };

  const removeQuickAction = (id) => {
    setQuickActions(prev =>
      prev.filter(action => action.id !== id)
    );
  };

  // Calendar Functions
  const addEvent = (event) => {
    const newEvent = {
      id: Date.now(),
      ...event
    };
    setEvents(prev => [...prev, newEvent]);

    // Add notification for future events
    const eventDate = new Date(event.date);
    const today = new Date();
    if (eventDate > today) {
      addNotification({
        title: 'Upcoming event',
        message: `${event.title} scheduled for ${eventDate.toLocaleDateString()}`,
        type: 'event'
      });
    }
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Modal Functions
  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const closeAllModals = () => {
    setModals({
      addAction: false,
      actionDetails: false,
      addEvent: false
    });
  };

  // Real-time notification simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          title: 'System update',
          message: 'New features available in your dashboard',
          type: 'system'
        },
        {
          title: 'Task reminder',
          message: 'Don\'t forget to review today\'s tasks',
          type: 'reminder'
        },
        {
          title: 'Meeting alert',
          message: 'Upcoming meeting in 15 minutes',
          type: 'meeting'
        }
      ];

      const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
      addNotification(randomNotification);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Group notifications by date
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = notification.date;
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
    
    let groupKey;
    if (date === today) {
      groupKey = 'Today';
    } else if (date === yesterday) {
      groupKey = 'Yesterday';
    } else {
      groupKey = date;
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(notification);
    return groups;
  }, {});

  const value = {
    // State
    notifications,
    groupedNotifications,
    quickActions,
    events,
    selectedDate,
    currentMonth,
    modals,

    // Notification actions
    addNotification,
    clearAllNotifications,
    markAsRead,
    deleteNotification,

    // Quick Actions
    addQuickAction,
    removeQuickAction,

    // Calendar actions
    addEvent,
    getEventsForDate,
    setSelectedDate,
    setCurrentMonth,

    // Modal actions
    openModal,
    closeModal,
    closeAllModals
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
