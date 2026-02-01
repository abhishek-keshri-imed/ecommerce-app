import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SellerDetails = () => {
    const { sellerId } = useParams();
    const [status, setStatus] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!status) return alert("Please select a status first!");
        console.log("Updating seller", sellerId, "to status:", status);
        // Your API call or dispatch goes here
    };

    return (
        /* MAIN WRAPPER: Fixed height (viewport minus header/padding) 
           stops the entire background from scrolling.
        */
        <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative'>
            
            {/* Internal Scrollable Area */}
            <div className='flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar'>
                
                <div className='max-w-7xl mx-auto'>
                    
                    {/* Header Section */}
                    <div className='mb-6'>
                        <h1 className='text-2xl font-bold text-gray-800'>Seller Profile Details</h1>
                        <p className='text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1'>
                            Reviewing ID: #{sellerId}
                        </p>
                    </div>

                    <div className='w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200 mb-6'>
                        
                        <div className='flex flex-wrap text-gray-700'>

                            {/* Left Side: Profile Image & Verification Badge */}
                            <div className='w-full md:w-4/12 flex flex-col justify-start items-center lg:pr-8'>
                                <div className="relative w-full">
                                    <img 
                                        className='w-full h-80 rounded-2xl object-cover border border-gray-100 shadow-sm' 
                                        src="https://media.istockphoto.com/id/1500308602/photo/happy-black-man-mature-or-portrait-in-finance-office-about-us-company-profile-picture-or-ceo.jpg?s=612x612&w=0&k=20&c=3BWt_eT7QaaiGx4zI_K63pnntIp5Cv1qW8Pw-_bSlm8=" 
                                        alt="Seller Profile" 
                                    />
                                    <div className='absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-lg shadow-sm'>
                                        <p className='text-[10px] text-emerald-600 font-black uppercase'>Identity Verified</p>
                                    </div>
                                </div>

                                <div className='mt-6 p-4 bg-gray-50 rounded-2xl w-full text-center border border-gray-100'>
                                    <span className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>Current Status</span>
                                    <p className='text-xl text-amber-500 font-black uppercase mt-1'>Pending Review</p>
                                </div>
                            </div>

                            {/* Right Side: Information Grid */}
                            <div className='w-full md:w-8/12 mt-8 md:mt-0'>
                                <h2 className='text-sm font-bold text-indigo-600 uppercase mb-4 tracking-wider border-b border-indigo-50 pb-2'>
                                    Owner Information
                                </h2>
                                
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
                                        <p className='text-gray-400 text-[10px] font-bold uppercase mb-1'>Full Name</p>
                                        <p className='font-bold text-gray-700'>John Doe</p>
                                    </div>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
                                        <p className='text-gray-400 text-[10px] font-bold uppercase mb-1'>Email Address</p>
                                        <p className='font-bold text-gray-700'>john@example.com</p>
                                    </div>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
                                        <p className='text-gray-400 text-[10px] font-bold uppercase mb-1'>Division</p>
                                        <p className='font-bold text-gray-700'>Dhaka</p>
                                    </div>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
                                        <p className='text-gray-400 text-[10px] font-bold uppercase mb-1'>District</p>
                                        <p className='font-bold text-gray-700'>Gulshan</p>
                                    </div>
                                </div>

                                <div className='mt-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
                                    <p className='text-gray-400 text-[10px] font-bold uppercase mb-1'>Full Business Address</p>
                                    <p className='font-medium text-gray-700 leading-relaxed'>
                                        House 22, Road 5, Block-A, Gulshan-2, Dhaka 1212
                                    </p>
                                </div>

                                {/* Action Form Section */}
                                <div className='mt-10 p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100'>
                                    <h2 className='text-[11px] font-black text-indigo-900 uppercase mb-4 tracking-widest'>Admin Moderation Action</h2>
                                    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                                        <select 
                                            required
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className='flex-1 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-gray-200 rounded-xl text-gray-700 font-bold text-sm cursor-pointer shadow-sm'
                                        >
                                            <option value="">Select an action...</option>
                                            <option value="active">Approve & Activate</option>
                                            <option value="deactive">Reject / Deactivate</option>
                                        </select>
                                        
                                        <button 
                                            type="submit"
                                            className={`px-10 py-2.5 rounded-xl text-white font-bold transition-all shadow-md active:scale-95 ${
                                                status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 
                                                status === 'deactive' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                                            }`}
                                        >
                                            {status === 'active' ? 'Verify Seller' : status === 'deactive' ? 'Confirm Block' : 'Submit Change'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
        </div>
    );
};

export default SellerDetails;