import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import Pagination from '../../components/Pagination';
import { MdOutlinePendingActions, MdHistory } from "react-icons/md";

const AdminPaymentProcess = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const parPage = 5; 

    // Mock data simulation
    const allRequests = [...Array(25)]; 
    const startIndex = (pageNumber - 1) * parPage;
    const paginatedData = allRequests.slice(startIndex, startIndex + parPage);

    return (
        /* Increased top margin and ensured outer container allows for vertical growth */
        <div className='mt-2h-[calc(100vh-110px)]  w-full bg-[#f8f9fa] flex flex-col px-3 md:px-7 pb-10'>
            
            {/* Header Section */}
            <div className='py-6 shrink-0'>
                <h1 className='text-2xl font-bold text-gray-800'>Payment Processing</h1>
                <p className='text-xs text-gray-400 font-medium uppercase tracking-wider'>Manage pending withdrawals and payout history</p>
            </div>

            {/* Grid container with min-height to prevent jumping during pagination */}
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>
                
                {/* LEFT SIDE: Withdrawal Requests - Added min-h-[600px] */}
                <div className='bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col min-h-[600px]'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='p-2 bg-amber-50 text-amber-600 rounded-lg'>
                            <MdOutlinePendingActions size={22}/>
                        </div>
                        <h2 className='text-lg font-bold text-gray-700'>Withdrawal Requests</h2>
                    </div>

                    <div className='overflow-x-auto custom-scrollbar flex-1'>
                        <table className='w-full text-left min-w-[450px]'>
                            <thead className='text-[10px] uppercase text-gray-400 font-bold tracking-widest bg-gray-50'>
                                <tr>
                                    <th className='py-3 px-4 rounded-l-xl'>No</th>
                                    <th className='py-3 px-4'>Seller</th>
                                    <th className='py-3 px-4'>Amount</th>
                                    <th className='py-3 px-4'>Status</th>
                                    <th className='py-3 px-4 text-right rounded-r-xl'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-gray-600'>
                                {paginatedData.map((_, i) => (
                                    <tr key={i} className='border-b border-gray-50 hover:bg-gray-50/50 transition-colors group'>
                                        <td className='py-4 px-4 text-xs font-bold text-gray-400'>#{startIndex + i + 1}</td>
                                        <td className='py-4 px-4 text-sm font-bold text-gray-700 group-hover:text-indigo-600'>Sheikh Store</td>
                                        <td className='py-4 px-4 font-black text-indigo-600'>$500.00</td>
                                        <td className='py-4 px-4'>
                                            <span className='bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-[9px] uppercase font-black'>pending</span>
                                        </td>
                                        <td className='py-4 px-4 text-right'>
                                            <button className='bg-white border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 text-gray-400 p-2 rounded-xl transition-all shadow-sm active:scale-90'>
                                                <FaEye size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination stays pinned to bottom due to flex-col and flex-1 above */}
                    <div className='pt-6 border-t border-gray-50'>
                        <Pagination 
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            totalItem={allRequests.length} 
                            parPage={parPage}
                            showItem={3}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: Success History - Added min-h-[600px] */}
                <div className='bg-white rounded-2xl p-5 border border-gray-200 shadow-sm min-h-100 flex flex-col'>
                    <div className='flex justify-between items-center mb-6'>
                        <div className='flex items-center gap-3'>
                            <div className='p-2 bg-indigo-50 text-indigo-600 rounded-lg'>
                                <MdHistory size={22}/>
                            </div>
                            <h2 className='text-lg font-bold text-gray-700'>Recent Payouts</h2>
                        </div>
                        <Link 
                            to='/admin/dashboard/payment-history' 
                            className='text-[11px] font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all border border-indigo-100'
                        >
                            VIEW ALL
                        </Link>
                    </div>

                    {/* Increased max-h to utilize the new container height */}
                    <div className='space-y-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar flex-1'>
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className='flex justify-between items-center p-4 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-emerald-200 transition-all'>
                                <div className='flex items-center gap-4'>
                                    <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100 shadow-sm'>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className='text-sm font-bold text-gray-700'>Fashion World</p>
                                        <p className='text-[10px] text-gray-400 font-medium'>27 Jan 2026 • 02:45 PM</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-sm font-black text-emerald-600'>+$1,200.00</p>
                                    <p className='text-[9px] font-bold text-emerald-500/60 uppercase tracking-tighter'>Transfer Success</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className='text-center text-[10px] text-gray-400 font-bold uppercase mt-6 tracking-widest opacity-50 shrink-0'>
                        End of recent records
                    </p>
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

export default AdminPaymentProcess;