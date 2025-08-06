import React from 'react';

const WelcomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 lg:p-6 border border-blue-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
            Hi, James! 👋
          </h1>
          <p className="text-base text-gray-600 mb-1">What are your plans for today?</p>
          <p className="text-sm text-gray-500 max-w-2xl">
            This platform is designed to revolutionize the way you organize and access your notes
          </p>
        </div>
        
        <div className="mt-3 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Create New Task
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
