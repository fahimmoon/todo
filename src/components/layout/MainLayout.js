import React, { useState, useEffect } from 'react';
import OptimizedSidebar from './OptimizedSidebar';
import OptimizedDashboard from './OptimizedDashboard';
import styles from './MainLayout.module.css';

const MainLayout = () => {
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
    <div className={styles.mainLayout}>
      {/* Sidebar */}
      <OptimizedSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <main className={`${styles.mainContent} ${isSidebarCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}`}>
        <OptimizedDashboard
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isSidebarCollapsed={isSidebarCollapsed}
          onSidebarToggle={toggleSidebar}
        />
      </main>
    </div>
  );
};

export default MainLayout;
