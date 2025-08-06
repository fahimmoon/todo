import React, { useState, useEffect } from 'react';
import { 
  Squares2X2Icon, 
  UserIcon, 
  BellIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  CogIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onToggle, currentPage, onNavigate }) => {
  const [activeItem, setActiveItem] = useState(currentPage || 'dashboard');
  const [isMobile, setIsMobile] = useState(false);

  // Update active item when currentPage changes
  useEffect(() => {
    setActiveItem(currentPage || 'dashboard');
  }, [currentPage]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && !event.target.closest('.sidebar-container')) {
        onToggle();
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, isMobile, onToggle]);

  const menuItems = [
    { id: 'dashboard', icon: Squares2X2Icon, label: 'Dashboard', color: 'text-blue-500' },
    { id: 'profile', icon: UserIcon, label: 'Profile', color: 'text-green-500' },
    { id: 'notifications', icon: BellIcon, label: 'Notifications', color: 'text-yellow-500' },
    { id: 'documents', icon: DocumentTextIcon, label: 'Documents', color: 'text-purple-500' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar', color: 'text-red-500' },
    { id: 'settings', icon: CogIcon, label: 'Settings', color: 'text-gray-500' }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    onNavigate(itemId); // Notify parent component about navigation
    // Close sidebar on mobile after selection
    if (isMobile && isOpen) {
      setTimeout(() => onToggle(), 150);
    }
  };

  const sidebarClasses = `
    sidebar-container fixed lg:relative z-50 lg:z-auto
    bg-indigo-600 text-white flex flex-col py-4 space-y-6 lg:space-y-8 
    rounded-r-3xl min-h-screen shadow-xl lg:shadow-none
    transition-all duration-300 ease-in-out
    ${isMobile 
      ? `w-72 ${isOpen ? 'translate-x-0' : '-translate-x-full'} left-0 top-0` 
      : 'w-16 lg:w-20 relative translate-x-0'
    }
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 lg:px-0 lg:justify-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-700 rounded-lg">
              <Squares2X2Icon className="h-6 w-6 lg:h-8 lg:w-8" />
            </div>
            {isMobile && (
              <span className="font-bold text-lg">Dashboard</span>
            )}
          </div>
          
          {/* Close button for mobile */}
          {isMobile && (
            <button
              onClick={onToggle}
              className="p-2 hover:bg-indigo-500 rounded-lg transition-colors lg:hidden"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col flex-1 px-4 lg:px-0 lg:items-center space-y-2 lg:space-y-6">
          {menuItems.slice(1).map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`group relative flex items-center w-full lg:w-auto p-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-500 scale-105 shadow-lg' 
                    : 'hover:bg-indigo-500 hover:scale-105'
                }`}
                title={item.label}
              >
                <IconComponent className={`h-5 w-5 lg:h-6 lg:w-6 ${isActive ? 'text-white' : item.color} ${isMobile ? 'mr-3' : ''}`} />
                
                {/* Label for mobile */}
                {isMobile && (
                  <span className="font-medium">{item.label}</span>
                )}

                {/* Tooltip for desktop */}
                {!isMobile && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full lg:hidden"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Section for Mobile */}
        {isMobile && (
          <div className="px-4 py-4 border-t border-indigo-500">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-indigo-200">john@example.com</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats for Mobile */}
        {isMobile && (
          <div className="px-4 pb-4 space-y-3">
            <div className="bg-indigo-500 bg-opacity-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-indigo-200">Today's Progress</span>
                <span className="text-sm font-bold">75%</span>
              </div>
              <div className="w-full bg-indigo-400 bg-opacity-30 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-3/4 transition-all duration-500"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-indigo-500 bg-opacity-50 rounded-lg p-2">
                <div className="text-lg font-bold">12</div>
                <div className="text-xs text-indigo-200">Tasks</div>
              </div>
              <div className="bg-indigo-500 bg-opacity-50 rounded-lg p-2">
                <div className="text-lg font-bold">3</div>
                <div className="text-xs text-indigo-200">Meetings</div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom spacer */}
        <div className="flex-shrink-0"></div>
      </div>
    </>
  );
};

export default Sidebar;
