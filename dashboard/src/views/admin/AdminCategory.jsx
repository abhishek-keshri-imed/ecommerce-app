import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaSearch, FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import {
  category_add,
  get_categories,
  messageClear,
  delete_category,
  update_category,
} from "../../store/reducers/categoryReducer";
import toast from "react-hot-toast";

const Category = () => {
  const dispatch = useDispatch();
  const { loader, categories, successMessage, errorMessage } = useSelector(
    (state) => state.category,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [imageShow, setImageShow] = useState("");
  const [parPage, setParPage] = useState(5);

  // Expanded local state to handle the parentId structural selector mapping
  const [state, setState] = useState({ name: "", parentId: "" });
  const [imageFile, setImageFile] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editId, setEditId] = useState("");

  // Fetch all existing categories from the database on component mount
  useEffect(() => {
    dispatch(get_categories());
  }, [dispatch]);

  // Handle operation lifecycle alerts
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setState({ name: "", parentId: "" });
      setEditId("");
      setImageShow("");
      setImageFile(null);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  // Triggered by the button
  const handleDeleteClick = (id) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  // Triggered by the modal's "Confirm" button
  const confirmDelete = () => {
    dispatch(delete_category(deleteTarget));
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setImageFile(files[0]);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => setDebouncedSearch(searchValue), 300);
    return () => clearTimeout(delay);
  }, [searchValue]);

  // Handle multi-part payload network transmissions
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!state.name) return toast.error("Please insert a valid category name!");

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("parentId", state.parentId);
    if (imageFile) formData.append("image", imageFile);

    if (editId) {
      // If editId exists, update
      dispatch(update_category({ categoryId: editId, formData }));
    } else {
      // Otherwise, add new
      dispatch(category_add(formData));
    }
  };

  // Filter real-time array lists based on search token inputs
  const filteredData = useMemo(() => {
    return categories.filter((c) =>
      c.name?.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, categories]);

  const firstIndex = (currentPage - 1) * parPage;
  const currentData = filteredData.slice(firstIndex, firstIndex + parPage);

  return (
    <div className="mt-2 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative">
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
                  <FaSearch
                    className="absolute left-3 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-gray-600 text-left">
                  <thead className="text-[11px] border-b border-gray-100 uppercase tracking-widest bg-gray-50 text-gray-400 font-bold">
                    <tr>
                      <th className="py-4 px-4">No</th>
                      <th className="py-4 px-4">Image</th>
                      <th className="py-4 px-4">Name</th>
                      <th className="py-4 px-4">Tier</th>
                      <th className="py-4 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {currentData.length > 0 ? (
                      currentData.map((d, i) => (
                        <tr
                          key={d._id || i}
                          className="hover:bg-indigo-50/30 transition-all"
                        >
                          <td className="py-4 px-4 text-gray-500 font-medium">
                            {i + 1 + firstIndex}
                          </td>
                          <td className="py-4 px-4">
                            <img
                              className="w-10 h-10 rounded-lg object-contain border border-gray-100 bg-slate-50"
                              src={d.image}
                              alt=""
                            />
                          </td>
                          <td className="py-4 px-4 font-bold text-gray-800 text-sm">
                            {d.name}
                            <span className="block text-[10px] text-gray-400 font-mono">
                              /{d.slug}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {d.parentId ? (
                              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-50 text-amber-700 border border-amber-100">
                                Child Node
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                                Primary Root
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-center items-center gap-3">
                              <button
                                onClick={() => {
                                  setEditId(d._id);
                                  setState({
                                    name: d.name,
                                    parentId: d.parentId || "",
                                  });
                                  setImageShow(d.image);
                                }}
                                className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition-all shadow-sm"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(d._id)}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-8 text-gray-400 text-sm"
                        >
                          No valid taxonomy records located.
                        </td>
                      </tr>
                    )}
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

          {/* Add this block right before the final closing </div> */}
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-sm">
              <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
                <h3 className="text-lg font-bold text-gray-800">
                  Delete Category
                </h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Are you sure you want to remove this category? This action is
                  permanent.
                </p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-bold transition-all"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- Right Side: Add Form (Fixed behavior within scroll) --- */}
          <div className="w-full lg:w-[38%]">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-0">
              <h2 className="font-bold mb-6 text-lg text-gray-800 border-b border-gray-100 pb-4 tracking-tight">
                {editId ? "Update Category" : "Add New Category"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="flex flex-col w-full gap-2 mb-4">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    Category Name
                  </label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm"
                    type="text"
                    id="name"
                    placeholder="e.g. Streetwear"
                    required
                  />
                </div>

                {/* Parent Structural Hierarchy Selection Node Option Dropdown */}
                <div className="flex flex-col w-full gap-2 mb-4">
                  <label
                    htmlFor="parentId"
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    Assign to Parent
                  </label>
                  <select
                    id="parentId"
                    value={state.parentId}
                    onChange={(e) =>
                      setState({ ...state, parentId: e.target.value })
                    }
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm text-sm font-semibold cursor-pointer"
                  >
                    <option value="">Main Category</option>
                    {categories
                      .filter((c) => !c.parentId && c._id !== editId)
                      .map((parent) => (
                        <option key={parent._id} value={parent._id}>
                          {parent.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    className="flex justify-center items-center flex-col h-60 cursor-pointer border-2 border-dashed border-gray-200 hover:border-indigo-500 hover:bg-indigo-50/20 w-full rounded-2xl transition-all"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img
                        className="w-full h-full object-contain p-2"
                        src={imageShow}
                        alt="preview"
                      />
                    ) : (
                      <>
                        <FaCloudUploadAlt
                          size={40}
                          className="text-indigo-500 mb-2"
                        />
                        <span className="text-xs font-bold text-gray-500">
                          UPLOAD CATEGORY IMAGE
                        </span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    id="image"
                    accept="image/*"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  {editId && (
                    <button
                      onClick={() => {
                        setEditId("");
                        setState({ name: "", parentId: "" });
                        setImageShow("");
                        setImageFile(null);
                      }}
                      type="button"
                      className="bg-gray-400 w-full text-white rounded-xl px-7 py-3 font-bold uppercase text-sm hover:bg-gray-500 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    disabled={loader}
                    type="submit"
                    className="bg-indigo-600 w-full text-white rounded-xl px-7 py-3 font-bold uppercase text-sm hover:shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                  >
                    {loader
                      ? "Processing..."
                      : editId
                        ? "Update Category"
                        : "Save Category"}
                  </button>
                </div>
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
