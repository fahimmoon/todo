import React from 'react';
import { MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <nav className="flex items-center space-x-8">
        <a href="#" className="text-gray-900 font-bold border-b-2 border-indigo-600 pb-2">Dashboard</a>
        <a href="#" className="text-gray-500 hover:text-gray-900">Workflows</a>
        <a href="#" className="text-gray-500 hover:text-gray-900">Integrations</a>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search or type command" className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
        </div>
        <div className="flex items-center bg-white border rounded-lg p-1">
          <button className="p-2 bg-indigo-600 text-white rounded-lg">
            <SunIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 rounded-lg">
            <MoonIcon className="h-5 w-5" />
          </button>
        </div>
        <button className="px-4 py-2 border rounded-lg">Export data</button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Add new board</button>
      </div>
    </header>
  );
};

export default Header;
