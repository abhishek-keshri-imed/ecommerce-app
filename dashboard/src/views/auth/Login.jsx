import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useDispatch, useSelector } from "react-redux"; // Added Redux hooks
import { customer_login, messageClear } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import {
  HiEye,
  HiEyeOff,
  HiExclamationCircle,
  HiUserCircle,
} from "react-icons/hi";

const Login = () => {
  // --- REDUX & ROUTING ---
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, role, userInfo } = useSelector(
    (state) => state.auth
  );

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const honeyPotRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const checkCapsLock = (e) => setIsCapsLockOn(e.getModifierState("CapsLock"));

  // --- HANDLE FORM SUBMISSION ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeyPotRef.current.value) return; // Bot protection

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(customer_login(loginData));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      // 1. Get the role directly from the source if the state variable is lagging
      // Check both 'role' and 'userInfo.role'
      const currentRole = role || userInfo?.role;

      if (!currentRole) {
        console.log("Waiting for role data...");
        return;
      }

      toast.success(successMessage);

      // 2. Perform Navigation
      if (currentRole === "seller") {
        navigate("/seller/dashboard");
      } else if (currentRole === "customer") {
        navigate("/customer/dashboard");
      }

      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, role, userInfo, navigate, dispatch]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-slate-50 font-sans">
      {/* LEFT SIDE - CUSTOMER VIBE */}
      <div className="hidden md:flex md:col-span-5 bg-indigo-700 items-center justify-center p-12 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="text-center z-10">
          <div className="bg-white/10 p-5 rounded-2xl inline-block mb-6 backdrop-blur-sm border border-white/20">
            <HiUserCircle className="text-indigo-100 text-6xl" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight italic">
            SHOP CENTRAL
          </h1>
          <p className="text-indigo-100 mt-4 text-lg font-light">
            Join the premium shopping experience.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="md:col-span-7 flex items-center justify-center p-6 lg:p-20 bg-white">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              ref={honeyPotRef}
              type="text"
              className="hidden"
              tabIndex="-1"
            />

            {/* Email Input */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                required
                placeholder="name@email.com"
                className="w-full bg-slate-50 px-5 py-4 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700 uppercase">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  required
                  onKeyUp={checkCapsLock}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 px-5 py-4 border rounded-xl focus:ring-4 outline-none transition-all ${
                    isCapsLockOn
                      ? "border-amber-500 ring-amber-500/10"
                      : "border-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              </div>
              {isCapsLockOn && (
                <p className="text-amber-600 text-[10px] mt-2 font-bold uppercase tracking-widest flex items-center gap-1">
                  <HiExclamationCircle /> Caps Lock is ON
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loader}
              className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] disabled:bg-indigo-300"
            >
              {loader ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center text-sm font-medium text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
