/* eslint-disable react-hooks/purity */
import React, { useState, useMemo, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import Pagination from "../../components/Pagination"; // Using your custom component
import { Link } from "react-router-dom";

const AdminOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  // Debounce Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // Mock Data
  const recentOrders = useMemo(() => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: `#${45211 + i}`,
      price: Math.floor(Math.random() * 1000) + 100,
      paymentStatus: i % 3 === 0 ? "unpaid" : "paid",
      orderStatus: ["pending", "processing", "delivered", "cancelled"][i % 4],
    }));
  }, []);

  // Optimized Filtering
  const filteredOrders = useMemo(() => {
    const term = debouncedSearchValue.toLowerCase();
    return recentOrders.filter((order) => {
      return (
        order.id.toLowerCase().includes(term) ||
        order.orderStatus.toLowerCase().includes(term) ||
        order.paymentStatus.toLowerCase().includes(term) ||
        order.price.toString().includes(term)
      );
    });
  }, [debouncedSearchValue, recentOrders]);

  // Pagination Logic
  const indexOfLastItem = currentPage * parPage;
  const indexOfFirstItem = indexOfLastItem - parPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    /* MAIN WRAPPER: White Theme with locked scroll logic */
    <div className="mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar overscroll-contain">
        <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Header Controls */}
          <div className="flex justify-between items-center pb-6 flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-xl text-gray-800">
                Orders Management
              </h2>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Track customer transactions
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex items-center">
                <MdSearch className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search orders..."
                  className="pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-64 shadow-sm transition-all"
                />
              </div>

              <select
                onChange={(e) => {
                  setParPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                value={parPage}
                className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg outline-none text-sm font-semibold cursor-pointer focus:ring-2 focus:ring-indigo-500 shadow-sm"
              >
                <option value="5">5 Per Page</option>
                <option value="10">10 Per Page</option>
                <option value="20">20 Per Page</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="relative overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-4">Order ID</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Payment</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, i) => (
                    <tr
                      key={i}
                      className="hover:bg-indigo-50/30 transition-all group"
                    >
                      <td className="py-4 px-4 font-bold text-indigo-600 italic">
                        {order.id}
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-800">
                        ${order.price}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${order.paymentStatus === "paid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-md text-[10px] uppercase font-bold ${order.orderStatus === "delivered" ? "bg-green-100 text-green-600" : "bg-indigo-100 text-indigo-600"}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link
                          to={`/admin/dashboard/orders/details/${(order._id || order.id).toString().replace("#", "")}`}
                          className="px-4 py-1.5 bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm inline-block"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-20 text-gray-400 italic font-medium"
                    >
                      No matching orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer using the imported component */}
          {filteredOrders.length > 0 && (
            <div className="w-full flex justify-between items-center mt-8 flex-wrap gap-4 border-t border-gray-100 pt-6">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
                Showing {indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, filteredOrders.length)}{" "}
                <span className="text-gray-300 mx-1">/</span> Total{" "}
                {filteredOrders.length}
              </p>

              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={filteredOrders.length}
                parPage={parPage}
                showItem={3}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #f8f9fa; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default AdminOrder;
