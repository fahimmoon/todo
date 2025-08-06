import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { useDashboard } from '../../context/DashboardContext';

// Import existing components
import WelcomeBanner from '../WelcomeBanner';
import TodayTasks from '../TodayTasks';
import Assignments from '../Assignments';
import DataResearch from '../DataResearch';
import BoardMeeting from '../BoardMeeting';

// Import advanced components
import Notifications from '../advanced/Notifications';
import QuickActions from '../advanced/QuickActions';
import Calendar from '../advanced/Calendar';

// Import page components
import ProfilePage from '../pages/ProfilePage';
import NotificationsPage from '../pages/NotificationsPage';
import DocumentsPage from '../pages/DocumentsPage';
import CalendarPage from '../pages/CalendarPage';
import SettingsPage from '../pages/SettingsPage';

const TailwindDashboard = ({ 
  currentPage, 
  onNavigate, 
  isSidebarCollapsed, 
  onSidebarToggle 
}) => {
  const { isModalOpen, closeModal, activeModal } = useDashboard();

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
        return renderDashboardPage();
    }
  };

  const renderDashboardPage = () => (
    <div className="max-w-7xl mx-auto p-3 space-y-3">
      {/* Welcome Section */}
      <section className="w-full">
        <WelcomeBanner />
      </section>

      {/* Main Grid Layout - Controlled Width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Quick Actions */}
        <div className="col-span-1">
          <QuickActions />
        </div>

        {/* Today Tasks */}
        <div className="col-span-1">
          <TodayTasks />
        </div>

        {/* Notifications */}
        <div className="col-span-1">
          <Notifications />
        </div>

        {/* Data Research */}
        <div className="col-span-1">
          <DataResearch />
        </div>

        {/* Calendar */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Calendar />
        </div>

        {/* Assignments */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Assignments />
        </div>

        {/* Board Meeting */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <BoardMeeting />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - Compact */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <button 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onSidebarToggle}
            aria-label="Toggle menu"
          >
            <FiMenu size={18} />
          </button>
          <h1 className="text-base font-semibold text-gray-900">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </h1>
          <div className="w-8" /> {/* Spacer */}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {renderPage()}
      </div>

      {/* Modal System */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Modal</h3>
                <button 
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600">Modal content goes here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TailwindDashboard;
