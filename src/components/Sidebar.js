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
    bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 
    border-r border-purple-500/20 flex flex-col 
    shadow-2xl shadow-purple-500/10 lg:shadow-none
    transition-all duration-500 ease-in-out backdrop-blur-xl
    ${isMobile 
      ? `w-80 ${isOpen ? 'translate-x-0' : '-translate-x-full'} left-0 top-0 min-h-screen` 
      : 'w-16 hover:w-20 relative translate-x-0 min-h-screen group'
    }
    before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-purple-600/10 before:to-blue-600/10 before:opacity-0 
    before:transition-opacity before:duration-500 hover:before:opacity-100
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 -right-5 w-16 h-16 bg-blue-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 -left-5 w-12 h-12 bg-pink-500/20 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>

        {/* Header - Dashboard Icon */}
        <div className="relative flex items-center justify-center py-6 border-b border-white/10">
          <button 
            onClick={() => handleItemClick('dashboard')}
            className={`relative p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 ${
              activeItem === 'dashboard' 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30 animate-pulse' 
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            } group`}
            title="Dashboard"
          >
            <Squares2X2Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" />
            {activeItem === 'dashboard' && (
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            )}
          </button>
          {isMobile && (
            <div className="absolute right-4">
              <button
                onClick={onToggle}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="relative flex flex-col flex-1 py-6 space-y-3">
          {menuItems.filter(item => item.id !== 'dashboard').map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <div 
                key={item.id} 
                className={`${isMobile ? 'px-6' : 'flex justify-center'} transform transition-all duration-300`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`relative ${isMobile ? 'flex items-center space-x-4 w-full p-4' : 'p-3'} 
                    rounded-2xl transition-all duration-300 group transform hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/5'
                  }`}
                  title={item.label}
                >
                  {/* Glowing background for active item */}
                  {isActive && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                  )}
                  
                  {/* Icon with animation */}
                  <div className="relative">
                    <IconComponent className={`h-6 w-6 transition-all duration-300 ${
                      isActive ? 'animate-bounce' : 'group-hover:rotate-12 group-hover:scale-110'
                    }`} />
                  </div>
                  
                  {/* Mobile label */}
                  {isMobile && (
                    <span className="font-medium text-lg tracking-wide">{item.label}</span>
                  )}
                  
                  {/* Desktop tooltip */}
                  {!isMobile && (
                    <div className="absolute left-full ml-4 px-4 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-xl 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 
                      transform translate-x-2 group-hover:translate-x-0 border border-white/10">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900/90 rotate-45 border-l border-b border-white/10"></div>
                    </div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full opacity-80 animate-pulse"></div>
                  )}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Bottom section - User profile or branding */}
        <div className="relative px-6 pb-6">
          {isMobile ? (
            <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">James Wilson</p>
                <p className="text-xs text-gray-300">Product Manager</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center
                transform transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg shadow-purple-500/30">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>
    </>
  );
};

export default Sidebar;
