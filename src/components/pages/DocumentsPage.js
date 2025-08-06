import React, { useState } from 'react';
import { DocumentTextIcon, FolderIcon, MagnifyingGlassIcon, CloudArrowUpIcon, EyeIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2 hours ago',
      shared: true,
      folder: 'Projects'
    },
    {
      id: 2,
      name: 'Meeting Notes.docx',
      type: 'docx',
      size: '156 KB',
      modified: '1 day ago',
      shared: false,
      folder: 'Meetings'
    },
    {
      id: 3,
      name: 'Budget Analysis.xlsx',
      type: 'xlsx',
      size: '892 KB',
      modified: '3 days ago',
      shared: true,
      folder: 'Finance'
    },
    {
      id: 4,
      name: 'Design Mockups.zip',
      type: 'zip',
      size: '15.2 MB',
      modified: '1 week ago',
      shared: false,
      folder: 'Design'
    },
    {
      id: 5,
      name: 'User Research.pdf',
      type: 'pdf',
      size: '3.1 MB',
      modified: '2 weeks ago',
      shared: true,
      folder: 'Research'
    },
    {
      id: 6,
      name: 'Technical Specs.md',
      type: 'md',
      size: '45 KB',
      modified: '1 month ago',
      shared: false,
      folder: 'Documentation'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const folders = ['all', 'Projects', 'Meetings', 'Finance', 'Design', 'Research', 'Documentation'];

  const getFileIcon = (type) => {
    const iconClass = "h-8 w-8";
    switch (type) {
      case 'pdf':
        return <DocumentTextIcon className={`${iconClass} text-red-500`} />;
      case 'docx':
        return <DocumentTextIcon className={`${iconClass} text-blue-500`} />;
      case 'xlsx':
        return <DocumentTextIcon className={`${iconClass} text-green-500`} />;
      case 'zip':
        return <FolderIcon className={`${iconClass} text-yellow-500`} />;
      case 'md':
        return <DocumentTextIcon className={`${iconClass} text-purple-500`} />;
      default:
        return <DocumentTextIcon className={`${iconClass} text-gray-500`} />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleShare = (id) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, shared: !doc.shared } : doc
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <p className="text-gray-600">Manage and organize your files</p>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
              <CloudArrowUpIcon className="h-5 w-5" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Folder Filter */}
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {folders.map(folder => (
              <option key={folder} value={folder}>
                {folder === 'all' ? 'All Folders' : folder}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid/List */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                {getFileIcon(doc.type)}
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleShare(doc.id)}
                    className={`p-1 rounded ${doc.shared ? 'text-green-600' : 'text-gray-400'} hover:bg-gray-100`}
                    title={doc.shared ? 'Shared' : 'Share'}
                  >
                    <ShareIcon className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="View">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-1 rounded text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 truncate mb-1" title={doc.name}>
                {doc.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{doc.folder}</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{doc.size}</span>
                <span>{doc.modified}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Folder</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Modified</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(doc.type)}
                        <span className="font-medium text-gray-900">{doc.name}</span>
                        {doc.shared && (
                          <ShareIcon className="h-4 w-4 text-green-500" title="Shared" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{doc.folder}</td>
                    <td className="py-3 px-4 text-gray-600">{doc.size}</td>
                    <td className="py-3 px-4 text-gray-600">{doc.modified}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600" title="View">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleShare(doc.id)}
                          className={`${doc.shared ? 'text-green-600' : 'text-gray-400'} hover:text-green-600`}
                          title="Share"
                        >
                          <ShareIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Storage Stats */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Used Storage</span>
              <span className="font-medium">2.1 GB / 10 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '21%' }}></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
            <div className="text-sm text-gray-500">Total Files</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{documents.filter(d => d.shared).length}</div>
            <div className="text-sm text-gray-500">Shared Files</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
