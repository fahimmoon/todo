import React from 'react';

const Calendar = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">May 2021</h2>
        <div>
          <button>&lt;</button>
          <button>&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-sm text-gray-500 mb-4">
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>
      <div className="grid grid-cols-7 text-center text-sm">
        {/* Simplified calendar dates */}
        <span className="py-1">16</span><span className="py-1">17</span><span className="py-1">18</span><span className="py-1 bg-indigo-600 text-white rounded-full">19</span><span className="py-1">20</span>
      </div>
      <div className="mt-4 space-y-4">
        <div>
            <p className="text-xs text-gray-400">04:30-05:00 PM</p>
            <p className="font-semibold">Team meeting</p>
        </div>
        <div>
            <p className="text-xs text-gray-400">11:30-12:30 PM</p>
            <p className="font-semibold">Meeting with new client</p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
