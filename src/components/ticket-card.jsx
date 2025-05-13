import React, { useState, useEffect } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Drawer, Empty, Pagination, message as antdMessage } from 'antd';
import profileImage from "../assets/images/profile-icon.png";
import deleteTicketImage from "../assets/images/delete-ticket-image.png";
import { Dropdown, Menu } from 'antd';
import { FaRegTrashAlt } from "react-icons/fa";
import DeleteDrawer from './delete-drawer';
import { ROUTES } from '../config/route.const';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFetch, useMutate, useQueryState } from '../hooks/useQuery';
import { ROUTE_PATH } from '../config/api-routes.config';
import CardSkeleton from './common/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, QUERY_METHODS } from '../config/query.const';
import { delay } from '../utils/delay';

const TicketCard = ({ dateRange }) => {
    const [deleteTicketDrawer, setDeleteTicketDrawer] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const [selectedTicketId, setSelectedTicketId] = useState(null)
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = antdMessage.useMessage();
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();
    const location = useLocation();

    // Set initial tab based on route
    useEffect(() => {
        const path = location.pathname;
        if (path === ROUTES.DASHBOARD.RECENT_TICKETS) {
            setActiveTab('recent');
        } else if (path === ROUTES.DASHBOARD.RESOLVED_TICKETS) {
            setActiveTab('resolved');
        } else {
            setActiveTab('all');
        }

        setCurrentPage(1);
    }, [location.pathname, dateRange]);

    // Fetch tickets data 
    const query = useFetch(
        [QUERY_KEYS.SUPPORT_TICKET.GET, currentPage, dateRange, activeTab],
        `${ROUTE_PATH.SUPPORT_TICKET.LIST}?page=${currentPage}&limit=${activeTab === 'recent' ? 5 : pageSize}&dateRange=${dateRange}&status=${activeTab === 'resolved' ? 'resolved' : ''}`,
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            staleTime: 0,
            // refetchInterval: 5000,
            cacheTime: 0,
        }
    );
    const { isLoading, isError, error, data } = useQueryState(query);

    // console.log("data >>>>>>>>>", data)

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);

        // Navigate to appropriate route
        switch (tab) {
            case 'recent':
                navigate(ROUTES.DASHBOARD.RECENT_TICKETS);
                break;
            case 'resolved':
                navigate(ROUTES.DASHBOARD.RESOLVED_TICKETS);
                break;
            default:
                navigate(ROUTES.DASHBOARD.CONTACT);
        }
    };

    // Filter tickets based on active tab
    const filteredTickets = React.useMemo(() => {
        if (!data?.body) return [];

        if (activeTab === 'recent') {
            return data.body.slice(0, 5);
        }
        return data.body;
    }, [data?.body, activeTab]);

    // Handle ticket deletion
    const { mutate: deleteTicketMutation, isPending } = useMutate(
        QUERY_KEYS.SUPPORT_TICKET.DELETE,
        QUERY_METHODS.DELETE,
        `${ROUTE_PATH.SUPPORT_TICKET.DELETE}/${selectedTicketId}`,
        {
            onSuccess: async () => {
                await delay(1000)
                messageApi.open({ type: 'success', content: 'Ticket deleted successfully!', duration: 2 });
                setDeleteTicketDrawer(false);
                setSelectedTicketId(null);
                // Invalidate the tickets query to refresh the list
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUPPORT_TICKET.GET] });
            },
            onError: (error) => {
                console.error("Error deleting ticket:", error);
                setDeleteTicketDrawer(false);
                messageApi.open({
                    type: 'error',
                    content: error.response?.data?.message || 'Failed to delete ticket. Please try again.',
                    duration: 2,
                });
            }
        }
    );

    const handleTicketDelete = (ticketId) => {
        setDeleteTicketDrawer(true);
        setSelectedTicketId(ticketId);
    }

    const handleConfirmDelete = () => {
        if (selectedTicketId) {
            deleteTicketMutation();
        }
    };

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
            {contextHolder}

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-[76vh]">
                {/* Sticky Tabs */}
                <div className="sticky top-0 z-10 bg-white flex gap-8 pb-2 mb-4 text-[#2363E3]">
                    <p
                        className={`font-semibold cursor-pointer ${activeTab === 'all' ? 'border-b-2 border-[#2363E3]' : 'text-[#8D94A3]'}`}
                        onClick={() => handleTabChange('all')}
                    >
                        All Ticket
                    </p>
                    <p
                        className={`cursor-pointer ${activeTab === 'recent' ? 'border-b-2 border-[#2363E3] font-semibold' : 'text-[#8D94A3]'}`}
                        onClick={() => handleTabChange('recent')}
                    >
                        Recent Ticket
                    </p>
                    <p
                        className={`cursor-pointer ${activeTab === 'resolved' ? 'border-b-2 border-[#2363E3] font-semibold' : 'text-[#8D94A3]'}`}
                        onClick={() => handleTabChange('resolved')}
                    >
                        Resolved Ticket
                    </p>
                </div>

                {/* Scrollable Ticket List */}
                <div className="flex-1 overflow-y-auto pr-2">
                    {isLoading ? (
                        <CardSkeleton active count={pageSize} />
                    ) : filteredTickets.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Tickets Found" />
                        </div>
                    ) : (
                        filteredTickets.map((ticket) => (
                            <div key={ticket._id} className="p-4 border-[#8d94a33f] border-1 rounded-lg mb-4">
                                <div className="flex justify-between items-start">
                                    <img src={profileImage} alt="" className="w-8 h-8 mt-1" />

                                    <div className="flex-1 ml-3 mt-2 pr-6 border-b border-[#8d94a325] pb-2">
                                        <p className="font-semibold text-[#122751]">{ticket.email}</p>
                                        <p className="font-medium text-[#122751] text-sm mt-2">{ticket.title}</p>
                                        <p className="text-[#8D94A3] text-xs font-medium mt-1">{ticket.description}</p>
                                    </div>

                                    <div className="flex gap-2 min-w-fit">
                                        <p className="text-[#122751] text-sm">
                                            {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "2-digit",
                                            })}
                                        </p>

                                        <Dropdown
                                            placement="bottomRight"
                                            menu={{ items: getMenuItems(ticket._id), style: { border: "1px solid #DCDFEA" } }}
                                            trigger={['click']}
                                        >
                                            <BsThreeDotsVertical className="text-[#122751] cursor-pointer font-bold " />
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="mt-3 flex justify-between pl-11">
                                    <p className="text-[#122751] text-xs">
                                        Posted at {new Date(ticket.createdAt).toLocaleTimeString()}
                                    </p>
                                    {activeTab !== 'resolved' && (
                                        <Link
                                            to={`${ROUTES.DASHBOARD.OPEN_TICKET.replace(':ticketId', ticket._id)}`}
                                            className="text-[#2363E3] font-semibold text-xs underline cursor-pointer"
                                        >
                                            Open Ticket
                                        </Link>
                                    )}

                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Sticky Pagination */}
                {
                    activeTab === 'recent' ? <></> : (

                        <div className="sticky bottom-0 z-10 bg-white  flex justify-end pt-2">
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={data?.pagination?.totalItems || 0}
                                onChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    )
                }
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
                <DeleteDrawer
                    onClose={() => setDeleteTicketDrawer(false)}
                    onDelete={handleConfirmDelete}
                    image={deleteTicketImage}
                    title="Are you sure you want to delete this ticket?"
                    description="Are you certain you want to permanently delete this ticket? This action cannot be undone."
                    primaryButtonText="Delete Ticket"
                    loading={isPending}
                />
            </Drawer>
        </>
    );
};

export default TicketCard;
