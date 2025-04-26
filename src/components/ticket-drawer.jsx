import React, { useState } from 'react';
import { Form, Input, Checkbox, Select, Button } from 'antd';
import PrimaryButton from './common/primary.button';
import { WiDayCloudy } from 'react-icons/wi';
import SecondryButton from './common/secondry.button';

const { TextArea } = Input;
const { Option } = Select;

const TicketDrawer = ({ onClose }) => {
    const [form] = Form.useForm();
    const selectedProjects = Form.useWatch('project', form) || [];
    const selectedSDKs = Form.useWatch('sdk', form) || [];

    const projectOptions = [
        { label: 'DreamsSell', value: 'dreamsell' },
        { label: 'Project name 1', value: 'project1' },
        { label: 'Project name 2', value: 'project2' },
        { label: 'Project name 3', value: 'project3' },
        { label: 'Project name 4', value: 'project4' },
    ];

    const sdkOptions = [
        { label: '(Not applicable to this issue)', value: 'none' },
        { label: 'Android (Native)', value: 'android' },
        { label: 'Flutter', value: 'flutter' },
        { label: 'iOS (Native)', value: 'ios' },
        { label: 'React Native', value: 'react-native' },
        { label: 'Unity', value: 'unity' },
        { label: 'Web (RC Billing)', value: 'web' },
      ];
      

    const [selectedOptions, setSelectedOptions] = useState([]);

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    return (
        <div className="bg-white rounded-md">
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                requiredMark={false}
            >
                <div className='flex flex-col gap-20'>
                    <div className='input-group'>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'Invalid email!' }]}
                            className='form-item'
                        >
                            <Input placeholder="Enter your email" size="large" />
                        </Form.Item>

                        <h3 className='text-[16px] font-[600] text-[#122751] mb-1 '>How can we assist you today?</h3>
                        <Form.Item name="assistanceType" className='form-item' >
                            <Checkbox.Group
                                options={["Project Question (SDK implementation, Charts, Paywalls, etc.)", "Account Question (invoices, transfer, etc..)", "Feature Request"]}
                                onChange={setSelectedOptions}
                                style={{ display: "flex", flexDirection: "column" }}
                            />
                        </Form.Item>

                        <Form.Item className='form-item' label="Description" name="description" rules={[{ required: true, message: 'Please enter a description!' }]}>
                            <TextArea
                                placeholder="Please describe your issue here..."
                                style={{ height: 110, resize: 'none' }}
                            />
                        </Form.Item>

                        <div className="flex w-full gap-x-4">
                            <Form.Item
                                label="Affected Project"
                                name="project"
                                className="form-item w-1/2"
                            >
                                <Select
                                    mode="multiple"
                                    showSearch
                                    placeholder="Select Project"
                                    optionLabelProp="label"
                                    optionFilterProp="label"
                                    style={{ width: '100%' }}
                                    className='form-select-input'
                                >
                                    {projectOptions.map((opt) => (
                                        <Option key={opt.value} value={opt.value} label={opt.label}>
                                            <div className="flex items-center gap-2">
                                                <Checkbox checked={selectedProjects.includes(opt.value)}>
                                                    {opt.label}
                                                </Checkbox>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Affected SDK"
                                name="sdk"
                                className="form-item w-1/2"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select affected SDK"
                                    className="form-select-input"
                                    optionLabelProp="label"
                                    dropdownStyle={{ padding: 0 }} // optional
                                >
                                    {sdkOptions.map((opt) => (
                                        <Option key={opt.value} value={opt.value} label={opt.label}>
                                            <div className="flex items-center gap-2">
                                                <Checkbox checked={selectedSDKs.includes(opt.value)}>
                                                    {opt.label}
                                                </Checkbox>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                        </div>


                        <Form.Item label="Affected App User ID(s)" name="appUserId">
                            <Input placeholder="$RCAnon..." />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-2">
                        <SecondryButton
                            onClick={onClose}
                            type="default"
                            style={{ width: "80px", color: "#122751", height: "40px", fontWeight: "600" }}
                        >
                            Cancel
                        </SecondryButton>

                        <PrimaryButton htmlType="submit" style={{ width: "180px", height: "40px", fontSize: "14px" }}>
                            Submit Request
                        </PrimaryButton>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default TicketDrawer;
