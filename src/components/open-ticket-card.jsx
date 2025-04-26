import React, { useState } from 'react';
import profileImage from "../assets/images/profile-icon.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, Menu, Modal, Input, Button, Form, Drawer } from 'antd';
import { FaRegTrashAlt } from "react-icons/fa";
import SecondryButton from './common/secondry.button';
import PrimaryButton from './common/primary.button';
import { getValidationRule } from '../utils/validation';
import DeleteDrawer from './delete-drawer';
import deleteMessageImage from '../assets/images/delete-message-image.png'

const { TextArea } = Input;

const tickets = [
    {
        id: 1,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, you\'ll likely need to use a method like online bank transfer, UPI, or a digital wallet...',
        time: '12:45 PM',
        date: '26 March, 25',
    },
    {
        id: 2,
        email: 'alexrobart251@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, you\'ll likely need to use a method like online bank transfer, UPI, or a digital wallet...',
        time: '20:23 PM',
        date: '26 March, 25',
    }
];

const OpenTicketCard = () => {
    const [deleteMessageDrawer, setDeleteMessageDrawer] = useState(false);
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [description, setDescription] = useState('');

    const handleReplyClick = (ticket) => {
        setSelectedTicket(ticket);
        setReplyModalVisible(true);
    };

    const handleReplySubmit = () => {
        console.log('Reply submitted for:', selectedTicket?.email, description);
        // Reset and close modal
        setReplyModalVisible(false);
        setDescription('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between gap-20">
            <div>
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border-[#8d94a33f] border rounded-lg mb-6">
                        <div className="flex justify-between items-start">
                            <img src={profileImage} alt="" className="w-8 h-8 mt-1" />

                            <div className="flex-1 ml-3 mt-2 pr-6 border-b border-[#8d94a325] pb-2">
                                <p className="font-semibold text-[#122751]">{ticket.email}</p>
                                <p className="font-medium text-[#122751] text-sm mt-2">{ticket.question}</p>
                                <p className="text-[#8D94A3] text-xs font-medium mt-1">{ticket.description}</p>
                            </div>

                            <div className="flex gap-3 min-w-fit">
                                <p className="text-[#122751] text-sm">{ticket.date}</p>
                                <Dropdown
                                    placement="bottomRight"
                                    menu={{
                                        items: [
                                            {
                                                key: 'delete',
                                                label: (
                                                    <div
                                                        className="flex items-center gap-2 text-[#122751]"
                                                        onClick={() => setDeleteMessageDrawer(true)}
                                                    >
                                                        <FaRegTrashAlt color="#2363E3" />
                                                        <span>Delete Message</span>
                                                    </div>
                                                ),
                                            },
                                        ],
                                    }}
                                    trigger={['click']}
                                >
                                    <BsThreeDotsVertical className="text-[#122751] cursor-pointer font-bold" />
                                </Dropdown>
                            </div>
                        </div>

                        <div className="mt-3 flex justify-between pl-11">
                            <p className="text-[#122751] text-xs">Posted at {ticket.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Reply & Close Buttons */}
            <div className="flex justify-end gap-4">
                <SecondryButton
                    style={{ height: "40px", width: "90px", fontWeight: "600", color: "#122751" }}
                    onClick={() => handleReplyClick(tickets[0])}
                >
                    Reply
                </SecondryButton>
                <PrimaryButton style={{ height: "40px", width: "140px" }}>
                    Close Ticket
                </PrimaryButton>
            </div>

            {/* Reply Modal */}
            <Modal
                open={replyModalVisible}
                onCancel={() => setReplyModalVisible(false)}
                footer={null}
                width={{ xs: '65%', sm: '65%', md: '65%', lg: '65%', xl: '65%', xxl: '65%' }}
                style={{display: "relative", top: "20%"}}
            >
                <h1 className='text-base font-semibold text-[#122751] mb-4'>Reply Ticket</h1>
                <Form
                    layout="vertical"
                    onFinish={handleReplySubmit}
                    initialValues={{
                        email: selectedTicket?.email || '',
                        description: description,
                    }}
                >
                    <Form.Item
                        label="Add Recipient"
                        name="email"
                        className="text-[#8D94A3] text-xs font-medium form-item"
                        rules={getValidationRule("email", true)}
                    >
                        <Input readOnly />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        className="text-[#8D94A3] text-xs font-medium form-item"
                        rules={getValidationRule("description", true)}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="flex justify-end mt-4 gap-3">
                            <SecondryButton
                                style={{ height: "40px", width: "100px" }}
                                onClick={() => setReplyModalVisible(false)}
                            >
                                Cancel
                            </SecondryButton>
                            <PrimaryButton
                                htmlType="submit"
                                style={{ height: "40px", width: "140px", fontSize: "14px" }}
                            >
                                Submit Request
                            </PrimaryButton>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Drawer */}
            <Drawer
                title="Delete Message"
                placement="right"
                onClose={() => setDeleteMessageDrawer(false)}
                open={deleteMessageDrawer}
                width={600}
                closable={false}
            >
                <DeleteDrawer onClose={() => setDeleteMessageDrawer(false)} image={deleteMessageImage} title="Are you sure you want to delete this message?" description="Are you certain you want to permanently delete this message? This action cannot be undone." primaryButtonText="Delete Message" />
            </Drawer>
        </div>
    );
};

export default OpenTicketCard;
