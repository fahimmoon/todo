import React, { useState } from 'react';
import { CalendarDaysIcon, ClipboardDocumentListIcon, FolderIcon, PlusIcon } from '@heroicons/react/24/outline';

const QuickActions = () => {
  const [hoveredAction, setHoveredAction] = useState(null);

  const actions = [
    {
      id: 'organize',
      icon: CalendarDaysIcon,
      title: 'Stay organized',
      description: 'A clear structure for your notes',
      color: 'text-indigo-600'
    },
    {
      id: 'sync',
      icon: ClipboardDocumentListIcon,
      title: 'Sync your notes',
      description: 'Ensure post notes over syncspace',
      color: 'text-blue-600'
    },
    {
      id: 'collaborate',
      icon: FolderIcon,
      title: 'Collaborate and share',
      description: 'Share notes with colleagues',
      color: 'text-green-600'
    }
  ];

  const handleAddClick = () => {
    alert('Add new action...');
  };

  const handleActionClick = (action) => {
    alert(`Opening ${action.title}...`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {/* Add Button */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-200 cursor-pointer group">
        <button 
          onClick={handleAddClick}
          className="text-indigo-600 group-hover:scale-110 transition-transform duration-200"
        >
          <PlusIcon className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>

      {/* Action Cards */}
      {actions.map((action) => {
        const IconComponent = action.icon;
        return (
          <div 
            key={action.id}
            className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            onClick={() => handleActionClick(action)}
          >
            <IconComponent 
              className={`h-6 w-6 sm:h-8 sm:w-8 ${action.color} mb-2 transition-colors duration-200 ${
                hoveredAction === action.id ? 'scale-110' : ''
              }`} 
            />
            <h3 className="font-bold text-sm sm:text-base mb-1">{action.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-tight">{action.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default QuickActions;
