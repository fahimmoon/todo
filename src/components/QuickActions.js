import React from 'react';
import { CalendarDaysIcon, ClipboardDocumentListIcon, FolderIcon, PlusIcon } from '@heroicons/react/24/outline';

const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
            <button className="text-indigo-600">
                <PlusIcon className="h-8 w-8" />
            </button>
        </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <CalendarDaysIcon className="h-8 w-8 text-indigo-600 mb-2" />
        <h3 className="font-bold">Stay organized</h3>
        <p className="text-sm text-gray-500">A clear structure for your notes</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-600 mb-2" />
        <h3 className="font-bold">Sync your notes</h3>
        <p className="text-sm text-gray-500">Ensure post notes over syncspace</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <FolderIcon className="h-8 w-8 text-indigo-600 mb-2" />
        <h3 className="font-bold">Collaborate and share</h3>
        <p className="text-sm text-gray-500">Share notes with colleagues</p>
      </div>
    </div>
  );
};

export default QuickActions;
