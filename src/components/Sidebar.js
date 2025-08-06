import React from 'react';
import { Squares2X2Icon, UserIcon, BellIcon, DocumentTextIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="bg-indigo-600 text-white w-20 flex flex-col items-center py-4 space-y-8 rounded-r-3xl">
      <div className="p-2 bg-indigo-700 rounded-lg">
        <Squares2X2Icon className="h-8 w-8" />
      </div>
      <nav className="flex flex-col items-center space-y-6">
        <a href="#" className="p-3 bg-indigo-500 rounded-lg">
          <UserIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-3 hover:bg-indigo-500 rounded-lg">
          <BellIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-3 hover:bg-indigo-500 rounded-lg">
          <DocumentTextIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-3 hover:bg-indigo-500 rounded-lg">
          <CalendarIcon className="h-6 w-6" />
        </a>
        <a href="#" className="p-3 hover:bg-indigo-500 rounded-lg">
          <CogIcon className="h-6 w-6" />
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
