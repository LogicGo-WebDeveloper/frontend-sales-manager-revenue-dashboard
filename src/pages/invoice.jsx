import React, { useRef } from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { ROUTES } from '../config/route.const'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../components/common/primary.button'
import InvoiceTemplate from '../components/InvoiceTemplate'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const invoiceData = {
    invoiceNo: "12457",
    clientName: "Darsh",
    date: "01 March 2025",
    dueDate: "01 April 2025",
    billTo: {
        name: "Bluebest Industries",
        address: "Surabaya, East Java, Indonesia",
        email: "bluebestindustry@gmail.com"
    },
    shipTo: {
        name: "NovaCal LLC",
        address: "str Gradinarilor, sc 2, Indonesia",
        email: "novacalllc@gmail.com"
    },
    items: [
        { name: "DreamSell", quantity: 1, price: 699 },
        { name: "Trulysell", quantity: 1, price: 699 },
        { name: "ServBook", quantity: 1, price: 699 }
    ],
    importantNote: "It was delightful collaborating with you. We look forward to being considered for the next order. Thank you!",
    paymentInfo: {
        accountName: "Wilson Lubin",
        bankName: "Bank Negara Indonesia",
        branch: "BNI Building, Floor 7, Jalan Jenderal, Sudirman",
        accountNumber: "222333002352488",
        ifsc: "BNI0124VBNS",
        swift: "BNI0124VB50125"
    },
    signature: "Bluebest Industry",
    terms: "Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments."
};

const A4_WIDTH = 794;
const A4_HEIGHT = 850;

const Invoice = () => {
    const navigate = useNavigate();

    const handleDownload = async () => {
        const element = document.getElementById("invoice");
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", [A4_WIDTH, A4_HEIGHT]);
        pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH, A4_HEIGHT);
        pdf.save("invoice.pdf");
    };

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
                        onClick={handleDownload}
                    >
                        Download
                    </PrimaryButton>
                </div>
            </div>

            {/* Template preview */}
            <div className='flex justify-center py-8'>
                <InvoiceTemplate data={invoiceData} />
            </div>
        </>
    )
}

export default Invoice
