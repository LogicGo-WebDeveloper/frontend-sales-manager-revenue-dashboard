import React, { useState } from "react";
import { Table, Tag, Dropdown, Button, Drawer } from "antd";
import { FaApple } from "react-icons/fa";
import { TiVendorAndroid } from "react-icons/ti";
import { RiGlobalLine } from "react-icons/ri";
import DeleteDrawer from "./delete-drawer";
import { IoIosArrowDown } from "react-icons/io";
import DeleteTransactionImage from "../assets/images/delete-transaction-image.png";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "User ID",
    dataIndex: "user",
    render: (text) => (
      <span className="text-[#122751] font-medium">{text}</span>
    ),
  },
  {
    title: "Project",
    dataIndex: "project",
    render: (text) => (
      <span className="text-[#122751] font-medium">{text}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let bgColor = "";
      let textColor = "";

      switch (status) {
        case "Purchased":
          bgColor = "bg-[#D1FAE5]";
          textColor = "text-[#059669]";
          break;
        case "Trial":
          bgColor = "bg-[#D1F0FA]";
          textColor = "text-[#266FDC]";
          break;
        case "Renewals":
          bgColor = "bg-[#FEE2E2]";
          textColor = "text-[#DC2626]";
          break;
        case "Lifetime":
          bgColor = "bg-[#FEF3C7]";
          textColor = "text-[#954614]";
          break;
        default:
          bgColor = "bg-gray-200";
          textColor = "text-gray-700";
      }

      return (
        <span
          className={`inline-flex justify-center items-center min-w-[85px] py-[2px] px-[10px] rounded-lg text-xs font-medium ${bgColor} ${textColor}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    title: "Total Revenue",
    dataIndex: "revenue",
    render: (text) => (
      <span className="text-[#122751] font-medium">{text}</span>
    ),
  },
  {
    title: "Subscription",
    dataIndex: "subscription",
    render: (text) => (
      <span className="text-[#122751] font-medium">{text}</span>
    ),
  },
  {
    title: "Expiration",
    dataIndex: "expiration",
    render: (text) => (
      <span className="text-[#122751] font-medium">{text}</span>
    ),
  },
  {
    title: "Platform",
    dataIndex: "platform",
    render: (platform) => {
      switch (platform) {
        case "apple":
          return <FaApple className="text-lg text-[#122751]" />;
        case "web":
          return <RiGlobalLine className="text-lg text-[#122751]" />;
        case "android":
          return <TiVendorAndroid className="text-lg text-[#122751]" />;
        default:
          return "-";
      }
    },
  },
  {
    title: "Camping Code",
    dataIndex: "code",
    render: (text) => (
      <span className="text-[#122751] font-medium">{text}</span>
    ),
  },
];

const data = [
  {
    key: "1",
    user: "liviator@mail.com",
    project: "DreamSell",
    status: "Purchased",
    revenue: "$689.35",
    subscription: "Quarterly",
    expiration: "in 7 days",
    platform: "apple",
    code: "liviator5201",
  },
  {
    key: "2",
    user: "liviator@mail.com",
    project: "Turelysell",
    status: "Renewals",
    revenue: "$689.35",
    subscription: "Weekly",
    expiration: "in 7 days",
    platform: "web",
    code: "liviator5201",
  },
  {
    key: "3",
    user: "Kiyawelson@mail.com",
    project: "Servbook",
    status: "Trial",
    revenue: "$525.35",
    subscription: "Yearly",
    expiration: "in 14 days",
    platform: "apple",
    code: "Kiyawelson21",
  },
  {
    key: "4",
    user: "liviator@mail.com",
    project: "Doccure",
    status: "Lifetime",
    revenue: "$689.35",
    subscription: "Lifetime",
    expiration: "No Expire",
    platform: "android",
    code: "liviator5201",
  },
  {
    key: "5",
    user: "liviator@mail.com",
    project: "DreamSell",
    status: "Purchased",
    revenue: "$689.35",
    subscription: "Quarterly",
    expiration: "in 7 days",
    platform: "apple",
    code: "liviator5201",
  },
];

const RecentPurchaseTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deleteTransactionDrawerOpen, setDeleteTransactionDrawerOpen] =
    useState(false);
  const navigate = useNavigate();

  const onSelectChange = (newSelectedKeys) => {
    setSelectedRowKeys(newSelectedKeys);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "delete") {
      console.log("Action:", key, "on rows:", selectedRowKeys);
      setDeleteTransactionDrawerOpen(true);
    }
  };

  const menuItems = [
    {
      key: "delete",
      label: "Delete Transaction",
    },
    {
      key: "view",
      label: "View in New Lead",
    },
  ];

  const handleViewAllBtn = () => {
    // console.log('View All button clicked');
    navigate("/purchase-transaction");
  };

  return (
    <div className="bg-white rounded-md shadow-lg border border-[#454B571F] mt-6 p-4">
      <div className="flex justify-between items-center px-4 flex-wrap gap-2 ">
        <h2 className="text-[#122751] font-semibold">Recent Purchase</h2>

        <div className="flex items-center gap-2 flex-wrap">
          {selectedRowKeys.length > 0 && (
            <>
              <span className="text-sm text-[#122751] font-normal">
                {selectedRowKeys.length} Selected
              </span>
              <Dropdown
                menu={{
                  items: menuItems,
                  onClick: handleMenuClick,
                }}
              >
                <Button
                  style={{
                    color: "#122751",
                    fontWeight: "500",
                    padding: "18px 10px",
                    borderRadius: "10px",
                  }}
                >
                  Action <IoIosArrowDown />
                </Button>
              </Dropdown>
            </>
          )}
          <button
            className="text-sm font-medium text-[#8D94A3] hover:underline cursor-pointer"
            onClick={handleViewAllBtn}
          >
            View All
          </button>
        </div>
      </div>

      {/* ✅ Responsive Table Wrapper */}
      <div className="overflow-x-auto mt-4">
        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: onSelectChange,
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
          className="custom-ant-table min-w-[1000px]" // Optional: force minimum width
        />
      </div>

      {/* Drawer */}
      <Drawer
        title="Delete Transaction"
        placement="right"
        onClose={() => setDeleteTransactionDrawerOpen(false)}
        open={deleteTransactionDrawerOpen}
        width={600}
        closable={false}
      >
        <DeleteDrawer
          onClose={() => setDeleteTransactionDrawerOpen(false)}
          image={DeleteTransactionImage}
          title="Are you sure you want to delete this transaction?"
          description="Are you certain you want to permanently delete this transaction? This action cannot be undone."
          primaryButtonText="Delete Transaction"
        />
      </Drawer>
    </div>
  );
};

export default RecentPurchaseTable;
