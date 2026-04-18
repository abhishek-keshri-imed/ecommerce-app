import React, { useState, useMemo } from "react";
import {
  MdSearch,
  MdVisibility,
  MdFilterList,
  MdEditNote,
  MdInventory2,
} from "react-icons/md";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const SellerOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage] = useState(7);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  // --- 1. MOCK DATA GENERATOR ---
  const initialOrders = useMemo(() => {
    const statuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    const customers = [
      "Suresh Raina",
      "Rahul Deshmukh",
      "Priya Patil",
      "Anjali Sharma",
      "Vikram Malhotra",
    ];

    return Array.from({ length: 20 }, (_, i) => ({
      _id: `ORD${8840 + i}`,
      customerName: customers[i % customers.length],
      email: `user${i}@pune-tech.in`,
      totalPrice: (Math.random() * (4500 - 450) + 450).toFixed(2),
      paymentStatus: i % 4 === 0 ? "unpaid" : "paid",
      status: statuses[i % statuses.length],
      date: new Date(2026, 2, 17 - i).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      // Mocked products for the detail view
      products: [
        { name: "Engine Oil 4T", qty: 2, price: 450 },
        { name: "Brake Pads", qty: 1, price: 250 },
      ],
    }));
  }, []);

  const [localOrders, setLocalOrders] = useState(initialOrders);

  // --- 2. LOGIC: QUICK UPDATE (SWEETALERT) ---
  const handleUpdateStatus = (orderId, currentStatus) => {
    Swal.fire({
      title:
        '<span class="text-lg font-bold text-gray-800">Change Status</span>',
      input: "select",
      inputOptions: {
        pending: "Pending",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      },
      inputValue: currentStatus,
      width: "350px",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      confirmButtonText: "Update",
      customClass: { popup: "rounded-2xl" },
    }).then((result) => {
      if (result.isConfirmed) {
        setLocalOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: result.value } : o,
          ),
        );
        toast.success(`Order #${orderId} set to ${result.value}`);
      }
    });
  };

  // --- 3. LOGIC: VIEW COMPLETE DETAILS (SMALL MODAL) ---
  const handleViewOrder = (order) => {
    Swal.fire({
      width: "420px",
      showConfirmButton: false,
      showCloseButton: true,
      customClass: {
        popup: "rounded-3xl border-none shadow-2xl",
        htmlContainer: "p-0",
      },
      html: `
        <div class="text-left px-4 pt-5 pb-2">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h2 class="text-xl font-black text-gray-800 tracking-tight">Order Details</h2>
              <p class="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">#${order._id}</p>
            </div>
            <span class="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border">${order.date}</span>
          </div>

          <div class="mb-6">
            <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">Items Ordered</p>
            <div class="space-y-3">
              ${order.products
                .map(
                  (item) => `
                <div class="flex justify-between items-center group">
                  <div class="flex flex-col">
                    <span class="text-sm font-bold text-gray-700">${item.name}</span>
                    <span class="text-[10px] text-gray-400 font-medium italic">Qty: ${item.qty} units</span>
                  </div>
                  <span class="text-sm font-black text-gray-800">$${(item.qty * item.price).toFixed(2)}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="space-y-4">
            <div class="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Customer</p>
              <p class="text-sm font-bold text-gray-700">${order.customerName}</p>
              <p class="text-[11px] text-gray-500 font-medium">${order.email}</p>
            </div>

            <div class="border-t border-dashed pt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs text-gray-500 font-medium">Payment Status</span>
                <span class="text-[10px] font-black uppercase text-emerald-600">${order.paymentStatus}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500 font-medium">Shipping Status</span>
                <span class="text-[10px] font-black uppercase px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">${order.status}</span>
              </div>
            </div>

            <div class="mt-6 p-4 bg-gray-900 rounded-2xl flex justify-between items-center shadow-lg">
               <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Amount</span>
               <span class="text-lg font-black text-white">$${order.totalPrice}</span>
            </div>
          </div>
        </div>
      `,
    });
  };

  // --- 4. LOGIC: FILTERING ---
  const filteredOrders = useMemo(() => {
    return localOrders.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const matchesSearch =
        o._id.toLowerCase().includes(searchValue.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchValue.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [localOrders, statusFilter, searchValue]);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * parPage,
    currentPage * parPage,
  );

  return (
    <div className="px-4 py-6 lg:px-8 bg-[#f8f9fa] min-h-[calc(100vh-110px)] flex flex-col">
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <MdSearch
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Order ID or Customer..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-56"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl">
              <MdFilterList className="text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-600 outline-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto rounded-xl border border-gray-50">
          <table className="w-full min-w-[800px] text-sm text-left">
            <thead className="bg-gray-50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentOrders.map((o) => (
                <tr
                  key={o._id}
                  className="hover:bg-indigo-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-black text-gray-800">#{o._id}</span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {o.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-700">
                        {o.customerName}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {o.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-gray-800 text-center">
                    ${o.totalPrice}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${o.status === "delivered" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(o._id, o.status)}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                        title="Quick Status Update"
                      >
                        <MdEditNote size={18} />
                      </button>
                      <button
                        onClick={() => handleViewOrder(o)}
                        className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        title="View Full Order Detail"
                      >
                        <MdVisibility size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <MdInventory2 size={40} className="text-gray-100 mb-2" />
            <p className="text-gray-400 font-bold">
              No results match your filter.
            </p>
          </div>
        )}

        {/* Pagination Footer */}
        {filteredOrders.length > 0 && (
          <div className="mt-auto pt-6 border-t border-gray-100">
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
  );
};

export default SellerOrders;
