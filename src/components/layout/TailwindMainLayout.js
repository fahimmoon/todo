import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import TailwindSidebar from './TailwindSidebar';
import TailwindDashboard from './TailwindDashboard';

const TailwindMainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Default collapsed
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, always show collapsed sidebar
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <TailwindSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <main className={`transition-all duration-300 ${
        isMobile 
          ? 'ml-0' // Full width on mobile
          : isSidebarCollapsed 
            ? 'ml-16' // Small margin for collapsed sidebar on desktop
            : 'ml-64' // Make room for expanded sidebar on desktop
      }`}>
        {/* Toggle button for when sidebar is completely hidden on mobile */}
        {isMobile && isSidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-40 p-3 bg-gray-900 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
            aria-label="Open sidebar"
          >
            <FiMenu size={20} />
          </button>
        )}
        
        <TailwindDashboard
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isSidebarCollapsed={isSidebarCollapsed}
          onSidebarToggle={toggleSidebar}
        />
      </main>
    </div>
  );
};

export default TailwindMainLayout;
