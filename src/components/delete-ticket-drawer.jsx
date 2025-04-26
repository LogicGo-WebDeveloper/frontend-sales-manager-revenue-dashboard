import React from 'react';
import { Button } from 'antd';
import DeleteTicketImage from '../assets/images/delete-ticket-image.png';
import SecondryButton from './common/secondry.button';
import PrimaryButton from './common/primary.button';
import { WiDayCloudy } from 'react-icons/wi';


const DeleteTicketDrawer = ({ onClose, onDelete , image , SecondryButtonText , PrimaryButtonText }) => {
    return (
        <div className="flex flex-col h-full justify-between">
            {/* Content */}
            <div className="text-center px-6 mt-10">
                {/* Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={DeleteTicketImage}
                        alt="Delete Illustration"
                        className="w-60 h-40 object-contain"
                    />
                </div>

                {/* Title */}
                <h2 className="text-[#122751] text-lg font-semibold mb-2">
                    Are you sure you want to delete
                    this ticket?
                </h2>

                {/* Subtitle */}
                <p className="text-[#8D94A3] text-sm max-w-md mx-auto">
                    Are you certain you want to permanently delete this ticket?
                    This action cannot be undone.
                </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 px-6 py-4 bg-white">
                <SecondryButton
                    style={{ width: "80px", height: "40px", color: "#122751", fontWeight: "600" }}
                    onClick={onClose} >
                    Cancel
                </SecondryButton>
                <PrimaryButton onClick={onDelete} style={{ width: "192px", height: "40px" }}>
                    Delete Ticket
                </PrimaryButton>
            </div>
        </div>
    );
};

export default DeleteTicketDrawer;
