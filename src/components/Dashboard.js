import React from 'react';
import Header from './Header';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import DocumentsPage from './pages/DocumentsPage';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';

const Dashboard = ({ onSidebarToggle, currentPage, onNavigate, sidebarOpen }) => {
  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <main className="flex-1 min-h-screen bg-gray-50 transition-all duration-300 ease-in-out relative z-0">
      {/* Header with responsive positioning */}
      <div className="sticky top-0 z-[60] bg-gray-50/95 backdrop-blur-sm border-b border-gray-200">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <Header onSidebarToggle={onSidebarToggle} currentPage={currentPage} onNavigate={onNavigate} />
        </div>
      </div>
      
      {/* Floating Sidebar Toggle for Mobile - Always Visible */}
      <button
        onClick={onSidebarToggle}
        className="lg:hidden fixed bottom-6 left-6 z-[80] bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Toggle sidebar"
        title="Open Menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Main content with guaranteed mobile visibility */}
      <div className="relative z-10 px-3 sm:px-4 lg:px-6 py-4 sm:py-6 mobile-main-content mobile-header-spacing mobile-force-visible mobile-sidebar-spacing">
        <div className="max-w-7xl mx-auto w-full mobile-force-visible">
          {renderPage()}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
