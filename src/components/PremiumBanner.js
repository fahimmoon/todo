import React, { useState } from 'react';

const PremiumBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFindOutMore = () => {
    alert('Redirecting to premium features...');
  };

  return (
    <div 
      className="bg-indigo-600 text-white p-4 sm:p-6 rounded-lg shadow-md text-center transform transition-all duration-200 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-indigo-500 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center transition-transform duration-200 ${
        isHovered ? 'scale-110' : ''
      }`}>
        {/* Placeholder for gift icon */}
        <span className="text-2xl sm:text-3xl">🎁</span>
      </div>
      
      <h2 className="font-bold text-lg mb-2">Go premium!</h2>
      <p className="text-sm mb-4 leading-relaxed">
        Gain access to a range of benefits designed to enhance your user experience
      </p>
      
      <button 
        onClick={handleFindOutMore}
        className="bg-white text-indigo-600 font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
      >
        Find out more
      </button>

      {/* Premium Features Preview */}
      <div className="mt-4 pt-4 border-t border-indigo-500 space-y-2">
        <div className="flex items-center justify-center text-xs sm:text-sm opacity-90">
          <span className="mr-2">✨</span>
          <span>Advanced Analytics</span>
        </div>
        <div className="flex items-center justify-center text-xs sm:text-sm opacity-90">
          <span className="mr-2">🚀</span>
          <span>Priority Support</span>
        </div>
        <div className="flex items-center justify-center text-xs sm:text-sm opacity-90">
          <span className="mr-2">🎨</span>
          <span>Custom Themes</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner;
