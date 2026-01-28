import React, { useState, useMemo, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaCloudUploadAlt,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [imageShow, setImageShow] = useState("");
  const parPage = 5;

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
      { name: "Puffer Coats", img: "https://images.pexels.com/photos/833052/pexels-photo-833052.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Trench Coats", img: "https://images.pexels.com/photos/7622432/pexels-photo-7622432.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Woolen Sweaters", img: "https://images.pexels.com/photos/5705490/pexels-photo-5705490.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Running Shorts", img: "https://images.pexels.com/photos/3473492/pexels-photo-3473492.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Sports Bras", img: "https://images.pexels.com/photos/3757363/pexels-photo-3757363.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Tracksuits", img: "https://images.pexels.com/photos/7022523/pexels-photo-7022523.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Compression Wear", img: "https://images.pexels.com/photos/4753896/pexels-photo-4753896.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Gym Stringers", img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Casual Sneakers", img: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Formal Shoes", img: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Streetwear Caps", img: "https://images.pexels.com/photos/1078973/pexels-photo-1078973.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Canvas Bags", img: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Belts & Wallets", img: "https://images.pexels.com/photos/1453008/pexels-photo-1453008.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Baby Rompers", img: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Kids' Graphic Tees", img: "https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Sleepwear/Pyjamas", img: "https://images.pexels.com/photos/1023243/pexels-photo-1023243.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Beachwear", img: "https://images.pexels.com/photos/1323667/pexels-photo-1323667.jpeg?auto=compress&cs=tinysrgb&w=150" },
      { name: "Sustainable Fashion", img: "https://images.pexels.com/photos/6032425/pexels-photo-6032425.jpeg?auto=compress&cs=tinysrgb&w=150" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return clothingCategories.filter((c) =>
      c.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, clothingCategories]);

  const totalPages = Math.ceil(filteredData.length / parPage);
  const firstIndex = (currentPage - 1) * parPage;
  const currentData = filteredData.slice(firstIndex, firstIndex + parPage);

  // Helper to generate the smart page numbers (1 ... 4 5 6 ... 30)
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) pageNumbers.push('...');
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex flex-col-reverse lg:flex-row w-full gap-6">

        {/* --- Left Side: Category List --- */}
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#283046] rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#d0d2d6] font-semibold text-lg">Categories</h2>
              <div className="relative">
                <input
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-[#161d31] border border-slate-700 text-[#d0d2d6] rounded-md px-10 py-1 focus:border-indigo-500 outline-none text-sm"
                  type="text"
                  placeholder="Search..."
                />
                <FaSearch className="absolute left-3 top-2 text-slate-400" size={14} />
              </div>
            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-[#d0d2d6] text-left">
                <thead className="text-sm border-b border-slate-700 uppercase">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Image</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.map((d, i) => (
                    <tr key={i} className="border-b border-slate-700 hover:bg-[#343d55]/30">
                      <td className="py-3 px-4 text-slate-400">{i + 1 + firstIndex}</td>
                      <td className="py-3 px-4">
                        <img className="w-11.25 h-11.25 rounded-md object-cover" src={d.img} alt="" />
                      </td>
                      <td className="py-3 px-4 font-semibold text-sm">{d.name}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex justify-center items-center gap-4">
                          <Link className="p-1.5 bg-yellow-500/20 text-yellow-500 rounded hover:shadow-lg">
                            <FaEdit size={14} />
                          </Link>
                          <button className="p-1.5 bg-red-500/20 text-red-500 rounded hover:shadow-lg">
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* ---  PAGINATION UI --- */}
            {totalPages > 1 && (
              <div className="w-full flex justify-end mt-4 gap-2 items-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="p-2 rounded bg-[#161d31] text-[#d0d2d6] disabled:opacity-30 hover:bg-slate-700"
                >
                  <FaAngleLeft />
                </button>

                {getPageNumbers().map((num, index) => (
                  <button
                    key={index}
                    onClick={() => typeof num === "number" && setCurrentPage(num)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      currentPage === num
                        ? "bg-indigo-600 text-white shadow-lg"
                        : num === "..."
                        ? "bg-transparent cursor-default text-slate-500"
                        : "bg-[#161d31] text-[#d0d2d6] hover:bg-slate-700"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="p-2 rounded bg-[#161d31] text-[#d0d2d6] disabled:opacity-30 hover:bg-slate-700"
                >
                  <FaAngleRight />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Right Side: Add New Category Form --- */}
        <div className="w-full lg:w-[38%]">

          <div className="bg-[#283046] p-4 rounded-md text-[#d0d2d6]">
            <h2 className="font-semibold mb-4 text-lg border-b border-slate-700 pb-2">Add New Category</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col w-full gap-1 mb-4">
                <label htmlFor="name" className="text-sm">Category Name</label>
                <input
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                  className="px-4 py-2 bg-[#161d31] border border-slate-700 rounded-md outline-none focus:border-indigo-500 text-[#d0d2d6]"
                  type="text"
                  id="name"
                  placeholder="Category Name"
                />
              </div>
              
              <div className="mb-6">
                <label className="flex justify-center items-center flex-col h-59.5 cursor-pointer border-2 border-dashed border-slate-700 hover:border-indigo-500 w-full rounded-md bg-[#161d31]" htmlFor="image">
                  {imageShow ? (
                    <img className="w-full h-full object-contain" src={imageShow} alt="preview" />
                  ) : (
                    <>
                      <FaCloudUploadAlt size={40} className="text-indigo-500" />
                      <span className="text-sm mt-2">Select Category Image</span>
                    </>
                  )}
                </label>
                <input onChange={imageHandle} className="hidden" type="file" id="image" accept="image/*" />
              </div>
              <button className="bg-indigo-600 w-full text-white rounded-md px-7 py-2.5 font-bold uppercase hover:shadow-indigo-500/40 hover:shadow-lg transition-all">
                Save Category
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;