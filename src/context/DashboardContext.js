import React, { createContext, useContext, useState } from 'react';

// Create the context
const DashboardContext = createContext();

// Custom hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

// Dashboard provider component
export const DashboardProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to your dashboard!', type: 'info', read: false },
    { id: 2, message: 'You have 3 pending tasks', type: 'warning', read: false },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', completed: false, priority: 'high' },
    { id: 2, title: 'Review team reports', completed: true, priority: 'medium' },
    { id: 3, title: 'Schedule client meeting', completed: false, priority: 'low' },
  ]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const value = {
    currentPage,
    setCurrentPage,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    notifications,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    markNotificationAsRead,
    addNotification,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
