/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Pagination from "../../components/Pagination";
import * as XLSX from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdSearch, MdFilterList, MdRefresh, MdPayments } from "react-icons/md";

const PaymentHistory = () => {
  // --- States ---
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedRange, setAppliedRange] = useState({ start: "", end: "" });
  const parPage = 5;

  // --- 1. Generate Mock Data (Memoized) ---
  const allSellers = useMemo(() => {
    const names = [
      "Fashion Store",
      "Tech Gadgets",
      "Home Decor",
      "Organic Foods",
      "Sheikh Store",
      "Urban Threads",
      "Mega Mart",
      "Elite Electronics",
      "Vintage Vibes",
      "Sporty Co",
      "Beauty Bliss",
      "Kids Zone",
      "Auto Parts",
      "Book Haven",
      "Green Garden",
      "Music World",
      "Pet Paradise",
      "Kitchen King",
      "Toy Box",
      "Smart Home",
    ];

    const getRandomDate = (start, end) => {
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return date.toISOString().split("T")[0];
    };

    return names.map((name, i) => ({
      id: i + 1,
      name,
      // eslint-disable-next-line react-hooks/purity
      amount: Math.floor(Math.random() * 8000) + 500,
      txnId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: getRandomDate(new Date(2025, 8, 1), new Date(2026, 0, 27)),
    }));
  }, []);

  // --- 2. Search Debounce Logic ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterQuery(searchValue);
      setPageNumber(1);
    }, 400); // Slightly faster debounce
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  // --- 3. Filter Logic (Memoized) ---
  const filteredData = useMemo(() => {
    return allSellers.filter((seller) => {
      const matchesName = seller.name
        .toLowerCase()
        .includes(filterQuery.toLowerCase());
      const sellerTime = new Date(seller.date).getTime();
      const startMatch = appliedRange.start
        ? sellerTime >= new Date(appliedRange.start).getTime()
        : true;
      const endMatch = appliedRange.end
        ? sellerTime <= new Date(appliedRange.end).getTime()
        : true;
      return matchesName && startMatch && endMatch;
    });
  }, [filterQuery, appliedRange, allSellers]);

  // --- 4. Totals Calculation ---
  const totalAmount = useMemo(() => {
    return filteredData.reduce((sum, item) => sum + item.amount, 0);
  }, [filteredData]);

  // --- 5. Pagination Slicing ---
  const startIndex = (pageNumber - 1) * parPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + parPage);

  // --- 6. Export to Excel
  const exportToExcel = useCallback(() => {
    const dataToExport = filteredData.map((item, index) => ({
      No: index + 1,
      "Seller Name": item.name,
      "Amount ($)": item.amount,
      "Transaction ID": item.txnId,
      Date: item.date,
      Status: "Success",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payout_History");
    XLSX.writeFile(workbook, `Report_${new Date().toLocaleDateString()}.xlsx`);
  }, [filteredData]);

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setAppliedRange({ start: "", end: "" });
    setSearchValue("");
    setPageNumber(1);
  };

  return (
    <div className="px-2 md:px-7 py-5 font-sans">
      {/* Stats Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-[#283046] p-5 rounded-lg border border-slate-700 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex justify-center items-center text-indigo-500">
            <MdPayments size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#d0d2d6]">
              ${totalAmount.toLocaleString()}
            </h2>
            <span className="text-sm text-gray-400">Filtered Total</span>
          </div>
        </div>
        {/* Space for more cards if needed */}
      </div>

      <div className="w-full p-6 bg-[#283046] rounded-lg border border-slate-700 shadow-2xl">
        {/* Header & Controls */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 pb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[#d0d2d6]">
              Payment History
            </h2>
            <p className="text-sm text-gray-500">
              Manage and export your store transaction records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-600/20 px-4 py-2.5 rounded-md text-sm font-bold transition-all shadow-lg active:scale-95"
            >
              <RiFileExcel2Line size={18} /> EXPORT
            </button>

            <div className="h-8 w-px bg-slate-700 hidden xl:block"></div>

            <button
              onClick={resetFilters}
              title="Reset All"
              className="bg-slate-700/50 hover:bg-slate-700 text-gray-400 hover:text-white p-2.5 rounded-md transition-all"
            >
              <MdRefresh size={22} />
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-[#161d31]/50 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-end border border-slate-800">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-indigo-400 font-black uppercase tracking-wider ml-1">
              Time Period
            </span>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-[#283046] border border-slate-700 rounded-md px-3 py-2 text-sm text-[#d0d2d6] outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <span className="text-gray-600">—</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-[#283046] border border-slate-700 rounded-md px-3 py-2 text-sm text-[#d0d2d6] outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <button
            onClick={() => setAppliedRange({ start: startDate, end: endDate })}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <MdFilterList size={18} /> Apply Filter
          </button>

          <div className="flex flex-col gap-1.5 grow max-w-md">
            <span className="text-[10px] text-indigo-400 font-black uppercase tracking-wider ml-1">
              Quick Search
            </span>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by seller name..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-[#283046] border border-slate-700 rounded-md pl-10 pr-4 py-2 text-sm text-[#d0d2d6] outline-none focus:ring-1 focus:ring-indigo-500 w-full transition-all"
              />
              <MdSearch
                className="absolute left-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-xs uppercase text-gray-500 font-black tracking-widest">
                <th className="pb-4 px-4">No</th>
                <th className="pb-4 px-4">Seller</th>
                <th className="pb-4 px-4">Amount</th>
                <th className="pb-4 px-4">Transaction ID</th>
                <th className="pb-4 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-[#d0d2d6]">
              {paginatedData.length > 0 ? (
                paginatedData.map((seller, i) => (
                  <tr
                    key={seller.id}
                    className="bg-[#161d31]/30 hover:bg-[#161d31] transition-all group"
                  >
                    <td className="py-4 px-4 text-sm font-mono text-gray-500 border-y border-l border-slate-700/50 rounded-l-lg">
                      {startIndex + i + 1}
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-white border-y border-slate-700/50 group-hover:text-indigo-400 transition-colors">
                      {seller.name}
                    </td>
                    <td className="py-4 px-4 border-y border-slate-700/50">
                      <div className="flex flex-col">
                        <span className="font-black text-emerald-500">
                          ${seller.amount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase font-bold">
                          Verified
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-gray-500 border-y border-slate-700/50">
                      {seller.txnId}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-400 text-xs border-y border-r border-slate-700/50 rounded-r-lg">
                      {seller.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-20 bg-[#161d31]/20 rounded-lg"
                  >
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                      <MdSearch size={40} className="opacity-20" />
                      <p className="italic">
                        No records match your current filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Wrapper */}
        <div className="w-full flex justify-between items-center mt-8 pt-6 border-t border-slate-700">
          <span className="text-xs text-gray-500 font-medium">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + parPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </span>
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={filteredData.length}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
