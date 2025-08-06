import React from 'react';

const Assignments = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Assignments</h2>
        <button className="text-sm">Edit</button>
      </div>
      <div>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500">Motion design | Logo</p>
                <p className="font-bold mt-1">Design a packaging concept for a new product</p>
                <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full mt-2 inline-block">Package design</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded-full">High</span>
                <p className="text-sm text-gray-500 mt-2">Rachel Lee</p>
            </div>
        </div>
        <button className="w-full mt-4 py-2 border-dashed border-2 border-gray-300 rounded-lg text-indigo-600 font-semibold">+ Add new assignment</button>
      </div>
    </div>
  );
};

export default Assignments;
