import React, { useState } from 'react';
import { Checkbox, Collapse, Input } from 'antd';
import PrimaryButton from './common/primary.button';
import SecondryButton from './common/secondry.button';
import { IoIosSearch } from "react-icons/io";

const { Panel } = Collapse;

const InvoiceFilterDrawer = ({ onClose, onApply }) => {
    const [searchInvoice, setSearchInvoice] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [selectedAmounts, setSelectedAmounts] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);

    const invoiceList = ['#12457', '#12458', '#12459', '#12500'];
    const amountList = ['$2,15,000', '$3,00,000', '$1,50,000'];

    const statusOptions = ['Paid', 'Unpaid'];

    const resetFilters = () => {
        setSearchInvoice('');
        setSearchAmount('');
        setSelectedInvoices([]);
        setSelectedAmounts([]);
        setSelectedStatus([]);
    };

    const handleApply = () => {
        const filters = {
            invoiceIds: selectedInvoices,
            amounts: selectedAmounts,
            status: selectedStatus,
        };
        if (onApply) {
            onApply(filters);
        }
        console.log(filters, "filters");
    };

    const handleStatusChange = (status, checked) => {
        if (checked) {
            setSelectedStatus((prev) => [...prev, status]);
        } else {
            setSelectedStatus((prev) => prev.filter((s) => s !== status));
        }
    };

    const handleInvoiceChange = (invoice, checked) => {
        if (checked) {
            setSelectedInvoices((prev) => [...prev, invoice]);
        } else {
            setSelectedInvoices((prev) => prev.filter((inv) => inv !== invoice));
        }
    };

    const handleAmountChange = (amount, checked) => {
        if (checked) {
            setSelectedAmounts((prev) => [...prev, amount]);
        } else {
            setSelectedAmounts((prev) => prev.filter((amt) => amt !== amount));
        }
    };

    // Searchable filtering
    const filteredInvoiceList = invoiceList.filter(item => item.toLowerCase().includes(searchInvoice.toLowerCase()));
    const filteredAmountList = amountList.filter(item => item.toLowerCase().includes(searchAmount.toLowerCase()));

    return (
        <div className="flex flex-col justify-between h-full">
            <Collapse defaultActiveKey={['1']} ghost expandIconPosition="start">
                {/* Invoice ID Filter */}
                <Panel header="Invoice ID" key="1">
                    <div className="bg-[#F4F5F6] p-3 rounded-md border border-[#DCDFEA]">
                        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border border-[#DCDFEA]">
                            <IoIosSearch className="text-gray-400 mr-2 text-lg" />
                            <Input
                                placeholder="Search Invoice ID"
                                variant="borderless"
                                className="p-0 focus:ring-0 focus:outline-none text-sm bg-transparent"
                                value={searchInvoice}
                                style={{ padding: "0px" }}
                                onChange={(e) => setSearchInvoice(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            {filteredInvoiceList.map((invoice) => (
                                <Checkbox
                                    key={invoice}
                                    checked={selectedInvoices.includes(invoice)}
                                    onChange={(e) => handleInvoiceChange(invoice, e.target.checked)}
                                >
                                    {invoice}
                                </Checkbox>
                            ))}
                        </div>
                    </div>
                </Panel>

                {/* Amount Filter */}
                <Panel header="Amount" key="2">
                    <div className="bg-[#F4F5F6] p-3 rounded-md border border-[#DCDFEA]">
                        <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border border-[#DCDFEA]">
                            <IoIosSearch className="text-gray-400 mr-2 text-lg" />
                            <Input
                                placeholder="Search Amount"
                                variant="borderless"
                                className="p-0 focus:ring-0 focus:outline-none text-sm bg-transparent"
                                value={searchAmount}
                                style={{ padding: "0px" }}
                                onChange={(e) => setSearchAmount(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            {filteredAmountList.map((amount) => (
                                <Checkbox
                                    key={amount}
                                    checked={selectedAmounts.includes(amount)}
                                    onChange={(e) => handleAmountChange(amount, e.target.checked)}
                                >
                                    {amount}
                                </Checkbox>
                            ))}
                        </div>
                    </div>
                </Panel>

                {/* Status Filter */}
                <Panel header="Status" key="3">
                    <div className="bg-[#F4F5F6] p-3 rounded-md border border-[#DCDFEA]">
                        <div className="flex flex-col gap-2">
                            {statusOptions.map((status) => (
                                <Checkbox
                                    key={status}
                                    checked={selectedStatus.includes(status)}
                                    style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}
                                    onChange={(e) => handleStatusChange(status, e.target.checked)}
                                >
                                    {status}
                                </Checkbox>
                            ))}
                        </div>
                    </div>
                </Panel>
            </Collapse>

            {/* Bottom Buttons */}
            <div className='flex items-center justify-end p-6 gap-2'>
                <SecondryButton
                    onClick={resetFilters}
                    type="default"
                    style={{ width: "80px", color: "#122751", height: "40px" }}
                >
                    Reset
                </SecondryButton>

                <SecondryButton
                    onClick={onClose}
                    type="default"
                    style={{ width: "80px", color: "#122751", height: "40px" }}
                >
                    Cancel
                </SecondryButton>

                <PrimaryButton
                    htmlType="button"
                    onClick={handleApply}
                    style={{ width: "180px", fontSize: "14px", fontWeight: "600", height: "40px" }}
                >
                    Apply Filter
                </PrimaryButton>
            </div>
        </div>
    );
};

export default InvoiceFilterDrawer;
