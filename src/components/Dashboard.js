import React from 'react';
import Header from './Header';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import DocumentsPage from './pages/DocumentsPage';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';

const Dashboard = ({ onSidebarToggle, currentPage, onNavigate }) => {
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
    <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      <Header onSidebarToggle={onSidebarToggle} currentPage={currentPage} onNavigate={onNavigate} />
      
      <div className="mt-6 lg:mt-8">
        {renderPage()}
      </div>
    </main>
  );
};

export default Dashboard;
