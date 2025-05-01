import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import PrimaryButton from '../components/common/primary.button.jsx';
import { HiArrowNarrowDown } from "react-icons/hi";
import OverviewCard from '../components/overview-card.jsx';
import CardIcon1 from '../assets/images/card-1-icon.png'
import CardIcon2 from '../assets/images/card-2-icon.png'
import CardIcon3 from '../assets/images/card-3-icon.png'
import CardIcon4 from '../assets/images/card-4-icon.png'
import CardIcon5 from '../assets/images/card-5-icon.png'
import RecentPurchaseTable from '../components/recent-purchase-table.jsx';
import { Drawer } from 'antd';
import GeneratePromocodeDrawer from '../components/generate-promocode-drawer.jsx';
import FilterDrawer from '../components/overview-filter-drawer.jsx';
import { useSelector } from 'react-redux';

const Overview = () => {

  const [isPromoDrawerOpen, setPromoDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);



  return (
    <>
      <div className="">

        {/* Top Header */}
        <div className="flex justify-between items-start flex-wrap gap-4 mb-6  ">
          <div>
            <h1 className="text-xl font-semibold text-[#122751]">Welcome Back, Jack!</h1>
            <p className="text-sm text-[#8D94A3] mt-1">Here's what's going on today</p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <PrimaryButton
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                height: 'auto',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '6px',
                backgroundColor: '#2363E3',
                color: '#fff',
              }}
              onClick={() => setPromoDrawerOpen(true)}

            >
              <FaPlus className="text-xs" />
              Generate Promocode
            </PrimaryButton>

            <button onClick={() => setFilterDrawerOpen(true)} className="flex bg-[#FFFFFF] items-center gap-2 border border-[#E0E4EC] px-4 py-2 text-sm font-medium text-[#122751] rounded-md hover:bg-gray-100 transition cursor-pointer">
              <FiFilter className="text-base" />
              Filter
            </button>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-white px-8 py-3 rounded-md shadow-sm border-[#E0E4EC] mb-6 flex justify-between z-10 ">
          <div>
            <p className="text-sm text-[#8D94A3]">Available Wallet Balance</p>
            <h2 className="text-lg font-semibold text-[#122751]">$1500.00</h2>
          </div>
          <div className='flex items-center justify-center'>
            <button className="font-semibold text-sm flex items-center gap-1 bg-[#ffffff] px-4 py-2 rounded-md cursor-pointer border border-[#E0E4EC] text-[#122751] hover:bg-gray-100">
              <HiArrowNarrowDown />
              Withdraw
            </button>
          </div>
        </div>


        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <OverviewCard icon={CardIcon1} title="Total User" value="1,000" change="+2.5%" isPositive />
          <OverviewCard icon={CardIcon2} title="Active Trials" value="535" change="-1.8%" isPositive={false} />
          <OverviewCard icon={CardIcon3} title="Paid User" value="231" change="+5.0%" isPositive />
          <OverviewCard icon={CardIcon4} title="Total Revenue" value="$721.10" change="+16.8%" isPositive />
          <OverviewCard icon={CardIcon5} title="New Lead" value="23" change="+2.5%" isPositive />
          <OverviewCard />
        </div>

        <RecentPurchaseTable />

        <Drawer
          title="Generate Promo code"
          placement="right"
          onClose={() => setPromoDrawerOpen(false)}
          open={isPromoDrawerOpen}
          width={600}
          closable={false}
        >
          <GeneratePromocodeDrawer onClose={() => setPromoDrawerOpen(false)} />
        </Drawer>
        
        <Drawer
          title="Apply Filter"
          placement="right"
          onClose={() => setFilterDrawerOpen(false)}
          open={isFilterDrawerOpen}
          width={400}
        >
          <FilterDrawer
          onClose={() => setFilterDrawerOpen(false)}
          onApply={(values) => console.log('Filtered:', values)}
          panelsToShow={['date', 'platform', 'project']}
        />
        </Drawer>

      </div>
    </>
  );
};

export default Overview;
