import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import AuthLayout from '../components/auth-layout';
import { getValidationRule } from '../utils/validation';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/common/primary.button';
import googleIcon from '../assets/images/google-icon.png';
import appleIcon from '../assets/images/apple-icon.png';
import { ROUTES } from '../config/route.const';

const Signup = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Form Values:', values);
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-lg ">

                {/* Title & Subtext */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#122751] mb-1">Get Started Now</h2>
                    <p className="text-sm text-[#8D94A3]">
                        Enter your credentials to access your account
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
                        label="Name"
                        name="name"
                        rules={getValidationRule('username', true)}
                        className="input-lable form-item"
                    >
                        <Input placeholder="Enter your name" size="large" className="custom-placeholder" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={getValidationRule('email', true)}
                        className='form-item'
                    >
                        <Input placeholder="Enter your email" size="large" className="custom-placeholder" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={getValidationRule('password', true)}
                        className='form-item'

                    >
                        <Input.Password placeholder="Enter your password" size="large" className='custom-placeholder' />
                    </Form.Item>

                    <Form.Item name="terms&condition" valuePropName="checked" className="custom-checkbox">
                        <Checkbox>
                            I agree to the <Link href="#" style={{textDecoration: "underline"}}>Terms & Privacy</Link>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <PrimaryButton htmlType="submit">
                            Sign Up to RevenueSync
                        </PrimaryButton>
                    </Form.Item>
                </Form>

                {/* Social Sign In Divider */}
                <div className="my-6 flex items-center justify-center gap-2 text-[#A3AED0] text-xs">
                    <div className="flex-1 h-px bg-[#E5EAF2]"></div>
                    <span>OR</span>
                    <div className="flex-1 h-px bg-[#E5EAF2]"></div>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-3 mb-6">
                    <button
                        className="cursor-pointer flex items-center justify-center gap-2 flex-1 border text-[#8D94A3] border-[#E0E5F2] rounded-md px-4 py-2 text-sm font-medium bg-white"
                    >
                        <img src={googleIcon} alt="Google" className="w-5 h-5" />
                        Sign in with Google
                    </button>
                    <button
                        className="cursor-pointer flex items-center justify-center gap-2 flex-1 border text-[#8D94A3] border-[#E0E5F2] rounded-md px-4 py-2 text-sm font-medium bg-white"
                    >
                        <img src={appleIcon} alt="Apple" className="w-5 h-5" />
                        Sign in with Apple
                    </button>
                </div>


                {/* Sign In Link */}
                <div className="text-center text-sm text-[#1B254B]">
                    have an account?{' '}
                    <Link to={ROUTES.USER.LOGIN} className="text-[#2363E3] font-medium">
                        Sign In
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Signup;
