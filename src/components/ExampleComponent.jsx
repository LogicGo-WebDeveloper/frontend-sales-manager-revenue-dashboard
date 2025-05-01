import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";
import authIcon from '../assets/images/auth-icon.png';
import Signature from '../assets/images/signature.png';
import RevenueIcon from '../assets/images/revenue-icon.png';

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

const A4_WIDTH = 794; // px at 96dpi
const A4_HEIGHT = 850; // px at 96dpi

const ExampleComponent = ({ data = invoiceData }) => {
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);

    const downloadPDF = async () => {
        const element = document.getElementById("invoice");
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "pt", [A4_WIDTH, A4_HEIGHT]);
        pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH, A4_HEIGHT);
        pdf.save("invoice.pdf");
    };

    return (
        <div style={{ padding: 20, background: '#f4f8fb', minHeight: '50vh' }}>
            <div
                id="invoice"
                style={{
                    width: `${A4_WIDTH}px`,
                    minHeight: `${A4_HEIGHT}px`,
                    margin: '0 auto',
                    fontFamily: 'Arial, sans-serif',
                    background: '#fff',
                    border: '1px solid #e5eaf2',
                    borderRadius: 8,
                    boxShadow: '0 2px 8px #e5eaf2',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ECEFF5', padding: '18px 32px 12px 24px', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <div className="flex items-center">
                        <img
                            src={RevenueIcon}
                            alt="icon"
                            className="w-[140px] h-[32px]"
                        />
                        {/* <span className="text-xl sm:text-lg font-bold text-[#122751] relative top-0 left-0.5">
                            evenueSync
                        </span> */}
                    </div>
                    <div style={{ color: '#8D94A3', fontWeight: 700, fontSize: 15 }}>Invoice No : <span style={{ color: '#122751', fontWeight: 700 }}>#{data.invoiceNo}</span></div>
                </div>
                {/* Second row: Client name left, date center, due date right */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px 0 32px', fontSize: 15 }}>
                    <div style={{ color: '#8D94A3', fontWeight: 500 }}>Client Name : <span style={{ color: '#122751', fontWeight: 700 }}>{data.clientName}</span></div>
                    <div style={{ color: '#8D94A3', fontWeight: 500 }}>Date : <span style={{ color: '#122751', fontWeight: 700 }}>{data.date}</span></div>
                    <div style={{ color: '#8D94A3', fontWeight: 500 }}>Due Date : <span style={{ color: '#122751', fontWeight: 700 }}>{data.dueDate}</span></div>
                </div>
                {/* Bill To / Ship To */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px 32px 0 32px', fontSize: 14 }}>
                    <div style={{ color: '#122751', width: '48%' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: '#8D94A3' }}>Bill To :</div>
                        <div style={{ fontWeight: 700 }}>{data.billTo.name}</div>
                        <div style={{ fontWeight: 400 }}>{data.billTo.address}</div>
                        <div style={{ fontWeight: 400 }}>{data.billTo.email}</div>
                    </div>
                    <div style={{ color: '#122751', width: '48%', textAlign: 'right' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: '#8D94A3' }}>Ship To :</div>
                        <div style={{ fontWeight: 700 }}>{data.shipTo.name}</div>
                        <div style={{ fontWeight: 400 }}>{data.shipTo.address}</div>
                        <div style={{ fontWeight: 400 }}>{data.shipTo.email}</div>
                    </div>
                </div>
                {/* Table */}
                <div style={{ margin: '32px 32px 0 32px' }}>
                    <table width="100%" style={{ borderCollapse: "collapse", fontSize: 14 }}>
                        <thead>
                            <tr style={{ background: '#ECEFF5' }}>
                                <th style={{ border: "1px solid #e5eaf2", padding: 10, color: '#2363E3', fontWeight: 600 }}>Items</th>
                                <th style={{ border: "1px solid #e5eaf2", padding: 10, color: '#2363E3', fontWeight: 600 }}>Quantity</th>
                                <th style={{ border: "1px solid #e5eaf2", padding: 10, color: '#2363E3', fontWeight: 600 }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, i) => (
                                <tr key={i}>
                                    <td style={{ border: "1px solid #e5eaf2", padding: 10, textAlign: 'center', color: '#122751' }}>{item.name}</td>
                                    <td style={{ border: "1px solid #e5eaf2", padding: 10, textAlign: 'center', color: '#122751' }}>{item.quantity}</td>
                                    <td style={{ border: "1px solid #e5eaf2", padding: 10, textAlign: 'center', color: '#122751' }}>${item.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Important Note & Subtotal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '16px 32px 0 32px', fontSize: 13 }}>
                    <div style={{ color: '#8D94A3', maxWidth: 400 }}>
                        <span style={{ fontWeight: 600 }}>Important Note:</span> <span style={{ color: '#122751', fontWeight: 400 }}>{data.importantNote}</span>
                    </div>
                    <div style={{ textAlign: "right", color: '#8D94A3', fontSize: 13, fontWeight: 600 }}>
                        Subtotal : <span style={{ color: '#122751', fontWeight: 700 }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
                {/* Total Items & Total */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', margin: '16px 32px 0 32px', borderBottom: '1px solid #e5eaf2', paddingBottom: 8 }}>
                    <div style={{ color: '#8D94A3', fontSize: 14, fontWeight: 600 }}>
                        Total Items : <span style={{ color: '#122751', fontWeight: 700 }}>{totalItems}</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#2363E3' }}>Total : <span style={{ color: '#122751' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                </div>
                {/* Payment Info & Signature */}
                <div style={{ display: "flex", justifyContent: "space-between", margin: '24px 32px 0 32px', fontSize: 14 }}>
                    <div style={{ color: '#122751', width: '48%' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: '#8D94A3' }}>Payment Info :</div>
                        <div><span style={{ fontWeight: 600, color: '#8D94A3' }}>Account Name :</span> {data.paymentInfo.accountName}</div>
                        <div><span style={{ fontWeight: 600, color: '#8D94A3' }}>Bank Name :</span> {data.paymentInfo.bankName}</div>
                        <div><span style={{ fontWeight: 600, color: '#8D94A3' }}>Branch Address :</span> {data.paymentInfo.branch}</div>
                        <div><span style={{ fontWeight: 600, color: '#8D94A3' }}>Account Number :</span> {data.paymentInfo.accountNumber}</div>
                        <div><span style={{ fontWeight: 600, color: '#8D94A3' }}>IFSC Code :</span> {data.paymentInfo.ifsc}</div>
                        <div><span style={{ fontWeight: 600, color: '#8D94A3' }}>SWIFT/BIC Code :</span> {data.paymentInfo.swift}</div>
                    </div>
                    <div style={{ color: '#122751', width: '48%', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: '#8D94A3' }}>Signature :</div>
                        <div style={{ fontWeight: 700 }}>{data.signature}</div>
                        <img src={Signature} alt="signature" style={{ height: 50, marginTop: 8 }} />
                    </div>
                </div>
                {/* Terms & Thank you */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '24px 32px 0 32px', fontSize: 12, color: '#8D94A3' }}>
                    <div style={{ maxWidth: 500 }}>
                        <span style={{ fontWeight: 600 }}>Terms and Conditions :</span><br />
                        <span style={{ color: '#122751', fontWeight: 400 }}>{data.terms}</span>
                    </div>
                </div>
                <div style={{ textAlign: "center", margin: '24px 0 0 0', fontWeight: "bold", color: '#8D94A3', fontSize: 15, background: '#ECEFF5', padding: 10, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                    Thanks For Your Business
                </div>
            </div>
            <button
                onClick={downloadPDF}
                style={{ marginTop: 24, background: '#2363E3', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
            >
                Download PDF
            </button>
        </div>
    );
};

export default ExampleComponent;
