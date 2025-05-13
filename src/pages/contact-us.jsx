import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Drawer, Select } from 'antd';
import PrimaryButton from '../components/common/primary.button.jsx';
import TicketCard from '../components/ticket-card.jsx';
import TicketDrawer from '../components/ticket-drawer.jsx';
import { useSelector } from 'react-redux';

const { Option } = Select;

const ContactUs = () => {
  const [filterValue, setFilterValue] = useState('');
  const [ticketDrawerOpen, setTicketDrawerOpen] = useState(false)
  const { user } = useSelector((state) => state.user);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  return (
    <>
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#122751]">Create a Support Ticket</h1>
            <div className="text-sm text-[#8D94A3] mt-1">
              <span className='mr-1'>Responses to this request will be sent to</span>
              <span className="font-semibold text-[#122751]">{user.email}</span>
            </div>
          </div>

          {/* Dropdown + Button */}
          <div className="flex items-center gap-3">
            <Select
              defaultValue="Filter"
              onChange={handleFilterChange}
              style={{ width: "140px", height: "40px", fontSize: "10px" }}
              className='contact-select-input'
            >
              <Option value="week">This Week</Option>
              <Option value="month">This Month</Option>
              <Option value="year">This Year</Option>
            </Select>

            <PrimaryButton
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                height: 'auto',
                fontSize: '14px',
                fontWeight: 500,
                borderRadius: '6px',
                backgroundColor: '#2363E3',
                color: '#fff',
              }}
              onClick={() => setTicketDrawerOpen(true)}
            >
              <FaPlus className="text-xs" />
              Create New Ticket
            </PrimaryButton>
          </div>
        </div>

        {/* Ticket component */}
        <TicketCard dateRange={filterValue} />

        {/* Drawer */}
        <Drawer
          title="Create New Ticket"
          placement="right"
          onClose={() => setTicketDrawerOpen(false)}
          open={ticketDrawerOpen}
          width={600}
          closable={false}
        >
          <TicketDrawer onClose={() => setTicketDrawerOpen(false)} />
        </Drawer>

      </div>
    </>
  );
};

export default ContactUs;
