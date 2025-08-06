import React from 'react';

const BoardMeeting = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Board meeting</h3>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Meeting with John Smith, 4th floor, room 198</p>
                <button className="text-sm">Edit</button>
            </div>
            <div className="flex space-x-2">
                <button className="flex-1 py-2 border rounded-lg text-sm">Reschedule</button>
                <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm">Accept invite</button>
            </div>
        </div>
    );
};

export default BoardMeeting;
