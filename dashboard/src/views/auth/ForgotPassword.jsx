import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiArrowNarrowLeft, HiLockClosed } from "react-icons/hi";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

// Added these missing Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  forgot_password,
  reset_password,
  messageClear,
} from "../../store/reducers/authReducer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // Use the Redux loader and messages
  const { loader } = useSelector((state) => state.auth);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  // Clear messages when component mounts
  useEffect(() => {
    dispatch(messageClear());
  }, [dispatch]);

  const handleResetFlow = async (e) => {
    e.preventDefault();

    // Step 1: Dispatch the Redux Thunk
    const result = await dispatch(forgot_password(email));

    if (forgot_password.fulfilled.match(result)) {
      try {
        // Step 2: EmailJS Delivery
        // Change VITE_EMAIL to VITE_EMAILJS to match your .env file
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID, // Matches line 2 of your .env
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Matches line 3 of your .env
          {
            email: email,
            passcode: result.payload.otp,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY, // Matches line 4 of your .env
        );
        // Step 3: SweetAlert Modal
        const { value: formValues } = await Swal.fire({
          title: '<h2 class="text-xl font-bold">Verify Identity</h2>',
          html: `
            <div class="text-left px-1">
              <p class="text-xs text-slate-500 mb-4">Code sent to <b class="text-indigo-600">${email}</b></p>
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security OTP</label>
              <input id="swal-otp" class="swal2-input m-0! w-full! rounded-xl!" placeholder="000000" maxlength="6">
              <div class="mt-4">
                 <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">New Password</label>
                 <input id="swal-pass" type="password" class="swal2-input m-0! w-full! rounded-xl!" placeholder="••••••••">
              </div>
            </div>
          `,
          confirmButtonText: "Update Password",
          confirmButtonColor: "#4f46e5",
          showCancelButton: true,
          preConfirm: () => {
            const otp = document.getElementById("swal-otp").value;
            const pass = document.getElementById("swal-pass").value;
            if (!otp || otp.length < 6)
              return Swal.showValidationMessage("Enter 6-digit OTP");

            if (!passwordRegex.test(pass)) {
              return Swal.showValidationMessage(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
              );
            }

            return { otp, newPassword: pass };
          },
        });

        // Step 4: Final Reset via Redux
        if (formValues) {
          Swal.fire({
            title: "Updating...",
            didOpen: () => Swal.showLoading(),
          });

          const resetResult = await dispatch(
            reset_password({
              email,
              otp: formValues.otp,
              newPassword: formValues.newPassword,
            }),
          );

          if (reset_password.fulfilled.match(resetResult)) {
            await Swal.fire("Success", "Password Updated", "success");
            navigate("/login");
          } else {
            Swal.fire(
              "Error",
              resetResult.payload?.error || "Reset failed",
              "error",
            );
          }
        }
      } catch (error) {
        console.error("EmailJS Error:", error);
        toast.error("Email delivery failed.");
      }
    } else {
      toast.error(result.payload?.error || "Request failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12 bg-white font-sans">
      <div className="hidden md:flex md:col-span-5 bg-indigo-700 items-center justify-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="text-center z-10">
          <div className="bg-white/10 p-5 rounded-2xl inline-block mb-6 backdrop-blur-md border border-white/20">
            <HiLockClosed className="text-indigo-100 text-6xl" />
          </div>
          <h1 className="text-4xl font-extrabold italic tracking-tighter uppercase">
            Shop Central
          </h1>
        </div>
      </div>

      <div className="md:col-span-7 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase mb-10"
          >
            <HiArrowNarrowLeft size={18} /> Back to Login
          </button>

          <h2 className="text-3xl font-black text-slate-900">
            Forgot Password?
          </h2>
          <form onSubmit={handleResetFlow} className="space-y-6 mt-10">
            <div>
              <label className="block mb-2 text-sm font-bold text-slate-700 uppercase">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                  <HiOutlineMail size={22} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 pl-14 pr-5 py-4 border border-slate-200 rounded-2xl outline-none"
                />
              </div>
            </div>

            <button
              disabled={loader}
              className="w-full py-5 rounded-2xl text-white font-black uppercase bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 shadow-xl shadow-indigo-200"
            >
              {loader ? "Processing..." : "Send Verification Code"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
