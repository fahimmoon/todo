import React, { useState } from 'react';
import { CogIcon, BellIcon, ShieldCheckIcon, PaintBrushIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    // General Settings
    language: 'english',
    timezone: 'utc-5',
    dateFormat: 'mm/dd/yyyy',
    theme: 'light',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true,
    taskReminders: true,
    meetingAlerts: true,
    
    // Privacy Settings
    profileVisibility: 'team',
    activityTracking: true,
    dataSharing: false,
    analytics: true,
    
    // Display Settings
    compactMode: false,
    animationsEnabled: true,
    autoSave: true,
    darkMode: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        language: 'english',
        timezone: 'utc-5',
        dateFormat: 'mm/dd/yyyy',
        theme: 'light',
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        weeklyDigest: true,
        taskReminders: true,
        meetingAlerts: true,
        profileVisibility: 'team',
        activityTracking: true,
        dataSharing: false,
        analytics: true,
        compactMode: false,
        animationsEnabled: true,
        autoSave: true,
        darkMode: false
      });
    }
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{label}</div>
        {description && <div className="text-sm text-gray-500">{description}</div>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Customize your dashboard experience</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <CogIcon className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="utc-5">UTC-5 (Eastern)</option>
                <option value="utc-6">UTC-6 (Central)</option>
                <option value="utc-7">UTC-7 (Mountain)</option>
                <option value="utc-8">UTC-8 (Pacific)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BellIcon className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          
          <div className="space-y-2">
            <ToggleSwitch
              checked={settings.emailNotifications}
              onChange={(value) => handleSettingChange('emailNotifications', value)}
              label="Email Notifications"
              description="Receive notifications via email"
            />
            
            <ToggleSwitch
              checked={settings.pushNotifications}
              onChange={(value) => handleSettingChange('pushNotifications', value)}
              label="Push Notifications"
              description="Show desktop notifications"
            />
            
            <ToggleSwitch
              checked={settings.smsNotifications}
              onChange={(value) => handleSettingChange('smsNotifications', value)}
              label="SMS Notifications"
              description="Receive text message alerts"
            />
            
            <ToggleSwitch
              checked={settings.taskReminders}
              onChange={(value) => handleSettingChange('taskReminders', value)}
              label="Task Reminders"
              description="Get reminded about upcoming tasks"
            />
            
            <ToggleSwitch
              checked={settings.meetingAlerts}
              onChange={(value) => handleSettingChange('meetingAlerts', value)}
              label="Meeting Alerts"
              description="Notifications for upcoming meetings"
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="public">Public</option>
                <option value="team">Team Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <ToggleSwitch
              checked={settings.activityTracking}
              onChange={(value) => handleSettingChange('activityTracking', value)}
              label="Activity Tracking"
              description="Track your activity for insights"
            />
            
            <ToggleSwitch
              checked={settings.dataSharing}
              onChange={(value) => handleSettingChange('dataSharing', value)}
              label="Data Sharing"
              description="Share anonymized data for improvements"
            />
            
            <ToggleSwitch
              checked={settings.analytics}
              onChange={(value) => handleSettingChange('analytics', value)}
              label="Analytics"
              description="Enable usage analytics"
            />
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <PaintBrushIcon className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Display & Interface</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <ToggleSwitch
              checked={settings.compactMode}
              onChange={(value) => handleSettingChange('compactMode', value)}
              label="Compact Mode"
              description="Use smaller spacing and elements"
            />
            
            <ToggleSwitch
              checked={settings.animationsEnabled}
              onChange={(value) => handleSettingChange('animationsEnabled', value)}
              label="Animations"
              description="Enable smooth transitions and animations"
            />
            
            <ToggleSwitch
              checked={settings.autoSave}
              onChange={(value) => handleSettingChange('autoSave', value)}
              label="Auto Save"
              description="Automatically save changes"
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <GlobeAltIcon className="h-6 w-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Data Management</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📊 Export Data
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📥 Import Data
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                🗑️ Delete Account
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Integrations</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📧 Connect Email
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                📅 Sync Calendar
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                💬 Connect Slack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
