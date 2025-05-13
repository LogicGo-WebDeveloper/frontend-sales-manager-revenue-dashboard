import React from 'react';
import DeleteTransactionImage from '../assets/images/delete-transaction-image.png';
import SecondryButton from './common/secondry.button';
import PrimaryButton from './common/primary.button';
import LoadingButton from './common/loading-button';

const DeleteDrawer = ({ onClose, image, title, description, primaryButtonText, onDelete, loading }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      {/* Content */}
      <div className="text-center px-6 mt-10">
        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt={`Delete ${title}`}
            className="w-60 h-40 object-contain"
          />
        </div>

        {/* Title */}
        <div className='w-[70%] text-center mx-auto'>
          <h2 className="text-[#122751] text-[16px] font-semibold mb-2">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-[#8D94A3] text-[14px] max-w-md mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 px-6 py-4 bg-white">
        <SecondryButton
          style={{ width: "80px", height: "40px", color: "#122751", fontWeight: "600" }}
          onClick={onClose} >
          Cancel
        </SecondryButton>

        <PrimaryButton
          onClick={onDelete}
          style={{ width: "192px", height: "40px" }}
          disabled={loading}
        >
          {loading ? <LoadingButton size="small" /> : primaryButtonText}
        </PrimaryButton>

      </div>
    </div>
  );
};

export default DeleteDrawer;
