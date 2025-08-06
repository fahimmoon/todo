import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar} 
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      <div className="flex-1">
        <Dashboard 
          onSidebarToggle={toggleSidebar} 
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
