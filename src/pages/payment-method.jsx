import React, { useState } from 'react';
import { HiOutlineDotsVertical, HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import PrimaryButton from '../components/common/primary.button';
import { FaPlus } from 'react-icons/fa';
import { Dropdown, Menu, Drawer, Form } from 'antd';
import AddBankAccountDrawer from '../components/add-bank-account-drawer';
import DeleteDrawer from '../components/delete-drawer';
import LogoutImage from '../assets/images/logout-image.png';
import { ROUTE_PATH } from '../config/api-routes.config';
import CardSkeleton from '../components/common/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, QUERY_METHODS } from '../config/query.const';
import { delay } from '../utils/delay';
import { useFetch, useMutate, useQueryState } from '../hooks/useQuery';
import Loader from '../components/common/loader';

const PaymentMethod = () => {

    const [addAccountDrawer, setAddAccountDrawer] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [deleteAccountDrawer, setDeleteAccountDrawer] = useState(false);
    const [selectedDeleteAccountId, setSelectedDeleteAccountId] = useState(null);
    const queryClient = useQueryClient();
    const [form] = Form.useForm();

    // Fetch Accounts
    const query = useFetch(
        [QUERY_KEYS.PAYMENT_METHOD.LIST],
        ROUTE_PATH.PAYMENT.LIST,
        {
            refetchOnMount: true,
            refetchOnWindowFocus: false,
            staleTime: 0,
            cacheTime: 0,
        }
    );

    const { isLoading, isError, data } = useQueryState(query);
    // console.log(data.body)

    const onClickDrawer = () => {
        form.resetFields();
        setAddAccountDrawer(true)
    }

    // edit account
    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setAddAccountDrawer(true);
        form.setFieldsValue({
            accountHolderName: account.accountHolderName,
            bankName: account.bankName,
            bankAddress: account.bankAddress,
            accountNumber: account.accountNumber,
            ifscCode: account.ifscCode,
            swiftBicCode: account.swiftBicCode,
        });
    }

    // Delete account Mutation
    const { mutate: deleteAccountMutation, isPending } = useMutate(
        QUERY_KEYS.PAYMENT_METHOD.DELETE,
        QUERY_METHODS.DELETE,
        `${ROUTE_PATH.PAYMENT.DELETE}/${selectedDeleteAccountId}`,
        {
            onSuccess: async () => {
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PAYMENT_METHOD.LIST] });
                await delay(1000)
                messageApi.open({ type: 'success', content: 'Account deleted successfully!', duration: 2 });
                setDeleteAccountDrawer(false);
                setSelectedDeleteAccountId(null);
            },
            onError: (error) => {
                console.error("Error deleting account:", error);
                setDeleteAccountDrawer(false);
                messageApi.open({
                    type: 'error',
                    content: error.response?.data?.message || 'Failed to delete account. Please try again.',
                });
                setSelectedDeleteAccountId(null);
            }
        }
    )

    // Delete account
    const handleDeleteAccount = (account) => {
        setDeleteAccountDrawer(true);
        setSelectedDeleteAccountId(account._id);
    }

    const handleDeleteConfirm = () => {
        if (selectedDeleteAccountId) {
            deleteAccountMutation();
        }
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(90vh-100px)]">
                <Loader />
            </div>
        );
    }

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
                    {data?.body?.map((account, index) => (
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
                                    <span className="text-[#8D94A3]">Account Name : </span> {account.accountHolderName}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">Bank Name : </span> {account.bankName}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">Branch Address : </span> {account.bankAddress}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">Account Number : </span> {account.accountNumber}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">IFSC Code : </span> {account.ifscCode}
                                </div>
                                <div>
                                    <span className="text-[#8D94A3]">SWIFT/BIC Code : </span> {account.swiftBicCode}
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
                <DeleteDrawer
                    onClose={() => setDeleteAccountDrawer(false)}
                    onDelete={handleDeleteConfirm}
                    image={LogoutImage}
                    title="Are you sure you want to Delete this Account?"
                    description="Are you certain you want to Delete Account? This action cannot be undone." primaryButtonText="Delete Account" />
            </Drawer>
        </div>
    );
};

export default PaymentMethod;
