import React, { useState, useMemo, useEffect } from "react";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdAdd,
  MdEventAvailable,
} from "react-icons/md";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SellerDiscount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage] = useState(6);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  // --- UI UPDATE: Repositioned Search Handler for improved flow ---
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchValue(searchValue), 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // Mock Discount Data
  const discounts = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => {
        const isExpired = i < 5;
        const isUpcoming = i > 20;
        return {
          _id: `disc_${500 + i}`,
          productName: i % 2 === 0 ? "Nike Air Max" : "iPhone 15 Pro",
          originalPrice: 200 + (i * 10),
          discountPercent: 10 + (i % 4) * 5, // Varying percentages: 10, 15, 20, 25
          discountCode: `SAVE${20 + i}`,
          startDate: "2026-03-01",
          endDate: isExpired ? "2026-03-10" : "2026-04-01",
          status: isExpired ? "Expired" : isUpcoming ? "Upcoming" : "Active",
          image: `https://picsum.photos/200?random=${i + 50}`,
        };
      }),
    []
  );

  // DELETE Functionality for Promotions
  const handleDelete = (id, code) => {
    Swal.fire({
      title: "Remove Promotion?",
      text: `Are you sure you want to delete the "${code}" discount?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Removed!",
          text: "The discount has been deactivated.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
        });
      }
    });
  };

  const filteredDiscounts = useMemo(() => {
    const term = debouncedSearchValue.toLowerCase();
    return discounts.filter(
      (d) =>
        d.productName.toLowerCase().includes(term) ||
        d.discountCode.toLowerCase().includes(term)
    );
  }, [debouncedSearchValue, discounts]);

  const currentDiscounts = filteredDiscounts.slice(
    (currentPage - 1) * parPage,
    currentPage * parPage
  );

  return (
    <div className="mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar">
        <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          
          {/* Header Section - Responsive Stacking */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 gap-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-xl text-gray-800">
                Discounts & Promotions
              </h2>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider italic">
                Manage your store offers and seasonal sales
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
              <Link
                to="/seller/add-discount"
                className="flex justify-center items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95 w-full sm:w-auto"
              >
                <MdAdd size={18} /> Discount
              </Link>

              <div className="relative flex items-center w-full">
                <MdSearch className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search code or product..."
                  className="pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500 text-sm w-full md:w-64 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Table Section - Minimum width to prevent squishing on mobile */}
          <div className="relative overflow-x-auto rounded-xl border border-gray-100 custom-scrollbar">
            <table className="w-full min-w-212.5 text-sm text-left text-gray-600">
              <thead className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-4">Applied Product</th>
                  <th className="py-4 px-4">Code</th>
                  <th className="py-4 px-4">Deal Details</th>
                  <th className="py-4 px-4">Validity</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentDiscounts.length > 0 ? (
                  currentDiscounts.map((d) => (
                    <tr
                      key={d._id}
                      className="hover:bg-emerald-50/30 transition-all group"
                    >
                      <td className="py-4 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 min-w-10 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                          <img
                            src={d.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-gray-800 whitespace-nowrap">
                          {d.productName}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-100">
                          {d.discountCode}
                        </span>
                      </td>

                      {/* --- CALCULATION: Proper price after discount --- */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-bold text-base leading-tight">
                            ${(d.originalPrice - (d.originalPrice * d.discountPercent) / 100).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-400 line-through">
                              ${d.originalPrice}
                            </span>
                            <span className="text-emerald-600 font-bold text-[9px] bg-emerald-50 px-1 rounded border border-emerald-100">
                              -{d.discountPercent}%
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                          <MdEventAvailable
                            size={14}
                            className="text-gray-400"
                          />
                          <span className="whitespace-nowrap">{d.endDate}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border shadow-sm ${
                            d.status === "Active"
                              ? "bg-emerald-100 text-emerald-600 border-emerald-200"
                              : d.status === "Upcoming"
                                ? "bg-blue-100 text-blue-600 border-blue-200"
                                : "bg-gray-100 text-gray-500 border-gray-200"
                          }`}
                        >
                          {d.status}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex justify-center items-center gap-3">
                          <Link
                            to={`/seller/edit-discount/${d._id}`}
                            className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-800 hover:text-white transition-all shadow-sm"
                          >
                            <MdEdit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(d._id, d.discountCode)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-20 text-center text-gray-400">
                      No matching promotions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {filteredDiscounts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={filteredDiscounts.length}
                parPage={parPage}
                showItem={3}
              />
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default SellerDiscount;