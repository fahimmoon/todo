import React from 'react';

const DataResearch = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-start justify-between">
                <div className="relative">
                    <svg className="w-16 h-16">
                        <circle className="text-gray-200" strokeWidth="5" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32" />
                        <circle className="text-green-500" strokeWidth="5" strokeDasharray="176" strokeDashoffset="17.6" strokeLinecap="round" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32" />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">90%</span>
                </div>
                <div>
                    <h3 className="font-bold">DATA RESEARCH</h3>
                    <p className="text-sm text-gray-500">Marketing</p>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">You worked 5.8h</p>
            <p className="text-xs text-gray-400">All assignments are done!</p>
        </div>
    );
};

export default DataResearch;
