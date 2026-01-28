import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import Pagination from '../../components/Pagination';

const AdminPaymentProcess = () => {
    // 1. Updated state for 5 items per page
    const [pageNumber, setPageNumber] = useState(1);
    const parPage = 5; 

    // Mock data simulation (usually this comes from Redux or an API)
    const allRequests = [...Array(25)]; // Let's assume 25 total requests
    
    // 2. Logic to slice the data for the current page
    const startIndex = (pageNumber - 1) * parPage;
    const paginatedData = allRequests.slice(startIndex, startIndex + parPage);

    return (
        <div className='px-2 md:px-7 py-5'>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-7'>
                
                {/* LEFT SIDE: Withdrawal Requests (WITH PAGINATION) */}
                <div className='bg-[#283046] text-[#d0d2d6] rounded-lg p-5 border border-slate-700 shadow-xl'>
                    <h2 className='text-xl font-semibold pb-5 border-b border-slate-700 mb-5'>Withdrawal Requests</h2>
                    <div className='overflow-x-auto'>
                        <table className='w-full text-left'>
                            <thead className='text-xs uppercase text-gray-400 border-b border-slate-700 bg-[#161d31]/50'>
                                <tr>
                                    <th className='py-4 px-4'>No</th>
                                    <th className='py-4 px-4'>Seller</th>
                                    <th className='py-4 px-4'>Amount</th>
                                    <th className='py-4 px-4'>Status</th>
                                    <th className='py-4 px-4 text-right'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-700'>
                                {paginatedData.map((_, i) => (
                                    <tr key={i} className='hover:bg-[#2d354c] transition-colors'>
                                        {/* 3. Updated index to show correct numbers across pages */}
                                        <td className='py-4 px-4 text-sm'>{startIndex + i + 1}</td>
                                        <td className='py-4 px-4 text-sm font-medium'>Sheikh Store</td>
                                        <td className='py-4 px-4 font-bold text-indigo-400'>$500</td>
                                        <td className='py-4 px-4'>
                                            <span className='bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-[10px] uppercase font-bold'>pending</span>
                                        </td>
                                        <td className='py-4 px-4 text-right'>
                                            <button className='bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded shadow-lg transition-all active:scale-95 inline-flex items-center justify-center ml-auto'>
                                                <FaEye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination - totalItem should be the length of your actual data */}
                    <div className='w-full flex justify-end mt-6'>
                        <Pagination 
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            totalItem={allRequests.length} 
                            parPage={parPage}
                            showItem={3}
                        />
                    </div>
                </div>

                {/* RIGHT SIDE: Success History (LAST 10 ONLY - NO PAGINATION) */}
                <div className='bg-[#283046] text-[#d0d2d6] rounded-lg p-5 border border-slate-700 shadow-xl'>
                    <div className='flex justify-between items-center pb-5 border-b border-slate-700 mb-5'>
                        <h2 className='text-xl font-semibold'>Recent Payouts</h2>
                        <Link 
                            to='/admin/dashboard/payment-history' 
                            className='text-xs text-indigo-400 hover:underline'
                        >
                            View All History
                        </Link>
                    </div>

                    <div className='w-full border border-slate-700 rounded-md overflow-hidden'>
                        <div className='flex justify-between items-center text-[10px] font-bold uppercase bg-[#161d31] p-4 text-gray-500 border-b border-slate-700 tracking-widest'>
                            <div className='w-[10%]'>No</div>
                            <div className='w-[35%]'>Seller</div>
                            <div className='w-[25%]'>Amount</div>
                            <div className='w-[30%] text-right'>Date</div>
                        </div>
                        
                        <div className='bg-[#161d31]/20 max-h-125 overflow-y-auto scrollbar-hide'>
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className='flex justify-between items-center text-sm text-[#d0d2d6] border-b border-slate-700 px-4 py-4 hover:bg-[#2d354c] transition-all'>
                                    <div className='w-[10%] text-gray-500'>#{i + 1}</div>
                                    <div className='w-[35%] font-medium'>Fashion World</div>
                                    <div className='w-[25%] font-bold text-green-500'>$1,200</div>
                                    <div className='w-[30%] text-right text-gray-400 text-xs'>27 Jan 2026</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className='text-center text-xs text-gray-500 mt-4 italic'>
                        Showing the last 10 successful transactions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminPaymentProcess;