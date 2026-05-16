import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customer_register, messageClear } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HiEye, HiEyeOff, HiUserAdd } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader, errorMessage, successMessage } = useSelector((state) => state.auth);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const agreeRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const [shopInfo, setShopInfo] = useState({
    shopName: "",
    shopDescription: "",
    businessEmail: "",
    phoneNumber: "",
    businessAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    taxId: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
    }
  });

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      // Redirect to login page as requested
      navigate("/login"); 
    }
  }, [errorMessage, successMessage, dispatch, navigate]);

  const handleSellerToggle = async () => {
    if (!isSeller) {
      const fbIcon = renderToStaticMarkup(<FaFacebook className="input-icon" style={{ color: '#1877F2' }} />);
      const instaIcon = renderToStaticMarkup(<FaInstagram className="input-icon" style={{ color: '#E4405F' }} />);
      const twitterIcon = renderToStaticMarkup(<FaTwitter className="input-icon" style={{ color: '#1DA1F2' }} />);

      const { value: formValues } = await Swal.fire({
        width: '600px',
        html: `
        <style>
          .swal-custom-container { text-align: left; font-size: 13px; }
          .swal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
          .swal-full { grid-column: span 2; }
          .swal-label { font-weight: bold; margin-top: 15px; margin-bottom: 5px; color: #333; display: block; text-transform: uppercase; font-size: 11px; }
          .swal-input-small { 
            width: 100% !important; 
            height: 35px !important; 
            margin: 0 !important; 
            font-size: 13px !important; 
            padding: 0 10px 0 35px !important;
            border-radius: 8px !important;
            border: 1px solid #ddd !important;
          }
          .swal-text-small { 
            width: 100% !important; 
            margin: 0 !important; 
            font-size: 13px !important; 
            padding: 10px !important;
            border-radius: 8px !important;
            border: 1px solid #ddd !important;
          }
          .input-icon-wrapper { position: relative; width: 100%; }
          .input-icon { 
            position: absolute; 
            left: 10px; 
            top: 50%; 
            transform: translateY(-50%); 
            width: 16px; 
            height: 16px; 
            opacity: 0.6;
          }
        </style>
        <div class="swal-custom-container">
          <span class="swal-label">Shop Details</span>
          <div class="swal-grid">
            <input id="swal-shopName" class="swal-input-small swal-full" style="padding-left:12px !important" placeholder="Shop Name">
            <textarea id="swal-shopDesc" class="swal-text-small swal-full" rows="2" placeholder="Shop Description"></textarea>
          </div>
          <span class="swal-label">Contact & Legal</span>
          <div class="swal-grid">
            <input id="swal-bizEmail" class="swal-input-small" style="padding-left:12px !important" placeholder="Business Email">
            <input id="swal-phone" class="swal-input-small" style="padding-left:12px !important" placeholder="Phone Number">
            <input id="swal-taxId" class="swal-input-small swal-full" style="padding-left:12px !important" placeholder="Tax ID / Business Registration">
          </div>
          <span class="swal-label">Location</span>
          <div class="swal-grid">
            <input id="swal-street" class="swal-input-small swal-full" style="padding-left:12px !important" placeholder="Street Address">
            <input id="swal-city" class="swal-input-small" style="padding-left:12px !important" placeholder="City">
            <input id="swal-state" class="swal-input-small" style="padding-left:12px !important" placeholder="State">
            <input id="swal-zip" class="swal-input-small" style="padding-left:12px !important" placeholder="Zip Code">
            <input id="swal-country" class="swal-input-small" style="padding-left:12px !important" placeholder="Country">
          </div>
          <span class="swal-label">Social Presence</span>
          <div class="swal-grid">
            <div class="input-icon-wrapper">${fbIcon}<input id="swal-fb" class="swal-input-small" placeholder="Facebook Link"></div>
            <div class="input-icon-wrapper">${instaIcon}<input id="swal-insta" class="swal-input-small" placeholder="Instagram Link"></div>
            <div class="input-icon-wrapper swal-full">${twitterIcon}<input id="swal-twitter" class="swal-input-small" placeholder="Twitter / X Link"></div>
          </div>
        </div>
      `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Submit",
        confirmButtonColor: "#4f46e5",
        preConfirm: () => {
          const getVal = (id) => document.getElementById(id).value;
          return {
            shopName: getVal('swal-shopName'),
            shopDescription: getVal('swal-shopDesc'),
            businessEmail: getVal('swal-bizEmail'),
            phoneNumber: getVal('swal-phone'),
            businessAddress: {
              street: getVal('swal-street'),
              city: getVal('swal-city'),
              state: getVal('swal-state'),
              zipCode: getVal('swal-zip'),
              country: getVal('swal-country'),
            },
            taxId: getVal('swal-taxId'),
            socialLinks: {
              facebook: getVal('swal-fb'),
              instagram: getVal('swal-insta'),
              twitter: getVal('swal-twitter'),
            }
          };
        }
      });

      if (formValues) {
        if (!formValues.shopName) {
          Swal.fire("Error", "Shop Name is required", "error");
          setIsSeller(false);
          return;
        }
        setShopInfo(formValues);
        setIsSeller(true);
        setErrors((prev) => ({ ...prev, seller: null }));
        toast.success("Profile details attached!");
      } else {
        setIsSeller(false);
      }
    } else {
      setIsSeller(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const nameValue = nameRef.current.value;

    // Validation Rules
    if (!nameValue.trim()) newErrors.name = "Full name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(emailValue)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!passwordValue) {
      newErrors.password = "Password is required";
    } else if (passwordValue.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSeller && !shopInfo.shopName) {
      newErrors.seller = "Shop details are required for sellers";
    }

    if (!agreeRef.current.checked) {
      newErrors.agree = "You must agree to the terms to continue";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const registrationPayload = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      role: isSeller ? "seller" : "customer",
      shopInfo: isSeller ? shopInfo : null
    };

    dispatch(customer_register(registrationPayload));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-slate-50 font-sans">
      {/* LEFT SIDE */}
      <div className="hidden md:flex md:col-span-5 bg-indigo-700 items-center justify-center p-12 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="text-center z-10">
          <HiUserAdd className="text-indigo-100 text-6xl mx-auto mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-sm" />
          <h1 className="text-4xl font-extrabold tracking-tight italic">SHOP CENTRAL</h1>
          <p className="text-indigo-100 mt-4 text-lg font-light">Become a partner and reach millions.</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-7 flex items-center justify-center p-6 lg:p-20 bg-white">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">Full Name</label>
              <input ref={nameRef} type="text" className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none focus:border-indigo-500 transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`} placeholder="John Doe" />
              {errors.name && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">Email Address</label>
              <input ref={emailRef} type="email" className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none focus:border-indigo-500 transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`} placeholder="name@email.com" />
              {errors.email && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">Password</label>
              <div className="relative">
                <input ref={passwordRef} type={showPassword ? "text" : "password"} className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none focus:border-indigo-500 transition-all ${errors.password ? 'border-red-500' : 'border-slate-200'}`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.password}</p>}
            </div>

            {/* Seller Toggle */}
            <div className="pt-2">
              <div className={`flex items-center justify-between p-4 border rounded-xl transition-all ${isSeller ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50/50 border-slate-100'}`}>
                <div>
                  <span className="text-xs font-bold text-indigo-900 uppercase">Register as a Seller?</span>
                  <p className="text-[10px] text-indigo-500 font-medium leading-tight">
                    {isSeller ? `Active: ${shopInfo.shopName}` : "Setup your storefront details."}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isSeller} onChange={handleSellerToggle} />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              {errors.seller && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.seller}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <input ref={agreeRef} type="checkbox" id="agree" className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
                <label htmlFor="agree" className="text-sm text-slate-600 cursor-pointer select-none">I agree to the Terms & Conditions</label>
              </div>
              {errors.agree && <p className="text-red-500 text-[11px] font-bold">{errors.agree}</p>}
            </div>

            <button disabled={loader} className="w-full py-4 rounded-xl text-white font-black bg-indigo-600 hover:bg-indigo-700 shadow-xl transition-all disabled:bg-slate-300">
              {loader ? "Creating Account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;