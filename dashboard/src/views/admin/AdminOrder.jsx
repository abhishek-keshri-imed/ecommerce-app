/* eslint-disable react-hooks/purity */
import React, { useState, useMemo, useEffect } from "react";
import {MdKeyboardArrowLeft,MdKeyboardArrowRight,MdSearch,} from "react-icons/md";

const AdminOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage, setParPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  // 1. New state for debounced value
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  // 2. Debounce Logic: Updates debouncedSearchValue after 300ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue]);

  // --- Data (Memoized) ---
  const recentOrders = useMemo(() => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: `#${45211 + i}`,
      price: Math.floor(Math.random() * 1000) + 100,
      paymentStatus: i % 3 === 0 ? "unpaid" : "paid",
      orderStatus: ["pending", "processing", "delivered", "cancelled"][i % 4],
    }));
  }, []);

  // 3. Optimized Filtering: Uses debouncedSearchValue and useMemo
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

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredOrders.length / parPage);
  const indexOfLastItem = currentPage * parPage;
  const indexOfFirstItem = indexOfLastItem - parPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // --- Pagination Button Generator ---
  const getPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage < maxButtonsToShow - 1) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0) buttons.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }
    return buttons;
  };

  return (
    <div className="w-full p-4 bg-[#283046] rounded-md mt-6 shadow-xl">
      <div className="flex justify-between items-center pb-6 flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl text-[#d0d2d6]">Orders Management</h2>
          <p className="text-xs text-slate-500">Track and manage customer orders</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <MdSearch className="absolute left-3 text-slate-400" size={18} />
            <input
              type="text"
              value={searchValue}
              // Update immediate state for the input field, but reset page immediately
              onChange={(e) => { 
                setSearchValue(e.target.value); 
                setCurrentPage(1); 
              }}
              placeholder="Search..."
              className="pl-10 pr-3 py-2 bg-[#161d31] border border-slate-700 rounded-md text-[#d0d2d6] outline-none focus:border-indigo-500 text-sm w-60"
            />
          </div>

          <select
            onChange={(e) => { setParPage(Number(e.target.value)); setCurrentPage(1); }}
            value={parPage}
            className="bg-[#161d31] text-[#d0d2d6] border border-slate-700 px-3 py-2 rounded-md outline-none text-sm cursor-pointer"
          >
            <option value="5">5 </option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto border border-slate-700 rounded-lg">
        <table className="w-full text-sm text-left text-[#d0d2d6]">
          <thead className="text-xs text-slate-400 uppercase border-b border-slate-700 bg-[#1e273a]">
            <tr>
              <th className="py-4 px-4">Order ID</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-4">Payment</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-[#343d55]/30 transition-all">
                  <td className="py-4 px-4 text-indigo-400">{order.id}</td>
                  <td className="py-4 px-4 font-semibold text-white">${order.price}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${order.orderStatus === 'delivered' ? 'bg-green-500/10 text-green-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="px-3 py-1 bg-slate-700 hover:bg-indigo-600 rounded text-xs transition-all">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center py-20 text-slate-500 italic">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredOrders.length > 0 && (
        <div className="w-full flex justify-between items-center mt-6 flex-wrap gap-4">
          <p className="text-sm text-slate-400">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center bg-slate-800 text-slate-400 rounded-lg disabled:opacity-20 border border-slate-700 hover:bg-indigo-500 hover:text-white"
            >
              <MdKeyboardArrowLeft size={20} />
            </button>

            {getPaginationButtons().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all border ${
                  currentPage === page
                    ? "bg-indigo-500 text-white border-indigo-400 shadow-lg"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 disabled:border-none"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center bg-slate-800 text-slate-400 rounded-lg disabled:opacity-20 border border-slate-700 hover:bg-indigo-500 hover:text-white"
            >
              <MdKeyboardArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrder;