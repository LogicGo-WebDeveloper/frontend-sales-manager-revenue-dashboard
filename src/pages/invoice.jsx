import React from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { ROUTES } from '../config/route.const'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/common/primary.button'
import InvoiceImage from '../assets/images/invoice.png'

const Invoice = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='flex justify-between items-center p-4'>
                <div className='flex justify-center items-center gap-2'>
                    <HiArrowNarrowLeft size={25} color="#122751" className="cursor-pointer" onClick={() => navigate(ROUTES.DASHBOARD.SETTING_INVOICE_LIST)} />
                    <p className='text-sm text-[#122751] font-medium '>#12457 Invoice Preview</p>
                </div>
                <div>
                    <p className='text-sm text-[#122751] font-medium '>Billing Cycle : 01 March 2025 - 01 April 2025</p>
                </div>
                <div>
                    <PrimaryButton
                        style={{
                            padding: '10px 18px',
                        }}
                    >
                        Download
                    </PrimaryButton>
                </div>
            </div>

            <div className='flex justify-center items-center p-6'>
                <img src={InvoiceImage} alt="Invoice" className='w-full h-full' />
            </div>
        </>
    )
}

export default Invoice
