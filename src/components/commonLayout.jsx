import React from 'react';

const CommonLayout = ({ children }) => {
  return (
    <div className="bg-[#F4F5F6] flex-1">
      <div className="px-6 md:px-40 py-6">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout; 