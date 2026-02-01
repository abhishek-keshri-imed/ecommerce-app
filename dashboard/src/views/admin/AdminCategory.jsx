import React, { useState, useMemo, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [imageShow, setImageShow] = useState("");
  const [parPage, setParPage] = useState(5); // Now dynamic

  const [state, setState] = useState({ name: "", image: "" });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({ ...state, image: files[0] });
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(delay);
  }, [searchValue]);

  const clothingCategories = useMemo(
    () => [
      { name: "Men's Oversized Tees", img: "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Men's Denim", img: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Men's Formal Shirts", img: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Men's Cargo Pants", img: "https://images.pexels.com/photos/11039284/pexels-photo-11039284.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Men's Blazers", img: "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Women's Summer Dresses", img: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Women's Crop Tops", img: "https://images.pexels.com/photos/3756023/pexels-photo-3756023.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Women's Leggings", img: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Women's Skirts", img: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Women's Ethnic Wear", img: "https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Hoodies & Sweatshirts", img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Leather Jackets", img: "https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=150" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return clothingCategories.filter((c) =>
      c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, clothingCategories]);

  const firstIndex = (currentPage - 1) * parPage;
  const currentData = filteredData.slice(firstIndex, firstIndex + parPage);

  return (
    <div className='mt-2 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative'>
      
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar overscroll-contain">
        <div className="flex flex-col-reverse lg:flex-row w-full gap-6">

          {/* --- Left Side: Category List --- */}
          <div className="w-full lg:w-7/12">
            <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              
              {/* Header with Search and PerPage Filter */}
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <select
                        value={parPage}
                        onChange={(e) => {
                            setParPage(parseInt(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
                    >
                        <option value="5">5 Per Page</option>
                        <option value="10">10 Per Page</option>
                        <option value="20">20 Per Page</option>
                    </select>
                </div>

                <div className="relative flex items-center">
                  <input
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-white border border-gray-300 text-gray-700 rounded-lg px-10 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm w-64 shadow-sm"
                    type="text"
                    placeholder="Search category..."
                  />
                  <FaSearch className="absolute left-3 text-gray-400" size={16} />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-gray-600 text-left">
                  <thead className="text-[11px] border-b border-gray-100 uppercase tracking-widest bg-gray-50 text-gray-400 font-bold">
                    <tr>
                      <th className="py-4 px-4">No</th>
                      <th className="py-4 px-4">Image</th>
                      <th className="py-4 px-4">Name</th>
                      <th className="py-4 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentData.map((d, i) => (
                      <tr key={i} className="hover:bg-indigo-50/30 transition-all">
                        <td className="py-4 px-4 text-gray-500 font-medium">{i + 1 + firstIndex}</td>
                        <td className="py-4 px-4">
                          <img className="w-10 h-10 rounded-lg object-cover border border-gray-100" src={d.img} alt="" />
                        </td>
                        <td className="py-4 px-4 font-bold text-gray-800 text-sm">{d.name}</td>
                        <td className="py-4 px-4">
                          <div className="flex justify-center items-center gap-3">
                            <Link className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition-all shadow-sm">
                              <FaEdit size={14} />
                            </Link>
                            <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm">
                              <FaTrash size={14} />
                            </button>
                          </div>
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
                    totalItem={filteredData.length}
                    parPage={parPage}
                    showItem={3}
                />
              </div>
            </div>
          </div>

          {/* --- Right Side: Add Form (Fixed behavior within scroll) --- */}
          <div className="w-full lg:w-[38%]">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-0">
              <h2 className="font-bold mb-6 text-lg text-gray-800 border-b border-gray-100 pb-4 tracking-tight">Add New Category</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col w-full gap-2 mb-4">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category Name</label>
                  <input
                    value={state.name}
                    onChange={(e) => setState({ ...state, name: e.target.value })}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm"
                    type="text"
                    id="name"
                    placeholder="e.g. Streetwear"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="flex justify-center items-center flex-col h-60 cursor-pointer border-2 border-dashed border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/20 w-full rounded-2xl transition-all" htmlFor="image">
                    {imageShow ? (
                      <img className="w-full h-full object-contain p-2" src={imageShow} alt="preview" />
                    ) : (
                      <>
                        <FaCloudUploadAlt size={40} className="text-indigo-500 mb-2" />
                        <span className="text-xs font-bold text-gray-500">UPLOAD CATEGORY IMAGE</span>
                      </>
                    )}
                  </label>
                  <input onChange={imageHandle} className="hidden" type="file" id="image" accept="image/*" />
                </div>
                <button className="bg-indigo-600 w-full text-white rounded-xl px-7 py-3 font-bold uppercase text-sm hover:shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Save Category
                </button>
              </form>
            </div>
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

export default Category;