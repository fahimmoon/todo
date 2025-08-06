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
    <main className={`flex-1 min-h-screen bg-gray-50 transition-all duration-500 ease-in-out ${
      sidebarOpen ? 'lg:opacity-100' : 'lg:opacity-100'
    }`}>
      {/* Header with better spacing */}
      <div className="sticky top-0 z-10 bg-gray-50 px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
        <Header onSidebarToggle={onSidebarToggle} currentPage={currentPage} onNavigate={onNavigate} />
      </div>
      
      {/* Main content with optimized padding and responsive margins */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 max-w-7xl mx-auto">
        {renderPage()}
      </div>
    </main>
  );
};

export default Dashboard;
