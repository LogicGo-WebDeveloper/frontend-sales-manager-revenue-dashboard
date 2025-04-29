import React, { useState } from 'react';
import { Drawer, Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import PrimaryButton from './common/primary.button';
import { getValidationRule } from '../utils/validation';
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select;
const GeneratePromoCodeDrawer = ({ onClose }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Submitted:', values);
    };

    const projectOptions = [
        { value: 'DreamSell', label: 'DreamSell' },
        { value: 'Project name 1', label: 'Project name 1' },
        { value: 'Project name 2', label: 'Project name 2' },
    ];

    const toggleSelect = (value) => {
        const newSelected = selectedProjects.includes(value)
          ? selectedProjects.filter((v) => v !== value)
          : [...selectedProjects, value];
        setSelectedProjects(newSelected);
      };
      
    return (
        <>
            <div>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <div className='flex flex-col gap-27'>
                        <div>
                            <Form.Item
                                label="Campaign Name"
                                name="campaignName"
                                rules={getValidationRule('CampaignName')}
                                className='form-item'
                            >
                                <Input placeholder="Enter campaign name" size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Project"
                                name="project"
                                rules={[{ required: true, message: 'Please select at least one project' }]}
                                className='form-select-input'
                            >
                                <Select
                                    mode="multiple"
                                    showSearch
                                    placeholder="Search project"
                                    size="large"
                                    optionFilterProp="label"
                                    style={{ width: '100%' }}
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().includes(input.toLowerCase())
                                    }
                                    dropdownRender={(menu) => (
                                        <>
                                            <div style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                                                <SearchOutlined style={{ marginRight: 8, color: '#8D94A3' }} />
                                                <input
                                                    placeholder="Search project"
                                                    onChange={(e) => {
                                                        const input = e.target.value.toLowerCase();
                                                        const options = document.querySelectorAll('.ant-select-item-option-content');
                                                        options.forEach((opt) => {
                                                            const text = opt.textContent.toLowerCase();
                                                            const parent = opt.closest('.ant-select-item');
                                                            if (text.includes(input)) {
                                                                parent.style.display = 'block';
                                                            } else {
                                                                parent.style.display = 'none';
                                                            }
                                                        });
                                                    }}
                                                    style={{
                                                        border: 'none',
                                                        outline: 'none',
                                                        width: '100%',
                                                        fontSize: '14px',
                                                    }}
                                                />
                                            </div>
                                            <div style={{ borderTop: '1px solid #f0f0f0' }}>{menu}</div>
                                        </>
                                    )}
                                >
                                    {projectOptions.map((opt) => (
                                        <Option key={opt.value} value={opt.value} label={opt.label}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'row' }}>
                                                <input type="checkbox" />
                                                {opt.label}
                                            </span>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>


                            <Form.Item
                                label="Promo Code"
                                name="promoCode"
                                rules={[{ required: true, message: 'Please enter promo code' }]}
                                className='form-item'
                            >
                                <Input placeholder="Enter promo code" size="large" />
                            </Form.Item>

                            <p className='text-[16px] text-[#122751] font-semibold mb-2 '>Validity</p>
                            <Form.Item
                                label="Start Date"
                                name="startDate"
                                rules={[{ required: true, message: 'Please select start date' }]}
                                style={{ display: 'inline-block', width: '48%' }}
                                className='form-item'

                            >
                                <DatePicker className='time-input' size="large" style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Start Time"
                                name="startTime"
                                rules={[{ required: true, message: 'Please select start time' }]}
                                style={{ display: 'inline-block', width: '48%', marginLeft: '4%' }}
                                className='form-item'
                            >
                                <TimePicker className='time-input' use12Hours format="h:mm A" size="large" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 0 }}>
                                <Form.Item
                                    label="End Date"
                                    name="endDate"
                                    rules={[{ required: true, message: 'Please select end date' }]}
                                    style={{ display: 'inline-block', width: '48%' }}
                                    className='form-item'

                                >
                                    <DatePicker className='time-input' size="large" style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    label="End Time"
                                    name="endTime"
                                    rules={[{ required: true, message: 'Please select end time' }]}
                                    style={{ display: 'inline-block', width: '48%', marginLeft: '4%' }}
                                    className='form-item'
                                >
                                    <TimePicker className='time-input' use12Hours format="h:mm A" size="large" style={{ width: '100%' }} />
                                </Form.Item>
                            </Form.Item>
                        </div>

                        <div className='flex justify-end gap-2'>
                            <Button onClick={onClose} style={{ marginRight: 8, height: "40px", color: "#122751", width: "80px" }}>
                                Cancel
                            </Button>

                            <PrimaryButton htmlType="submit" style={{ width: "220px", fontSize: "14px", fontWeight: "600", height: "40px" }}>
                                Save Promo Code
                            </PrimaryButton>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default GeneratePromoCodeDrawer;
