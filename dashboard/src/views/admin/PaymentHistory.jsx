/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useMemo } from "react";
import Pagination from "../../components/Pagination";
import * as XLSX from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdSearch, MdFilterList, MdRefresh, MdPayments } from "react-icons/md";

const PaymentHistory = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedRange, setAppliedRange] = useState({ start: "", end: "" });
  const parPage = 8;

  const allSellers = useMemo(() => {
    const names = ["Fashion Store", "Tech Gadgets", "Home Decor", "Organic Foods", "Sheikh Store", "Urban Threads", "Mega Mart", "Elite Electronics", "Vintage Vibes", "Sporty Co", "Beauty Bliss", "Kids Zone"];
    const getRandomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date.toISOString().split("T")[0];
    };
    return names.map((name, i) => ({
      id: i + 1,
      name,
      amount: Math.floor(Math.random() * 8000) + 500,
      txnId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: getRandomDate(new Date(2025, 8, 1), new Date(2026, 0, 27)),
    }));
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterQuery(searchValue);
      setPageNumber(1);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const filteredData = useMemo(() => {
    return allSellers.filter((seller) => {
      const matchesName = seller.name.toLowerCase().includes(filterQuery.toLowerCase());
      const sellerTime = new Date(seller.date).getTime();
      const startMatch = appliedRange.start ? sellerTime >= new Date(appliedRange.start).getTime() : true;
      const endMatch = appliedRange.end ? sellerTime <= new Date(appliedRange.end).getTime() : true;
      return matchesName && startMatch && endMatch;
    });
  }, [filterQuery, appliedRange, allSellers]);

  const totalAmount = useMemo(() => filteredData.reduce((sum, item) => sum + item.amount, 0), [filteredData]);
  const startIndex = (pageNumber - 1) * parPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + parPage);

  const resetFilters = () => {
    setStartDate(""); setEndDate(""); setAppliedRange({ start: "", end: "" });
    setSearchValue(""); setPageNumber(1);
  };

  return (
    <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative px-2 md:px-7 pb-4'>
      
      {/* Stats Card - Smaller padding on mobile */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-end mt-3 md:mt-5 mb-4 md:mb-6 gap-3 shrink-0">
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 rounded-xl flex justify-center items-center text-indigo-600 shrink-0">
            <MdPayments size={22} />
          </div>
          <div>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filtered Total</p>
            <h2 className="text-lg md:text-xl font-bold text-gray-800">${totalAmount.toLocaleString()}</h2>
          </div>
        </div>

        <div className="flex gap-2">
            <button className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all">
                <RiFileExcel2Line size={16} /> <span className="hidden sm:inline">EXPORT</span>
            </button>
            <button onClick={resetFilters} className="p-2 md:p-2.5 bg-white border border-gray-200 text-gray-400 hover:text-indigo-600 rounded-xl">
                <MdRefresh size={20} />
            </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        
        {/* Filters Bar - Vertical on Mobile */}
        <div className="p-3 md:p-5 border-b border-gray-50 bg-gray-50/30 flex flex-col lg:flex-row gap-4 lg:items-end shrink-0">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">Date Range Filter</label>
            <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1 bg-white p-1.5 rounded-xl border border-gray-200">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent w-full text-[11px] md:text-xs text-gray-600 outline-none" />
                    <span className="text-gray-300">—</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent w-full text-[11px] md:text-xs text-gray-600 outline-none" />
                </div>
                <button onClick={() => setAppliedRange({ start: startDate, end: endDate })} className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md shrink-0">
                    <MdFilterList size={18} />
                </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 lg:max-w-xs">
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">Search Seller</label>
            <div className="relative">
              <input type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-600 outline-none focus:border-indigo-500" />
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {/* Responsive Table Area */}
        <div className="flex-1 overflow-x-auto custom-scrollbar p-2 md:p-5">
          <div className="min-w-[600px]"> {/* Prevents table from squashing under 600px */}
            <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                <tr className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Store Name</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2 hidden md:table-cell">Transaction ID</th>
                    <th className="px-4 py-2 text-right">Date</th>
                </tr>
                </thead>
                <tbody>
                {paginatedData.map((seller, i) => (
                    <tr key={seller.id} className="group">
                    <td className="py-3 px-4 text-xs font-bold text-gray-400 bg-gray-50/50 border-y border-l border-gray-100 rounded-l-2xl">
                        {startIndex + i + 1}
                    </td>
                    <td className="py-3 px-4 text-xs md:text-sm font-bold text-gray-700 bg-gray-50/50 border-y border-gray-100 group-hover:text-indigo-600 transition-colors">
                        {seller.name}
                    </td>
                    <td className="py-3 px-4 bg-gray-50/50 border-y border-gray-100">
                        <span className="text-xs md:text-sm font-black text-emerald-600">${seller.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-[11px] font-mono text-gray-400 bg-gray-50/50 border-y border-gray-100 hidden md:table-cell">
                        {seller.txnId}
                    </td>
                    <td className="py-3 px-4 text-right text-[10px] md:text-xs font-bold text-gray-500 bg-gray-50/50 border-y border-r border-gray-100 rounded-r-2xl">
                        {new Date(seller.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        <span className="hidden sm:inline">, {new Date(seller.date).getFullYear()}</span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>

        {/* Footer - Optimized for mobile */}
        <div className="p-4 md:p-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <p className="text-[10px] text-gray-400 font-bold uppercase">
            Showing {paginatedData.length} records
          </p>
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalItem={filteredData.length}
            parPage={parPage}
            showItem={window.innerWidth < 640 ? 2 : 3}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;