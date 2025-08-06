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
    bg-white border-r border-gray-200 flex flex-col 
    shadow-lg lg:shadow-none
    transition-all duration-300 ease-in-out
    ${isMobile 
      ? `w-72 ${isOpen ? 'translate-x-0' : '-translate-x-full'} left-0 top-0 min-h-screen` 
      : 'w-16 lg:w-20 relative translate-x-0 min-h-screen'
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
        {/* Header - Dashboard Icon */}
        <div className="flex items-center justify-center py-6 border-b border-gray-100">
          <button 
            onClick={() => handleItemClick('dashboard')}
            className={`p-3 rounded-xl transition-all duration-200 ${
              activeItem === 'dashboard' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
            title="Dashboard"
          >
            <Squares2X2Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col flex-1 py-6 space-y-2">
          {menuItems.filter(item => item.id !== 'dashboard').map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <div key={item.id} className={`${isMobile ? 'px-4' : 'flex justify-center'}`}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`${isMobile ? 'flex items-center space-x-3 w-full p-3' : 'p-3'} rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                  }`}
                  title={item.label}
                >
                  <IconComponent className="h-6 w-6" />
                  {isMobile && (
                    <span className="font-medium text-gray-700">{item.label}</span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu - Show labels */}
        {isMobile && (
          <div className="px-4 pb-4">
            <button
              onClick={onToggle}
              className="flex items-center justify-center w-full p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
