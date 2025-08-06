import React, { useState } from 'react';
import { 
  FiHome, 
  FiUser, 
  FiBell, 
  FiFileText, 
  FiCalendar, 
  FiSettings,
  FiMenu,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const TailwindSidebar = ({ 
  isCollapsed, 
  onToggle, 
  currentPage, 
  onNavigate, 
  isMobile 
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'documents', label: 'Documents', icon: FiFileText },
    { id: 'calendar', label: 'Calendar', icon: FiCalendar },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const handleItemClick = (itemId) => {
    onNavigate(itemId);
    if (isMobile) {
      onToggle();
    }
  };

  const handleMouseEnter = (itemId) => {
    if (isCollapsed) {
      setHoveredItem(itemId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <aside className={`fixed left-0 top-0 h-full bg-gray-900 text-white z-30 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${isMobile && isCollapsed ? '-translate-x-full' : ''}`}>
        {/* Header with toggle button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <span className="font-semibold text-lg">TaskFlow</span>
            </div>
          )}
          
          <button 
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={onToggle}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id} className="relative">
                  <button
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    onClick={() => handleItemClick(item.id)}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    aria-label={item.label}
                  >
                    <div className="flex-shrink-0">
                      <IconComponent size={20} />
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium truncate">{item.label}</span>
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && hoveredItem === item.id && (
                    <div className="absolute left-full top-0 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-50 whitespace-nowrap">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45" />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" 
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">Admin</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face&auto=format" 
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default TailwindSidebar;
