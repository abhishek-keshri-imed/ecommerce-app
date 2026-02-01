import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';

const PendingSellerDetails = () => {
    //const { sellerId } = useParams();
    const [status, setStatus] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updating status to:", status);
    };

    return (
        /* MAIN WRAPPER: Fixed height to prevent body scroll.
           mt-[64px] accounts for the header.
        */
        <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative'>
            <div className='flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar'>
                
                <div className='max-w-7xl mx-auto'>
                    
                    <div className='w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200 mb-6'>
                        <h2 className='text-xl font-bold text-gray-800 mb-6'>Seller Profile Verification</h2>

                        <div className='flex flex-wrap text-gray-700'>
                            
                            {/* Left: Image & Quick Status */}
                            <div className='w-full md:w-3/12 flex flex-col justify-start items-center'>
                                <div className='relative w-full group'>
                                    <img 
                                        className='w-full h-80 rounded-2xl object-cover border border-gray-200 shadow-sm' 
                                        src="https://media.istockphoto.com/id/1500308602/photo/happy-black-man-mature-or-portrait-in-finance-office-about-us-company-profile-picture-or-ceo.jpg?s=612x612&w=0&k=20&c=3BWt_eT7QaaiGx4zI_K63pnntIp5Cv1qW8Pw-_bSlm8=" 
                                        alt="Seller" 
                                    />
                                    <div className='absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase'>
                                        Pending
                                    </div>
                                </div>
                                <div className='mt-4 p-4 bg-gray-50 rounded-xl w-full text-center border border-gray-100'>
                                    <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Review Progress</span>
                                    <div className='w-full bg-gray-200 h-1.5 rounded-full mt-2'>
                                        <div className='bg-orange-400 h-1.5 rounded-full w-[60%]'></div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Detailed Info */}
                            <div className='w-full md:w-9/12 lg:pl-10 mt-6 md:mt-0'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                        <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Full Name</p>
                                        <p className='font-semibold text-gray-800'>John Doe</p>
                                    </div>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                        <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Email Address</p>
                                        <p className='font-semibold text-gray-800'>john@example.com</p>
                                    </div>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                        <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Division</p>
                                        <p className='font-semibold text-gray-800'>Dhaka</p>
                                    </div>
                                    <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                        <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>District</p>
                                        <p className='font-semibold text-gray-800'>Gulshan</p>
                                    </div>
                                </div>

                                <div className='mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm'>
                                    <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Full Residential Address</p>
                                    <p className='font-semibold text-gray-800'>House 22, Road 5, Block-A, Gulshan-2, Dhaka 1212</p>
                                </div>

                                {/* Form Section */}
                                <form onSubmit={handleSubmit} className='mt-10 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row gap-4 items-center'>
                                    <div className='w-full md:flex-1'>
                                        <label className='text-[11px] font-bold text-indigo-900 uppercase ml-1'>Update Account Status</label>
                                        <select 
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className='mt-1 w-full px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-gray-300 rounded-lg text-gray-700 font-medium'
                                        >
                                            <option value="">-- Choose Action --</option>
                                            <option value="active">Approve Seller</option>
                                            <option value="deactive">Block / Reject</option>
                                        </select>
                                    </div>
                                    
                                    <button 
                                        className={`w-full md:w-auto md:mt-5 px-10 py-2.5 rounded-lg text-white font-bold transition-all shadow-md active:scale-95 ${
                                            status === 'active' ? 'bg-green-500 hover:bg-green-600 shadow-green-200' : 
                                            status === 'deactive' ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-indigo-600 hover:bg-indigo-700'
                                        }`}
                                    >
                                        {status === 'active' ? 'Verify Now' : status === 'deactive' ? 'Confirm Block' : 'Submit Change'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Style for Custom Scrollbar */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f8f9fa; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            `}</style>
        </div>
    );
};

export default PendingSellerDetails;