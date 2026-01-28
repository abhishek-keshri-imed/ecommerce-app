import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-[#161d31] overflow-hidden text-white">
            
            {/* Background Decorative Circles */}
            <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

            {/* Main Content */}
            <div className="z-10 text-center px-4">
                <h1 className="text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-[#283046] drop-shadow-2xl ">
                    404
                </h1>
                
                <div className="mt-4 space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">
                        Lost in Space?
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto italic">
                        The page you are looking for doesn't exist or has been moved to another coordinate.
                    </p>
                </div>

            </div>

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#283046_1px,transparent_1px)] bg-size-[40px_40px]"></div>
        </div>
    );
};

export default NotFound;