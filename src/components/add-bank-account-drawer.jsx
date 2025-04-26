import React from 'react';
import { Form, Input, Button } from 'antd';
import PrimaryButton from './common/primary.button';
import { getValidationRule } from '../utils/validation';

const AddBankAccountDrawer = ({ onClose, form, editingAccount }) => {
    const onFinish = (values) => {
        if (editingAccount) {
            console.log('Updated Account:', values);
        } else {
            console.log('New Account:', values);
        }
        form.resetFields();
        onClose();
    };

    return (
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
                        name="branchAddress"
                        rules={getValidationRule('Branch Address', true)}
                        className="form-item"
                    >
                        <Input placeholder="Add bank branch address" size="large" />
                    </Form.Item>

                    <div className="flex flex-col md:flex-row md:gap-4">
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
                        name="swiftCode"
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
    );
};

export default AddBankAccountDrawer;
