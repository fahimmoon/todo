import React from 'react';
import Header from './Header';
import WelcomeBanner from './WelcomeBanner';
import QuickActions from './QuickActions';
import Notifications from './Notifications';
import Assignments from './Assignments';
import Calendar from './Calendar';
import TodayTasks from './TodayTasks';
import PremiumBanner from './PremiumBanner';
import DataResearch from './DataResearch';
import BoardMeeting from './BoardMeeting';

const Dashboard = () => {
  return (
    <main className="flex-1 p-8">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <WelcomeBanner />
          <Notifications />
          <TodayTasks />
        </div>
        <div className="space-y-8">
          <QuickActions />
          <Assignments />
          <Calendar />
          <PremiumBanner />
          <div className="grid grid-cols-2 gap-8">
            <DataResearch />
            <BoardMeeting />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
