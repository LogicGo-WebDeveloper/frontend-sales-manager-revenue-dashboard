import React, { useState } from 'react';
import { Table, Input, Button, Dropdown, Menu, Badge } from 'antd';
import { SearchOutlined, FilterOutlined, MoreOutlined } from '@ant-design/icons';
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";

const Invoice = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
      render: (text) => <span style={{ color: '#122751' }}>{text}</span>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (text) => <span style={{ color: '#122751' }}>{text}</span>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (text) => <span style={{ color: '#122751' }}>{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text) => <span style={{ color: '#122751' }}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Badge
          text={<span style={{ color: '#122751' }}>{status}</span>}
          color={status === 'Paid' ? '#A5ECC1' : '#FFD1D1'}
          style={{
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      title: 'Action',
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: '1', label: <span style={{ color: '#122751' }}><IoEyeOutline /> View Invoice</span> },
              { key: '2', label: <span style={{ color: '#122751' }}><HiOutlineTrash /> Delete Invoice</span> },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <MoreOutlined style={{ fontSize: 20, color: '#122751', cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ];


  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-[#122751]">All Invoices</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ width: 250, height: 40 }}
          />
          <Button
            icon={<FilterOutlined />}
            style={{
              height: 40,
              borderColor: '#D0D5DD',
              color: '#122751',
            }}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Billing Cycle Info */}
      <div className="text-[#667085] text-sm mb-4">
        Billing Cycle : <span className="font-medium text-[#122751]">01 March 2025 - 01 April 2025</span>
      </div>

      {/* Table */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        className="custom-ant-table"

        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          showQuickJumper: true,
        }}
        bordered
      />
    </div>
  );
};

export default Invoice;
