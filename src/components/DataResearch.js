import React, { useState, useEffect } from 'react';

const DataResearch = () => {
    const [progress, setProgress] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const targetProgress = 90;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(true);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= targetProgress) {
                        clearInterval(interval);
                        return targetProgress;
                    }
                    return prev + 2;
                });
            }, 30);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const circumference = 2 * Math.PI * 28;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const handleClick = () => {
        alert('Opening Data Research details...');
    };

    return (
        <div 
            className="bg-white p-3 sm:p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            onClick={handleClick}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="relative">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90">
                        <circle 
                            className="text-gray-200" 
                            strokeWidth="4" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="28" 
                            cx="50%" 
                            cy="50%" 
                        />
                        <circle 
                            className="text-green-500 transition-all duration-1000 ease-out" 
                            strokeWidth="4" 
                            strokeDasharray={circumference}
                            strokeDashoffset={isAnimating ? strokeDashoffset : circumference}
                            strokeLinecap="round" 
                            stroke="currentColor" 
                            fill="transparent" 
                            r="28" 
                            cx="50%" 
                            cy="50%" 
                        />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm sm:text-base">
                        {progress}%
                    </span>
                </div>
                
                <div className="text-right">
                    <h3 className="font-bold text-xs sm:text-sm text-gray-900">DATA RESEARCH</h3>
                    <p className="text-xs text-gray-500">Marketing</p>
                </div>
            </div>
            
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">You worked 5.8h</p>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                </div>
                <p className="text-xs text-gray-400">All assignments are done!</p>
                
                {/* Progress details */}
                <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Tasks completed:</span>
                        <span className="font-medium">18/20</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Quality score:</span>
                        <span className="font-medium text-green-600">Excellent</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataResearch;
