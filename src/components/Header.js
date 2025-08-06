import React, { useState } from 'react';
import { MagnifyingGlassIcon, SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header = ({ onSidebarToggle, currentPage, onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const getPageTitle = (page) => {
    switch (page) {
      case 'profile':
        return 'Profile';
      case 'notifications':
        return 'Notifications';
      case 'documents':
        return 'Documents';
      case 'calendar':
        return 'Calendar';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const goToDashboard = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleExportData = () => {
    alert('Exporting data...');
  };

  const handleAddBoard = () => {
    alert('Adding new board...');
  };

  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        <button className="text-gray-900 font-bold border-b-2 border-indigo-600 pb-2">Dashboard</button>
        <button className="text-gray-500 hover:text-gray-900 transition-colors">Workflows</button>
        <button className="text-gray-500 hover:text-gray-900 transition-colors">Integrations</button>
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          {/* Sidebar Toggle Button */}
          <button 
            onClick={onSidebarToggle}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          {/* Page Title with Dashboard Link */}
          {currentPage === 'dashboard' ? (
            <h1 className="text-xl font-bold text-gray-900">{getPageTitle(currentPage)}</h1>
          ) : (
            <div className="flex items-center space-x-2">
              <button 
                onClick={goToDashboard}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                title="Go back to Dashboard"
              >
                ← Dashboard
              </button>
              <span className="text-gray-400">/</span>
              <h1 className="text-xl font-bold text-gray-900">{getPageTitle(currentPage)}</h1>
            </div>
          )}
        </div>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <nav className="lg:hidden flex flex-col space-y-2 w-full bg-white border rounded-lg p-4">
          <button className={`text-left pb-2 ${currentPage === 'dashboard' ? 'text-gray-900 font-bold border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-900 transition-colors'}`}>Dashboard</button>
          <button className="text-gray-500 hover:text-gray-900 transition-colors text-left">Workflows</button>
          <button className="text-gray-500 hover:text-gray-900 transition-colors text-left">Integrations</button>
        </nav>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full lg:w-auto">
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search or type command" 
            className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all" 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          <div className="flex items-center bg-white border rounded-lg p-1">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${!isDarkMode ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
            >
              <SunIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Export and Add Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={handleExportData}
              className="px-3 sm:px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <span className="hidden sm:inline">Export data</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button 
              onClick={handleAddBoard}
              className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              <span className="hidden sm:inline">Add new board</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
