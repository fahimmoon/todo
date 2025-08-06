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
    <div className="bg-white rounded-xl shadow-sm border p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <button 
          onClick={handleAddClick}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <div 
              key={action.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={() => handleActionClick(action)}
            >
              <div className={`p-2 rounded-lg ${action.color.replace('text-', 'bg-').replace('-600', '-100')} mr-3`}>
                <IconComponent 
                  className={`h-5 w-5 ${action.color} transition-transform duration-200 ${
                    hoveredAction === action.id ? 'scale-110' : ''
                  }`} 
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm text-gray-900">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
