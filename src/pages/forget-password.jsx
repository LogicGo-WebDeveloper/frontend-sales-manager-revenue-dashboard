import React from 'react';
import { Form, Input } from 'antd';
import AuthLayout from '../components/auth-layout';
import { getValidationRule } from '../utils/validation';
import PrimaryButton from '../components/common/primary.button';

const ForgetPassword = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-lg">
                
                {/* Title & Subtext */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[#122751] mb-1">Forgot Your Password?</h2>
                    <p className="text-sm text-[#8D94A3]">
                        Don't worry, happens to all of us, enter your email below to recover password
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
                        label="Email"
                        name="email"
                        rules={getValidationRule('email', true)}
                    >
                        <Input placeholder="Enter your email" size="large" className="custom-placeholder" />
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

export default ForgetPassword;
