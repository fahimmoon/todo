import React, { useState } from 'react';
import { PencilIcon, CalendarIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline';

const BoardMeeting = () => {
    const [meetingStatus, setMeetingStatus] = useState('pending'); // pending, accepted, rescheduled

    const handleEdit = () => {
        alert('Edit meeting details...');
    };

    const handleReschedule = () => {
        setMeetingStatus('rescheduled');
        alert('Meeting rescheduled successfully!');
    };

    const handleAcceptInvite = () => {
        setMeetingStatus('accepted');
        alert('Meeting invite accepted!');
    };

    const getStatusColor = () => {
        switch (meetingStatus) {
            case 'accepted':
                return 'border-green-500 bg-green-50';
            case 'rescheduled':
                return 'border-yellow-500 bg-yellow-50';
            default:
                return 'border-gray-200 bg-white';
        }
    };

    const getStatusText = () => {
        switch (meetingStatus) {
            case 'accepted':
                return 'Accepted';
            case 'rescheduled':
                return 'Rescheduled';
            default:
                return 'Pending Response';
        }
    };

    return (
        <div className={`p-3 sm:p-4 rounded-lg shadow-md border-l-4 transition-all duration-200 hover:shadow-lg ${getStatusColor()}`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="font-bold text-sm sm:text-lg mb-1">Board meeting</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>{getStatusText()}</span>
                    </div>
                </div>
                <button 
                    onClick={handleEdit}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
                >
                    <PencilIcon className="h-3 w-3" />
                    Edit
                </button>
            </div>

            {/* Meeting Details */}
            <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                    <UserIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-600">Meeting with John Smith</p>
                </div>
                <div className="flex items-start gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-600">4th floor, room 198</p>
                </div>
                <div className="flex items-start gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-600">Today, 2:00 PM - 3:00 PM</p>
                </div>
            </div>

            {/* Meeting Agenda Preview */}
            <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 mb-4">
                <p className="font-medium mb-1">Agenda:</p>
                <ul className="space-y-0.5 list-disc list-inside">
                    <li>Q3 Performance Review</li>
                    <li>Budget Planning</li>
                    <li>New Project Proposals</li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button 
                    onClick={handleReschedule}
                    disabled={meetingStatus === 'rescheduled'}
                    className="flex-1 py-2 border rounded-lg text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    {meetingStatus === 'rescheduled' ? 'Rescheduled' : 'Reschedule'}
                </button>
                <button 
                    onClick={handleAcceptInvite}
                    disabled={meetingStatus === 'accepted'}
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm transition-colors disabled:bg-green-600 disabled:cursor-not-allowed hover:bg-indigo-700"
                >
                    {meetingStatus === 'accepted' ? '✓ Accepted' : 'Accept invite'}
                </button>
            </div>

            {/* Meeting Link */}
            {meetingStatus === 'accepted' && (
                <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                    <p className="text-xs text-blue-700 font-medium">Meeting link will be available 15 minutes before start time</p>
                </div>
            )}
        </div>
    );
};

export default BoardMeeting;
