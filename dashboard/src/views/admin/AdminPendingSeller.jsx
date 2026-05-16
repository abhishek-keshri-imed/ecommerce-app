import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaSearch, FaInbox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_seller_request, messageClear } from "../../store/reducers/sellerReducer";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

const AdminPendingSeller = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    
    const prevParamsRef = useRef(null);
    const abortControllerRef = useRef(null);
    const debounceTimeoutRef = useRef(null);

    const { sellers, totalSeller, loader, errorMessage } = useSelector(state => state.seller);

    const loadSellers = useCallback(() => {
        // Cancel previous request if it's still flying
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const params = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue: searchValue.trim()
        };

        // Avoid duplicate requests for same parameters
        if (JSON.stringify(prevParamsRef.current) === JSON.stringify(params)) {
            return;
        }

        prevParamsRef.current = params;
        abortControllerRef.current = new AbortController();
        
        // We removed resetSellers() here to fix the flickering
        dispatch(get_seller_request({ ...params, signal: abortControllerRef.current.signal }));
    }, [dispatch, parPage, currentPage, searchValue]);

    useEffect(() => {
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        
        // Debounce search/pagination for 400ms
        debounceTimeoutRef.current = setTimeout(() => {
            loadSellers();
        }, 400);

        return () => {
            if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        };
    }, [loadSellers]);

    // Toast/Error Handling
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [errorMessage, dispatch]);

    return (
        <div className="mt-2 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <h1 className="text-xl font-bold text-gray-800">Seller Requests ({totalSeller || 0})</h1>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    value={searchValue}
                                    onChange={(e) => { 
                                        setSearchValue(e.target.value); 
                                        setCurrentPage(1); 
                                    }}
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500"
                                />
                            </div>
                            <select
                                value={parPage}
                                onChange={(e) => { 
                                    setParPage(parseInt(e.target.value)); 
                                    setCurrentPage(1); 
                                }}
                                className="px-4 py-2 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500"
                            >
                                <option value="5">5 / Page</option>
                                <option value="10">10 / Page</option>
                            </select>
                        </div>
                    </div>

                    {/* Subtle dimming effect during background refresh */}
                    <div className={`relative overflow-x-auto rounded-xl border border-gray-100 min-h-[300px] transition-all duration-200 ${loader && sellers.length > 0 ? 'opacity-50' : ''}`}>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase text-gray-500 bg-gray-50 border-b">
                                <tr>
                                    <th className="py-4 px-6">No</th>
                                    <th className="py-4 px-6">Seller</th>
                                    <th className="py-4 px-6">Location</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellers.length > 0 ? (
                                    sellers.map((s, i) => (
                                        <tr key={s._id} className="hover:bg-gray-50 border-b last:border-none transition-colors">
                                            <td className="py-4 px-6 font-medium">{(currentPage - 1) * parPage + (i + 1)}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <img src={s.image || "https://img.freepik.com/free-vector/human-colorful-gradient-style-vector-design_474888-2638.jpg?semt=ais_hybrid&w=740&q=80"} className="w-10 h-10 rounded-full border-2 border-gray-200" alt="avatar" />
                                                    <div>
                                                        <p className="font-bold text-gray-900">{s.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{s.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">{s.shopInfo?.district || "N/A"}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="px-3 py-1 text-xs bg-amber-100 text-amber-800 rounded-full font-bold uppercase tracking-wide">
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Link 
                                                    to={`/admin/sellers-request/details/${s._id}`}
                                                    className="inline-flex items-center justify-center w-10 h-10 bg-indigo-100 hover:bg-indigo-500 hover:text-white text-indigo-600 rounded-xl transition-all"
                                                >
                                                    <FaEye className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : loader ? (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center">
                                            <div className="flex items-center justify-center space-x-2 text-indigo-600">
                                                <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                                                <span className="font-medium">Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center text-gray-400">
                                            <FaInbox className="mx-auto mb-4 w-16 h-16 text-gray-300" />
                                            <p className="text-lg font-medium text-gray-500">No seller requests found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalSeller > parPage && (
                        <div className="flex justify-end mt-6">
                            <Pagination 
                                pageNumber={currentPage} 
                                setPageNumber={setCurrentPage} 
                                totalItem={totalSeller} 
                                parPage={parPage} 
                                showItem={3} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPendingSeller;