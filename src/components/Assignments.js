import React, { useState } from 'react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      category: 'Motion design | Logo',
      title: 'Design a packaging concept for a new product',
      tag: 'Package design',
      priority: 'High',
      assignee: 'Rachel Lee',
      tagColor: 'bg-green-200 text-green-800',
      priorityColor: 'bg-red-200 text-red-800'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    category: '',
    title: '',
    tag: '',
    priority: 'Medium',
    assignee: ''
  });

  const handleEdit = () => {
    alert('Edit assignments...');
  };

  const handleAddAssignment = () => {
    if (newAssignment.title.trim()) {
      const assignment = {
        id: Date.now(),
        ...newAssignment,
        tagColor: 'bg-blue-200 text-blue-800',
        priorityColor: newAssignment.priority === 'High' 
          ? 'bg-red-200 text-red-800' 
          : newAssignment.priority === 'Low'
          ? 'bg-gray-200 text-gray-800'
          : 'bg-yellow-200 text-yellow-800'
      };
      
      setAssignments([...assignments, assignment]);
      setNewAssignment({
        category: '',
        title: '',
        tag: '',
        priority: 'Medium',
        assignee: ''
      });
      setShowAddForm(false);
    }
  };

  const handleAssignmentClick = (assignment) => {
    alert(`Opening assignment: ${assignment.title}`);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Assignments</h2>
        <button 
          onClick={handleEdit}
          className="text-sm hover:text-gray-700 transition-colors flex items-center gap-1"
        >
          <PencilIcon className="h-3 w-3" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div 
            key={assignment.id}
            className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
            onClick={() => handleAssignmentClick(assignment)}
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1">{assignment.category}</p>
                <p className="font-bold text-sm sm:text-base mb-2 leading-tight">{assignment.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full inline-block ${assignment.tagColor}`}>
                  {assignment.tag}
                </span>
              </div>
              
              <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-0">
                <span className={`text-xs px-2 py-1 rounded-full ${assignment.priorityColor}`}>
                  {assignment.priority}
                </span>
                <p className="text-xs sm:text-sm text-gray-500 mt-0 sm:mt-2">{assignment.assignee}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Assignment Form */}
        {showAddForm && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
            <input
              type="text"
              placeholder="Category"
              value={newAssignment.category}
              onChange={(e) => setNewAssignment({...newAssignment, category: e.target.value})}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <input
              type="text"
              placeholder="Assignment title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tag"
                value={newAssignment.tag}
                onChange={(e) => setNewAssignment({...newAssignment, tag: e.target.value})}
                className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <select
                value={newAssignment.priority}
                onChange={(e) => setNewAssignment({...newAssignment, priority: e.target.value})}
                className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Assignee"
              value={newAssignment.assignee}
              onChange={(e) => setNewAssignment({...newAssignment, assignee: e.target.value})}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAssignment}
                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* Add New Assignment Button */}
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full py-3 border-dashed border-2 border-gray-300 rounded-lg text-indigo-600 font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add new assignment
        </button>
      </div>
    </div>
  );
};

export default Assignments;
