import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col sm:flex-row">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
