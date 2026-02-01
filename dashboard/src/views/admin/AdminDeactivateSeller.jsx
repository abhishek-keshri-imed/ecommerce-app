import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../../components/Pagination";

const AdminDeactivateSeller = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  // --- Mock Data: Deactivated/Inactive Sellers ---
  const [sellers] = useState([
    { no: 1, name: "Premium Apparel", email: "auth@premium.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Premium", division: "California", district: "L.A.", status: "Deactivated" },
    { no: 2, name: "Urban Kicks", email: "info@urban.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Urban", division: "New York", district: "Brooklyn", status: "Deactivated" },
    { no: 3, name: "Eco Decor", email: "sale@eco.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eco", division: "Texas", district: "Austin", status: "Deactivated" },
    { no: 4, name: "Tech Gadgets", email: "admin@tech.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech", division: "Dhaka", district: "Mirpur", status: "Deactivated" },
    { no: 5, name: "Luxury Watch", email: "ceo@watch.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luxury", division: "London", district: "West", status: "Deactivated" },
    { no: 6, name: "Pure Organic", email: "farm@pure.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Organic", division: "California", district: "S.F.", status: "Deactivated" },
    { no: 7, name: "Fit Gear", email: "gym@fit.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fit", division: "Texas", district: "Dallas", status: "Deactivated" },
    { no: 8, name: "Trend Setter", email: "style@trend.com", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trend", division: "Paris", district: "Center", status: "Deactivated" },
  ]);

  const filteredSellers = sellers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      s.email.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const lastIndex = currentPage * parPage;
  const firstIndex = lastIndex - parPage;
  const currentSellers = filteredSellers.slice(firstIndex, lastIndex);

  return (
    <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative px-4 lg:px-7 pb-4'>
      
      {/* Content Container */}
      <div className="flex-1 mt-5 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        
        {/* Controls Header */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Show</span>
            <select
              onChange={(e) => {
                setParPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="5">05</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="relative w-full md:w-72">
            <input
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
              value={searchValue}
              type="text"
              placeholder="Search deactivated sellers..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] uppercase tracking-widest font-bold text-gray-400 bg-gray-50/80 sticky top-0 z-10 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6">No</th>
                <th className="py-4 px-6">Profile</th>
                <th className="py-4 px-6">Store Name</th>
                <th className="py-4 px-6">Email Address</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentSellers.map((s, i) => (
                <tr key={i} className="hover:bg-indigo-50/20 transition-all group">
                  <td className="py-4 px-6 font-bold text-gray-400">#{s.no}</td>
                  <td className="py-4 px-6">
                    <img
                      className="w-10 h-10 rounded-xl object-cover border border-gray-100 group-hover:border-indigo-200 transition-colors"
                      src={s.image}
                      alt={s.name}
                    />
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-800">{s.name}</td>
                  <td className="py-4 px-6 text-gray-500 font-medium">{s.email}</td>
                  <td className="py-4 px-6">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{s.district}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-600 border border-red-200">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      to={`/admin/deactive-sellers/details/${s.no}`}
                      className="inline-flex items-center justify-center p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      <FaEye className="text-base" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State */}
          {currentSellers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
               <p className="font-bold uppercase tracking-widest text-xs">No inactive sellers found</p>
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="p-6 border-t border-gray-50 flex justify-end shrink-0">
          {filteredSellers.length > parPage && (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={filteredSellers.length}
              parPage={parPage}
              showItem={3}
            />
          )}
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

export default AdminDeactivateSeller;