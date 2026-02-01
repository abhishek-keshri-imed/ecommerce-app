import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";

const DeactiveSellerDetails = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic: Add your API call here (e.g., dispatch(update_seller_status({sellerId, status})))
        console.log("Updating status to:", status);
        // Optional: navigate('/admin/deactive-sellers') after success
    };

    return (
        <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative px-4 lg:px-7 pb-4'>
            
            {/* Header & Back Button */}
            <div className='flex justify-between items-center mb-4 mt-5 shrink-0'>
                <h1 className='text-xl font-bold text-gray-800 tracking-tight'>Seller Profile Details</h1>
                <button 
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm'
                >
                    <IoArrowBackOutline size={18} /> Back to List
                </button>
            </div>

            {/* Content Container */}
            <div className='flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-y-auto custom-scrollbar p-6 lg:p-8'>
                
                <div className='flex flex-wrap text-gray-700'>
                    
                    {/* Sidebar: Profile Card */}
                    <div className='w-full lg:w-3/12 flex flex-col items-center'>
                        <div className='relative group'>
                            <img 
                                className='w-48 h-48 lg:w-full lg:h-64 rounded-2xl object-cover border-4 border-gray-50 shadow-md transition-transform duration-300 group-hover:scale-[1.02]' 
                                src="https://media.istockphoto.com/id/1500308602/photo/happy-black-man-mature-or-portrait-in-finance-office-about-us-company-profile-picture-or-ceo.jpg?s=612x612&w=0&k=20&c=3BWt_eT7QaaiGx4zI_K63pnntIp5Cv1qW8Pw-_bSlm8=" 
                                alt="Seller Profile" 
                            />
                            <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-200 shadow-sm'>
                                Deactivated
                            </div>
                        </div>

                        <div className='mt-10 w-full space-y-4'>
                            <div className='p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center'>
                                <p className='text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1'>Seller ID</p>
                                <p className='text-md font-bold text-indigo-700'>#{sellerId || 'S-99210'}</p>
                            </div>
                            <div className='p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center'>
                                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1'>Revenue Impact</p>
                                <p className='text-md font-bold text-gray-600'>$0.00 (Frozen)</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Information Section */}
                    <div className='w-full lg:w-9/12 lg:pl-12 mt-10 lg:mt-0'>
                        
                        {/* Information Grid */}
                        <div className='mb-10'>
                            <h2 className='text-lg font-bold text-gray-800 mb-6 flex items-center gap-3'>
                                <span className='w-1.5 h-6 bg-indigo-600 rounded-full'></span>
                                Basic Information
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
                                {[
                                    { label: "Full Name", value: "John Doe" },
                                    { label: "Email Address", value: "john@example.com" },
                                    { label: "Division", value: "Dhaka" },
                                    { label: "District", value: "Gulshan" }
                                ].map((info, idx) => (
                                    <div key={idx} className='space-y-1.5'>
                                        <label className='text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1'>{info.label}</label>
                                        <div className='text-sm font-semibold text-gray-700 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100'>
                                            {info.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='mb-10'>
                            <h2 className='text-lg font-bold text-gray-800 mb-6 flex items-center gap-3'>
                                <span className='w-1.5 h-6 bg-indigo-600 rounded-full'></span>
                                Store Address
                            </h2>
                            <div className='space-y-1.5'>
                                <label className='text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1'>Full Physical Address</label>
                                <div className='text-sm font-semibold text-gray-700 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 leading-relaxed'>
                                    House 22, Road 5, Block-A, Gulshan-2, Dhaka 1212, Bangladesh
                                </div>
                            </div>
                        </div>

                        {/* Action Management Footer */}
                        <div className='pt-8 border-t border-gray-100'>
                            <div className='bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200'>
                                <h2 className='text-md font-bold text-gray-800 mb-4'>Account Management Action</h2>
                                <form onSubmit={handleSubmit} className='flex flex-wrap items-center gap-4'>
                                    <div className='flex-1 min-w-65'>
                                        <select 
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all cursor-pointer shadow-sm'
                                        >
                                            <option value="">-- Choose Review Outcome --</option>
                                            <option value="active" className="text-green-600 font-bold">Reactivate & Approve Seller</option>
                                            <option value="deactive" className="text-red-600 font-bold">Maintain Deactivation</option>
                                        </select>
                                    </div>
                                    
                                    <button 
                                        disabled={!status}
                                        className={`px-10 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[1px] text-white transition-all shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:grayscale ${
                                            status === 'active' ? 'bg-green-600 hover:bg-green-700 shadow-green-100' : 
                                            status === 'deactive' ? 'bg-red-600 hover:bg-red-700 shadow-red-100' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                                        }`}
                                    >
                                        {status === 'active' ? 'Approve Account' : status === 'deactive' ? 'Reject & Block' : 'Update Status'}
                                    </button>
                                </form>
                                <p className='mt-4 text-[11px] text-gray-400 font-medium italic'>
                                    * Changing the status will notify the seller via their registered email address.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            `}</style>
        </div>
    );
};

export default DeactiveSellerDetails;