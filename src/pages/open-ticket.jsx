import React from 'react'
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/route.const';
import OpenTicketCard from '../components/open-ticket-card';

const OpenTicket = () => {
    return (
        <div className="bg-[#F4F5F6] min-h-full px-10 md:px-40 py-6">
            {/* Top Header */}
            <div className="flex justify-start items-center flex-wrap gap-4 mb-6">
                <Link to={ROUTES.DASHBOARD.CONTACT}>
                    <HiArrowNarrowLeft size={25} color="#122751" className="cursor-pointer"/>
                </Link>
                <div>
                    <h1 className="text-xl font-semibold text-[#122751]">Ticket</h1>
                    <p className="text-sm text-[#8D94A3] mt-1">
                        View All Chat Conversations and Support Tickets
                    </p>
                </div>
            </div>

            <OpenTicketCard />
        </div>
    )
}

export default OpenTicket
