import React, { useState } from 'react';
import { HiOutlineDotsVertical, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import PrimaryButton from '../components/common/primary.button';
import { FaPlus } from 'react-icons/fa';
import { Dropdown, Menu, Drawer, Form } from 'antd';
import AddBankAccountDrawer from '../components/add-bank-account-drawer';
import DeleteDrawer from '../components/delete-drawer';
import LogoutImage from '../assets/images/logout-image.png';

const accounts = [
    {
        _id: 1,
        accountName: 'Wilson Lubin',
        bankName: 'Bank Negara Indonesia',
        branchAddress: 'BNI Building, Floor 7, Jalan Jenderal, Sudirman 1',
        accountNumber: '222333002254888',
        ifscCode: 'BNI0124VBIS',
        swiftCode: 'BNI0124VBIS0125',
    },
    {
        _id: 2,
        accountName: 'John Doe',
        bankName: 'Bank of America',
        branchAddress: '123 Main St, New York, NY',
        accountNumber: '1234567890123456',
        ifscCode: 'BOFAUS3N',
        swiftCode: 'BOFAUS3NXXX',
    },
];

const PaymentMethod = () => {
    
    const [addAccountDrawer, setAddAccountDrawer] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [deleteAccountDrawer, setDeleteAccountDrawer] = useState(false);
    const [form] = Form.useForm();


    const onClickDrawer = () => {
        form.resetFields();
        setAddAccountDrawer(true)
    }

    // edit account
    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setAddAccountDrawer(true);
        form.setFieldsValue({
            accountHolderName: account.accountName,
            bankName: account.bankName,
            branchAddress: account.branchAddress,
            accountNumber: account.accountNumber,
            ifscCode: account.ifscCode,
            swiftCode: account.swiftCode,
        });
    }

    // Delete account
    const handleDeleteAccount = (account) => {
        console.log("Delete account:", account._id);
        setDeleteAccountDrawer(true);
    }

    const getDropdownMenu = (account) => ({
        items: [
            {
                key: 'delete',
                label: (
                    <span className="flex items-center gap-2  px-1 py-1">
                        <HiOutlineTrash size={18} color="#2363E3" />
                        Delete Account
                    </span>
                ),
                onClick: () => {
                    handleDeleteAccount(account);
                },
            },
            {
                key: 'edit',
                label: (
                    <span className="flex items-center gap-2 px-1 py-1">
                        <HiOutlinePencilAlt size={18} color="#2363E3" />
                        Edit Account
                    </span>
                ),
                onClick: () => {
                    handleEditAccount(account);
                },
            },
        ],
    });



    return (
        <div className="p-6">
            {/* Top Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-[#122751]">Payment Details</h2>
                <PrimaryButton
                    onClick={onClickDrawer}
                    style={{ width: "180px", fontSize: "15px", height: "40px" }}
                >
                    <FaPlus size={12} /> Add New Account
                </PrimaryButton>
            </div>

            {/* Bank Accounts */}
            <div className="text-[#122751]">
                <h3 className="text-sm font-medium mb-4">Bank Accounts</h3>

                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {accounts.map((account, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-md border border-[#DCDFEA] p-6 w-full max-w-md relative"
                        >
                            {/* Dropdown Menu Icon */}
                            <Dropdown menu={getDropdownMenu(account)} trigger={['click']} placement="bottomRight">
                                <div className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600">
                                    <HiOutlineDotsVertical size={18} />
                                </div>
                            </Dropdown>

                            {/* Bank Details */}
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-[#8D94A3]">Account Name : </span> {account.accountName}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">Bank Name : </span> {account.bankName}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">Branch Address : </span> {account.branchAddress}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">Account Number : </span> {account.accountNumber}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">IFSC Code : </span> {account.ifscCode}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">SWIFT/BIC Code : </span> {account.swiftCode}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Drawer for Adding New Account */}
            <Drawer
                title="Add New Account Payment Details"
                placement="right"
                onClose={() => setAddAccountDrawer(false)}
                open={addAccountDrawer}
                width={600}
                closable={false}
            >
                <AddBankAccountDrawer
                    form={form}
                    editingAccount={editingAccount}
                    onClose={() => {
                        setAddAccountDrawer(false);
                        setEditingAccount(null);
                        form.resetFields();
                    }}
                />

            </Drawer>

            <Drawer
                title="Delete Account"
                placement="right"
                onClose={() => setDeleteAccountDrawer(false)}
                open={deleteAccountDrawer}
                width={600}
                closable={false}
            >
                <DeleteDrawer onClose={() => setDeleteAccountDrawer(false)} image={LogoutImage} title="Are you sure you want to Delete this Account?" description="Are you certain you want to Delete Account? This action cannot be undone." primaryButtonText="Delete Account" />
            </Drawer>
        </div>
    );
};

export default PaymentMethod;
