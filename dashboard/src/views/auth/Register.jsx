import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customer_register, messageClear } from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { HiEye, HiEyeOff, HiUserAdd } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTwitter, FaCamera, FaVideo, FaStop } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader, errorMessage, successMessage } = useSelector((state) => state.auth);

  // Form Input Refs
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const agreeRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Camera Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // State Management
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Profile Image State
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [imageError, setImageError] = useState("");

  // Seller Details State
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

  // Handle Redux Messages
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/login"); 
    }
  }, [errorMessage, successMessage, dispatch, navigate]);

  // Cleanup Camera Stream and Preview URLs on Unmount
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
      stopCamera();
    };
  }, [previewImage]);

  // LIVE CAMERA FUNCTIONS WITH LIFECYCLE FIXES
  const startCamera = async () => {
    setImageError("");
    try {
      // 1. Safe media capture configuration channel over secure context (HTTPS)
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 400, height: 400, facingMode: "user" } 
      });
      
      streamRef.current = stream;

      // 2. Fire the conditional rendering switch to mount the HTML <video> tag
      setIsCameraActive(true);

      // 3. Defer stream configuration to guarantee node is painted on DOM tree
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        } else {
          requestAnimationFrame(() => {
            if (videoRef.current) videoRef.current.srcObject = stream;
          });
        }
      }, 50);

    } catch (err) {
      console.error("Camera access error:", err);
      setImageError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    
    // Mirror implementation match
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera_capture_${Date.now()}.jpg`, { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(file);
        
        setPreviewImage(imageUrl);
        setProfileImage(file);
        setErrors((prev) => ({ ...prev, profileImage: null }));
        stopCamera();
        toast.success("Snapshot captured successfully!");
      }
    }, "image/jpeg", 0.9);
  };

  // FILE UPLOAD HANDLER
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageError("");
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setImageError("Only JPG, PNG, and WEBP images are allowed");
      return;
    }

    if (file.size > maxSize) {
      setImageError("Image size must be less than 5MB");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    setProfileImage(file);
    setErrors((prev) => ({ ...prev, profileImage: null }));
  };

  // SWEETALERT MODAL FOR SELLER INFORMATION
  const handleSellerToggle = async () => {
    if (!isSeller) {
      const fbIcon = renderToStaticMarkup(<FaFacebook className="input-icon" style={{ color: '#1877F2' }} />);
      const instaIcon = renderToStaticMarkup(<FaInstagram className="input-icon" style={{ color: '#E4405F' }} />);
      const twitterIcon = renderToStaticMarkup(<FaTwitter className="input-icon" style={{ color: '#1DA1F2' }} />);

      const { value: formValues } = await Swal.fire({
        title: "Seller Registration",
        width: '600px',
        html: `
          <style>
            .swal-custom-container { text-align: left; font-size: 13px; }
            .swal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
            .swal-full { grid-column: span 2; }
            .swal-label { font-weight: bold; margin-top: 15px; margin-bottom: 5px; color: #333; display: block; text-transform: uppercase; font-size: 11px; }
            .swal-input-small { 
              width: 100% !important; height: 35px !important; margin: 0 !important; 
              font-size: 13px !important; padding: 0 10px !important;
              border-radius: 8px !important; border: 1px solid #ddd !important;
            }
            .swal-text-small { 
              width: 100% !important; margin: 0 !important; font-size: 13px !important; 
              padding: 10px !important; border-radius: 8px !important; border: 1px solid #ddd !important;
            }
            .input-icon-wrapper { position: relative; width: 100%; }
            .swal-input-icon-field { padding-left: 35px !important; }
            .input-icon { 
              position: absolute; left: 10px; top: 50%; transform: translateY(-50%); 
              width: 16px; height: 16px; opacity: 0.6; z-index: 10;
            }
          </style>
          <div class="swal-custom-container">
            <span class="swal-label">Shop Details</span>
            <div class="swal-grid">
              <input id="swal-shopName" class="swal-input-small swal-full" placeholder="Shop Name" value="${shopInfo.shopName}">
              <textarea id="swal-shopDesc" class="swal-text-small swal-full" rows="2" placeholder="Shop Description">${shopInfo.shopDescription}</textarea>
            </div>
            <span class="swal-label">Contact & Legal</span>
            <div class="swal-grid">
              <input id="swal-bizEmail" class="swal-input-small" placeholder="Business Email" value="${shopInfo.businessEmail}">
              <input id="swal-phone" class="swal-input-small" placeholder="Phone Number" value="${shopInfo.phoneNumber}">
              <input id="swal-taxId" class="swal-input-small swal-full" placeholder="Tax ID (GSTIN or PAN)" value="${shopInfo.taxId}">
            </div>
            <span class="swal-label">Location</span>
            <div class="swal-grid">
              <input id="swal-street" class="swal-input-small swal-full" placeholder="Street Address" value="${shopInfo.businessAddress.street}">
              <input id="swal-city" class="swal-input-small" placeholder="City" value="${shopInfo.businessAddress.city}">
              <input id="swal-state" class="swal-input-small" placeholder="State" value="${shopInfo.businessAddress.state}">
              <input id="swal-zip" class="swal-input-small" placeholder="Zip Code" value="${shopInfo.businessAddress.zipCode}">
              <input id="swal-country" class="swal-input-small" placeholder="Country" value="${shopInfo.businessAddress.country}">
            </div>
            <span class="swal-label">Social Presence</span>
            <div class="swal-grid">
              <div class="input-icon-wrapper">${fbIcon}<input id="swal-fb" class="swal-input-small swal-input-icon-field" placeholder="Facebook Link" value="${shopInfo.socialLinks.facebook}"></div>
              <div class="input-icon-wrapper">${instaIcon}<input id="swal-insta" class="swal-input-small swal-input-icon-field" placeholder="Instagram Link" value="${shopInfo.socialLinks.instagram}"></div>
              <div class="input-icon-wrapper swal-full">${twitterIcon}<input id="swal-twitter" class="swal-input-small swal-input-icon-field" placeholder="Twitter / X Link" value="${shopInfo.socialLinks.twitter}"></div>
            </div>
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Attach Details",
        confirmButtonColor: "#4f46e5",
        preConfirm: () => {
          const getVal = (id) => document.getElementById(id).value.trim();
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
            taxId: getVal('swal-taxId').toUpperCase(),
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
        
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (formValues.taxId && !gstinRegex.test(formValues.taxId) && !panRegex.test(formValues.taxId)) {
          Swal.fire("Invalid Tax ID", "Please enter a valid Indian GSTIN or structured PAN format.", "error");
          setIsSeller(false);
          return;
        }

        setShopInfo(formValues);
        setIsSeller(true);
        setErrors((prev) => ({ ...prev, seller: null }));
        toast.success("Store details securely verified and loaded!");
      } else {
        setIsSeller(false);
      }
    } else {
      setIsSeller(false);
    }
  };

  // FORM SUBMISSION PROCESSOR
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const nameValue = nameRef.current.value;

    if (!profileImage) {
      newErrors.profileImage = "Profile photo identity is required";
    }

    if (!nameValue.trim()) newErrors.name = "Full name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(emailValue)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!passwordValue) {
      newErrors.password = "Password configuration is required";
    } else if (passwordValue.length < 6) {
      newErrors.password = "Password must span at least 6 characters";
    }

    if (isSeller && !shopInfo.shopName) {
      newErrors.seller = "Active store metrics are mandatory for seller registration";
    }

    if (!agreeRef.current.checked) {
      newErrors.agree = "Terms validation agreement is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("name", nameValue);
    formData.append("email", emailValue);
    formData.append("password", passwordValue);
    formData.append("role", isSeller ? "seller" : "customer");
    formData.append("profileImage", profileImage);

    if (isSeller) {
      formData.append("shopInfo", JSON.stringify(shopInfo));
    }

    dispatch(customer_register(formData));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-slate-50 font-sans">
      {/* LEFT SIDE ACCENT */}
      <div className="hidden md:flex md:col-span-5 bg-indigo-700 items-center justify-center p-12 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="text-center z-10">
          <HiUserAdd className="text-indigo-100 text-6xl mx-auto mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-sm" />
          <h1 className="text-4xl font-extrabold tracking-tight italic">SHOP CENTRAL</h1>
          <p className="text-indigo-100 mt-4 text-lg font-light">Become a partner and reach millions.</p>
        </div>
      </div>

      {/* RIGHT SIDE INPUT FRAME */}
      <div className="md:col-span-7 flex items-center justify-center p-6 lg:p-10 bg-white">
        <div className="w-full max-w-md mx-auto">
         

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* AVATAR IDENTITY BLOCK WITH 3D POP-OUT DESIGN */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative group transition-all duration-300 transform hover:scale-105">
                
                {/* Floating Backdrop Ambient Light Glow */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70 group-hover:opacity-100 scale-95"></div>

                {isCameraActive ? (
                  /* Camera Feed Pop-Out Container */
                  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-indigo-600 shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.45)] relative bg-black z-10 transition-all duration-300 scale-105 ring-4 ring-indigo-100 ring-offset-2">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />
                    
                    {/* Hover Snap Shutter Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button 
                        type="button" 
                        onClick={capturePhoto}
                        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 hover:scale-110 active:scale-95 text-white flex items-center justify-center rounded-full shadow-lg transition-all duration-200"
                        title="Take Snapshot"
                      >
                        <FaCamera size={20} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard Image Display Pop-Out Container */
                  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(0,0,0,0.12)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.22)] relative bg-slate-100 z-10 transition-all duration-300 ring-2 ring-slate-200 group-hover:ring-indigo-400 group-hover:border-indigo-50">
                    <img
                      src={previewImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt="Identity Preview"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}

                {/* Floating Absolute Action Control Dock */}
                <div className="absolute -bottom-2 right-1 flex gap-2 z-20">
                  <button
                    type="button"
                    onClick={() => isCameraActive ? stopCamera() : startCamera()}
                    className={`p-3 rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 text-white ${
                      isCameraActive 
                        ? 'bg-red-500 hover:bg-red-600 ring-4 ring-red-100' 
                        : 'bg-slate-800 hover:bg-slate-900 ring-4 ring-slate-100'
                    }`}
                    title={isCameraActive ? "Stop Camera" : "Activate Live Stream"}
                  >
                    {isCameraActive ? <FaStop size={12} /> : <FaVideo size={12} />}
                  </button>
                  
                  {!isCameraActive && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95 ring-4 ring-indigo-100"
                      title="Upload from Storage"
                    >
                      <FaCamera size={12} />
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <p className="text-xs text-slate-400 mt-5 font-medium tracking-wide">JPG, PNG or WEBP (Max 5MB)</p>
              {errors.profileImage && <p className="text-red-500 text-xs font-semibold mt-2">{errors.profileImage}</p>}
              {imageError && <p className="text-red-500 text-xs font-semibold mt-2">{imageError}</p>}
            </div>

            {/* FULL NAME INPUT */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">Full Name</label>
              <input ref={nameRef} type="text" className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none focus:border-indigo-500 transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`} placeholder="John Doe" />
              {errors.name && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.name}</p>}
            </div>

            {/* EMAIL ADDR INPUT */}
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">Email Address</label>
              <input ref={emailRef} type="email" className={`w-full bg-slate-50 px-5 py-3.5 border rounded-xl outline-none focus:border-indigo-500 transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`} placeholder="name@email.com" />
              {errors.email && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.email}</p>}
            </div>

            {/* PASSWORD INPUT */}
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

            {/* MERCHANT ACCOUNT TOGGLE */}
            <div className="pt-2">
              <div className={`flex items-center justify-between p-4 border rounded-xl transition-all ${isSeller ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50/50 border-slate-100'}`}>
                <div>
                  <span className="text-xs font-bold text-indigo-900 uppercase">Register as a Seller?</span>
                  <p className="text-[10px] text-indigo-500 font-medium leading-tight">
                    {isSeller ? `Active Store: ${shopInfo.shopName}` : "Setup store metrics dimensions."}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isSeller} onChange={handleSellerToggle} />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              {errors.seller && <p className="text-red-500 text-[11px] mt-1 font-bold">{errors.seller}</p>}
            </div>

            {/* AGREEMENTS */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <input ref={agreeRef} type="checkbox" id="agree" className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
                <label htmlFor="agree" className="text-sm text-slate-600 cursor-pointer select-none">I agree to the Terms & Conditions</label>
              </div>
              {errors.agree && <p className="text-red-500 text-[11px] font-bold">{errors.agree}</p>}
            </div>

            {/* SIGN UP SUBMIT */}
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