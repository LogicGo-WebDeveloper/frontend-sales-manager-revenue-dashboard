import React from 'react';
import { Form, Input, Button, message as antdMessage } from 'antd';
import PrimaryButton from './common/primary.button';
import { getValidationRule } from '../utils/validation';
import { ROUTE_PATH } from '../config/api-routes.config';
import { useMutate } from '../hooks/useQuery';
import { QUERY_KEYS, QUERY_METHODS } from '../config/query.const';
import { useQueryClient } from '@tanstack/react-query';

const AddBankAccountDrawer = ({ onClose, form, editingAccount }) => {

    const [messageApi, contextHolder] = antdMessage.useMessage();
    const queryClient = useQueryClient();

    const { mutate: addBankAccountMutation, isPending } = useMutate(QUERY_KEYS.PAYMENT_METHOD.CREATE, QUERY_METHODS.POST, ROUTE_PATH.PAYMENT.CREATE, {
        onSuccess: () => {
            messageApi.open({ type: 'success', content: 'Bank account added successfully!', duration: 2 });
            queryClient.invalidateQueries(QUERY_KEYS.PAYMENT_METHOD.LIST);
        },
        onError: (error) => {
            console.error('Error adding bank account:', error);
            messageApi.open({ type: 'error', content: error.response?.data?.message || 'Failed to add bank account', duration: 2 });
        }
    });

    const { mutate: updateBankAccountMutation, isPending: isUpdating } = useMutate(QUERY_KEYS.PAYMENT_METHOD.UPDATE, QUERY_METHODS.PATCH, '', {
        getUrl: (values) => `${ROUTE_PATH.PAYMENT.UPDATE}/${values._id}`,
        onSuccess: () => {
            messageApi.open({ type: 'success', content: 'Bank account updated successfully!', duration: 2 });
            queryClient.invalidateQueries(QUERY_KEYS.PAYMENT_METHOD.LIST);
        },
        onError: (error) => {
            console.error('Error updating bank account:', error);
            messageApi.open({ type: 'error', content: error.response?.data?.message || 'Failed to update bank account', duration: 2 });
        }
    });

    const onFinish = (values) => {
        if (editingAccount) {
            updateBankAccountMutation({ ...values, _id: editingAccount._id });
        } else {
            addBankAccountMutation(values);
        }
        form.resetFields();
        onClose();
    };
    return (
        <>
            {contextHolder}

            <div className="flex flex-col h-full">
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    requiredMark={false}
                    className="flex flex-col flex-grow justify-between"
                >
                    <div className="space-y-6">
                        <Form.Item
                            label="Account Holder Name"
                            name="accountHolderName"
                            rules={getValidationRule('Account Holder Name', true)}
                            className="form-item"
                        >
                            <Input placeholder="Add account holder name" size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Bank Name"
                            name="bankName"
                            rules={getValidationRule('Bank Name', true)}
                            className="form-item"
                        >
                            <Input placeholder="Add bank name" size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Branch Address"
                            name="bankAddress"
                            rules={getValidationRule('Branch Address', true)}
                            className="form-item"
                        >
                            <Input placeholder="Add bank branch address" size="large" />
                        </Form.Item>

                        <div className="flex flex-col md:flex-row md:gap-4 mb-0.5">
                            <Form.Item
                                label="Account Number"
                                name="accountNumber"
                                rules={getValidationRule('Account Number', true)}
                                className="form-item flex-1"
                            >
                                <Input placeholder="Add account number" size="large" />
                            </Form.Item>

                            <Form.Item
                                label="IFSC Code"
                                name="ifscCode"
                                rules={getValidationRule('IFSC Code', true)}
                                className="form-item flex-1"
                            >
                                <Input placeholder="Add IFSC code" size="large" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            label="SWIFT/BIC Code (Required for international transaction)"
                            name="swiftBicCode"
                            className="form-item"
                        >
                            <Input placeholder="Add SWIFT/BIC code" size="large" />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end mt-8">
                        <Button
                            onClick={() => {
                                form.resetFields();
                                onClose();
                            }}
                            style={{
                                marginRight: 8,
                                height: "40px",
                                color: "#122751",
                                width: "80px",
                                fontWeight: "500"
                            }}
                        >
                            Cancel
                        </Button>

                        <PrimaryButton
                            htmlType="submit"
                            style={{
                                width: "80px",
                                fontSize: "14px",
                                fontWeight: "500",
                                height: "40px"
                            }}
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default AddBankAccountDrawer;
