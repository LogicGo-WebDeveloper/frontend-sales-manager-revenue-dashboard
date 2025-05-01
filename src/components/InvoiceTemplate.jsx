import React from 'react';
import Signature from '../assets/images/signature.png';
import RevenueIcon from '../assets/images/revenue-icon.png';

const InvoiceTemplate = ({ data }) => {
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div
            id="invoice"
            className="w-[794px] min-h-[850px] mx-auto font-sans bg-white border border-[#e5eaf2] rounded-lg shadow-md flex flex-col"
        >
            {/* Header bar */}
            <div className="flex items-center justify-between bg-[#ECEFF5] px-6 pt-2 pb-3 rounded-t-lg">
                <div className="flex items-center">
                    <img src={RevenueIcon} alt="icon" className="w-[115px] h-[29px]" />
                </div>
                <div className="text-[#8D94A3] font-bold text-sm">
                    Invoice No : <span className="text-[#122751] font-bold">#{data.invoiceNo}</span>
                </div>
            </div>

            {/* Client and Dates */}
            <div className="flex items-center justify-between px-8 pt-4 text-sm">
                <div className="text-[#8D94A3] font-medium flex gap-2 items-center">
                    <span>Client Name :</span> 
                    <span className="text-[#122751] font-semibold">{data.clientName}</span>
                </div>
                <div className="text-[#8D94A3] font-medium flex gap-2 items-center">
                    Date : <span className="text-[#122751] font-semibold">{data.date}</span>
                </div>
                <div className="text-[#8D94A3] font-medium flex gap-2 items-center">
                    Due Date : <span className="text-[#122751] font-semibold">{data.dueDate}</span>
                </div>
            </div>

            {/* Bill To / Ship To */}
            <div className="flex justify-between px-8 pt-6 text-sm">
                <div className="text-[#122751] w-[48%]">
                    <div className="font-semibold mb-1 text-[#8D94A3]">Bill To :</div>
                    <div className="font-semibold">{data.billTo.name}</div>
                    <div className="font-normal">{data.billTo.address}</div>
                    <div className="font-normal">{data.billTo.email}</div>
                </div>
                <div className="text-[#122751] w-[48%] text-right">
                    <div className="font-semibold mb-1 text-[#8D94A3]">Ship To :</div>
                    <div className="font-bold">{data.shipTo.name}</div>
                    <div className="font-normal">{data.shipTo.address}</div>
                    <div className="font-normal">{data.shipTo.email}</div>
                </div>
            </div>

            {/* Table */}
            <div className="px-8 pt-8">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-[#ECEFF5]">
                            <th className="border border-[#e5eaf2] p-2 text-[#2363E3] font-semibold">Items</th>
                            <th className="border border-[#e5eaf2] p-2 text-[#2363E3] font-semibold">Quantity</th>
                            <th className="border border-[#e5eaf2] p-2 text-[#2363E3] font-semibold">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, i) => (
                            <tr key={i}>
                                <td className="border border-[#e5eaf2] p-2 text-center text-[#122751]">{item.name}</td>
                                <td className="border border-[#e5eaf2] p-2 text-center text-[#122751]">{item.quantity}</td>
                                <td className="border border-[#e5eaf2] p-2 text-center text-[#122751]">${item.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Important Note & Subtotal */}
            <div className="flex justify-between items-start px-8 pt-4 text-xs">
                <div className="text-[#8D94A3] max-w-[400px]">
                    <span className="font-semibold">Important Note:</span> <span className="text-[#122751] font-normal">{data.importantNote}</span>
                </div>
                <div className="text-right text-[#8D94A3] text-xs font-semibold">
                    Subtotal : <span className="text-[#122751] font-bold">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
            </div>

            {/* Total Items & Total */}
            <div className="flex justify-between items-center px-8 pt-4 pb-2">
                <div className="text-[#8D94A3] text-sm font-semibold">
                    Total Items : <span className="text-[#122751] font-bold">{totalItems}</span>
                </div>
                <div className="text-lg font-bold text-[#2363E3]">
                    Total : <span className="text-[#122751]">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
            </div>

            {/* Payment Info & Signature */}
            <div className="flex justify-between px-8 pt-6 text-sm">
                <div className="text-[#122751] w-[48%]">
                    <div className="font-semibold mb-1 text-[#8D94A3]">Payment Info :</div>
                    <div><span className="font-semibold text-[#8D94A3]">Account Name :</span> {data.paymentInfo.accountName}</div>
                    <div><span className="font-semibold text-[#8D94A3]">Bank Name :</span> {data.paymentInfo.bankName}</div>
                    <div><span className="font-semibold text-[#8D94A3]">Branch Address :</span> {data.paymentInfo.branch}</div>
                    <div><span className="font-semibold text-[#8D94A3]">Account Number :</span> {data.paymentInfo.accountNumber}</div>
                    <div><span className="font-semibold text-[#8D94A3]">IFSC Code :</span> {data.paymentInfo.ifsc}</div>
                    <div><span className="font-semibold text-[#8D94A3]">SWIFT/BIC Code :</span> {data.paymentInfo.swift}</div>
                </div>
                <div className="text-[#122751] w-[48%] text-right flex flex-col items-end">
                    <div className="font-semibold mb-1 text-[#8D94A3]">Signature :</div>
                    <div className="font-bold">{data.signature}</div>
                    <img src={Signature} alt="signature" className="h-[50px] mt-2" />
                </div>
            </div>

            {/* Terms & Thank you */}
            <div className="flex justify-between items-end px-8 pt-6 text-xs text-[#8D94A3]">
                <div className="max-w-[500px]">
                    <span className="font-semibold">Terms and Conditions :</span><br />
                    <span className="text-[#122751] font-normal">{data.terms}</span>
                </div>
            </div>

            <div className="text-center mt-6 font-bold text-[#8D94A3] text-sm bg-[#ECEFF5] py-2 rounded-b-lg">
                Thanks For Your Business
            </div>
        </div>
    );
};

export default InvoiceTemplate;
