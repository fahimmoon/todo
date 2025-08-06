import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import WelcomeBanner from '../WelcomeBanner';
import TodayTasks from '../TodayTasks';
import Assignments from '../Assignments';
import DataResearch from '../DataResearch';
import BoardMeeting from '../BoardMeeting';

// Advanced Components
import Notifications from '../advanced/Notifications';
import QuickActions from '../advanced/QuickActions';
import Calendar from '../advanced/Calendar';

// CSS Imports
import '../advanced/Notifications.css';
import '../advanced/QuickActions.css';
import '../advanced/Calendar.css';
import '../advanced/Modal.css';

const DashboardPage = () => {
  const { isModalOpen, closeModal, activeModal, addEvent, addQuickAction } = useDashboard();

  return (
    <div className="w-full relative z-0 mobile-content-visible">
      {/* Welcome Banner - Full Width */}
      <div className="mb-4 sm:mb-6">
        <WelcomeBanner />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Top Row - Notifications and Quick Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            <div className="xl:col-span-2">
              <Notifications />
            </div>
            <div className="xl:col-span-1">
              <QuickActions />
            </div>
          </div>

          {/* Today's Tasks */}
          <div>
            <TodayTasks />
          </div>

          {/* Bottom Row - Data Research and Assignments */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <DataResearch />
            <Assignments />
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <Calendar />
          <BoardMeeting />
        </div>
      </div>

      {/* Modal System */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {renderModal(activeModal, closeModal, addEvent, addQuickAction)}
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Rendering Function
const renderModal = (modalType, closeModal, addEvent, addQuickAction) => {
  switch (modalType) {
    case 'add-event':
      return <AddEventModal onClose={closeModal} onSubmit={addEvent} />;
    case 'edit-event':
      return <EditEventModal onClose={closeModal} onSubmit={addEvent} />;
    case 'custom-action':
      return <CustomActionModal onClose={closeModal} onSubmit={addQuickAction} />;
    default:
      return null;
  }
};

// Add Event Modal
const AddEventModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'meeting',
    location: ''
  });

  const eventTypes = [
    { id: 'meeting', name: 'Meeting', icon: '🤝' },
    { id: 'deadline', name: 'Deadline', icon: '⏰' },
    { id: 'reminder', name: 'Reminder', icon: '🔔' },
    { id: 'personal', name: 'Personal', icon: '👤' },
    { id: 'work', name: 'Work', icon: '💼' },
    { id: 'appointment', name: 'Appointment', icon: '📅' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.date) {
      onSubmit({
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      });
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="add-event-modal">
      <div className="modal-header">
        <h2 className="modal-title">Add New Event</h2>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Event Type</label>
            <div className="event-type-grid">
              {eventTypes.map(type => (
                <div
                  key={type.id}
                  className={`event-type-option ${formData.type === type.id ? 'selected' : ''}`}
                  onClick={() => handleChange('type', type.id)}
                >
                  <span className="event-type-icon">{type.icon}</span>
                  <span className="event-type-name">{type.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-input"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-input"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Enter location (optional)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter event description (optional)"
              rows="3"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

// Edit Event Modal (similar structure)
const EditEventModal = ({ onClose, onSubmit }) => {
  return <AddEventModal onClose={onClose} onSubmit={onSubmit} />;
};

// Custom Action Modal
const CustomActionModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    type: 'add-task',
    icon: '⚡',
    theme: 'blue',
    url: '',
    modalType: '',
    shortcut: ''
  });

  const actionTypes = [
    { id: 'add-task', name: 'Task', icon: '✓' },
    { id: 'schedule-meeting', name: 'Meeting', icon: '📅' },
    { id: 'upload-document', name: 'Document', icon: '📄' },
    { id: 'send-message', name: 'Message', icon: '💬' },
    { id: 'create-reminder', name: 'Reminder', icon: '🔔' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const themes = [
    'blue', 'green', 'purple', 'orange', 'red', 'indigo', 'gray', 'pink'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title) {
      onSubmit({
        id: Date.now(),
        ...formData,
        favorite: false,
        createdAt: new Date().toISOString()
      });
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="custom-action-modal">
      <div className="modal-header">
        <h2 className="modal-title">Add Custom Action</h2>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Action Type</label>
            <div className="action-type-grid">
              {actionTypes.map(type => (
                <div
                  key={type.id}
                  className={`action-type-option ${formData.type === type.id ? 'selected' : ''}`}
                  onClick={() => handleChange('type', type.id)}
                >
                  <span className="action-icon">{type.icon}</span>
                  <span className="action-name">{type.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter action title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-input"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter description (optional)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Icon</label>
              <input
                type="text"
                className="form-input"
                value={formData.icon}
                onChange={(e) => handleChange('icon', e.target.value)}
                placeholder="Enter emoji or symbol"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Shortcut</label>
              <input
                type="text"
                className="form-input"
                value={formData.shortcut}
                onChange={(e) => handleChange('shortcut', e.target.value)}
                placeholder="Ctrl+Alt+T"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Theme Color</label>
            <div className="color-picker-grid">
              {themes.map(theme => (
                <div
                  key={theme}
                  className={`color-option ${formData.theme === theme ? 'selected' : ''}`}
                  style={{ 
                    backgroundColor: getThemeColor(theme)
                  }}
                  onClick={() => handleChange('theme', theme)}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">External URL (optional)</label>
            <input
              type="url"
              className="form-input"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Add Action
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper function for theme colors
const getThemeColor = (theme) => {
  const colors = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f97316',
    red: '#ef4444',
    indigo: '#6366f1',
    gray: '#6b7280',
    pink: '#ec4899'
  };
  return colors[theme] || colors.blue;
};

export default DashboardPage;
