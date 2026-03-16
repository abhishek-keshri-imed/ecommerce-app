import React, { useState, useMemo, useEffect } from "react";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdPercent,
  MdAdd,
  MdInventory2,
} from "react-icons/md";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SellerProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [parPage] = useState(6);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  // Debounce for search to prevent laggy typing
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchValue(searchValue), 300);
    return () => clearTimeout(handler);
  }, [searchValue]);

  // Mock Products Data (Includes images and more realistic stock values)
  const products = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        _id: `prod_${100 + i}`,
        name:
          i % 3 === 0
            ? `Nike Air Max ${i}`
            : i % 2 === 0
              ? `iPhone 15 Pro ${i}`
              : `Urban Hoodie ${i}`,
        category:
          i % 3 === 0 ? "Footwear" : i % 2 === 0 ? "Electronics" : "Fashion",
        price: 150 + i * 10,
        discount: i % 5 === 0 ? 15 : 0,
        // eslint-disable-next-line react-hooks/purity
        stock: i === 2 ? 0 : Math.floor(Math.random() * 50), // Force one out of stock for testing
        image: `https://picsum.photos/200?random=${i}`,
      })),
    [],
  );

  // DELETE Functionality with SweetAlert2
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: "warning",      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "px-4 py-2 rounded-lg font-bold",
        cancelButton: "px-4 py-2 rounded-lg font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform your API logic here: dispatch(delete_product(id))
        Swal.fire({
          title: "Deleted!",
          text: "Product has been removed from your store.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          customClass: { popup: "rounded-2xl" },
        });
      }
    });
  };

  // Optimized Filtering
  const filteredProducts = useMemo(() => {
    const term = debouncedSearchValue.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    );
  }, [debouncedSearchValue, products]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * parPage,
    currentPage * parPage,
  );

  return (
    <div className="mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar">
        <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Header Section */}
          <div className="flex justify-between items-center pb-6 flex-wrap gap-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-xl text-gray-800">
                Product Catalog
              </h2>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider italic">
                Store Inventory Management
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/seller/add-product"
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
              >
                <MdAdd size={18} /> Add Product
              </Link>
              <div className="relative flex items-center">
                <MdSearch className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(1); // Reset to page 1 on search
                  }}
                  placeholder="Search products..."
                  className="pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm w-64 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="relative overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="py-4 px-4">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Discount</th>
                  <th className="py-4 px-4 text-center">Stock Status</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentProducts.length > 0 ? (
                  currentProducts.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-indigo-50/30 transition-all group"
                    >
                      {/* Product Info with Image */}
                      <td className="py-4 px-4 flex items-center gap-3">
                        <div className="w-12 h-12 min-w-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 leading-tight">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">
                            {p._id}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-medium text-gray-500">
                        {p.category}
                      </td>

                      <td className="py-4 px-4 font-bold text-gray-800">
                        ${p.price}
                      </td>

                      <td className="py-4 px-4">
                        {p.discount > 0 ? (
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-[10px] font-bold border border-orange-200">
                            -{p.discount}% OFF
                          </span>
                        ) : (
                          <span className="text-gray-300 text-[10px] font-bold tracking-widest">
                            REGULAR
                          </span>
                        )}
                      </td>

                      {/* Dynamic Stock Badges */}
                      <td className="py-4 px-4 text-center">
                        {p.stock === 0 ? (
                          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-bold uppercase border border-red-200 shadow-sm">
                            Out of Stock
                          </span>
                        ) : p.stock < 10 ? (
                          <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-bold uppercase border border-amber-200 shadow-sm">
                            Low: {p.stock}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase border border-emerald-200 shadow-sm">
                            {p.stock} In Stock
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4">
                        <div className="flex justify-center items-center gap-3">
                          <Link
                            to={`/seller/edit-product/${p._id}`}
                            title="Edit"
                            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition-all shadow-sm"
                          >
                            <MdEdit size={18} />
                          </Link>
                          <Link
                            to={`/seller/discount-product/${p._id}`}
                            title="Discount"
                            className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                          >
                            <MdPercent size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id, p.name)}
                            title="Delete"
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* Empty State Row */
                  <tr>
                    <td colSpan="6" className="py-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-3 animate-fade-in">
                        <div className="bg-gray-50 p-6 rounded-full border border-dashed border-gray-200">
                          <MdInventory2 size={48} className="text-gray-200" />
                        </div>
                        <p className="text-gray-500 font-bold text-lg">
                          No matching products found
                        </p>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                          Try clearing your search filters or add a new product
                          to your inventory.
                        </p>
                        <button
                          onClick={() => setSearchValue("")}
                          className="mt-2 text-indigo-600 font-bold hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {filteredProducts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={filteredProducts.length}
                parPage={parPage}
                showItem={3}
              />
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar CSS */}
      <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
    </div>
  );
};

export default SellerProduct;
