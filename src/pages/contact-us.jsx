import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Drawer, Select } from 'antd';
import PrimaryButton from '../components/common/primary.button.jsx';
import { FaEllipsisV } from 'react-icons/fa';
import { Pagination } from 'antd';
import profileImage from "../assets/images/profile-icon.png"
import TicketComponent from '../components/ticket-card.jsx';
import TicketDrawer from '../components/ticket-drawer.jsx';

const { Option } = Select;

const tickets = [
  {
    id: 1,
    email: 'wilsonbin@mail.com',
    question: 'How to deposit money to my portal?',
    description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  ',
    time: '12:45 PM',
    date: '26 March, 25',
  },
  {
    id: 2,
    email: 'wilsonbin@mail.com',
    question: 'How to deposit money to my portal?',
    description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  ',
    time: '12:45 PM',
    date: '26 March, 25',
  },
  {
    id: 3,
    email: 'wilsonbin@mail.com',
    question: 'How to deposit money to my portal?',
    description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  ',
    time: '12:45 PM',
    date: '26 March, 25',
  },
];

const ContactUs = () => {
  const [filterValue, setFilterValue] = useState('month');
  const [ticketDrawerOpen, setTicketDrawerOpen] = useState(false)
  const handleFilterChange = (value) => {
    setFilterValue(value);
    console.log('Selected filter:', value);
    // Add filter logic here
  };

  return (
    <>
      <div className="bg-[#F4F5F6] min-h-full px-10 md:px-40 py-6">

        {/* Top Header */}
        <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[#122751]">Create a Support Ticket</h1>
            <p className="text-sm text-[#8D94A3] mt-1">
              Responses to this request will be sent to <span className="font-semibold text-[#122751]">wilsonlubin@gmail.com</span>
            </p>
          </div>

          {/* Dropdown + Button */}
          <div className="flex items-center gap-3">
            <Select
              defaultValue="week"
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
        <TicketComponent />

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
