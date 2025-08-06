import React from 'react';

const TaskItem = ({ title, date, duration, progress }) => (
    <div className="grid grid-cols-5 items-center">
        <p className="col-span-2 font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{duration}</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 col-span-1">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-500 text-right">{date}</p>
    </div>
);

const TodayTasks = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Today tasks</h2>
        <div>
          <button className="text-sm text-gray-500 mr-2">Edit</button>
          <button className="text-sm text-gray-500">Share</button>
        </div>
      </div>
      <div className="space-y-6">
        <TaskItem title="Conduct research" date="4 - 16" duration="02h 45m" progress={90} />
        <TaskItem title="Schedule a meeting" date="4 - 3 June" duration="06h 55m" progress={50} />
        <TaskItem title="Send out reminders" date="16 - 3 June" duration="01h 30m" progress={30} />
      </div>
    </div>
  );
};

export default TodayTasks;
