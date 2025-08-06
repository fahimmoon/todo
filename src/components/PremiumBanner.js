import React from 'react';

const PremiumBanner = () => {
  return (
    <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md text-center">
      <div className="w-16 h-16 bg-indigo-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
        {/* Placeholder for gift icon */}
        <span className="text-3xl">🎁</span>
      </div>
      <h2 className="font-bold text-lg">Go premium!</h2>
      <p className="text-sm mt-2">Gain access to a range of benefits designed to enhance your user experience</p>
      <button className="mt-4 bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg">Find out more</button>
    </div>
  );
};

export default PremiumBanner;
