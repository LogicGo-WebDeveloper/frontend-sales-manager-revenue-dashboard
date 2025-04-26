import React, { useState } from 'react';
import { Drawer, Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import PrimaryButton from './common/primary.button';

const { Option } = Select;
const GeneratePromoCodeDrawer = ({ onClose }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Submitted:', values);
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
                                rules={[{ required: true, message: 'Please enter campaign name'}]}
                                className='form-item'
                            >
                                <Input placeholder="Enter campaign name" size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Project"
                                name="project"
                                rules={[{ required: true, message: 'Please select a project' }]}
                                className='form-select-input'
                            >
                                <Select placeholder="Select Project" size="large">
                                    <Option value="DreamSell">DreamSell</Option>
                                    <Option value="ProjectX">ProjectX</Option>
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

                        <div className='flex justify-end'>
                            <Button onClick={onClose} style={{ marginRight: 8, height: "40px", color: "#122751", width: "80px" }}>
                                Cancel
                            </Button>

                            <PrimaryButton htmlType="submit" style={{ width: "242px", fontSize: "14px", fontWeight: "600", height: "40px" }}>
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
