import React, { useState } from 'react'
import { HiArrowNarrowLeft, HiOutlineTrash } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { ROUTES } from '../config/route.const'
import { Drawer, Input, Button,Dropdown } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline, IoFilter } from 'react-icons/io5'
import SecondryButton from '../components/common/secondry.button'
import PurchaseTransactionTable from '../components/purchase-transaction-table'
import FilterDrawer from '../components/filter-drawer'
import DeleteDrawer from '../components/delete-drawer'
import DeleteInvoiceImage from '../assets/images/delete-invoice-image.png';

const PurchaseTransaction = () => {

    const [filterDrawer, setFilterDrawer] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [deleteTransactionDrawer, setDeleteTransactionDrawer] = useState(false);

    const handleSelectionChange = (keys, rows) => {
        setSelectedRowKeys(keys);
        setSelectedRows(rows);
    };

    const actionMenuItems = [
        {
            key: '1',
            label: (
                <div className="flex items-center gap-2 p-1" onClick={() => setDeleteTransactionDrawer(true)}>
                    <HiOutlineTrash size={18} color="#2363E3" />
                    Delete Transaction
                </div>
            )
        },
        {
            key: '2',
            label: (
                <div className="flex items-center gap-2 p-1">
                    <IoEyeOutline size={18} color="#2363E3" />
                    View in New Lead
                </div>
            )
        }
    ];

    return (
        <div className="">
            {/* Top Header */}
            <div className="flex flex-wrap justify-between gap-4 mb-3">
                <div className="flex items-center gap-4">
                    <Link to={ROUTES.DASHBOARD.OVERVIEW}>
                        <HiArrowNarrowLeft size={25} color="#122751" className="cursor-pointer" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-semibold text-[#122751]">Purchase Transaction</h1>
                        <p className="text-sm text-[#8D94A3] mt-1">
                            View all purchase transaction details
                        </p>
                    </div>
                </div>

                {/* Search + Filter + Selected Action */}
                <Input
                    placeholder="Search"
                    prefix={<SearchOutlined className="text-[#122751] mr-2" />}
                    className="bg-white rounded-md border-none shadow-sm w-full max-w-md h-10"
                    size="large"
                />
                {/* Selected + Action Button */}
                {selectedRowKeys.length > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-[#122751] text-sm font-normal">{selectedRowKeys.length} Selected</span>
                        <Dropdown menu={{ items: actionMenuItems }} trigger={['click']}>
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
            <PurchaseTransactionTable onSelectionChange={handleSelectionChange} />

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
                    panelsToShow={['date', 'platform', 'project', 'expiration', 'trial']}
                />
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
                <DeleteDrawer onClose={() => setDeleteTransactionDrawer(false)} image={DeleteInvoiceImage} title="Are you sure you want to Delete this Invoices?" description="Are you certain you want to Delete all invoice? This action cannot be undone." primaryButtonText="Delete Invoice" />
            </Drawer>
        </div>
    )
}

export default PurchaseTransaction
