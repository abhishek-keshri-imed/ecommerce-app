import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_profile, update_seller_profile, messageClear } from '../../store/reducers/sellerReducer';
import toast from 'react-hot-toast';
import { 
    Store, Shield, Mail, Phone, MapPin, 
    Globe, Landmark, CheckCircle, AlertTriangle 
} from 'lucide-react';

const SellerProfile = () => {
    const dispatch = useDispatch();
    const { seller, loader, successMessage, errorMessage } = useSelector(state => state.seller);

    const [formState, setFormState] = useState({
        shopName: '',
        phoneNumber: '',
        shopDescription: '',
        businessEmail: '',
        taxId: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        facebook: '',
        instagram: ''
    });

    // populate form when seller is loaded
    useEffect(() => {
        if (seller) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormState({
                shopName: seller?.shopInfo?.shopName || '',
                phoneNumber: seller?.shopInfo?.phoneNumber || '',
                shopDescription: seller?.shopInfo?.shopDescription || '',
                businessEmail: seller?.shopInfo?.businessEmail || '',
                taxId: seller?.shopInfo?.taxId || '',
                street: seller?.shopInfo?.businessAddress?.street || '',
                city: seller?.shopInfo?.businessAddress?.city || '',
                state: seller?.shopInfo?.businessAddress?.state || '',
                zipCode: seller?.shopInfo?.businessAddress?.zipCode || '',
                facebook: seller?.shopInfo?.socialLinks?.facebook || '',
                instagram: seller?.shopInfo?.socialLinks?.instagram || ''
            });
        }
    }, [seller]);

    // 1. Initial Profile Fetch
    useEffect(() => {
        dispatch(get_seller_profile());
    }, [dispatch]);

    // 2. Notification Handling
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(update_seller_profile(formState));
    };

    // Framer Motion Animation Settings
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <Motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='px-4 lg:px-10 pt-6 pb-12 text-slate-800 bg-slate-50/40 min-h-screen'
        >
            {/* Top Dashboard Headline */}
            

            <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                
                {/* Left Overview Column */}
                <Motion.div variants={cardVariants} className='bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden sticky top-6'>
                    <div className='h-24 bg-gradient-to-r from-indigo-500 to-violet-600 w-full' />
                    <div className='p-6 pt-0 flex flex-col items-center text-center -mt-12'>
                        <div className='w-24 h-24 rounded-2xl bg-white p-1 shadow-md mb-4'>
                            <div className='w-full h-full rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-3xl font-bold uppercase'>
                                {seller?.name?.slice(0, 2) || 'S'}
                            </div>
                        </div>
                        <h2 className='text-xl font-bold text-slate-900'>{seller?.name || 'Loading Name...'}</h2>
                        <p className='text-sm text-slate-400 font-medium mb-4 flex items-center gap-1.5'>
                            <Shield size={14} /> {seller?.role || 'Seller'} Portal
                        </p>

                        <div className='w-full border-t border-slate-100 my-4 pt-4 space-y-3 text-left text-sm'>
                            <div className='flex justify-between items-center'>
                                <span className='text-slate-400 flex items-center gap-2'><Mail size={16}/> Account</span>
                                <span className='font-medium text-slate-700 truncate max-w-[170px]'>{seller?.email}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-slate-400 flex items-center gap-2'><CheckCircle size={16}/> Verification</span>
                                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md uppercase ${
                                    seller?.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                    {seller?.status || 'Pending'}
                                </span>
                            </div>
                           
                        </div>
                    </div>
                    </Motion.div>

                {/* Right Interactive Form Area */}
                <Motion.div variants={cardVariants} className='lg:col-span-2 bg-white p-6 lg:p-8 rounded-2xl border border-slate-200/80 shadow-sm'>
                    <form onSubmit={handleSubmit} className='space-y-8'>
                        
                        {/* Section 1: Core Store Details */}
                        <div>
                            <h3 className='text-md font-bold mb-4 text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2'>
                                <Store size={18} className='text-indigo-600' /> Store Information
                            </h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Shop Name</label>
                                    <input type='text' name='shopName' value={formState.shopName} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="Enter store name" />
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Business Phone</label>
                                    <input type='text' name='phoneNumber' value={formState.phoneNumber} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="Primary phone number" />
                                </div>
                                <div className='md:col-span-2'>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Store Description</label>
                                    <textarea name='shopDescription' value={formState.shopDescription} onChange={handleChange} rows='3' className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="Tell customers about your products..." />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Legal Operations */}
                        <div>
                            <h3 className='text-md font-bold mb-4 text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2'>
                                <Landmark size={18} className='text-indigo-600' /> Legal & Compliance
                            </h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Business Email</label>
                                    <input type='email' name='businessEmail' value={formState.businessEmail} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="support@yourshop.com" />
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Tax Identifier / GSTIN</label>
                                    <input type='text' name='taxId' value={formState.taxId} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="TAX-ID-NUMBER" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Physical Headquarters */}
                        <div>
                            <h3 className='text-md font-bold mb-4 text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2'>
                                <MapPin size={18} className='text-indigo-600' /> Operating Address
                            </h3>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                <div className='md:col-span-3'>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Street Address</label>
                                    <input type='text' name='street' value={formState.street} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="123 Commerce Way" />
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>City</label>
                                    <input type='text' name='city' value={formState.city} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="City" />
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>State</label>
                                    <input type='text' name='state' value={formState.state} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="State" />
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Postal/Zip Code</label>
                                    <input type='text' name='zipCode' value={formState.zipCode} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="000000" />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Social Channels */}
                        <div>
                            <h3 className='text-md font-bold mb-4 text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2'>
                                <Globe size={18} className='text-indigo-600' /> Social Profile Coordinates
                            </h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Facebook Link</label>
                                    <input type='text' name='facebook' value={formState.facebook} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="https://facebook.com/store" />
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-slate-500 uppercase tracking-wider'>Instagram Link</label>
                                    <input type='text' name='instagram' value={formState.instagram} onChange={handleChange} className='w-full p-2.5 border border-slate-200 rounded-xl text-sm mt-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-slate-50/30' placeholder="https://instagram.com/store" />
                                </div>
                            </div>
                        </div>

                        {/* Animated Submit Button */}
                        <div className='pt-4 border-t border-slate-100 flex justify-end'>
                            <Motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type='submit' 
                                disabled={loader} 
                                className={`w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-100 text-sm flex items-center justify-center gap-2 ${loader ? 'opacity-70 cursor-not-allowed shadow-none' : ''}`}
                            >
                                {loader ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving Profile Changes...
                                    </>
                                ) : 'Save Settings'}
                            </Motion.button>
                        </div>
                    </form>
                </Motion.div>
            </div>
        </Motion.div>
    );
};

export default SellerProfile;