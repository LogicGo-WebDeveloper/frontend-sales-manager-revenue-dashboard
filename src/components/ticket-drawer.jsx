import React, { useState } from 'react';
import { Form, Input, Checkbox, Select, message as antdMessage } from 'antd';
import PrimaryButton from './common/primary.button';
import SecondryButton from './common/secondry.button';
import { useMutate } from '../hooks/useQuery';
import { ROUTE_PATH } from '../config/api-routes.config';
import LoadingButton from './common/loading-button';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, QUERY_METHODS } from '../config/query.const';

const { TextArea } = Input;
const { Option } = Select;

const TicketDrawer = ({ onClose }) => {
    const [form] = Form.useForm();
    const selectedProjects = Form.useWatch('project', form) || [];
    const selectedSDKs = Form.useWatch('sdk', form) || [];
    const [messageApi, contextHolder] = antdMessage.useMessage();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const queryClient = useQueryClient();

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

    const categoryOptions = [
        { label: 'Project Question (SDK implementation, Charts, Paywalls, etc.)', value: 'Project Question' },
        { label: 'Account Question (invoices, transfer, etc..)', value: 'Account Question' },
        { label: 'Feature Request', value: 'Feature Request' }
    ];

    // Create Ticket Mutation
    const { mutate: createTicketMutation, isPending } = useMutate(QUERY_KEYS.SUPPORT_TICKET.CREATE, QUERY_METHODS.POST, ROUTE_PATH.SUPPORT_TICKET.CREATE, {
        onSuccess: (data) => {
            messageApi.open({ type: 'success', content: 'Ticket created successfully!', duration: 2 });
            setShowLoader(false);
            onClose();
            form.resetFields();
            queryClient.invalidateQueries([QUERY_KEYS.SUPPORT_TICKET.GET]);
        },
        onError: (error) => {
            setShowLoader(false);
            console.error('Error creating ticket:', error);
            messageApi.open({
                type: 'error',
                content: error.response?.data?.message || 'Login failed. Please try again.',
                duration: 2,
            });
        }
    });


    const onFinish = (values) => {
        console.log('Form Values:', values);
        setShowLoader(true);

        const payload = {
            ...values,
            title: "what is revenue sync used for??"
        }

        createTicketMutation(payload);
    };

    return (
        <>
            {contextHolder}

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
                            <Form.Item name="issueType" className="form-item">
                                <Checkbox.Group
                                    options={categoryOptions}
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
                                    name="affected_project"
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
                                    name="affected_sdk"
                                    className="form-item w-1/2"
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Select affected SDK"
                                        className="form-select-input"
                                        optionLabelProp="label"
                                        dropdownStyle={{ padding: 0 }}
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

                            <Form.Item label="Affected App User ID(s)" name="affected_userId">
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
                                {isPending ? (
                                    <LoadingButton size="small" />
                                ) : (
                                    'Submit Request'
                                )}
                            </PrimaryButton>
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default TicketDrawer;
