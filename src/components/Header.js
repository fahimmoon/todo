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
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-4">
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        <button className="text-gray-900 font-bold border-b-2 border-indigo-600 pb-2">Dashboard</button>
        <button className="text-gray-500 hover:text-gray-900 transition-colors">Workflows</button>
        <button className="text-gray-500 hover:text-gray-900 transition-colors">Integrations</button>
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden flex items-center justify-between w-full min-h-[44px]">
        <div className="flex items-center space-x-3">
          {/* Enhanced Sidebar Toggle Button */}
          <button 
            onClick={onSidebarToggle}
            data-sidebar-trigger
            className="p-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 min-w-[48px] min-h-[48px] flex items-center justify-center border border-gray-200 hover:border-indigo-200 shadow-sm"
            aria-label="Toggle sidebar"
          >
            <Bars3Icon className="h-6 w-6 stroke-2" />
          </button>
          
          {/* Page Title with Dashboard Link */}
          {currentPage === 'dashboard' ? (
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">{getPageTitle(currentPage)}</h1>
          ) : (
            <div className="flex items-center space-x-2 min-w-0">
              <button 
                onClick={goToDashboard}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm whitespace-nowrap"
                title="Go back to Dashboard"
              >
                ← Dashboard
              </button>
              <span className="text-gray-400">/</span>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">{getPageTitle(currentPage)}</h1>
            </div>
          )}
        </div>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <nav className="lg:hidden flex flex-col space-y-2 w-full bg-white border rounded-lg p-3 shadow-lg">
          <button className={`text-left py-2 px-3 rounded ${currentPage === 'dashboard' ? 'text-gray-900 font-bold bg-indigo-50 border-l-4 border-indigo-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors'}`}>Dashboard</button>
          <button className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors text-left py-2 px-3 rounded">Workflows</button>
          <button className="text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors text-left py-2 px-3 rounded">Integrations</button>
        </nav>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
        {/* Search Bar */}
        <div className="relative flex-1 sm:flex-none">
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search or type command" 
            className="w-full sm:w-64 pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all text-sm" 
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="flex items-center bg-white border rounded-lg p-1">
            <button 
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-md transition-colors ${!isDarkMode ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
            >
              <SunIcon className="h-4 w-4" />
            </button>
            <button 
              onClick={toggleDarkMode}
              className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'bg-indigo-600 text-white' : 'text-gray-500'}`}
            >
              <MoonIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Export and Add Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={handleExportData}
              className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <span className="hidden sm:inline">Export data</span>
              <span className="sm:hidden">Export</span>
            </button>
            <button 
              onClick={handleAddBoard}
              className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
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
