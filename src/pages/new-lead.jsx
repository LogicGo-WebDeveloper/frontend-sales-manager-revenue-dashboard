import React, { useState } from 'react';
import { HiArrowNarrowLeft, HiOutlineTrash } from 'react-icons/hi';
import { IoEyeOutline, IoFilter } from 'react-icons/io5';
import { FaApple } from 'react-icons/fa';
import { RiGlobalLine } from 'react-icons/ri';
import { TiVendorAndroid } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/route.const';
import { Drawer, Input, Table, Dropdown } from 'antd';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
import SecondryButton from '../components/common/secondry.button';
import FilterDrawer from '../components/overview-filter-drawer';
import DeleteDrawer from '../components/delete-drawer';
import DeleteInvoiceImage from '../assets/images/delete-transaction-image.png';
import TransactionDetailsDawer from '../components/transaction-details-dawer';

const NewLead = () => {
    const [filterDrawer, setFilterDrawer] = useState(false);
    const [deleteTransactionDrawer, setDeleteTransactionDrawer] = useState(false);
    const [transactionDetailDrawer, setTransactionDetailDrawer] = useState(false);
    const navigate = useNavigate();

    const handleOpenDeleteTransactionDrawer = () => {
        setDeleteTransactionDrawer(true);
    }

    const data = [
        {
            key: '1',
            userId: 'livator@mail.com',
            project: 'DreamSell',
            description: 'How to deposit money to my portal?',
            platform: 'apple',
            promocode: 'livator5201',
        },
        {
            key: '2',
            userId: 'livator@mail.com',
            project: 'DreamSell',
            description: 'How to deposit money to my portal?',
            platform: 'web',
            promocode: 'livator5201',
        },
        {
            key: '3',
            userId: 'livator@mail.com',
            project: 'DreamSell',
            description: 'How to deposit money to my portal?',
            platform: 'android',
            promocode: 'livator5201',
        },
        {
            key: '4',
            userId: 'livator@mail.com',
            project: 'DreamSell',
            description: 'How to deposit money to my portal?',
            platform: 'web',
            promocode: 'livator5201',
        },
        {
            key: '5',
            userId: 'livator@mail.com',
            project: 'DreamSell',
            description: 'How to deposit money to my portal?',
            platform: 'android',
            promocode: 'livator5201',
        }
    ];

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
            title: 'Description',
            dataIndex: 'description',
            render: (text) => (
                <div className="max-w-[250px] truncate">{text}</div>
            ),
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
            title: 'Promocode',
            dataIndex: 'promocode',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Dropdown
                    trigger={['click']}
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: (
                                    <div className='flex items-center gap-2 p-1' onClick={() => handleOpenDeleteTransactionDrawer()}>
                                        <HiOutlineTrash size={18} color='#2363E3' /> Delete Transaction
                                    </div>
                                )
                            },
                            {
                                key: '2',
                                label: (
                                    <div className='flex items-center gap-2 p-1' onClick={() => setTransactionDetailDrawer(true)} >
                                        <IoEyeOutline size={18} color='#2363E3' /> View Details
                                    </div>
                                )
                            }
                        ]
                    }}
                    placement="bottomRight"
                >
                    <MoreOutlined style={{ fontSize: 20, color: '#122751', cursor: 'pointer' }} />
                </Dropdown>
            ),
        }
    ];

    return (
        <>
            <div>
                {/* Top Header */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <Link to={ROUTES.DASHBOARD.OVERVIEW}>
                            <HiArrowNarrowLeft size={25} color="#122751" className="cursor-pointer" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-semibold text-[#122751]">New Lead</h1>
                            <p className="text-sm text-[#8D94A3] mt-1">
                                View transaction details
                            </p>
                        </div>
                    </div>

                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined className="text-[#122751] mr-2" />}
                        className="bg-white rounded-md border-none shadow-sm w-full max-w-md h-10"
                        size="large"
                    />
                    <SecondryButton
                        style={{
                            height: 40,
                            borderColor: '#D0D5DD',
                            color: '#122751',
                            fontWeight: 500,
                        }}
                        onClick={() => setFilterDrawer(true)}
                    >
                        <IoFilter size={18} /> Filter
                    </SecondryButton>
                </div>

                {/* Table */}
                <div className="bg-white p-2 rounded-xl shadow-sm">
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        className="custom-ant-table"
                        scroll={{ x: '100%' }}
                    />
                </div>

                {/* Filter Drawer */}
                <Drawer
                    title="Filter"
                    placement="right"
                    onClose={() => setFilterDrawer(false)}
                    open={filterDrawer}
                    closable={false}
                    width={400}
                >
                    <FilterDrawer
                        onClose={() => setFilterDrawer(false)}
                        onApply={(values) => console.log('Filtered:', values)}
                        panelsToShow={['date', 'platform', 'project']}
                    />
                </Drawer>

                {/* Transaction Details Drawer */}
                <Drawer
                    title="Filter"
                    placement="right"
                    onClose={() => setTransactionDetailDrawer(false)}
                    open={transactionDetailDrawer}
                    closable={false}
                    width={600}
                >
                    <TransactionDetailsDawer onClose={() => setTransactionDetailDrawer(false)} />
                </Drawer>

                {/* Delete Transaction Drawer */}
                <Drawer
                    title="Delete Invoice"
                    placement="right"
                    onClose={() => setDeleteTransactionDrawer(false)}
                    open={deleteTransactionDrawer}
                    width={600}
                    closable={false}
                >
                    <DeleteDrawer onClose={() => setDeleteTransactionDrawer(false)} image={DeleteInvoiceImage} title="Are you sure you want to delete this transaction?" description="Are you certain you want to permanently delete this transaction? This action cannot be undone." primaryButtonText="Delete Transaction" />
                </Drawer>
            </div>
        </>
    );
};

export default NewLead;
