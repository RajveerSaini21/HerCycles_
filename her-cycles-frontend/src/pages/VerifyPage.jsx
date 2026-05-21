// import React, { useState, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";

// export default function VerifyPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);   // ← get setUser from context

//   const initialEmail =
//     location.state?.email || new URLSearchParams(location.search).get("email") || "";
//   const [email, setEmail] = useState(initialEmail);
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     setMessage("");
//     if (!email || !otp) {
//       setMessage("Please provide both email and OTP");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.post("/auth/verify-otp", { email, otp });
//       if (res.data.success && res.data.token) {
//         // save token + user
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         // update context so UI is no longer 'guest'
//         setUser(res.data.user);

//         setMessage("Verified! Redirecting to dashboard...");
//         setTimeout(() => navigate("/dashboard"), 700);
//       } else {
//         setMessage(res.data.message || "Verification failed");
//       }
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || err.message || "Verification failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (!email) {
//       setMessage("Please enter email to resend OTP");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await api.post("/auth/resend-otp", { email });
//       setMessage(res.data.message || "OTP resent (check your email)");
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || err.message || "Failed to resend OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md bg-white p-6 rounded shadow">
//         <h3 className="text-lg font-semibold mb-4">Verify your account</h3>

//         <p className="text-sm mb-2 text-gray-600">
//           Enter the 6-digit code sent to your email.
//         </p>

//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full p-2 border rounded mb-3"
//         />
//         <input
//           type="text"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           placeholder="Enter OTP"
//           className="w-full p-2 border rounded mb-3"
//         />

//         {message && (
//           <div className="bg-yellow-50 text-yellow-800 p-2 rounded mb-3">
//             {message}
//           </div>
//         )}

//         <div className="flex gap-2">
//           <button
//             onClick={handleVerify}
//             disabled={loading}
//             className="flex-1 bg-indigo-600 text-white p-2 rounded"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//           <button
//             onClick={handleResend}
//             disabled={loading}
//             className="bg-gray-200 p-2 rounded"
//           >
//             Resend OTP
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";

// export default function VerifyPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setUser } = useContext(AuthContext);

//   const initialEmail =
//     location.state?.email ||
//     new URLSearchParams(location.search).get("email") ||
//     "";

//   const [email, setEmail] = useState(initialEmail);
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     setMessage("");

//     if (!email || !otp) {
//       setMessage("Please provide both email and OTP");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await api.post("/auth/verify-otp", { email, otp });

//       if (res.data.success && res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         setUser(res.data.user);

//         setMessage("Verified! Redirecting...");
//         setTimeout(() => navigate("/dashboard"), 700);
//       }
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || err.message || "Verification failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (!email) return setMessage("Please enter email to resend OTP");

//     setLoading(true);

//     try {
//       const res = await api.post("/auth/resend-otp", { email });
//       setMessage(res.data.message || "OTP resent! Check your email.");
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message || err.message || "Failed to resend OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-50 to-rose-100 px-4">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white/50 p-8">
        
//         <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
//           Verify Your Account
//         </h2>
//         <p className="text-sm text-gray-600 text-center mb-6">
//           Enter the OTP code sent to your email address.
//         </p>

//         {message && (
//           <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-yellow-800 text-sm">
//             {message}
//           </div>
//         )}

//         {/* Email */}
//         <div className="mb-4">
//           <label className="text-sm font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             value={email}
//             readOnly={!!initialEmail}  // disable field if from registration
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm focus:ring-indigo-200 focus:border-indigo-400"
//           />
//         </div>

//         {/* OTP */}
//         <div className="mb-6">
//           <label className="text-sm font-medium text-gray-700">OTP Code</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="123456"
//             maxLength="6"
//             className="mt-1 w-full tracking-widest text-center rounded-xl border border-gray-300 bg-white px-3 py-3 text-lg font-semibold focus:ring-indigo-200 focus:border-indigo-400"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button
//             onClick={handleVerify}
//             disabled={loading}
//             className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 py-2.5 text-sm font-medium text-white shadow hover:brightness-110 active:scale-95 disabled:opacity-50"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>

//           <button
//             onClick={handleResend}
//             disabled={loading}
//             className="rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-300 active:scale-95 disabled:opacity-50"
//           >
//             Resend
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const initialEmail =
    location.state?.email ||
    new URLSearchParams(location.search).get("email") ||
    "";

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const handleVerify = async () => {
    setMessage("");

    if (!email || !otp) {
      setMessage("Please provide both email and OTP");
      return;
    }

    setLoadingVerify(true);

    try {
      const res = await api.post("/auth/verify-otp", { email, otp });

      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);

        setMessage("Verified! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 700);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || err.message || "Verification failed"
      );
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResend = async () => {
    if (!email) return setMessage("Please enter email to resend OTP");

    setLoadingResend(true);
    setMessage("");

    try {
      const res = await api.post("/auth/resend-otp", { email });
      setMessage(res.data.message || "OTP resent! Check your email.");
    } catch (err) {
      setMessage(
        err.response?.data?.message || err.message || "Failed to resend OTP"
      );
    } finally {
      setLoadingResend(false);
    }
  };

  const isAnyLoading = loadingVerify || loadingResend;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-50 to-rose-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white/50 p-8">
        
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
          Verify Your Account
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the OTP code sent to your email address.
        </p>

        {message && (
          <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-yellow-800 text-sm">
            {message}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            readOnly={!!initialEmail}  // disable field if from registration
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>

        {/* OTP */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">OTP Code</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            maxLength="6"
            className="mt-1 w-full tracking-widest text-center rounded-xl border border-gray-300 bg-white px-3 py-3 text-lg font-semibold focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleVerify}
            disabled={isAnyLoading}
            className={`flex-1 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 py-2.5 text-sm font-medium text-white shadow hover:brightness-110 active:scale-95 flex items-center justify-center
              ${isAnyLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loadingVerify ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

          <button
            onClick={handleResend}
            disabled={isAnyLoading}
            className={`rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-300 active:scale-95 flex items-center justify-center
              ${isAnyLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loadingResend ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500/60 border-t-transparent" />
                Resending...
              </>
            ) : (
              "Resend"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
