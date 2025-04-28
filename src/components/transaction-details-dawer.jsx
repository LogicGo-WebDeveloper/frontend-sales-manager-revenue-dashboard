import React from 'react';
import { Avatar, Button } from 'antd';
import { TiVendorAndroid } from "react-icons/ti";
import ProfileIcon from '../assets/images/profile-icon.png';
import '../scrollbar.css';

const TransactionDetailsDrawer = ({ onClose }) => {

    const data = {
        userId: 'livator@mail.com',
        description: [
            {
                profile: ProfileIcon,
                email: 'wilsonlubin@mail.com',
                title: "How to deposit money to my portal?",
                message: "To deposit money into your portal, you'll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portal specific payment options. Here's a general guide, but remember to follow the specific instructions provided by the portal you are using: Identify the Portal's Payment Methods. Look for a section on 'Add Money,' 'Deposit,' or 'Payments' that outlines the accepted methods.",
                time: '12:45 PM'
            },
            {
                profile: ProfileIcon,
                email: 'alexrobart251@mail.com',
                title: "How to deposit money to my portal?",
                message: 'The completed cash deposit slip is bundled with the checks, bills and coins itemized on the form and presented to the cashier at the bank. The cashier or the concerned bank person processes the deposit and matches the total processed to the total stated on the deposit slip to ensure that they match; thus, the cash deposit slip is a cash processing control for the bank.',
                time: '20:23 PM'
            }
        ],
        platform: 'android',
        promocode: 'livator5201'
    };

    return (
        <div className="flex flex-col justify-between h-full p-2">
            <div>
                {/* User ID */}
                <div className="mb-6 flex gap-2">
                    <p className="text-[#8D94A3] text-sm font-medium">User ID:</p>
                    <p className="text-[#122751] font-medium">{data?.userId}</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-[#8D94A3] text-sm font-medium mb-2">Description:</p>
                    <div className="bg-[#F4F5F6] p-1 rounded-md max-h-60 overflow-y-auto custom-scrollbar ">
                        {data?.description?.map((item, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-md ">
                                {/* Profile Icon */}
                                <Avatar src={item.profile} size={40} className="mt-1" />

                                {/* Content */}
                                <div className="flex-1">
                                    <p className="text-[#122751] font-semibold text-lg">{item.email}</p>
                                    <p className="text-[#122751] font-medium text-sm mb-1">{item.title}</p>
                                    <p className="text-[#8D94A3] text-sm" style={{ lineHeight: '1.3' }}>{item.message}</p>
                                    <p className="text-[#122751] text-xs mt-3 border-b border-[#8d94a36b] pb-2">Posted at {item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform */}
                <div className="mb-6 flex gap-2">
                    <p className="text-[#8D94A3] text-sm font-medium">Platform:</p>
                    <TiVendorAndroid size={18} color="#122751" />
                </div>

                {/* Promocode */}
                <div className="mb-6 flex gap-2">
                    <p className="text-[#8D94A3] text-sm font-medium">Promocode:</p>
                    <p className="text-[#122751] font-medium">{data?.promocode}</p>
                </div>
            </div>

            {/* Bottom Right Cancel Button */}
            <div className="flex justify-end mt-6">
                <Button
                    onClick={onClose}
                    style={{
                        backgroundColor: '#F4F5F6',
                        color: '#122751',
                        fontWeight: '500',
                        borderRadius: '8px',
                        padding: '18px 24px',
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default TransactionDetailsDrawer;
