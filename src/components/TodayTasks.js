import React, { useState } from 'react';
import { PencilIcon, ShareIcon, CheckIcon } from '@heroicons/react/24/outline';

const TaskItem = ({ task, onTaskUpdate, onTaskComplete }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
    onTaskComplete(task.id, !isCompleted);
  };

  return (
    <div className={`grid grid-cols-12 sm:grid-cols-5 items-center gap-2 sm:gap-4 p-3 rounded-lg transition-all duration-200 ${
      isCompleted ? 'bg-green-50 opacity-75' : 'hover:bg-gray-50'
    }`}>
      {/* Task Completion Button */}
      <div className="col-span-1 sm:col-span-1">
        <button
          onClick={handleComplete}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isCompleted 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-indigo-500'
          }`}
        >
          {isCompleted && <CheckIcon className="h-3 w-3" />}
        </button>
      </div>

      {/* Task Title */}
      <div className="col-span-6 sm:col-span-2">
        <p className={`font-semibold text-sm sm:text-base ${
          isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
        }`}>
          {task.title}
        </p>
      </div>

      {/* Duration */}
      <div className="col-span-2 sm:col-span-1">
        <p className="text-xs sm:text-sm text-gray-500">{task.duration}</p>
      </div>

      {/* Progress Bar */}
      <div className="col-span-2 sm:col-span-1">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-green-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${isCompleted ? 100 : task.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Date */}
      <div className="col-span-1 sm:col-span-1 text-right">
        <p className="text-xs sm:text-sm text-gray-500">{task.date}</p>
      </div>
    </div>
  );
};

const TodayTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Conduct research', date: '4 - 16', duration: '02h 45m', progress: 90, completed: false },
    { id: 2, title: 'Schedule a meeting', date: '4 - 3 June', duration: '06h 55m', progress: 50, completed: false },
    { id: 3, title: 'Send out reminders', date: '16 - 3 June', duration: '01h 30m', progress: 30, completed: false }
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  const handleTaskComplete = (taskId, completed) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed, progress: completed ? 100 : task.progress } : task
    ));
  };

  const handleEdit = () => {
    alert('Edit tasks...');
  };

  const handleShare = () => {
    alert('Share tasks...');
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const completionRate = Math.round((completedTasks.length / tasks.length) * 100);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 sm:mb-6">
        <div>
          <h2 className="font-bold text-lg mb-1">Today tasks</h2>
          <p className="text-sm text-gray-500">{completionRate}% completed ({completedTasks.length}/{tasks.length})</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 mr-2 transition-colors"
          >
            {showCompleted ? 'Hide' : 'Show'} completed
          </button>
          <button 
            onClick={handleEdit}
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 mr-2 transition-colors flex items-center gap-1"
          >
            <PencilIcon className="h-3 w-3" />
            Edit
          </button>
          <button 
            onClick={handleShare}
            className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            <ShareIcon className="h-3 w-3" />
            Share
          </button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Show pending tasks first */}
        {pendingTasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onTaskComplete={handleTaskComplete}
          />
        ))}

        {/* Show completed tasks if enabled */}
        {showCompleted && completedTasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onTaskComplete={handleTaskComplete}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No tasks for today</p>
        </div>
      )}
    </div>
  );
};

export default TodayTasks;
