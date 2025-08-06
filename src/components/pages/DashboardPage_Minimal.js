import React from 'react';
import WelcomeBanner from '../WelcomeBanner';
import QuickActions from '../QuickActions';
import Notifications from '../Notifications';
import Calendar from '../Calendar';
import TodayTasks from '../TodayTasks';

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Banner - Full Width */}
      <div className="mb-6 lg:mb-8">
        <WelcomeBanner />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-4 lg:space-y-6">
          {/* Top Row - Notifications and Quick Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
            <div className="xl:col-span-2">
              <Notifications />
            </div>
            <div className="xl:col-span-1">
              <QuickActions />
            </div>
          </div>

          {/* Today's Tasks */}
          <div>
            <TodayTasks />
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="lg:col-span-4 space-y-4 lg:space-y-6">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
