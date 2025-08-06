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
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-900">Assignments</h2>
        <button 
          onClick={handleEdit}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
        >
          <PencilIcon className="h-4 w-4" />
          Edit
        </button>
      </div>

      <div className="space-y-3">
        {assignments.map((assignment) => (
          <div 
            key={assignment.id}
            className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors border border-gray-100 hover:border-gray-200"
            onClick={() => handleAssignmentClick(assignment)}
          >
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">{assignment.category}</p>
                <p className="font-medium text-sm leading-tight text-gray-900 mb-2">{assignment.title}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${assignment.tagColor}`}>
                  {assignment.tag}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${assignment.priorityColor}`}>
                    {assignment.priority}
                  </span>
                  <p className="text-xs text-gray-500">{assignment.assignee}</p>
                </div>
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
          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-600 font-medium hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Add new assignment
        </button>
      </div>
    </div>
  );
};

export default Assignments;
