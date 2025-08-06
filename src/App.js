import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { DashboardProvider } from './context/DashboardContext';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false); // Close mobile sidebar on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Desktop Sidebar - Part of flex layout */}
        {!isMobile && (
          <Sidebar 
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        )}

        {/* Main content - Ensure it's always visible on mobile */}
        <div className={`flex-1 min-w-0 relative ${isMobile ? 'w-full overflow-auto' : ''}`}>
          <Dashboard 
            onSidebarToggle={toggleSidebar}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            sidebarOpen={isSidebarOpen}
          />
        </div>
        
        {/* Mobile Sidebar - Fixed overlay, not part of flex layout */}
        {isMobile && (
          <Sidebar 
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
            currentPage={currentPage}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </DashboardProvider>
  );
}

export default App;
