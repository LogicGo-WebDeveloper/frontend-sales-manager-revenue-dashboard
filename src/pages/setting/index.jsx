import React from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/route.const';
import { Outlet } from 'react-router-dom';

const Setting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveTab = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const isBillingTabActive =
    isActiveTab(ROUTES.DASHBOARD.SETTING_INVOICE_LIST) ||
    isActiveTab(ROUTES.DASHBOARD.SETTING_PAYMENT) ||
    isActiveTab(ROUTES.DASHBOARD.SETTING_INVOICE);

  return (
    <div>
      {/* Top Header */}
      <div className="flex items-center gap-4 mb-6">
        <HiArrowNarrowLeft 
          size={25} 
          color="#122751"
          className="cursor-pointer" 
          onClick={() => navigate(ROUTES.DASHBOARD.OVERVIEW)} 
        />
        <div>
          <h1 className="sm:text-xl text-base font-semibold text-[#122751]">Setting</h1>
          <p className="sm:text-sm text-xs text-[#8D94A3] mt-1">
            Manage Your Sales Settings and Optimize Revenue Performance
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex flex-col md:flex-row min-h-full gap-4">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow-sm border-r md:border-b-0 md:border-r border-gray-200 w-full md:w-50 p-6">
          {/* Main Tabs */}
          <div className="flex flex-col gap-4">
            <Link
              to={ROUTES.DASHBOARD.SETTING_PROFILE}
              className={`cursor-pointer sm:text-base text-sm font-medium ${isActiveTab(ROUTES.DASHBOARD.SETTING_PROFILE) ? 'text-[#2363E3]' : 'text-[#8D94A3]'}`}
            >
              Profile
            </Link>

            <div>
              <Link
                to={ROUTES.DASHBOARD.SETTING_INVOICE_LIST}
                className={`cursor-pointer sm:text-base text-sm font-medium flex items-center ${isBillingTabActive ? 'text-[#2363E3]' : 'text-[#8D94A3]'}`}
              >
                Billing Details
                {isBillingTabActive ? (
                  <IoIosArrowDown className="ml-1 text-[#2363E3]" size={18} />
                ) : (
                  <RiArrowRightSLine className="text-[#8D94A3]" size={21} />
                )}
              </Link>

              {/* Subtabs inside Billing Details */}
              {isBillingTabActive && (
                <div className="ml-2 mt-3 flex flex-col gap-2">
                  <ul className="text-[#8D94A3] text-sm list-disc pl-5">
                    <li>
                      <Link
                        to={ROUTES.DASHBOARD.SETTING_INVOICE_LIST}
                        className={`sm:text-base text-sm cursor-pointer py-1 rounded-md block ${
                          isActiveTab(ROUTES.DASHBOARD.SETTING_INVOICE_LIST) || isActiveTab(ROUTES.DASHBOARD.SETTING_INVOICE)
                            ? 'text-[#122751] font-normal'
                            : 'text-[#8D94A3]'
                        }`}
                      >
                        Invoice
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={ROUTES.DASHBOARD.SETTING_PAYMENT}
                        className={`sm:text-base text-sm cursor-pointer py-1 rounded-md block ${
                          isActiveTab(ROUTES.DASHBOARD.SETTING_PAYMENT)
                            ? 'text-[#122751] font-normal'
                            : 'text-[#8D94A3]'
                        }`}
                      >
                        Payment Method
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

          {/* Right Content Area */}
        <div className="bg-white rounded-lg shadow-sm flex-1 mt-4 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Setting;
