import React, { useState } from 'react';
import { Button, Checkbox, Collapse, Form, Input } from 'antd';
import PrimaryButton from './common/primary.button';
import SecondryButton from './common/secondry.button';

const { Panel } = Collapse;

const FilterDrawer = ({ onClose, panelsToShow = [] }) => {
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');

    const dateOptions = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last Month', 'This Year', 'Custom Range'];
    const platformOptions = ['Android', 'ios', 'Web'];
    const projectOptions = ['DreamsSell', 'Truelysell', 'servebook', "doccure", "demo", "test"];
    const expirationOptions = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last Month', 'This Year', 'Custom Range'];

    const filteredProjectOptions = projectOptions.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApplyFilters = (values) => {
        console.log('Applied Filters:', values);
        // onClose();
    };

    const resetFilters = () => {
        form.resetFields();
        setSearchTerm('');
    };

    return (
        <div className="flex flex-col justify-between h-full">
            <Form form={form} onFinish={handleApplyFilters} initialValues={{
                selectedDate: 'Yesterday',
                platforms: ['Android'],
                projects: ['DreamsSell'],
                
            }} className="flex flex-col justify-between h-full">
                <div className="overflow-y-auto">
                    <Collapse defaultActiveKey={['1']} ghost>
                        {/* Date Filter */}
                        {panelsToShow.includes('date') && (
                            <Panel header="Date" key="1" style={{ padding: "0px" }}>
                                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3 flex flex-col gap-2">
                                    <Form.Item name="selectedDate">
                                        <Checkbox.Group className="flex flex-col gap-2">
                                            {dateOptions.map((date, index) => (
                                                <Checkbox
                                                    key={date}
                                                    value={date}
                                                    style={{
                                                        borderBottom: index === expirationOptions.length - 1 ? "0px solid #DCDFEA" : "1px solid #DCDFEA",
                                                        paddingBottom: index === expirationOptions.length - 1 ? "0px" : "8px"
                                                    }}
                                                >
                                                    {date}
                                                </Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            </Panel>
                        )}

                        {/* Platform Filter */}
                        {panelsToShow.includes('platform') && (
                            <Panel header="Platform" key="2">
                                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3">
                                    <Form.Item name="platforms">
                                        <Checkbox.Group className="flex flex-col">
                                            {platformOptions.map((option, index) => (
                                                <div
                                                    key={option}
                                                    className={`py-2 ${index !== platformOptions.length - 1 ? 'border-b border-[#DCDFEA]' : ''}`}
                                                >
                                                    <Checkbox value={option}>{option}</Checkbox>
                                                </div>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            </Panel>
                        )}

                        {/* Project Filter */}
                        {panelsToShow.includes('project') && (
                            <Panel header="Project" key="3">
                                <div className="bg-[#F5F6FA] border border-[#E4E4E7] rounded-lg p-3 flex flex-col gap-2">
                                    <div>
                                        <Input
                                            placeholder="Project name"
                                            className="mb-2"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <Form.Item name="projects">
                                        <Checkbox.Group className="flex flex-col">
                                            {filteredProjectOptions.map((option, index) => (
                                                <div
                                                    key={option}
                                                    className={`py-2 ${index !== filteredProjectOptions.length - 1 ? 'border-b border-[#DCDFEA]' : ''}`}
                                                >
                                                    <Checkbox value={option}>{option}</Checkbox>
                                                </div>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            </Panel>
                        )}

                        {/* Expiration Filter */}
                        {panelsToShow.includes('expiration') && (
                            <Panel header="Expiration" key="4">
                                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3 flex flex-col">
                                    <Form.Item name="selectedExpiration">
                                        <Checkbox.Group className="flex flex-col gap-2">
                                            {expirationOptions.map((date, index) => (
                                                <Checkbox
                                                    key={date}
                                                    value={date}
                                                    style={{
                                                        borderBottom: index === expirationOptions.length - 1 ? "0px solid #DCDFEA" : "1px solid #DCDFEA",
                                                        paddingBottom: index === expirationOptions.length - 1 ? "0px" : "8px"
                                                    }}
                                                >
                                                    {date}
                                                </Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            </Panel>
                        )}


                        {/* Trial Filter */}
                        {panelsToShow.includes('trial') && (
                            <Panel header="Trial" key="5">
                                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3 flex flex-col gap-2">
                                    <Form.Item name="trialStatus">
                                        <Checkbox.Group className="flex flex-col gap-2">
                                            <Checkbox value="Paid" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>
                                                Paid
                                            </Checkbox>
                                            <Checkbox value="Unpaid" style={{ paddingBottom: "4px" }}>
                                                Unpaid
                                            </Checkbox>
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            </Panel>
                        )}

                        {/* Sort Filter */}
                        {panelsToShow.includes('sort') && (
                            <Panel header="Sort" key="6">
                                <div className="bg-[#F5F6FA] border border-[#DCDFEA] rounded-lg p-3 flex flex-col gap-2">
                                    <Form.Item name="sortOptions">
                                        <Checkbox.Group className="flex flex-col gap-2">
                                            <Checkbox value="Ascending" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>
                                                Ascending
                                            </Checkbox>
                                            <Checkbox value="Descending" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>
                                                Descending
                                            </Checkbox>
                                            <Checkbox value="Recently Viewed" style={{ borderBottom: "1px solid #DCDFEA", paddingBottom: "8px" }}>
                                                Recently Viewed
                                            </Checkbox>
                                            <Checkbox value="Recently Added" style={{ paddingBottom: "4px" }}>
                                                Recently Added
                                            </Checkbox>
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            </Panel>
                        )}
                    </Collapse>
                </div>

                {/* Footer Buttons */}
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
