import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const QuickActions = () => {
  const { quickActions, addQuickAction } = useDashboard();
  const [showAll, setShowAll] = useState(false);

  const defaultActions = [
    {
      id: 'add-task',
      title: 'Add Task',
      description: 'Create a new task',
      icon: '✓',
      theme: 'blue',
      type: 'add-task'
    },
    {
      id: 'schedule-meeting',
      title: 'Schedule Meeting',
      description: 'Set up a new meeting',
      icon: '📅',
      theme: 'green',
      type: 'schedule-meeting'
    },
    {
      id: 'upload-document',
      title: 'Upload Document',
      description: 'Add a new document',
      icon: '📄',
      theme: 'purple',
      type: 'upload-document'
    }
  ];

  const allActions = [...defaultActions, ...(quickActions || [])];
  const displayActions = showAll ? allActions : allActions.slice(0, 3);

  const getThemeColor = (theme) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500',
      gray: 'bg-gray-500',
      pink: 'bg-pink-500'
    };
    return colors[theme] || colors.blue;
  };

  const handleActionClick = (action) => {
    // Handle different action types
    switch (action.type) {
      case 'add-task':
        console.log('Add task clicked');
        break;
      case 'schedule-meeting':
        console.log('Schedule meeting clicked');
        break;
      case 'upload-document':
        console.log('Upload document clicked');
        break;
      default:
        if (action.url) {
          window.open(action.url, '_blank');
        }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {allActions.length}
        </span>
      </div>

      <div className="space-y-3">
        {displayActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action)}
            className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className={`flex-shrink-0 w-10 h-10 ${getThemeColor(action.theme)} rounded-lg flex items-center justify-center text-white text-lg`}>
              {action.icon}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">{action.title}</p>
              <p className="text-xs text-gray-500">{action.description}</p>
            </div>
            <div className="flex-shrink-0">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {allActions.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showAll ? 'Show Less' : `Show ${allActions.length - 3} More`}
        </button>
      )}

      <button className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span className="text-sm font-medium">Add Custom Action</span>
      </button>
    </div>
  );
};

export default QuickActions;
