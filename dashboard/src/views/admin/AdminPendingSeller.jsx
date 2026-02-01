import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../../components/Pagination"; 

const AdminPendingSeller = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  // --- Mock Data: 12 Sellers ---
  const [sellers] = useState([
    { no: 1, name: "Premium Apparel", email: "auth@premium.com", image: "https://picsum.photos/150?random=1", division: "California", district: "L.A.", status: "Pending" },
    { no: 2, name: "Urban Kicks", email: "info@urban.com", image: "https://picsum.photos/150?random=2", division: "New York", district: "Brooklyn", status: "Pending" },
    { no: 3, name: "Eco Decor", email: "sale@eco.com", image: "https://picsum.photos/150?random=3", division: "Texas", district: "Austin", status: "Pending" },
    { no: 4, name: "Tech Gadgets", email: "admin@tech.com", image: "https://picsum.photos/150?random=4", division: "Dhaka", district: "Mirpur", status: "Pending" },
    { no: 5, name: "Luxury Watch", email: "ceo@watch.com", image: "https://picsum.photos/150?random=5", division: "London", district: "West", status: "Pending" },
    { no: 6, name: "Pure Organic", email: "farm@pure.com", image: "https://picsum.photos/150?random=6", division: "California", district: "S.F.", status: "Pending" },
    { no: 7, name: "Fit Gear", email: "gym@fit.com", image: "https://picsum.photos/150?random=7", division: "Texas", district: "Dallas", status: "Pending" },
    { no: 8, name: "Trend Setter", email: "style@trend.com", image: "https://picsum.photos/150?random=8", division: "Paris", district: "Center", status: "Pending" },
    { no: 9, name: "Baby Care", email: "care@baby.com", image: "https://picsum.photos/150?random=9", division: "Berlin", district: "Mitte", status: "Pending" },
    { no: 10, name: "Home Style", email: "deco@home.com", image: "https://picsum.photos/150?random=10", division: "Tokyo", district: "Shibuya", status: "Pending" },
    { no: 11, name: "Gamer Zone", email: "play@gamer.com", image: "https://picsum.photos/150?random=11", division: "Seoul", district: "Gangnam", status: "Pending" },
    { no: 12, name: "Pet Shop", email: "paws@pet.com", image: "https://picsum.photos/150?random=12", division: "Sydney", district: "NSW", status: "Pending" },
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
    <div className='mt-2 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative'>
      
      {/* Internal Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-4 custom-scrollbar overscroll-contain">
        
        <div className="w-full p-3 bg-white rounded-1xl shadow-sm border border-gray-200">
          
          {/* Controls: Records Filter & Search */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-400 uppercase">Show</span>
              <select
                value={parPage} 
                onChange={(e) => {
                  setParPage(parseInt(e.target.value));
                  setCurrentPage(1); 
                }}
                className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-gray-300 rounded-lg text-gray-700 font-semibold cursor-pointer"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>

            <input
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
              value={searchValue}
              type="text"
              placeholder="Search seller..."
              className="px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-gray-300 rounded-lg text-gray-700 w-64 shadow-sm"
            />
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-[11px] uppercase tracking-wider text-gray-400 bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-4 font-bold">No</th>
                  <th className="py-4 px-4 font-bold">Image</th>
                  <th className="py-4 px-4 font-bold">Name</th>
                  <th className="py-4 px-4 font-bold">Email</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSellers.map((s) => (
                  <tr key={s.no} className="border-b border-gray-50 hover:bg-indigo-50/30 transition-all">
                    <td className="py-4 px-4 font-medium text-gray-500">{s.no}</td>
                    <td className="py-4 px-4">
                      <img className="w-10 h-10 rounded-full object-cover border border-gray-200" src={s.image} alt="" />
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-800">{s.name}</td>
                    <td className="py-4 px-4">{s.email}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-orange-100 text-orange-600">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                        <Link
                          to={`/admin/sellers-request/details/${s.no}`}
                          className="inline-flex p-2.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaEye size={16}/>
                        </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <div className="w-full flex justify-end mt-6">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={filteredSellers.length}
              parPage={parPage}
              showItem={3}
            />
          </div>
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

export default AdminPendingSeller;