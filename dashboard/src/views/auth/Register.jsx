import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customer_register, messageClear } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import {
  HiEye,
  HiEyeOff,
  HiUserAdd,
} from "react-icons/hi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Pull state from Redux authSlice
  const { loader, errorMessage, successMessage } = useSelector((state) => state.auth);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const agreeRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // 2. Handle API Success/Error Notifications
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/"); // Redirect to home or dashboard after successful signup
    }
  }, [errorMessage, successMessage, dispatch, navigate]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRef.current.value.trim()) newErrors.name = "Full name is required";
    if (!emailRegex.test(emailRef.current.value))
      newErrors.email = "Please enter a valid email";
    if (passwordRef.current.value.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!agreeRef.current.checked)
      newErrors.agree = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const registerData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      // 3. Dispatch the real Thunk action
      dispatch(customer_register(registerData));
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-slate-50 font-sans">
      {/* LEFT SIDE - BRANDING */}
      <div className="hidden md:flex md:col-span-5 bg-indigo-700 items-center justify-center p-12 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="text-center z-10">
          <HiUserAdd className="text-indigo-100 text-6xl mx-auto mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-sm" />
          <h1 className="text-4xl font-extrabold tracking-tight italic">
            SHOP CENTRAL
          </h1>
          <p className="text-indigo-100 mt-4 text-lg font-light">
            Join thousands of shoppers worldwide.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="md:col-span-7 flex items-center justify-center p-6 lg:p-20 bg-white">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">
                Full Name
              </label>
              <input
                ref={nameRef}
                type="text"
                className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none transition-all ${
                  errors.name
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-semibold">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none transition-all ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-100"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
                placeholder="name@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-semibold">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none transition-all ${
                    errors.password
                      ? "border-red-500 ring-2 ring-red-100"
                      : "border-slate-200 focus:border-indigo-500"
                  }`}
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-semibold">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <input
                  ref={agreeRef}
                  type="checkbox"
                  id="agree"
                  className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="agree" className="text-sm text-slate-600">
                  I agree to the{" "}
                  <span className="text-indigo-600 font-bold hover:underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </label>
              </div>
              {errors.agree && (
                <p className="text-red-500 text-xs font-semibold">
                  {errors.agree}
                </p>
              )}
            </div>

            {/* Submit Button with Loader State */}
            <button
              disabled={loader}
              className="w-full py-4 rounded-xl text-white font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98] disabled:bg-slate-300"
            >
              {loader ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="relative flex py-4 items-center">
              <div className="grow border-t border-slate-100"></div>
              <span className="shrink mx-4 text-slate-400 text-xs font-bold uppercase">
                Or Register With
              </span>
              <div className="grow border-t border-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-xl hover:bg-slate-50 font-bold text-slate-700 text-sm transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />{" "}
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-slate-200 py-3 rounded-xl hover:bg-slate-50 font-bold text-slate-700 text-sm transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />{" "}
                Facebook
              </button>
            </div>

            <p className="text-center text-sm font-medium text-slate-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;