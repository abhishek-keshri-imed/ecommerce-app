import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { admin_login, messageClear } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import {
  HiEye,
  HiEyeOff,
  HiExclamationCircle,
  HiChartBar,
  HiShoppingBag,
} from "react-icons/hi";

const AdminLogin = () => {
  const navigate = useNavigate(); // Initialize navigation
  const dispatch = useDispatch();

  // Get all necessary states from Redux
  const { loader, errorMessage, successMessage, role, userInfo } = useSelector(
    (state) => state.auth
  );

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const honeyPotRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const checkCapsLock = (e) => {
    setIsCapsLockOn(e.getModifierState("CapsLock"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeyPotRef.current.value) return;

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(admin_login(loginData));
  };

  // --- UPDATED EFFECT: HANDLE MESSAGES AND NAVIGATION ---
  // --- UPDATED EFFECT: HANDLE MESSAGES, NAVIGATION, AND SESSION CHECK ---
  useEffect(() => {
    // 1. If already logged in as admin, don't show the login page
    if (role === "admin" && userInfo) {
      navigate("/admin/dashboard");
    }

    // 2. Handle Error Messages
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    // 3. Handle Success Messages (After form submission)
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      // Navigation is already handled by the "already logged in" check above
      // but keeping it here for clarity during the actual login event.
      if (role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [errorMessage, successMessage, role, userInfo, navigate, dispatch]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-slate-50 font-sans">
      {/* LEFT SIDE - STORE ANALYTICS VIBE */}
      <div className="hidden md:flex md:col-span-5 bg-indigo-900 items-center justify-center p-12 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        <div className="text-center z-10">
          <div className="bg-white/10 p-5 rounded-2xl inline-block mb-6 backdrop-blur-sm border border-white/20">
            <HiChartBar className="text-indigo-300 text-6xl" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight italic">
            SHOP CENTRAL
          </h1>

          <div className="mt-8 flex flex-col gap-3 items-center">
            <span className="px-4 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold uppercase tracking-widest">
              Server Online
            </span>
            <p className="text-indigo-400 text-sm max-w-xs">
              Manage inventory, process orders, and track global sales
              performance.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="md:col-span-7 flex items-center justify-center p-6 lg:p-20 bg-white">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HiShoppingBag className="text-indigo-600" /> Merchant Login
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Access your store's administrative tools.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              ref={honeyPotRef}
              type="text"
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Email Input */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase tracking-tight">
                Admin Email
              </label>
              <input
                ref={emailRef}
                type="email"
                required
                placeholder="manager@yourstore.com"
                className="w-full bg-slate-50 px-5 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase tracking-tight">
                Access Token
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  required
                  onKeyUp={checkCapsLock}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 px-5 py-4 border rounded-xl focus:ring-4 transition-all outline-none ${
                    isCapsLockOn
                      ? "border-amber-500 focus:ring-amber-500/20"
                      : "border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              </div>

              {isCapsLockOn && (
                <div className="flex items-center gap-1 mt-2 text-amber-600 font-bold text-[10px] uppercase tracking-widest">
                  <HiExclamationCircle />{" "}
                  <span>Warning: Caps Lock is Enabled</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loader}
              className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none"
            >
              {loader ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                "Enter Dashboard"
              )}
            </button>

            <p className="text-center text-slate-400 text-xs mt-8">
              &copy; 2026 Shop Central E-commerce Solutions.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
