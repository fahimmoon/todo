import React, { useState } from 'react';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'event',
      title: 'Upcoming event',
      description: 'Landing Design Meeting | Time: 30 min',
      time: 'Sat, 10 May | 11 AM - 11:45 AM',
      isHighlighted: true
    },
    {
      id: 2,
      type: 'message',
      title: 'Message | Product design',
      description: 'Message from Ken Smith',
      time: '2 hours ago',
      isHighlighted: false
    }
  ]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleNotificationClick = (notification) => {
    alert(`Opening: ${notification.title}`);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Notifications</h2>
        <button 
          onClick={handleClearAll}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No notifications</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`group cursor-pointer rounded-lg transition-all duration-200 ${
                notification.isHighlighted 
                  ? 'bg-gray-50 p-3 sm:p-4 hover:bg-gray-100' 
                  : 'p-3 sm:p-4 hover:bg-gray-50'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base mb-1">{notification.title}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">{notification.description}</p>
                  {notification.time && (
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNotification(notification.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <EllipsisVerticalIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
