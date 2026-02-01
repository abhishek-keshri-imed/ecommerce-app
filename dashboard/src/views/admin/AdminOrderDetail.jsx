import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  MdLocalShipping,
  MdPayment,
  MdPrint,
  MdInfoOutline,
} from "react-icons/md";
import { useReactToPrint } from "react-to-print";

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState("pending");
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `Order_${orderId}`,
  });

  const order = {
    _id: orderId,
    date: "Feb 1, 2026",
    customerName: "Abhishek Keshri",
    email: "abhishek@example.com",
    address: "123 Tech Park, Silicon Valley, CA",
    totalPrice: 4250,
    paymentStatus: "paid",
    products: Array(5).fill({
      name: "Wireless Headphones",
      brand: "Sony",
      qty: 1,
      price: 300,
      image: "https://picsum.photos/100?random=20",
    }),
  };

  return (
    <div className="h-[calc(100vh-110px)] w-full bg-[#f8f9fa] flex flex-col px-3 md:px-7 pb-5 overflow-hidden">
      {/* Header Section - Added no-print */}
      <div className="py-6 shrink-0 flex justify-between items-center no-print">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            ID: {orderId}
          </p>
        </div>

        <button
          onClick={() => handlePrint()}
          className="relative group overflow-hidden flex items-center gap-3 px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-2xl transition-all duration-500 hover:bg-indigo-600 hover:ring-4 hover:ring-indigo-500/20 active:scale-95"
        >
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
          <MdPrint className="transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" size={18} />
          <span className="relative z-10 tracking-wide">Print Invoice</span>
        </button>
      </div>

      {/* Main Content Card */}
      <div
        ref={contentRef}
        className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-200 mb-5 flex flex-col overflow-hidden print:shadow-none print:border-none"
      >
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Panel */}
          <div className="w-full lg:w-87.5 border-r border-gray-100 p-6 overflow-y-auto custom-scrollbar bg-gray-50/20 print:bg-white print:border-r">
            <div className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-3 text-indigo-600">
                  <MdInfoOutline size={20} />
                  <h2 className="font-bold text-gray-700">Order Summary</h2>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase text-gray-400 font-bold">Delivery Status</span>
                    <span className={`px-2 py-1 rounded-lg text-[9px] uppercase font-black tracking-tighter border ${status === "pending" ? "bg-amber-50 text-amber-600 border-amber-100" : status === "cancelled" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}`}>{status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase text-gray-400 font-bold">Payment</span>
                    <span className="text-xs font-bold text-gray-700 uppercase">{order.paymentStatus}</span>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3 text-gray-500">
                  <MdLocalShipping size={20} />
                  <h2 className="font-bold text-gray-700">Shipping To</h2>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <p className="text-sm font-bold text-gray-700">{order.customerName}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">{order.address}</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                  <MdPayment size={20} />
                  <h2 className="font-bold text-gray-700">Payment Summary</h2>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-2">
                  <div className="flex justify-between text-sm pt-2">
                    <span className="font-bold text-gray-700">Grand Total</span>
                    <span className="font-bold text-indigo-600">${order.totalPrice}</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Panel: Products */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="font-bold text-gray-700 uppercase text-[10px] tracking-widest">Items Ordered</h2>
              <span className="text-[10px] bg-indigo-50 px-2 py-1 rounded text-indigo-600 font-bold">{order.products.length} SKU</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3 bg-gray-50/10 print:bg-white">
              {order.products.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 print:border-b print:rounded-none">
                  <div className="flex items-center gap-4">
                    <img className="w-12 h-12 rounded-lg object-cover print:w-10 print:h-10" src={p.image} alt="" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-700">{p.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold">Qty: {p.qty}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-700">${p.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Control Footer - Added no-print */}
        <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center shrink-0 no-print">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Change status</span>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="px-4 py-1.5 focus:border-indigo-500 outline-none bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 cursor-pointer shadow-sm transition-all hover:border-indigo-300"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        
        @keyframes shine { 100% { left: 125%; } }
        .group-hover\\:animate-shine { animation: shine 0.8s; }

        @media print {
          /* Hide non-essential UI */
          .no-print, .no-print * { 
            display: none !important; 
            height: 0 !important; 
            margin: 0 !important; 
            padding: 0 !important; 
          }
          
          /* Force container to expand */
          .h-\\[calc\\(100vh-110px\\)\\] { height: auto !important; }
          .flex-1 { overflow: visible !important; height: auto !important; }
          .custom-scrollbar { overflow: visible !important; height: auto !important; }
          .overflow-hidden { overflow: visible !important; }
          
          /* Clean up borders for paper */
          .bg-gray-50\\/20, .bg-gray-50\\/10 { background-color: white !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminOrderDetail;