import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PendingSellerDetails = () => {
    const { sellerId } = useParams();
    const [status, setStatus] = useState(""); 

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch your update action to the backend
        console.log("Updating status to:", status);
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>

            <div className='w-full p-4 bg-[#283046] rounded-md'>
               

                <div className='flex flex-wrap text-[#d0d2d6] mt-4'>

                    {/* Image Category */}
                    <div className='w-full md:w-3/12 flex flex-col justify-start items-center'>
                        <img 
                            className='w-full h-57.5 rounded-md object-cover border-2 border-slate-700' 
                            src="https://media.istockphoto.com/id/1500308602/photo/happy-black-man-mature-or-portrait-in-finance-office-about-us-company-profile-picture-or-ceo.jpg?s=612x612&w=0&k=20&c=3BWt_eT7QaaiGx4zI_K63pnntIp5Cv1qW8Pw-_bSlm8=" 
                            alt="Seller" 
                        />
                        <div className='mt-4 p-4 bg-slate-800 rounded-md w-full text-center'>
                            <span className='text-sm text-slate-400'>Current Status:</span>
                            <p className='text-red-500 font-bold uppercase'>Pending</p>
                        </div>
                    </div>

                    {/* Information Category */}
                    <div className='w-full md:w-9/12 lg:pl-8 mt-6 md:mt-0'>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='bg-slate-800 p-4 rounded-md border border-slate-700'>
                                <p className='text-slate-400 text-xs uppercase mb-1'>Full Name</p>
                                <p className='font-medium'>John Doe</p>
                            </div>
                            <div className='bg-slate-800 p-4 rounded-md border border-slate-700'>
                                <p className='text-slate-400 text-xs uppercase mb-1'>Email Address</p>
                                <p className='font-medium'>john@example.com</p>
                            </div>
                            <div className='bg-slate-800 p-4 rounded-md border border-slate-700'>
                                <p className='text-slate-400 text-xs uppercase mb-1'>Division</p>
                                <p className='font-medium'>Dhaka</p>
                            </div>
                            <div className='bg-slate-800 p-4 rounded-md border border-slate-700'>
                                <p className='text-slate-400 text-xs uppercase mb-1'>District</p>
                                <p className='font-medium'>Gulshan</p>
                            </div>
                        </div>

                        <div className='mt-4 bg-slate-800 p-4 rounded-md border border-slate-700'>
                            <p className='text-slate-400 text-xs uppercase mb-1'>Full Address</p>
                            <p className='font-medium'>House 22, Road 5, Block-A, Gulshan-2</p>
                        </div>

                        {/* Action Category: Update Status */}
                        <form onSubmit={handleSubmit} className='mt-8 flex gap-4'>
                            <select 
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
                            >
                                <option value="">-- Select Status --</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                            </select>
                            <button 
                                className={`px-7 py-2 rounded-md text-white transition-all shadow-lg hover:shadow-indigo-500/50 ${
                                    status === 'active' ? 'bg-green-600 hover:bg-green-700' : 
                                    status === 'deactive' ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-500'
                                }`}
                            >
                                {status === 'active' ? 'Approve Seller' : status === 'deactive' ? 'Block Seller' : 'Submit Action'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingSellerDetails;