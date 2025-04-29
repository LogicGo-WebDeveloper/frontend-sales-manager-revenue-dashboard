import React, { useState } from 'react'
import { Dropdown, Table, Drawer, Pagination, Select } from 'antd'
import { FaApple } from "react-icons/fa";
import { TiVendorAndroid } from "react-icons/ti";
import { RiGlobalLine } from "react-icons/ri";
import { MoreOutlined } from '@ant-design/icons';
import { IoEyeOutline } from 'react-icons/io5';
import { HiOutlineTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import DeleteDrawer from './delete-drawer';
import DeleteInvoiceImage from '../assets/images/delete-invoice-image.png';

const dataSource = Array.from({ length: 15 }).map((_, index) => ({
    key: index,
    userId: 'livator@mail.com',
    project: 'DreamSell',
    status: index % 4 === 0 ? 'Purchased' : index % 4 === 1 ? 'Trial' : index % 4 === 2 ? 'Renewals' : 'Lifetime',
    revenue: '$689.35',
    subscription: index % 2 === 0 ? 'Quarterly' : 'Weekly',
    expiration: index % 2 === 0 ? 'In 7 days' : 'In 14 days',
    platform: index % 2 === 0 ? 'apple' : 'web',
    campingCode: 'livator5201',
}))

const PurchaseTransactionTable = ({ onSelectionChange }) => {
    const [deleteTransactionDrawer, setDeleteTransactionDrawer] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userId',
        },
        {
            title: 'Project',
            dataIndex: 'project',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                let bgColor = '';
                let textColor = '';

                switch (status) {
                    case 'Purchased':
                        bgColor = 'bg-[#D1FAE5]';
                        textColor = 'text-[#059669]';
                        break;
                    case 'Trial':
                        bgColor = 'bg-[#D1F0FA]';
                        textColor = 'text-[#266FDC]';
                        break;
                    case 'Renewals':
                        bgColor = 'bg-[#FEE2E2]';
                        textColor = 'text-[#DC2626]';
                        break;
                    case 'Lifetime':
                        bgColor = 'bg-[#FEF3C7]';
                        textColor = 'text-[#954614]';
                        break;
                    default:
                        bgColor = 'bg-gray-200';
                        textColor = 'text-gray-700';
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
            title: 'Total Revenue',
            dataIndex: 'revenue',
        },
        {
            title: 'Subscription',
            dataIndex: 'subscription',
        },
        {
            title: 'Expiration',
            dataIndex: 'expiration',
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            render: (platform) => {
                switch (platform) {
                    case 'apple':
                        return <FaApple className="text-lg text-[#122751]" />;
                    case 'web':
                        return <RiGlobalLine className="text-lg text-[#122751]" />;
                    case 'android':
                        return <TiVendorAndroid className="text-lg text-[#122751]" />;
                    default:
                        return '-';
                }
            },
        },
        {
            title: 'Camping Code',
            dataIndex: 'campingCode',
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
                                    <div className='flex items-center gap-2 p-1' onClick={(e) => {
                                        setDeleteTransactionDrawer(true);
                                    }}>
                                        <HiOutlineTrash size={18} color='#2363E3' /> Delete Invoice
                                    </div>
                                )
                            },
                            {
                                key: '2',
                                label: (
                                    <div className='flex items-center gap-2 p-1' onClick={(e) => {
                                        navigate('/lead');
                                    }}>
                                        <IoEyeOutline size={18} color='#2363E3' /> View in New Lead
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
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('Selected Rows: ', selectedRows);
            onSelectionChange(selectedRowKeys, selectedRows);
        },
    };

    // Pagination logic
    const paginatedData = dataSource.slice((current - 1) * pageSize, current * pageSize);

    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="relative max-h-[72vh] overflow-y-auto">
                    <Table
                        rowSelection={rowSelection}
                        dataSource={paginatedData}
                        columns={columns}
                        pagination={false}
                        className='custom-ant-table'
                    />
                    {/* Sticky Pagination */}
                    <div className="sticky bottom-0 bg-white z-10 flex justify-between p-2">

                        <div className="flex items-center gap-2 text-sm text-[#8D94A3]">
                            <span>Show</span>
                            <Select
                                value={pageSize}
                                onChange={(value) => {
                                    setPageSize(value);
                                    setCurrent(1); 
                                }}
                                options={[
                                    { label: '10', value: 10 },
                                    { label: '20', value: 20 },
                                    { label: '30', value: 30 },
                                ]}
                                size="medium"
                                style={{ width: 80 }}
                            />
                            <span>entries</span>
                        </div>
                        <Pagination
                            current={current}
                            pageSize={pageSize}
                            total={dataSource.length}
                            onChange={(page, size) => {
                                setCurrent(page);
                                setPageSize(size);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Delete Invoice Drawer */}
            <Drawer
                title="Delete Invoice"
                placement="right"
                onClose={() => setDeleteTransactionDrawer(false)}
                open={deleteTransactionDrawer}
                width={600}
                closable={false}
            >
                <DeleteDrawer onClose={() => setDeleteTransactionDrawer(false)} image={DeleteInvoiceImage} title="Are you sure you want to Delete this Invoices?" description="Are you certain you want to Delete all invoice? This action cannot be undone." primaryButtonText="Delete Invoice" />
            </Drawer>
        </>
    )
}

export default PurchaseTransactionTable
