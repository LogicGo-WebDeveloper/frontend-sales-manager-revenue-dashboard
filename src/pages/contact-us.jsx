import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Drawer, Select } from "antd";
import PrimaryButton from "../components/common/primary.button.jsx";
import TicketCard from "../components/ticket-card.jsx";
import TicketDrawer from "../components/ticket-drawer.jsx";
import { useSelector } from "react-redux";

const { Option } = Select;

const ContactUs = () => {
  const [filterValue, setFilterValue] = useState("");
  const [ticketDrawerOpen, setTicketDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  return (
    <div className="">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start flex-wrap gap-4 mb-4">
        {/* Header Text */}
        <div className="flex-1 min-w-[250px]">
          <h1 className="text-xl sm:text-xl font-semibold text-[#122751]">
            Create a Support Ticket
          </h1>
          <div className="text-sm text-[#8D94A3] mt-1">
            <span className="mr-1">
              Responses to this request will be sent to
            </span>
            <span className="font-semibold text-[#122751] break-all">
              {user.email}
            </span>
          </div>
        </div>

        {/* Dropdown + Button */}
        <div className="flex flex-col sm:flex-row sm:gap-3 w-full lg:w-auto">
          <div className="w-full sm:w-1/2 lg:w-auto">
            <Select
              defaultValue="Filter"
              onChange={handleFilterChange}
              style={{ width: "100%", height: "40px", fontSize: "10px" }}
              className="contact-select-input"
            >
              <Option value="week">This Week</Option>
              <Option value="month">This Month</Option>
              <Option value="year">This Year</Option>
            </Select>
          </div>

          <div className="w-full sm:w-1/2 lg:w-auto mt-2 sm:mt-0">
            <PrimaryButton
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "8px 12px",
                height: "auto",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "6px",
                backgroundColor: "#2363E3",
                color: "#fff",
                width: "100%", // Full width on all screens
              }}
              onClick={() => setTicketDrawerOpen(true)}
            >
              <FaPlus className="text-xs" />
              Create New Ticket
            </PrimaryButton>
          </div>
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
  );
};

export default ContactUs;
