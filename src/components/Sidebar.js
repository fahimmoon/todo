import React, { useState } from 'react';
import { Squares2X2Icon, UserIcon, BellIcon, DocumentTextIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: Squares2X2Icon, label: 'Dashboard' },
    { id: 'user', icon: UserIcon, label: 'Profile' },
    { id: 'notifications', icon: BellIcon, label: 'Notifications' },
    { id: 'documents', icon: DocumentTextIcon, label: 'Documents' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'settings', icon: CogIcon, label: 'Settings' }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  return (
    <div className="bg-indigo-600 text-white w-16 lg:w-20 flex flex-col items-center py-4 space-y-6 lg:space-y-8 rounded-r-3xl min-h-screen">
      {/* Logo */}
      <div className="p-2 bg-indigo-700 rounded-lg">
        <Squares2X2Icon className="h-6 w-6 lg:h-8 lg:w-8" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col items-center space-y-4 lg:space-y-6 flex-1">
        {menuItems.slice(1).map((item) => {
          const IconComponent = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`group relative p-2 lg:p-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-500 scale-105' 
                  : 'hover:bg-indigo-500 hover:scale-105'
              }`}
              title={item.label}
            >
              <IconComponent className="h-5 w-5 lg:h-6 lg:w-6" />
              
              {/* Tooltip for larger screens */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom spacer */}
      <div className="flex-shrink-0"></div>
    </div>
  );
};

export default Sidebar;
