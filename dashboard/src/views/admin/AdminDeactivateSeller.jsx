import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Pagination from "../../components/Pagination"; // Reusing the component created earlier

const AdminDeactivateSeller = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  // --- Mock Data Category: 20 Sellers ---
  const [sellers] = useState([
    {
      no: 1,
      name: "Premium Apparel",
      email: "auth@premium.com",
      image: "https://picsum.photos/150?random=1",
      division: "California",
      district: "L.A.",
      status: "Inactive",
    },
    {
      no: 2,
      name: "Urban Kicks",
      email: "info@urban.com",
      image: "https://picsum.photos/150?random=2",
      division: "New York",
      district: "Brooklyn",
      status: "Inactive",
    },
    {
      no: 3,
      name: "Eco Decor",
      email: "sale@eco.com",
      image: "https://picsum.photos/150?random=3",
      division: "Texas",
      district: "Austin",
      status: "Inactive",
    },
    {
      no: 4,
      name: "Tech Gadgets",
      email: "admin@tech.com",
      image: "https://picsum.photos/150?random=4",
      division: "Dhaka",
      district: "Mirpur",
      status: "Inactive",
    },
    {
      no: 5,
      name: "Luxury Watch",
      email: "ceo@watch.com",
      image: "https://picsum.photos/150?random=5",
      division: "London",
      district: "West",
      status: "Inactive",
    },
    {
      no: 6,
      name: "Pure Organic",
      email: "farm@pure.com",
      image: "https://picsum.photos/150?random=6",
      division: "California",
      district: "S.F.",
      status: "Inactive",
    },
    {
      no: 7,
      name: "Fit Gear",
      email: "gym@fit.com",
      image: "https://picsum.photos/150?random=7",
      division: "Texas",
      district: "Dallas",
      status: "Inactive",
    },
    {
      no: 8,
      name: "Trend Setter",
      email: "style@trend.com",
      image: "https://picsum.photos/150?random=8",
      division: "Paris",
      district: "Center",
      status: "Inactive",
    },
    {
      no: 9,
      name: "Baby Care",
      email: "care@baby.com",
      image: "https://picsum.photos/150?random=9",
      division: "Berlin",
      district: "Mitte",
      status: "Inactive",
    },
    {
      no: 10,
      name: "Home Style",
      email: "deco@home.com",
      image: "https://picsum.photos/150?random=10",
      division: "Tokyo",
      district: "Shibuya",
      status: "Inactive",
    },
    {
      no: 11,
      name: "Gamer Zone",
      email: "play@gamer.com",
      image: "https://picsum.photos/150?random=11",
      division: "Seoul",
      district: "Gangnam",
      status: "Inactive",
    },
    {
      no: 12,
      name: "Pet Shop",
      email: "paws@pet.com",
      image: "https://picsum.photos/150?random=12",
      division: "Sydney",
      district: "NSW",
      status: "Inactive",
    },
    {
      no: 13,
      name: "Book Worm",
      email: "read@books.com",
      image: "https://picsum.photos/150?random=13",
      division: "Toronto",
      district: "Ontario",
      status: "Inactive",
    },
    {
      no: 18,
      name: "Smart Home",
      email: "iot@smart.com",
      image: "https://picsum.photos/150?random=18",
      division: "Chicago",
      district: "IL",
      status: "Inactive",
    },
  ]);

  // --- Pagination & Search Logic ---
  const filteredSellers = sellers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      s.email.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const lastIndex = currentPage * parPage;
  const firstIndex = lastIndex - parPage;
  const currentSellers = filteredSellers.slice(firstIndex, lastIndex);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md shadow-md">
        {/* Header Category: Controls */}
        <div className="flex justify-between items-center mb-6">
          <select
            onChange={(e) => {
              setParPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
              setCurrentPage(1);
            }}
            value={searchValue}
            type="text"
            placeholder="Search seller..."
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#161d31] border border-slate-700 rounded-md text-[#d0d2d6] w-62.5"
          />
        </div>

        {/* Table Category */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-xs uppercase border-b border-slate-700 bg-[#283046]">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSellers.map((s, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-700 hover:bg-slate-800/50 transition-all"
                >
                  <td className="py-3 px-4 font-medium">{s.no}</td>
                  <td className="py-3 px-4">
                    <img
                      className="w-11.25 h-11.25 rounded-full object-cover border border-slate-600"
                      src={s.image}
                      alt=""
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold">{s.name}</td>
                  <td className="py-3 px-4">{s.email}</td>
                  <td className="py-3 px-4">{s.district}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-bold ${
                        s.status === "Active"
                          ? "bg-green-500/20 text-green-500"
                          : s.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin/deactive-sellers/details/${s.no}`}
                      className="p-2 bg-indigo-500 rounded hover:shadow-lg flex justify-center items-center w-fit text-white"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Navigation Category */}
        {filteredSellers.length > parPage && (
          <div className="w-full flex justify-end mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={filteredSellers.length}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDeactivateSeller;
