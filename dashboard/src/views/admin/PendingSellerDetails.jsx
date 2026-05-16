import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller, seller_status_update, messageClear } from '../../store/reducers/sellerReducer';
import toast from 'react-hot-toast';

const DEFAULT_AVATAR = "https://media.istockphoto.com/id/1500308602/photo/happy-black-man-mature-or-portrait-in-finance-office-about-us-company-profile-picture-or-ceo.jpg?s=612x612&w=0&k=20&c=3BWt_eT7QaaiGx4zI_K63pnntIp5Cv1qW8Pw-_bSlm8=";

const PendingSellerDetails = () => {
    const { sellerId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState(""); 

    // Extract slice properties with defensive fallbacks
    const { seller, loader, successMessage, errorMessage } = useSelector(state => state.seller || {});

    // 1. Fetch data safely on mount
    useEffect(() => {
        if (sellerId) {
            dispatch(get_seller(sellerId));
        }
        
        // Cleanup on unmount to prevent toast bleed on other pages
        return () => {
            dispatch(messageClear());
        };
    }, [sellerId, dispatch]);

    // 2. Notification and Redirect Management
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            navigate("/admin/sellers-request"); 
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch, navigate]);

    // 3. Keep local state synchronized with incoming database layers
    useEffect(() => {
        if (seller?.status) {
            setStatus(seller.status === 'pending' ? "" : seller.status);
        }
    }, [seller]);

    // 4. Production Form Validation
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!status) {
            return toast.error("Please pick an update status action first.");
        }
        
        if (status === seller?.status) {
            return toast.error(`Account status is already set to "${status}".`);
        }

        dispatch(seller_status_update({ sellerId, status }));
    };

    // 5. Build clean display strings for localized addresses safely
    const renderLocation = () => {
        const address = seller?.shopInfo?.businessAddress;
        if (!address) return "N/A";
        
        const parts = [address.city, address.state].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : "N/A";
    };

    // Full-screen spinner layout
    if (loader && !seller) {
        return (
            <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] flex items-center justify-center'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full'></div>
                    <p className='text-xs font-semibold text-gray-500 tracking-wide'>Hydrating merchant file...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-1 h-[calc(100vh-110px)] w-full bg-[#f8f9fa] overflow-hidden flex flex-col relative'>
            <div className='flex-1 overflow-y-auto p-4 lg:p-7 custom-scrollbar'>
                <div className='max-w-7xl mx-auto'>
                    <div className='w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-200 mb-6'>
                        <h2 className='text-xl font-bold text-gray-800 mb-6'>Seller Profile Verification</h2>

                        {seller ? (
                            <div className='flex flex-wrap text-gray-700'>
                                
                                {/* Left Column: Resilient Image Container */}
                                <div className='w-full md:w-3/12 flex flex-col justify-start items-center'>
                                    <div className='relative w-full group aspect-square md:aspect-auto'>
                                        <img 
                                            className='w-full h-80 rounded-2xl object-cover border border-gray-200 shadow-sm transition-opacity duration-300' 
                                            src={seller.image || DEFAULT_AVATAR} 
                                            alt={`${seller.name || 'Seller'} profile`}
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = DEFAULT_AVATAR;
                                            }}
                                        />
                                        <div className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide shadow-sm ${
                                            seller.status === 'pending' ? 'bg-orange-500' :
                                            seller.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                                        }`}>
                                            {seller.status || 'Unknown'}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Core Details Dashboard Grid */}
                                <div className='w-full md:w-9/12 lg:pl-10 mt-6 md:mt-0'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                            <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Full Name</p>
                                            <p className='font-semibold text-gray-800'>{seller.name || "N/A"}</p>
                                        </div>
                                        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                            <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Email Address</p>
                                            <p className='font-semibold text-gray-800 break-all'>{seller.email || "N/A"}</p>
                                        </div>
                                        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                            <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Shop Name</p>
                                            <p className='font-semibold text-gray-800'>{seller.shopInfo?.shopName || "N/A"}</p>
                                        </div>
                                        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                            <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Phone Number</p>
                                            <p className='font-semibold text-gray-800'>{seller.shopInfo?.phoneNumber || "N/A"}</p>
                                        </div>
                                        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                            <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>City / State</p>
                                            <p className='font-semibold text-gray-800'>{renderLocation()}</p>
                                        </div>
                                        <div className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                            <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Country</p>
                                            <p className='font-semibold text-gray-800'>{seller.shopInfo?.businessAddress?.country || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div className='mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                        <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Full Business Street Address</p>
                                        <p className='font-semibold text-gray-800'>
                                            {seller.shopInfo?.businessAddress?.street || "No street address listed."}
                                            {seller.shopInfo?.businessAddress?.zipCode ? ` (Zip: ${seller.shopInfo.businessAddress.zipCode})` : ""}
                                        </p>
                                    </div>

                                    <div className='mt-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-indigo-100 transition-colors'>
                                        <p className='text-gray-400 text-[10px] uppercase font-bold mb-1'>Shop Description</p>
                                        <p className='font-semibold text-gray-800 text-sm leading-relaxed whitespace-pre-line'>
                                            {seller.shopInfo?.shopDescription || "No description provided."}
                                        </p>
                                    </div>

                                    {/* Form Section: Double-Submit Safe Form Wrapper */}
                                    <form onSubmit={handleSubmit} className='mt-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col md:flex-row gap-4 items-center'>
                                        <div className='w-full md:flex-1'>
                                            <label htmlFor="account-status-select" className='text-[11px] font-bold text-indigo-900 uppercase ml-1'>
                                                Update Account Status
                                            </label>
                                            <select 
                                                id="account-status-select"
                                                value={status}
                                                disabled={loader}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className='mt-1 w-full px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white border border-gray-300 rounded-lg text-gray-700 font-medium disabled:bg-gray-100 disabled:cursor-not-allowed'
                                            >
                                                <option value="">-- Choose Action --</option>
                                                <option value="active">Approve Seller</option>
                                                <option value="deactive">Block / Reject</option>
                                            </select>
                                        </div>
                                        
                                        <button 
                                            disabled={loader || !status || status === seller?.status}
                                            type="submit"
                                            className={`w-full md:w-auto md:mt-5 px-10 py-2.5 rounded-lg text-white font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
                                                status === 'active' ? 'bg-green-500 hover:bg-green-600 shadow-green-200' : 
                                                status === 'deactive' ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-indigo-600 hover:bg-indigo-700'
                                            }`}
                                        >
                                            {loader ? "Processing..." : status === 'active' ? 'Verify Now' : status === 'deactive' ? 'Confirm Block' : 'Submit Change'}
                                        </button>
                                    </form>
                                </div>

                            </div>
                        ) : (
                            <div className='text-center py-16 text-gray-400'>
                                <p className='text-base font-medium'>No dynamic registration file matched this parameter route entry.</p>
                            </div>
                        )}
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

export default PendingSellerDetails;