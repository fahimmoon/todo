import React from 'react';

const Notifications = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Notifications</h2>
        <button className="text-sm text-gray-500">Clear</button>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">Upcoming event</p>
              <p className="text-sm text-gray-500">Landing Design Meeting | Time: 30 min</p>
              <p className="text-sm text-gray-500">Sat, 10 May | 11 AM - 11:45 AM</p>
            </div>
            <button>...</button>
          </div>
        </div>
        <div className="p-4">
          <p className="font-semibold">Message | Product design</p>
          <p className="text-sm text-gray-500">Message from Ken Smith</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
