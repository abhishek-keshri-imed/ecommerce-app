import React from 'react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm z-9999">
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                
                {/* Inner Pulsing Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default Loader;