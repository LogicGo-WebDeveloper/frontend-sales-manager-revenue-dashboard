import React, { useState } from 'react';
import { Table, Input, Button, Dropdown, Drawer, Pagination, Select } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { IoEyeOutline, IoFilter } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";
import DeleteDrawer from '../components/delete-drawer';
import DeleteInvoiceImage from '../assets/images/delete-invoice-image.png';
import SecondryButton from '../components/common/secondry.button';
import { IoIosArrowDown } from "react-icons/io";
import FilterDrawer from '../components/filter-drawer';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/route.const';

const Invoice = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deleteInvoiceDrawer, setDeleteInvoiceDrawer] = useState(false);
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const data = Array.from({ length: 12 }, (_, index) => ({
    key: index,
    invoiceId: `#1245${index}`,
    startDate: '28 March 2025',
    endDate: '31 May 2025',
    amount: '$2,15,000',
    status: index % 3 === 0 ? 'Unpaid' : 'Paid',
  }));

  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      render: (text) => <span className='text-[#122751] font-normal'>{text}</span>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (text) => <span className='text-[#122751] font-normal'>{text}</span>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (text) => <span className='text-[#122751] font-normal'>{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text) => <span className='text-[#122751] font-normal'>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <span
          className={`inline-flex justify-center items-center min-w-[85px] py-[2px] px-[10px] rounded-lg text-xs font-medium
            ${status === 'Paid' ? 'bg-[#D1FAE5] text-[#059669]' : 'bg-[#FEE2E2] text-[#DC2626]'}`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: (
                  <div className='flex items-center gap-2 p-1' onClick={handleViewInvoice}>
                    <IoEyeOutline size={18} color='#2363E3' /> View Invoice
                  </div>
                )
              },
              {
                key: '2',
                label: (
                  <div className='flex items-center gap-2 p-1' onClick={() => setDeleteInvoiceDrawer(true)}>
                    <HiOutlineTrash size={18} color='#2363E3' /> Delete Invoice
                  </div>
                )
              },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <MoreOutlined style={{ fontSize: 20, color: '#122751', cursor: 'pointer' }} />
        </Dropdown>
      ),
    }
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
  };

  const handleViewInvoice = () => {
    navigate(ROUTES.DASHBOARD.SETTING_INVOICE);
  }

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Left side - Title */}
        <div className="md:w-1/3">
          <h2 className="text-base font-semibold text-[#122751]">All Invoices</h2>
        </div>

        {/* Center - Search */}
        <div className="md:w-3/4 flex justify-center">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: "100%", maxWidth: 300, height: 40 }}
          />
        </div>

        {/* Right side - Filter Button */}
        <div className="md:w-1/3 flex justify-end">
          <SecondryButton
            style={{
              height: 40,
              borderColor: '#D0D5DD',
              color: '#122751',
              fontWeight: 500,
            }}
            onClick={() => setFilterDrawer(true)}
          >
            <IoFilter /> Filter
          </SecondryButton>
        </div>
      </div>

      {/* Billing Cycle Info */}
      <div className="text-[#122751] font-medium text-sm mb-2">
        Billing Cycle : 01 March 2025 - 01 April 2025
      </div>

      {/* Table */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}

        scroll={{ x: 500, y: 290 }}
        className="custom-ant-table"
        bordered
        pagination={false}
        footer={() => (
          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-[#122751] font-medium">Show</span>
              <Select
                value={pageSize}
                onChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
                style={{ width: 80 }}
                options={[
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                  { value: 30, label: '30' },
                ]}
                size="small"
                className="rounded-md"
              />
              <span className="text-[#122751] font-medium">entries</span>
            </div>
            {selectedRowKeys.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-[#122751] font-medium">{selectedRowKeys.length} Selected</span>

                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'delete',
                        label: (
                          <div className="flex items-center gap-2" onClick={() => setDeleteInvoiceDrawer(true)}>
                            <HiOutlineTrash size={18} color="#2363E3" />
                            <span className="text-[#122751]">Delete Invoice</span>
                          </div>
                        ),
                      },
                    ],
                  }}
                  trigger={['click']}
                  placement="top"
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
              </div>
            )}

            <Pagination
              align="start"
              current={currentPage}
              pageSize={pageSize}
              total={data.length}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
            />
          </div>
        )}
      />

      {/* Delete Invoice Drawer */}
      <Drawer
        title="Delete Invoice"
        placement="right"
        onClose={() => setDeleteInvoiceDrawer(false)}
        open={deleteInvoiceDrawer}
        width={600}
        closable={false}
      >
        <DeleteDrawer onClose={() => setDeleteInvoiceDrawer(false)} image={DeleteInvoiceImage} title="Are you sure you want to Delete this Invoices?" description="Are you certain you want to Delete all invoice? This action cannot be undone." primaryButtonText="Delete Invoice" />
      </Drawer>

      {/* Filter Drawer */}
      <Drawer
        title="Apply Filter"
        placement="right"
        onClose={() => setFilterDrawer(false)}
        open={filterDrawer}
        width={600}
        closable={false}
      >
        <FilterDrawer
          onClose={() => setFilterDrawer(false)}
          onApply={(values) => console.log('Filtered:', values)}
          panelsToShow={['invoice', 'amount', 'status']}
        />
      </Drawer>
    </div>
  );
};

export default Invoice;
