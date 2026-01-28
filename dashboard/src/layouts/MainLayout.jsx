import React, { useState, Suspense } from 'react'; // Added Suspense
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className='bg-[#161d31] w-full min-h-screen'>
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            
            {/* Standardized margin and padding to prevent content hiding */}
            <div className='ml-0 lg:ml-65 pt-23.75 transition-all px-4'>
                {/* CRITICAL: You must wrap Outlet in Suspense 
                   because your dashboard components are lazy-loaded. 
                */}
                <Suspense fallback={<div className='text-white'>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default MainLayout;