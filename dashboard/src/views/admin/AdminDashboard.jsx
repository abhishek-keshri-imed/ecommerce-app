import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const recentMessages = [
    { name: "Abhishek Kumar", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek", msg: "Hey, did you check the latest order from Delhi?", time: "1 min ago", online: true },
    { name: "Priya Sharma", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", msg: "The stock for Blue Denim is running low.", time: "15 min ago", online: false },
    { name: "Vikram Singh", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram", msg: "Refund request approved for Order #8829.", time: "1 hour ago", online: true },
    { name: "Karan Johar", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan", msg: "The shipment for Order #9910 is delayed.", time: "2 hours ago", online: false },
  ];

  const recentOrders = [
    { id: "#45211", price: 654, paymentStatus: "paid", orderStatus: "pending" },
    { id: "#45212", price: 120, paymentStatus: "unpaid", orderStatus: "pending" },
    { id: "#45213", price: 543, paymentStatus: "paid", orderStatus: "cancelled" },
    { id: "#45214", price: 232, paymentStatus: "paid", orderStatus: "delivered" },
    { id: "#45215", price: 980, paymentStatus: "unpaid", orderStatus: "processing" },
  ];

  const state = {
    series: [
      { name: "Orders", data: [34, 45, 31, 56, 42, 33, 48, 52, 60, 72, 81, 95] },
      { name: "Revenue", data: [42, 32, 45, 32, 43, 52, 55, 60, 65, 70, 75, 80] },
      { name: "Sales", data: [25, 35, 20, 45, 30, 25, 40, 45, 50, 55, 60, 65] },
    ],
    options: {
      chart: {
        background: "transparent",
        foreColor: "#64748b", // Slate-500 for light mode text
        toolbar: { show: true },
      },
      colors: ['#7367f0', '#28c76f', '#ea5455'], // Professional Brand Colors
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      grid: {
        borderColor: "#f1f5f9", // Light grid lines
        strokeDashArray: 5,
      },
      legend: { position: "top" },
    },
  };

  return (
    // Main background changed to white/light gray
    <div className="px-2 md:px-7 py-5 bg-[#f8f9fa] min-h-screen font-sans">
      
      {/* 4-column Stats Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {[
          { label: "Total Sales", val: "$450", icon: <BsCurrencyDollar />, color: "text-green-500", bg: "bg-green-100" },
          { label: "Products", val: "50", icon: <RiProductHuntLine />, color: "text-purple-500", bg: "bg-purple-100" },
          { label: "Sellers", val: "12", icon: <FaUserTie />, color: "text-blue-500", bg: "bg-blue-100" },
          { label: "Orders", val: "5", icon: <AiOutlineShoppingCart />, color: "text-indigo-500", bg: "bg-indigo-100" },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-800">{item.val}</h2>
              <span className="text-sm font-medium text-gray-500">{item.label}</span>
            </div>
            <div className={`w-12 h-12 rounded-full ${item.bg} flex justify-center items-center text-xl ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-wrap mt-7">
        {/* Left Side: Chart */}
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center pb-4">
              <h2 className="font-bold text-lg text-gray-800">Orders / Revenue</h2>
              <select className="bg-gray-50 border border-gray-200 text-gray-600 p-1.5 rounded-lg outline-none text-sm">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <Chart options={state.options} series={state.series} type="bar" height={350} />
          </div>
        </div>

        {/* Right Side: Messages (Fixed Height to prevent overflow) */}
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-[450px] flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 shrink-0">
              <h2 className="font-bold text-lg text-gray-800">Recent Seller Messages</h2>
              <Link to="/admin/messages" className="text-sm text-indigo-600 hover:underline font-medium">View All</Link>
            </div>
            <div className="flex-1 overflow-y-auto mt-2 custom-scrollbar">
              {recentMessages.map((seller, i) => (
                <div key={i} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group">
                  <div className="relative shrink-0">
                    <img className="w-11 h-11 rounded-full border-2 border-indigo-100" src={seller.image} alt="" />
                    <div className={`w-3 h-3 rounded-full absolute right-0 bottom-0 border-2 border-white ${seller.online ? "bg-green-500" : "bg-gray-300"}`}></div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <h2 className="text-sm font-bold text-gray-700">{seller.name}</h2>
                      <span className="text-[10px] text-gray-400">{seller.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-1">{seller.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="w-full p-6 bg-white rounded-xl border border-gray-100 shadow-sm mt-7">
        <div className="flex justify-between items-center pb-5">
          <h2 className="font-bold text-lg text-gray-800">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-indigo-600 font-bold hover:underline">View All Orders</Link>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-50 rounded-lg">
              <tr>
                <th className="py-4 px-4">Order ID</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {recentOrders.map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
                  <td className="py-4 px-4 font-bold text-gray-800">{order.id}</td>
                  <td className="py-4 px-4 font-semibold">${order.price}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-600`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Link to={`/admin/order/${order.id}`} className="text-indigo-600 hover:text-indigo-800 font-bold text-xs">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;