import React, { useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import Profile from '../pages/profile';
import Invoice from '../pages/invoice-list';
import PaymentMethod from '../pages/payment-method';
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/route.const';

const Setting = () => {
  const [activeMainTab, setActiveMainTab] = useState('profile');
  const [activeSubTab, setActiveSubTab] = useState('invoice');
  const navigate = useNavigate();

  return (
    <div className="">
      {/* Top Header */}
      <div className="flex items-center gap-4 mb-6">
        <HiArrowNarrowLeft size={25} color="#122751" className="cursor-pointer" onClick={() => navigate(ROUTES.DASHBOARD.OVERVIEW)} />
        <div>
          <h1 className="text-xl font-semibold text-[#122751]">Setting</h1>
          <p className="text-sm text-[#8D94A3] mt-1">
            Manage Your Sales Settings and Optimize Revenue Performance
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-sm flex min-h-full overflow-hidden">
        {/* Sidebar */}
        <div className="border-r border-gray-200 w-64 p-6">
          {/* Main Tabs */}
          <div className="flex flex-col gap-4">
            <div
              className={`cursor-pointer text-[15px] font-medium ${activeMainTab === 'profile' ? 'text-[#2363E3]' : 'text-[#8D94A3]'}`}
              onClick={() => setActiveMainTab('profile')}
            >
              Profile
            </div>

            <div>
              <div
                className={`cursor-pointer text-[15px] font-medium flex items-center ${activeMainTab === 'billing' ? 'text-[#2363E3]' : 'text-[#8D94A3]'}`}
                onClick={() => {
                  setActiveMainTab('billing');
                  setActiveSubTab('invoice');
                }}
              >
                Billing Details {activeMainTab === 'billing' ? <IoIosArrowDown className="ml-1 text-[#2363E3]" size={18} /> : <RiArrowRightSLine className="text-[#8D94A3]" size={21} />}
              </div>

              {/* Subtabs inside Billing Details */}
              {activeMainTab === 'billing' && (
                <div className="ml-2 mt-3 flex flex-col gap-2">
                  <ul className="text-[#8D94A3] text-sm  list-disc pl-5">
                    <li
                      className={`text-[15px] cursor-pointer py-1 rounded-md ${activeSubTab === 'invoice' ? 'text-[#122751] font-normal' : 'text-[#8D94A3]'}`}
                      onClick={() => setActiveSubTab('invoice')}
                    >
                      Invoice
                    </li>
                    <li
                      className={`text-[15px] cursor-pointer py-1 rounded-md ${activeSubTab === 'payment' ? 'text-[#122751] font-normal' : 'text-[#8D94A3]'}`}
                      onClick={() => setActiveSubTab('payment')}
                    >
                      Payment Method
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          {activeMainTab === 'profile' && <Profile />}
          {activeMainTab === 'billing' && (
            <>
              {activeSubTab === 'invoice' && <Invoice />}
              {activeSubTab === 'payment' && <PaymentMethod />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
