import React from 'react';
import RevenueIcon from '../../assets/images/auth-icon.png';

const Loader = ({ size = 'medium', className = '', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-18 h-18',
    medium: 'w-20 h-20',
    large: 'w-24 h-24',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50'
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`} style={fullScreen ? { top: '64px' } : {}}>
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer spinner - clockwise */}
        <div className="absolute inset-0 border-4 border-[#2363E3] border-t-transparent rounded-full animate-spin"></div>

        {/* Inner spinner - counter-clockwise */}
        <div className="absolute inset-[20%] border-2 border-[#2363E3] border-b-transparent rounded-full animate-spin"></div>

        {/* Center "R" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#122751] font-bold text-xl">
            <img src={RevenueIcon} alt={RevenueIcon} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
