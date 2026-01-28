import React from "react";
import { FaList } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = ({ showSidebar, setShowSidebar }) => {
  // Extract userInfo from the auth state to display real data
  const { userInfo, userName } = useSelector((state) => state.auth);

  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-65 rounded-md h-16.25 flex justify-between items-center bg-[#283046] px-5 transition-all shadow-md">
        {/* Mobile Toggle Button */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-8.75 flex lg:hidden h-8.75 rounded-md bg-indigo-500 justify-center items-center cursor-pointer text-white shadow-lg hover:shadow-indigo-500/50"
        >
          <FaList />
        </div>

        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#d0d2d6] 
                   focus:border-indigo-500 focus:shadow-[0_0_5px_rgba(99,102,241,0.5)] 
                   overflow-hidden transition-all duration-300 w-full md:w-62.5 focus:md:w-75"
            type="text"
            name="search"
            placeholder="Search..."
            // Logic handling
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        {/* Right Side: User Profile */}
        <div className="flex justify-center items-center gap-8 text-[#d0d2d6]">
          <div className="flex justify-center items-center gap-3">
            <div className="flex justify-center items-center flex-col text-end">
              <h2 className="text-sm font-bold">{userName || "User"}</h2>
              <span className="text-[12px] font-normal uppercase opacity-70">
                {userInfo?.role || "Admin"}
              </span>
            </div>

            {/* Profile Image with Indigo Border */}
            <img
              className="w-11.25 h-11.25 rounded-full border-2 border-indigo-500 p-0.5 object-cover"
              src={
                userInfo?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrsmesHtiQqtdS05bz7cfciH-Fdcc56x81HQ&s"
              }
              alt="user-profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
