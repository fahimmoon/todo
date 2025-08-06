import React from 'react';
import WelcomeBanner from '../WelcomeBanner';
import QuickActions from '../QuickActions';
import Notifications from '../Notifications';
import Assignments from '../Assignments';
import Calendar from '../Calendar';
import TodayTasks from '../TodayTasks';
import PremiumBanner from '../PremiumBanner';
import DataResearch from '../DataResearch';
import BoardMeeting from '../BoardMeeting';

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {/* Left Column - Main Content */}
      <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
        <WelcomeBanner />
        <Notifications />
        <TodayTasks />
      </div>

      {/* Right Column - Sidebar Content */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <QuickActions />
        <Assignments />
        <Calendar />
        <PremiumBanner />
        
        {/* Bottom Row - Data Research and Board Meeting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <DataResearch />
          <BoardMeeting />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
