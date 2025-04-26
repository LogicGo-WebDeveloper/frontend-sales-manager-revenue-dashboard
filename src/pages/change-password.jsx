import React from 'react';
import { Form, Input } from 'antd';
import AuthLayout from '../components/auth-layout';
import { getValidationRule } from '../utils/validation';
import PrimaryButton from '../components/common/primary.button';

const ChangePassword = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Valuesss:', values);
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-lg">

                {/* Title & Subtext */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#122751] mb-1">Set New Password</h2>
                    <p className="text-sm text-[#8D94A3]">
                        Password must be at least 8 characters
                    </p>
                </div>

                {/* Form */}
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <Form.Item 
                        label="Old Password"
                        name="oldPassword"
                        rules={getValidationRule('password', true)}
                    >
                        <Input.Password placeholder="Enter your old password" size="large" className='custom-placeholder' />
                    </Form.Item>

                    <Form.Item 
                        label="New Password"
                        name="newPassword"
                        rules={getValidationRule('password', true)}
                    >
                        <Input.Password placeholder="Enter your new password" size="large" className='custom-placeholder' />
                    </Form.Item>

                    <Form.Item>
                        <PrimaryButton htmlType="submit">
                            Reset Password
                        </PrimaryButton>
                    </Form.Item>
                </Form>
            </div>
        </AuthLayout>
    );
};

export default ChangePassword;
