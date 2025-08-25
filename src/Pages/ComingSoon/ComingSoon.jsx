import React from 'react';
import { FaClock } from 'react-icons/fa';

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-100 text-center my-16">
      <div className="p-8 bg-primary rounded-box shadow-lg max-w-md">
        <FaClock className="text-5xl text-warning mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-secondary mb-2">Coming Soon!</h1>
        <p className="text-base-content">
          We are working hard to bring you this feature. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
