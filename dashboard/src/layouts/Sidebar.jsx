import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// ADDED useDispatch HERE
import { useSelector, useDispatch } from "react-redux";
import { allNav } from "../navigation/allNav";
import { BiLogOutCircle } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { logout } from "../store/reducers/authReducer";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { role } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filter navigation links based on user role
  const filteredNavs = allNav.filter((n) => n.role === role);

  const handleLogout = () => {
    // 1. Clear the state and storage
    dispatch(logout());

    // 2. Logic for Shared Login Page
    if (role === "admin") {
      navigate("/admin-login");
    } else {
      // Both 'seller' and 'customer' go here
      navigate("/login");
    }

    // 3. Close sidebar for mobile users
    setShowSidebar(false);
  };

  return (
    <div>
      {/* Mobile Overlay */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#22292f80] top-0 left-0 z-10 lg:hidden`}
      ></div>

      {/* Main Sidebar Container */}
      <div
        className={`w-65 fixed bg-[#283046] z-50 top-0 h-screen transition-all duration-300 ${
          showSidebar ? "left-0" : "-left-65 lg:left-0"
        }`}
      >
        {/* Header Section: Logo + Close Button (Flex row prevents overlapping) */}
        <div className="h-17.5 flex justify-between items-center px-5 w-full">
          {/* Brand Logo */}
          <div className="flex justify-center items-center">
            <h1 className="text-white font-bold text-2xl italic uppercase tracking-wider whitespace-nowrap">
              SHOP CENTRAL
            </h1>
          </div>

          {/* Close Button (X): Only visible on mobile */}
          <div
            onClick={() => setShowSidebar(false)}
            className="
              flex lg:hidden 
              w-8.75 h-8.75 justify-center items-center 
              rounded-full 
              text-[#d0d2d6] 
              cursor-pointer 
              transition-all duration-300 ease-in-out
              hover:bg-red-500 hover:text-white hover:rotate-90 
              bg-[#ffffff10]
            "
          >
            <GrClose />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-4">
          <ul>
            {filteredNavs.map((n) => (
              <li key={n.id}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-indigo-500 shadow-indigo-500/30 text-white font-bold"
                      : "text-[#d0d2d6] font-normal hover:bg-[#ffffff10] hover:text-white"
                  } px-3 py-2.5 rounded-md flex justify-start items-center gap-3 hover:pl-5 transition-all w-full mb-1 group`}
                >
                  <span className="text-xl">{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}

            {/* Logout Button */}
            <li>
              <button
                onClick={handleLogout}
                className="
                text-[#d0d2d6] font-normal px-3 py-2.5 rounded-md 
                flex justify-start items-center gap-3 
                hover:pl-5 hover:bg-red-500/10 hover:text-red-500 
                transition-all w-full mb-1 mt-4
                cursor-pointer
              "
              >
                <span className="text-xl">
                  <BiLogOutCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
