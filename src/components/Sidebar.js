import React, { useState, useEffect } from 'react';
import { 
  Squares2X2Icon, 
  UserIcon, 
  BellIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  CogIcon, 
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const Sidebar = ({ isOpen, onToggle, currentPage, onNavigate }) => {
  const [activeItem, setActiveItem] = useState(currentPage || 'dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Update active item when currentPage changes
  useEffect(() => {
    setActiveItem(currentPage || 'dashboard');
  }, [currentPage]);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Auto-collapse on medium screens for better space usage
      if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setIsCollapsed(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Enhanced click outside handler with body scroll management
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && !event.target.closest('.sidebar-container') && !event.target.closest('[data-sidebar-trigger]')) {
        onToggle();
      }
    };

    if (isOpen && isMobile) {
      // Prevent body scroll when sidebar is open
      document.body.classList.add('sidebar-open');
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.body.classList.remove('sidebar-open');
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isOpen, isMobile, onToggle]);

  const menuItems = [
    { id: 'dashboard', icon: Squares2X2Icon, label: 'Dashboard', gradient: 'from-blue-500 to-blue-600' },
    { id: 'profile', icon: UserIcon, label: 'Profile', gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'notifications', icon: BellIcon, label: 'Notifications', gradient: 'from-amber-500 to-orange-500' },
    { id: 'documents', icon: DocumentTextIcon, label: 'Documents', gradient: 'from-purple-500 to-purple-600' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar', gradient: 'from-rose-500 to-rose-600' },
    { id: 'settings', icon: CogIcon, label: 'Settings', gradient: 'from-slate-500 to-slate-600' }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    onNavigate(itemId);
    // Smooth close with feedback on mobile
    if (isMobile && isOpen) {
      setTimeout(() => onToggle(), 150);
    }
  };

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Sidebar classes with improved responsiveness and proper positioning
  const sidebarClasses = `
    sidebar-container transition-all duration-300 ease-in-out
    bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
    flex flex-col shadow-xl lg:shadow-md overflow-hidden
    ${isMobile 
      ? `fixed z-[70] top-0 h-screen w-80 max-w-[90vw] ${isOpen ? 'open' : 'closed'}` 
      : `relative z-auto min-h-screen ${isCollapsed ? 'w-16' : 'w-64'}`
    }
  `;

  return (
    <>
      {/* Mobile Overlay - Only show when sidebar is open on mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden 
            transition-all duration-300 animate-in fade-in"
          onClick={onToggle}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar Container */}
      <div className={sidebarClasses}>
        {/* Header Section */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Squares2X2Icon className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  Todo Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Task Management
                </p>
              </div>
            </div>
          )}
          
          {/* Toggle/Close Button */}
          {isMobile ? (
            <button
              onClick={onToggle}
              className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
                hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={toggleCollapse}
              className={`flex-shrink-0 p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
                hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200 ${
                isCollapsed ? 'mx-auto' : ''
              }`}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Bars3Icon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-xl
                    transition-all duration-200 group relative overflow-hidden ${
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg transform scale-[1.02]` 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title={item.label}
                >
                  {/* Active item background effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50"></div>
                  )}
                  
                  {/* Icon */}
                  <div className="flex-shrink-0 relative z-10">
                    <IconComponent className={`h-5 w-5 transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`} />
                  </div>
                  
                  {/* Label - Hidden when collapsed on desktop */}
                  {(!isCollapsed || isMobile) && (
                    <span className="font-medium truncate relative z-10 flex-1">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Active indicator for collapsed state */}
                  {isActive && isCollapsed && !isMobile && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
                  )}
                  
                  {/* Desktop tooltip for collapsed state */}
                  {isCollapsed && !isMobile && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50
                      shadow-lg border border-gray-600">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {(!isCollapsed || isMobile) ? (
            <div className="flex items-center space-x-3 px-2 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  James Wilson
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Product Manager
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center
                hover:scale-105 transition-transform duration-200 cursor-pointer shadow-lg">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
