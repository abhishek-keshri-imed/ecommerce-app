import React from "react";
import { BsCurrencyDollar, BsBagCheck } from "react-icons/bs";
import { RiProductHuntLine, RiDiscountPercentLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";

const SellerDashBoard = () => {
  const recentMessages = [
    {
      name: "Support Team",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
      msg: "Your product 'Sony Headphones' was approved.",
      time: "10 min ago",
      online: true,
    },
    {
      name: "Customer Service",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Service",
      msg: "New inquiry regarding delivery time.",
      time: "2 hours ago",
      online: true,
    },
  ];

  const recentOrders = [
    {
      id: "#88120",
      price: 299,
      paymentStatus: "paid",
      orderStatus: "delivered",
    },
    {
      id: "#88121",
      price: 450,
      paymentStatus: "paid",
      orderStatus: "processing",
    },
    {
      id: "#88122",
      price: 120,
      paymentStatus: "unpaid",
      orderStatus: "pending",
    },
  ];

  const state = {
    series: [
      {
        name: "My Sales",
        data: [20, 30, 25, 45, 60, 55, 70, 80, 85, 90, 95, 110],
      },
      {
        name: "Orders",
        data: [15, 20, 18, 30, 40, 35, 50, 55, 60, 65, 70, 80],
      },
    ],
    options: {
      chart: {
        background: "transparent",
        foreColor: "#94a3b8",
        toolbar: { show: false },
      },
      stroke: { curve: "smooth", width: 3 },
      colors: ["#7367f0", "#28c76f"],
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      grid: { borderColor: "#f1f5f9", strokeDashArray: 5 },
      legend: { position: "top", fontWeight: 600 },
    },
  };

  return (
    <div className="mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar">
        {/* Seller Specific Stats */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              label: "Total Earnings",
              val: "$12,450",
              icon: <BsCurrencyDollar />,
              color: "text-green-600",
              bg: "bg-green-100",
            },
            {
              label: "My Products",
              val: "48",
              icon: <RiProductHuntLine />,
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              label: "Total Orders",
              val: "215",
              icon: <BsBagCheck />,
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
            {
              label: "Pending Orders",
              val: "12",
              icon: <MdOutlinePendingActions />,
              color: "text-rose-600",
              bg: "bg-rose-100",
            },
            {
              label: "Active Offers",
              val: "12",
              icon: <RiDiscountPercentLine />,
              color: "text-green-600",
              bg: "bg-green-100",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-gray-800">{item.val}</h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                  {item.label}
                </span>
              </div>
              <div
                className={`w-12 h-12 rounded-2xl ${item.bg} flex justify-center items-center text-xl ${item.color} group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-wrap mt-7">
          {/* Sales Performance Chart */}
          <div className="w-full lg:w-7/12 lg:pr-3">
            <div className="w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="font-bold text-lg text-gray-800 pb-6">
                Sales Performance
              </h2>
              <Chart
                options={state.options}
                series={state.series}
                type="line"
                height={350}
              />
            </div>
          </div>

          {/* Support/Customer Chat */}
          <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
            <div className="w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-117.5 flex flex-col">
              <div className="flex justify-between items-center pb-5 border-b border-gray-50">
                <h2 className="font-bold text-lg text-gray-800">
                  Support Messages
                </h2>
                <Link
                  to="/seller/chat-support"
                  className="text-xs text-indigo-600 font-bold uppercase tracking-tighter"
                >
                  Open Chat
                </Link>
              </div>
              <div className="flex-1 overflow-y-auto mt-4 custom-scrollbar">
                {recentMessages.map((msg, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-3 hover:bg-indigo-50/40 rounded-xl transition-all cursor-pointer mb-1"
                  >
                    <img
                      className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                      src={msg.image}
                       alt={`${msg.name} avatar`}
                    />
                    <div className="flex flex-col w-full overflow-hidden">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold text-gray-700">
                          {msg.name}
                        </h2>
                        <span className="text-[10px] text-gray-400">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {msg.msg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders for Seller */}
        <div className="w-full p-6 bg-white rounded-2xl border border-gray-200 shadow-sm mt-7 mb-4">
          <h2 className="font-bold text-lg text-gray-800 pb-6">
            Recent Orders
          </h2>
          <div className="relative overflow-x-auto rounded-xl">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-400 uppercase tracking-widest font-bold bg-gray-50/80">
                <tr>
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y divide-gray-50">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-indigo-50/20 transition-all">
                    <td className="py-4 px-6 font-bold text-indigo-600">
                      {order.id}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-800">
                      ${order.price}
                    </td>
                    <td className="py-4 px-6 uppercase text-[10px] font-bold">
                      {order.paymentStatus}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-md text-[10px] font-bold uppercase">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/seller/order/${order.id.replace('#', '')}`}
                        className="px-4 py-1.5 bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white rounded-lg font-bold text-[10px] transition-all"
                      >
                        VIEW
                      </Link>
                    </td>                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default SellerDashBoard;
