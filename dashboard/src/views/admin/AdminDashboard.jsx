import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const recentMessages = [
    {
      name: "Abhishek Kumar",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhishek",
      msg: "Hey, did you check the latest order from Delhi?",
      time: "1 min ago",
      online: true,
    },
    {
      name: "Priya Sharma",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      msg: "The stock for Blue Denim is running low.",
      time: "15 min ago",
      online: false,
    },
    {
      name: "Vikram Singh",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
      msg: "Refund request approved for Order #8829.",
      time: "1 hour ago",
      online: true,
    },
    {
      name: "Karan Johar",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan",
      msg: "The shipment for Order #9910 is delayed due to rain.",
      time: "2 hours ago",
      online: false,
    },
  ];

  const recentOrders = [
    {
      id: "#45211",
      price: 654,
      paymentStatus: "paid",
      orderStatus: "pending",
    },
    {
      id: "#45212",
      price: 120,
      paymentStatus: "unpaid",
      orderStatus: "pending",
    },
    {
      id: "#45213",
      price: 543,
      paymentStatus: "paid",
      orderStatus: "cancelled",
    },
    {
      id: "#45214",
      price: 232,
      paymentStatus: "paid",
      orderStatus: "delivered",
    },
    {
      id: "#45215",
      price: 980,
      paymentStatus: "unpaid",
      orderStatus: "processing",
    },
  ];

  // Configuration for the Area/Bar Chart
  const state = {
    series: [
      {
        name: "Orders",
        data: [34, 45, 31, 56, 42, 33, 48, 52, 60, 72, 81, 95],
      },
      {
        name: "Revenue",
        data: [42, 32, 45, 32, 43, 52, 55, 60, 65, 70, 75, 80],
      },
      {
        name: "Sales",
        data: [25, 35, 20, 45, 30, 25, 40, 45, 50, 55, 60, 65],
      },
    ],
    options: {
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
        toolbar: {
          show: true, // Show the bar
          tools: {
            download: true, // Keep the menu
            selection: false, // 3. Removes Magnifying Glass
            zoom: false, // Keep Zoom +/- if desired
            zoomin: true,
            zoomout: true,
            pan: false, // 4. Removes Hand Icon
            reset: true, // Keep Reset Home icon
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 3,
        dashArray: 0,
      },
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
      legend: {
        position: "top",
      },
      grid: {
        show: true,
        borderColor: "#404656",
        strokeDashArray: 5,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      responsive: [
        {
          breakpoint: 565,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      {/* 4-column grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {/* Total Sales Card */}
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3 shadow-lg">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">$450</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
          </div>
        </div>

        {/* Products Card */}
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3 shadow-lg">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">50</h2>
            <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#e000e81f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>

        {/* Sellers Card */}
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3 shadow-lg">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">12</h2>
            <span className="text-md font-medium">Sellers</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
            <FaUserTie className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>

        {/* Orders Card */}
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3 shadow-lg">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">5</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7">
        {/* Left Side: Chart */}
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#283046] p-4 rounded-md">
            <div className="flex justify-between items-center pb-4">
              <h2 className="font-semibold text-lg text-[#d0d2d6]">
                Orders / Revenue
              </h2>
              <select className="bg-[#283046] border border-slate-700 text-[#d0d2d6] p-1 rounded-md outline-none focus:border-indigo-500">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        {/* Right Side: Messages */}
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#283046] p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center pb-4 border-b border-slate-700">
              <h2 className="font-semibold text-lg">Recent Seller Messages</h2>
              <Link
                to="/admin/orders"
                className="text-sm text-indigo-500 hover:underline hover:text-indigo-400 transition-all"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 overflow-y-auto h-92 custom-scrollbar">
              {recentMessages.map((seller, i) => (
                <div
                  key={i}
                  className="flex gap-3 justify-start items-start p-3 hover:bg-[#343d55] rounded-lg cursor-pointer group"
                >
                  <div className="relative shrink-0">
                    <img
                      className="w-11 h-11 rounded-full border-2 border-indigo-500 p-0.5"
                      src={seller.image}
                      alt={seller.name}
                    />
                    <div
                      className={`w-3 h-3 rounded-full absolute right-0 bottom-0 border-2 border-[#283046] ${
                        seller.online ? "bg-green-500" : "bg-slate-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex flex-col w-full overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h2 className="text-sm font-bold">{seller.name}</h2>
                      <span className="text-[10px] text-slate-400">
                        {seller.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-1 group-hover:text-slate-200">
                      {seller.msg}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Place this inside your return, below the Charts/Messages section */}
      <div className="w-full p-4 bg-[#283046] rounded-md mt-6">
        <div className="flex justify-between items-center pb-5">
          <h2 className="font-semibold text-lg text-[#d0d2d6]">
            Recent Orders
          </h2>
          <Link
            to="/admin/orders"
            className="text-sm text-indigo-500 hover:text-indigo-400 font-medium"
          >
            View All
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-xs text-[#d0d2d6] uppercase border-b border-slate-700 bg-[#1e273a]">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order ID
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-700 hover:bg-[#343d55] transition-all"
                >
                  <td className="py-4 px-4 font-medium">{order.id}</td>
                  <td className="py-4 px-4">${order.price}</td>
                  <td className="py-4 px-4 uppercase text-[10px]">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        order.paymentStatus === "paid"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 uppercase text-[10px]">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        order.orderStatus === "delivered"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-indigo-500/10 text-indigo-500"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {/* The Action Button */}
                    <Link
                      to={`/admin/dashboard/order/details/${order.id}`}
                      className="px-3 py-1.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-md hover:bg-indigo-500 hover:text-white transition-all text-xs font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div> // This closes the main div properly
  );
};

export default AdminDashboard;
