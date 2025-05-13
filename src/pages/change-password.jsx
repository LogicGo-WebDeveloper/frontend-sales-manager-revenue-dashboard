import React from 'react';
import { Form, Input, message as antdMessage } from 'antd';
import AuthLayout from '../components/auth-layout';
import { getValidationRule } from '../utils/validation';
import PrimaryButton from '../components/common/primary.button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/route.const';
import { ROUTE_PATH } from '../config/api-routes.config';
import { useMutate } from '../hooks/useQuery';
import Loader from '../components/common/Loader';
import { delay } from '../utils/delay';
import LoadingButton from '../components/common/loading-button';
import { QUERY_KEYS, QUERY_METHODS } from '../config/query.const';

const ChangePassword = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [messageApi, contextHolder] = antdMessage.useMessage();

    const location = useLocation();
    const { email, from } = location.state || {};
    const [showLoader, setShowLoader] = React.useState(false);

    // Mutation for password reset
    const { mutate: resetPasswordMutation, isLoading } = useMutate(QUERY_KEYS.AUTH.CHANGE_PASSWORD, QUERY_METHODS.POST, ROUTE_PATH.AUTH.CHANGE_PASSWORD, {
        onSuccess: async (data) => {
            await delay(1000);
            setShowLoader(false);
            navigate(ROUTES.USER.LOGIN);
        },
        onError: (error) => {
            setShowLoader(false);
            messageApi.open({
                type: 'error',
                content: error.response?.data?.message || 'Password change failed. Please try again.',
                duration: 2,
            });
        }
    });

    const onFinish = (values) => {
        console.log('Form Values:', values);

        const payload = {
            email: email,
            newPassword: values.newPassword,
            confirmNewPassword: values.confirmNewPassword
        };

        setShowLoader(true);
        resetPasswordMutation(payload);
    };

    return (
        <>
            {contextHolder}

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
                            label="New Password"
                            name="newPassword"
                            rules={getValidationRule('password', true)}
                            className='form-item'
                        >
                            <Input.Password placeholder="Enter your New password" size="large" className='custom-placeholder' />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmNewPassword"
                            rules={getValidationRule('password', true)}
                            className='form-item'
                        >
                            <Input.Password placeholder="Enter your new password" size="large" className='custom-placeholder' />
                        </Form.Item>

                        <Form.Item>
                            <PrimaryButton htmlType="submit">
                                {showLoader ? (
                                    <LoadingButton size="small" />
                                ) : (
                                    'Reset Password'
                                )}
                                
                            </PrimaryButton>
                        </Form.Item>
                    </Form>
                </div>
            </AuthLayout>
        </>
    );
};

export default ChangePassword;
