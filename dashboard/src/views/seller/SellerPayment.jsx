import React, { useState, useMemo } from "react";
import {
  MdPayments,
  MdHistory,
  MdAccountBalanceWallet,
  MdSend,
  MdFilterList,
} from "react-icons/md";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const SellerPayment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage] = useState(7);
  const [statusFilter, setStatusFilter] = useState("all");

  // --- 1. MOCK DATA: FINANCIAL STATS ---
  const stats = {
    totalEarnings: 45280.5,
    availableBalance: 8450.25,
    pendingWithdrawals: 1200.0,
  };

  // --- 2. MOCK DATA: TRANSACTION HISTORY ---
  const initialTransactions = useMemo(() => {
    const statuses = ["success", "pending", "failed"];
    return Array.from({ length: 25 }, (_, i) => ({
      // Increased to 25 to show pagination
      _id: `TXN${9000 + i}`,
      amount: (100 + ((i * 150) % 1900)).toFixed(2),
      status: statuses[i % statuses.length],
      date: new Date(2026, 3, 20 - i).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      method: i % 2 === 0 ? "Bank Transfer" : "UPI / Wallet",
    }));
  }, []);

  const [transactions] = useState(initialTransactions);

  // --- 3. LOGIC: REQUEST WITHDRAWAL ---
  const handleWithdrawRequest = () => {
    Swal.fire({
      title:
        '<span class="text-xl font-black text-gray-800">Request Payout</span>',
      html: `
        <div class="text-left">
          <p class="text-xs font-bold text-gray-400 uppercase mb-2">Amount to Withdraw</p>
          <input id="swal-amount" type="number" class="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold" placeholder="Min $500">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Send Request",
      confirmButtonColor: "#4f46e5",
      customClass: { popup: "rounded-3xl p-6" },
      preConfirm: () => {
        const amount = document.getElementById("swal-amount").value;
        if (!amount || amount < 500) {
          Swal.showValidationMessage(`Minimum withdrawal is $500`);
        }
        return amount;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(`Request for $${result.value} submitted!`);
      }
    });
  };

  // --- 4. LOGIC: FILTERING & SLICING ---
  const filteredTxns = useMemo(() => {
    return transactions.filter((t) => {
      return statusFilter === "all" || t.status === statusFilter;
    });
  }, [transactions, statusFilter]);

  // This is the logic that actually powers the pagination display
  const currentTxns = useMemo(() => {
    const startIndex = (currentPage - 1) * parPage;
    return filteredTxns.slice(startIndex, startIndex + parPage);
  }, [filteredTxns, currentPage, parPage]);

  return (
    <div className="px-4 py-6 lg:px-8 bg-[#f8f9fa] min-h-screen lg:h-[calc(100vh-80px)] flex flex-col gap-6 overflow-x-hidden">
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-none">
        {[
          {
            label: "Total Earnings",
            val: stats.totalEarnings,
            icon: <MdPayments />,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Available Balance",
            val: stats.availableBalance,
            icon: <MdAccountBalanceWallet />,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Pending Payouts",
            val: stats.pendingWithdrawals,
            icon: <MdHistory />,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                {item.label}
              </p>
              <h3 className="text-2xl font-black text-gray-800">
                ${item.val.toLocaleString()}
              </h3>
            </div>
            <div className={`p-3 ${item.bg} ${item.color} rounded-xl text-2xl`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 2. TRANSACTION SECTION */}
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 flex-none">
          <div>
            <h2 className="text-xl font-black text-gray-800">
              Withdrawal History
            </h2>
            <p className="text-xs text-gray-400 font-medium italic">
              Keep track of your payouts and earnings
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleWithdrawRequest}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
            >
              <MdSend size={18} /> Send Request
            </button>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-xl">
              <MdFilterList className="text-gray-400" size={18} />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on filter change
                }}
                className="bg-transparent text-xs font-bold text-gray-600 outline-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table - NO SCROLLBAR CLASSES ADDED HERE */}
        <div className="relative overflow-x-auto rounded-xl border border-gray-50 flex-1 min-h-[300px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <table className="w-full min-w-175 text-sm text-left">
            <thead className="bg-gray-50 text-[10px] uppercase font-black text-gray-400 tracking-widest sticky top-0">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentTxns.map((t) => (
                <tr
                  key={t._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-black text-gray-800 uppercase text-xs">
                    {t._id}
                  </td>
                  <td className="px-6 py-4 font-black text-gray-800 text-base">
                    ${t.amount}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-500 text-xs">
                    {t.method}
                  </td>
                  <td className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase">
                    {t.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        t.status === "success"
                          ? "bg-emerald-100 text-emerald-700"
                          : t.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION FOOTER */}
        {filteredTxns.length > 0 && (
          <div className="mt-auto pt-6 border-t border-gray-100 flex-none">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={filteredTxns.length}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerPayment;
