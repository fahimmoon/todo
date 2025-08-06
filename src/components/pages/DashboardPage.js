import React from 'react';
import WelcomeBanner from '../WelcomeBanner';
import QuickActions from '../QuickActions';
import Notifications from '../Notifications';
import Assignments from '../Assignments';
import Calendar from '../Calendar';
import TodayTasks from '../TodayTasks';
import DataResearch from '../DataResearch';
import BoardMeeting from '../BoardMeeting';

const DashboardPage = () => {
  return (
    <div className="w-full relative z-0 mobile-content-visible">
      {/* Welcome Banner - Full Width */}
      <div className="mb-4 sm:mb-6">
        <WelcomeBanner />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Top Row - Notifications and Quick Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
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

          {/* Bottom Row - Data Research and Assignments */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <DataResearch />
            <Assignments />
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <Calendar />
          <BoardMeeting />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
