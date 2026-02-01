import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdSearch, MdStorefront } from "react-icons/md";
import Pagination from "../../components/Pagination";

const AdminSellers = () => {
  // 1. All States defined at the top
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  // 2. Data Initialization
  const [sellers] = useState([
    { no: 1, name: "Premium Apparel", email: "auth@premium.com", image: "https://picsum.photos/150?random=1", division: "California", district: "L.A.", status: "Active" },
    { no: 2, name: "Urban Kicks", email: "info@urban.com", image: "https://picsum.photos/150?random=2", division: "New York", district: "Brooklyn", status: "Pending" },
    { no: 3, name: "Eco Decor", email: "sale@eco.com", image: "https://picsum.photos/150?random=3", division: "Texas", district: "Austin", status: "Inactive" },
    { no: 4, name: "Tech Gadgets", email: "admin@tech.com", image: "https://picsum.photos/150?random=4", division: "Dhaka", district: "Mirpur", status: "Active" },
    { no: 5, name: "Luxury Watch", email: "ceo@watch.com", image: "https://picsum.photos/150?random=5", division: "London", district: "West", status: "Pending" },
    { no: 6, name: "Pure Organic", email: "farm@pure.com", image: "https://picsum.photos/150?random=6", division: "California", district: "S.F.", status: "Active" },
    { no: 7, name: "Fit Gear", email: "gym@fit.com", image: "https://picsum.photos/150?random=7", division: "Texas", district: "Dallas", status: "Inactive" },
    { no: 8, name: "Trend Setter", email: "style@trend.com", image: "https://picsum.photos/150?random=8", division: "Paris", district: "Center", status: "Active" },
    { no: 9, name: "Baby Care", email: "care@baby.com", image: "https://picsum.photos/150?random=9", division: "Berlin", district: "Mitte", status: "Pending" },
    { no: 10, name: "Home Style", email: "deco@home.com", image: "https://picsum.photos/150?random=10", division: "Tokyo", district: "Shibuya", status: "Active" },
    { no: 11, name: "Gamer Zone", email: "play@gamer.com", image: "https://picsum.photos/150?random=11", division: "Seoul", district: "Gangnam", status: "Active" },
    { no: 12, name: "Pet Shop", email: "paws@pet.com", image: "https://picsum.photos/150?random=12", division: "Sydney", district: "NSW", status: "Inactive" },
    { no: 13, name: "Book Worm", email: "read@books.com", image: "https://picsum.photos/150?random=13", division: "Toronto", district: "Ontario", status: "Active" },
    { no: 14, name: "Music Hub", email: "beats@music.com", image: "https://picsum.photos/150?random=14", division: "Milan", district: "Lombardy", status: "Pending" },
    { no: 15, name: "Art Gallery", email: "paint@art.com", image: "https://picsum.photos/150?random=15", division: "Madrid", district: "Center", status: "Active" },
  ]);

  // 3. Search Logic (Must be after sellers state)
  const filteredSellers = sellers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      s.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  // 4. Pagination Logic
  const lastIndex = currentPage * parPage;
  const firstIndex = lastIndex - parPage;
  const currentSellers = filteredSellers.slice(firstIndex, lastIndex);

  return (
    // FIX: 'h-screen' and 'overflow-hidden' stops the main background from scrolling
    <div className="h-[calc(100vh-110px)] w-full bg-[#f8f9fa] flex flex-col px-3 md:px-7 pb-5 overflow-hidden">
      
      {/* Page Header (Fixed) */}
      <div className='py-6 shrink-0'>
        <h1 className='text-2xl font-bold text-gray-800'>Seller Management</h1>
        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]'>Overview of platform partners</p>
      </div>

      {/* Main Container (Card) */}
      <div className="flex-1 w-full bg-white rounded-2xl shadow-sm border border-gray-200 mb-5 flex flex-col overflow-hidden">
        
        {/* Top Controls Bar */}
        <div className="p-5 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Per Page</span>
            <select
              onChange={(e) => {
                setParPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 focus:border-indigo-500 outline-none bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 cursor-pointer shadow-sm"
            >
              <option value="5">5</option>
               <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
              value={searchValue}
              type="text"
              placeholder="Search store or email..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Table Area: This scrolls internally */}
        <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 bg-gray-50/90 backdrop-blur-md">
              <tr className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                <th className="py-4 px-6 border-b border-gray-100">No</th>
                <th className="py-4 px-6 border-b border-gray-100">Store Profile</th>
                <th className="py-4 px-6 border-b border-gray-100">Location</th>
                <th className="py-4 px-6 border-b border-gray-100">Status</th>
                <th className="py-4 px-6 border-b border-gray-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSellers.length > 0 ? (
                currentSellers.map((s, i) => (
                  <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                    <td className="py-4 px-6 border-b border-gray-50 text-xs font-bold text-gray-400">#{s.no}</td>
                    <td className="py-4 px-6 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                        <img className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-sm ring-1 ring-gray-100" src={s.image} alt="" />
                        <div>
                          <p className="text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">{s.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-50">
                      <p className="text-xs font-bold text-gray-600">{s.district}</p>
                      <p className="text-[10px] text-gray-400">{s.division}</p>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-50">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] uppercase font-black tracking-tighter shadow-sm
                        ${s.status === "Active" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : 
                          s.status === "Pending" ? "bg-amber-50 text-amber-600 border border-amber-100" : 
                          "bg-rose-50 text-rose-600 border border-rose-100"}
                      `}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-50 text-right">
                      <Link to={`/admin/seller/details/${s.no}`} className="inline-flex p-2 bg-white border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-600 rounded-xl shadow-sm transition-all active:scale-90">
                        <FaEye size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center align-middle">
                    <div className="flex flex-col items-center gap-2 opacity-20">
                      <MdStorefront size={48} />
                      <p className="text-xs font-black uppercase tracking-widest">No sellers matching your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Pinned to bottom of the card */}
        <div className="p-5 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 bg-white">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Showing {currentSellers.length} of {filteredSellers.length} records
          </p>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={filteredSellers.length}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default AdminSellers;