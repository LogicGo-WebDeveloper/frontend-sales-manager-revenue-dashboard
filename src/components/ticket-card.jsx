import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Drawer, Pagination } from 'antd';
import profileImage from "../assets/images/profile-icon.png";
import deleteTicketImage from "../assets/images/delete-ticket-image.png";
import { Dropdown, Menu } from 'antd';
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteDrawer from './delete-drawer';
import { ROUTES } from '../config/route.const';
import { Link } from 'react-router-dom';


const tickets = [
    {
        id: 1,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  1 ',
        time: '12:45 PM',
        date: '26 March, 25',
    },
    {
        id: 2,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods. 2 ',
        time: '12:45 PM',
        date: '26 March, 25',
    },
    {
        id: 3,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods. 3 ',
        time: '12:45 PM',
        date: '26 March, 25',
    },
    {
        id: 4,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  4',
        time: '12:45 PM',
        date: '26 March, 25',
    },
    {
        id: 5,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  5',
        time: '12:45 PM',
        date: '26 March, 25',
    },
    {
        id: 6,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  6',
        time: '12:45 PM',
        date: '26 March, 25',
    },
    {
        id: 7,
        email: 'wilsonbin@mail.com',
        question: 'How to deposit money to my portal?',
        description: 'To deposit money into your portal, youll likely need to use a method like online bank transfer, UPI, or a digital wallet, depending on the portals specific payment options.Heres a general guide, but remember to follow the specific instructions provided by the portal you are using:  1. Identify the Portals Payment Methods.Look for a section on "Add Money," "Deposit," or "Payments" that outlines the accepted methods.  7',
        time: '12:45 PM',
        date: '26 March, 25',
    },
];



const TicketComponent = () => {
    const [deleteTicketDrawer, setDeleteTicketDrawer] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const paginatedTickets = tickets.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleTicketDelete = () => {
        setDeleteTicketDrawer(true)
    }

    const getMenuItems = (ticketId) => [
        {
            key: 'delete',
            label: (
                <div
                    className="flex items-center gap-2 text-[#122751]"
                    onClick={() => handleTicketDelete(ticketId)}
                >
                    <FaRegTrashAlt color="#2363E3" />
                    <span>Delete Ticket</span>
                </div>
            ),
        },
    ];


    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-8 pb-2 mb-4 text-[#2363E3]">
                    <p className="font-semibold cursor-pointer border-b-2 border-[#2363E3]">All Ticket</p>
                    <p className="text-[#8D94A3] cursor-pointer">Recent Ticket</p>
                    <p className="text-[#8D94A3] cursor-pointer">Resolved Ticket</p>
                </div>

                {paginatedTickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border-[#8d94a33f] border-1 rounded-lg mb-4">
                        <div className="flex justify-between items-start">
                            {/* Profile Image */}
                            <img src={profileImage} alt="" className="w-8 h-8 mt-1" />

                            {/* Email, Question, Description */}
                            <div className="flex-1 ml-3 mt-2 pr-6 border-b border-[#8d94a325] pb-2">
                                <p className="font-semibold text-[#122751]">{ticket.email}</p>
                                <p className="font-medium text-[#122751] text-sm mt-2">{ticket.question}</p>
                                <p className="text-[#8D94A3] text-xs font-medium mt-1">{ticket.description}</p>
                            </div>

                            {/* Date and 3 Dot Icon */}
                            <div className="flex gap-3 min-w-fit">
                                <p className="text-[#122751] text-sm">{ticket.date}</p>
                                {/* <Dropdown
                                    placement="bottomRight"
                                    menu={
                                        <Menu
                                            style={{ border: "1px solid #DCDFEA" }}
                                            items={[
                                                {
                                                    key: 'delete',
                                                    label: (
                                                        <div
                                                            className="flex items-center gap-2 text-[#122751]"
                                                            onClick={() => handleTicketDelete(ticket.id)}
                                                        >
                                                            <FaRegTrashAlt color='#2363E3' />
                                                            <span>Delete Ticket</span>
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                    }
                                    trigger={['click']}
                                >
                                    <BsThreeDotsVertical className="text-[#122751] cursor-pointer font-bold " />
                                </Dropdown> */}

                                <Dropdown
                                    placement="bottomRight"
                                    overlay={<Menu style={{ border: "1px solid #DCDFEA" }} items={getMenuItems(ticket.id)} />}
                                    trigger={['click']}
                                >
                                    <BsThreeDotsVertical className="text-[#122751] cursor-pointer font-bold " />
                                </Dropdown>



                            </div>
                        </div>

                        {/* Posted at & Open Button */}
                        <div className="mt-3 flex justify-between pl-11">
                            <p className="text-[#122751] text-xs">Posted at {ticket.time}</p>
                            <Link to={ROUTES.DASHBOARD.OPEN_TICKET} className="text-[#2363E3] font-semibold text-xs underline cursor-pointer">
                                Open Ticket
                            </Link>
                        </div>
                    </div>
                ))}

                <div className="flex justify-end mt-4">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={tickets.length}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>

            {/* Drawer */}
            <Drawer
                title="Delete Ticket"
                placement="right"
                onClose={() => setDeleteTicketDrawer(false)}
                open={deleteTicketDrawer}
                width={600}
                closable={false}
            >
                <DeleteDrawer onClose={() => setDeleteTicketDrawer(false)} image={deleteTicketImage} title="Are you sure you want to delete this ticket?" description="Are you certain you want to permanently delete this ticket? This action cannot be undone." primaryButtonText="Delete Ticket" />
            </Drawer>
        </>
    );
};

export default TicketComponent;
