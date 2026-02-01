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
    { name: "Sonia Verma", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sonia", msg: "New seller registration pending review.", time: "3 hours ago", online: true },
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
        foreColor: "#94a3b8",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '55%',
        }
      },
      colors: ['#7367f0', '#28c76f', '#ea5455'],
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      fill: { opacity: 1 },
      grid: {
        borderColor: "#f1f5f9",
        strokeDashArray: 5,
      },
      legend: {
        position: "top",
        fontWeight: 600,
        labels: { colors: '#64748b' }
      },
      tooltip: { theme: 'light' }
    },
  };

  return (
    // VIEWPORT LOCK: Content area matches the height of the screen minus your navbar
    <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative'>
      
      {/* Scrollable Dashboard Body */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar overscroll-contain">
        
        {/* 4-column Stats Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {[
            { label: "Total Sales", val: "$4,580", icon: <BsCurrencyDollar />, color: "text-green-600", bg: "bg-green-100" },
            { label: "Products", val: "124", icon: <RiProductHuntLine />, color: "text-purple-600", bg: "bg-purple-100" },
            { label: "Sellers", val: "32", icon: <FaUserTie />, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Orders", val: "85", icon: <AiOutlineShoppingCart />, color: "text-indigo-600", bg: "bg-indigo-100" },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-default group">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{item.val}</h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{item.label}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex justify-center items-center text-xl ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-wrap mt-7">
          {/* Left Side: Chart */}
          <div className="w-full lg:w-7/12 lg:pr-3">
            <div className="w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center pb-6">
                <h2 className="font-bold text-lg text-gray-800">Revenue Analytics</h2>
                <select className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg outline-none text-xs font-bold shadow-sm cursor-pointer hover:border-indigo-500">
                  <option value="2026">Year 2026</option>
                  <option value="2025">Year 2025</option>
                </select>
              </div>
              <Chart options={state.options} series={state.series} type="bar" height={350} />
            </div>
          </div>

          {/* Right Side: Messages */}
          <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
            <div className="w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-117.5 flex flex-col">
              <div className="flex justify-between items-center pb-5 border-b border-gray-50 shrink-0">
                <h2 className="font-bold text-lg text-gray-800">Direct Messages</h2>
                <Link to="/admin/chat-sellers" className="text-xs text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-tighter">View All</Link>
              </div>
              <div className="flex-1 overflow-y-auto mt-4 custom-scrollbar pr-2">
                {recentMessages.map((seller, i) => (
                  <div key={i} className="flex gap-4 p-3 hover:bg-indigo-50/40 rounded-xl transition-all cursor-pointer group mb-1">
                    <div className="relative shrink-0">
                      <img className="w-12 h-12 rounded-xl object-cover border border-gray-100 group-hover:border-indigo-200" src={seller.image} alt="" />
                      <div className={`w-3.5 h-3.5 rounded-full absolute -right-1 -bottom-1 border-2 border-white ${seller.online ? "bg-green-500" : "bg-gray-300"}`}></div>
                    </div>
                    <div className="flex flex-col w-full overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold text-gray-700 group-hover:text-indigo-700">{seller.name}</h2>
                        <span className="text-[10px] font-bold text-gray-400">{seller.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1 leading-relaxed">{seller.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 shadow-sm mt-7 mb-4">
          <div className="flex justify-between items-center pb-6">
            <h2 className="font-bold text-lg text-gray-800">Recent Transactions</h2>
            <Link to="/admin/orders" className="text-xs font-bold text-indigo-600 uppercase tracking-wide hover:underline">Full Report</Link>
          </div>

          <div className="relative overflow-x-auto rounded-xl border border-gray-50">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-400 uppercase tracking-widest font-bold bg-gray-50/80">
                <tr>
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6 text-center">Payment</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y divide-gray-50">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-indigo-50/20 transition-all group">
                    <td className="py-4 px-6 font-bold text-indigo-600 italic">{order.id}</td>
                    <td className="py-4 px-6 font-bold text-gray-800">${order.price}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase bg-indigo-100 text-indigo-600`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link to={`/admin/order/${order.id}`} className="px-4 py-1.5 bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white rounded-lg font-bold text-[10px] transition-all">DETAILS</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;