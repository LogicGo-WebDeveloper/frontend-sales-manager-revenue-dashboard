import React, { useState } from 'react';
import { Button, Checkbox, Collapse, Form, Input, DatePicker } from 'antd';
import PrimaryButton from './common/primary.button';
import SecondryButton from './common/secondry.button';
import { IoIosSearch } from 'react-icons/io';

const { RangePicker } = DatePicker;

const FilterDrawer = ({ onClose, panelsToShow = [], onApply }) => {
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInvoice, setSearchInvoice] = useState('');
    const [searchAmount, setSearchAmount] = useState('');
    const [selectedDateOption, setSelectedDateOption] = useState('');
    const [customRange, setCustomRange] = useState([]);

    // Static Options
    const invoiceList = ['#12457', '#12458', '#12459', '#12500'];
    const amountList = ['$2,15,000', '$3,00,000', '$1,50,000'];
    const statusOptions = ['Paid', 'Unpaid'];
    const dateOptions = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last Month', 'This Year', 'Custom Range'];
    const platformOptions = ['Android', 'ios', 'Web'];
    const projectOptions = ['DreamsSell', 'Truelysell', 'servebook', "doccure", "demo", "test"];
    const expirationOptions = [...dateOptions];

    const filteredInvoiceList = invoiceList.filter(item => item.toLowerCase().includes(searchInvoice.toLowerCase()));
    const filteredAmountList = amountList.filter(item => item.toLowerCase().includes(searchAmount.toLowerCase()));
    const filteredProjectOptions = projectOptions.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));

    const resetFilters = () => {
        form.resetFields();
        setSearchTerm('');
        setSearchInvoice('');
        setSearchAmount('');
    };

    const handleApplyFilters = (values) => {
        onApply?.(values);
    };

    const collapseItems = [
        panelsToShow.includes('invoice') && {
            key: '1',
            label: 'Invoice ID',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border border-[#DCDFEA]">
                        <IoIosSearch className="text-gray-400 mr-2 text-lg" />
                        <Input
                            placeholder="Search Invoice ID"
                            variant="borderless"
                            className="p-0 text-sm bg-transparent"
                            value={searchInvoice}
                            onChange={(e) => setSearchInvoice(e.target.value)}
                        />
                    </div>
                    <Form.Item name="invoiceIds" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col gap-2">
                            {filteredInvoiceList.map((invoice, index) => (
                                <Checkbox
                                    key={invoice}
                                    value={invoice}
                                    style={{
                                        borderBottom: index === filteredInvoiceList.length - 1 ? "0px" : "1px solid #DCDFEA",
                                        paddingBottom: index === filteredInvoiceList.length - 1 ? "0px" : "8px"
                                    }}
                                >{invoice}</Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
        panelsToShow.includes('amount') && {
            key: '2',
            label: 'Amount',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <div className="flex items-center bg-white rounded-md px-3 py-2 mb-3 border border-[#DCDFEA]">
                        <IoIosSearch className="text-gray-400 mr-2 text-lg" />
                        <Input
                            placeholder="Search Amount"
                            variant="borderless"
                            className="p-0 text-sm bg-transparent"
                            value={searchAmount}
                            onChange={(e) => setSearchAmount(e.target.value)}
                        />
                    </div>
                    <Form.Item name="amounts" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col gap-2">
                            {filteredAmountList.map((amount, index) => (
                                <Checkbox
                                    key={amount}
                                    value={amount}
                                    style={{
                                        borderBottom: index === filteredAmountList.length - 1 ? "0px" : "1px solid #DCDFEA",
                                        paddingBottom: index === filteredAmountList.length - 1 ? "0px" : "8px"
                                    }}
                                >{amount}</Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
        panelsToShow.includes('status') && {
            key: '3',
            label: 'Status',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <Form.Item name="status" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col gap-2">
                            {statusOptions.map((status, index) => (
                                <Checkbox
                                    key={status}
                                    value={status}
                                    style={{
                                        borderBottom: index === statusOptions.length - 1 ? "0px" : "1px solid #DCDFEA",
                                        paddingBottom: index === statusOptions.length - 1 ? "0px" : "8px"
                                    }}
                                >
                                    {status}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
        panelsToShow.includes('date') && {
            key: '4',
            label: 'Date',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <Form.Item name="selectedDate" style={{ marginBottom: 0 }}>
                        <Checkbox.Group
                            className="flex flex-col gap-2"
                            value={[selectedDateOption]}
                            onChange={([val]) => setSelectedDateOption(val)}
                        >
                            {dateOptions.map((date, index) => (
                                <Checkbox
                                    key={date}
                                    value={date}
                                    style={{
                                        borderBottom: index === dateOptions.length - 1 ? "0px" : "1px solid #DCDFEA",
                                        paddingBottom: index === dateOptions.length - 1 ? "0px" : "8px"
                                    }}
                                >
                                    {date}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                    {selectedDateOption === 'Custom Range' && (
                        <div className="mt-2 flex justify-center">
                            <RangePicker
                                value={customRange}
                                onChange={setCustomRange}
                                style={{ width: '100%' }}
                                popupClassName="custom-range-picker-popup"
                            />
                        </div>
                    )}
                </div>
            ),
        },
        panelsToShow.includes('platform') && {
            key: '5',
            label: 'Platform',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <Form.Item name="platforms" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col">
                            {platformOptions.map((option, index) => (
                                <div key={option} className={`py-2 ${index !== platformOptions.length - 1 ? 'border-b border-[#DCDFEA]' : ''}`}>
                                    <Checkbox value={option}>{option}</Checkbox>
                                </div>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
        panelsToShow.includes('project') && {
            key: '6',
            label: 'Project',
            children: (
                <div className="bg-[#F5F6FA] border border-[#E4E4E7] rounded-lg p-3">
                    <Input
                        placeholder="Project name"
                        className="mb-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Form.Item name="projects" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col">
                            {filteredProjectOptions.map((option, index) => (
                                <div key={option} className={`py-2 ${index !== filteredProjectOptions.length - 1 ? 'border-b border-[#DCDFEA]' : ''}`}>
                                    <Checkbox value={option}>{option}</Checkbox>
                                </div>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
        panelsToShow.includes('expiration') && {
            key: '7',
            label: 'Expiration',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <Form.Item name="selectedExpiration" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col gap-2">
                            {expirationOptions.map((date, index) => (
                                <Checkbox
                                    key={date}
                                    value={date}
                                    style={{
                                        borderBottom: index === expirationOptions.length - 1 ? "0px" : "1px solid #DCDFEA",
                                        paddingBottom: index === expirationOptions.length - 1 ? "0px" : "8px"
                                    }}
                                >
                                    {date}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
        panelsToShow.includes('trial') && {
            key: '8',
            label: 'Trial',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <Form.Item name="trialStatus" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col gap-2">
                            <Checkbox value="Paid" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>Paid</Checkbox>
                            <Checkbox value="Unpaid">Unpaid</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
        panelsToShow.includes('sort') && {
            key: '9',
            label: 'Sort',
            children: (
                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                    <Form.Item name="sortOptions" style={{ marginBottom: 0 }}>
                        <Checkbox.Group className="flex flex-col gap-2">
                            <Checkbox value="Ascending" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>Ascending</Checkbox>
                            <Checkbox value="Descending" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>Descending</Checkbox>
                            <Checkbox value="Recently Viewed" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>Recently Viewed</Checkbox>
                            <Checkbox value="Recently Added">Recently Added</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </div>
            ),
        },
    ].filter(Boolean);

    return (
        <div className="flex flex-col justify-between h-full">
            <Form
                form={form}
                onFinish={handleApplyFilters}
                className="flex flex-col justify-between h-full"
            >
                <div className="overflow-y-auto">
                    <Collapse ghost items={collapseItems} defaultActiveKey={collapseItems.length > 0 ? [collapseItems[0].key] : []} />
                </div>

                <div className="flex items-center justify-end p-6 gap-2">
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
                        htmlType="submit"
                        style={{ width: "180px", fontSize: "14px", fontWeight: "600", height: "40px" }}
                    >
                        Apply Filter
                    </PrimaryButton>
                </div>
            </Form>
        </div>
    );
};

export default FilterDrawer;
