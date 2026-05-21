// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await register(form.name, form.email, form.password);
//       navigate("/login"); // after signup → go to login page
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-medium">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useContext } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function Register() {
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (form.password !== form.confirmPassword) {
//       return setError("Passwords do not match");
//     }

//     try {
//       await register(form.name, form.email, form.password);
//       navigate("/verify", { state: { email: form.email } });
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-indigo-100 px-4">
//       <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/60">
//         <div className="grid md:grid-cols-2">

//           {/* LEFT PANEL */}
//           <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 text-white p-8">

//             <div>
//               <h1 className="text-4xl font-semibold mb-4">Welcome to Her Cycles</h1>

//               <p className="text-base opacity-90 mb-6">
//                 Track your cycle, understand your body, and feel confident with
//                 science-backed insights.
//               </p>
//               <img
//                 src="/hercycles1.png"
//                 alt="Her Cycles Illustration"
//                 className="w-full max-w-s mx-auto drop-shadow-xl rounded-2xl mt-4"
//               />
//             </div>

//             <p className="text-xs opacity-80 mt-6">
//               Your data stays private and secure.
//             </p>
//           </div>


//           {/* RIGHT PANEL */}
//           <div className="p-6 sm:p-8 md:p-10">
//             <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
//               Create your account
//             </h2>
//             <p className="text-sm text-gray-500 text-center mb-6">
//               An OTP will be sent to your email for verification.
//             </p>

//             {error && (
//               <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700 text-sm">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* NAME */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="e.g. Esha Sharma"
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:ring-indigo-200 focus:border-indigo-400"
//                 />
//               </div>

//               {/* EMAIL */}
//               <div className="space-y-1">
//                 <label className="text-sm font-medium">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="you@example.com"
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:ring-indigo-200 focus:border-indigo-400"
//                 />
//               </div>

//               {/* PASSWORD */}
//               <div className="space-y-1 relative">
//                 <label className="text-sm font-medium">Password</label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="••••••••"
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm pr-10 focus:ring-indigo-200 focus:border-indigo-400"
//                 />

//                 {/* Eye Icon */}
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </span>
//               </div>

//               {/* CONFIRM PASSWORD */}
//               <div className="space-y-1 relative">
//                 <label className="text-sm font-medium">Confirm Password</label>
//                 <input
//                   type={showConfirm ? "text" : "password"}
//                   name="confirmPassword"
//                   placeholder="Re-enter password"
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm pr-10 focus:ring-indigo-200 focus:border-indigo-400"
//                 />

//                 {/* Eye Icon */}
//                 <span
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
//                 >
//                   {showConfirm ? "🙈" : "👁️"}
//                 </span>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-2 w-full rounded-xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 py-2.5 text-sm font-medium text-white shadow hover:brightness-110 active:scale-95"
//               >
//                 Verify account (send OTP)
//               </button>
//             </form>

//             <p className="mt-6 text-center text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link to="/login" className="text-rose-600 hover:underline">
//                 Login
//               </Link>
//             </p>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // NEW

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setIsLoading(true); // start loader
      await register(form.name, form.email, form.password);
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false); // stop loader (component will likely unmount after navigate)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-indigo-100 px-4">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-white/60">
        <div className="grid md:grid-cols-2">

          {/* LEFT PANEL */}
          <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 text-white p-8">
            <div>
              <h1 className="text-4xl font-semibold mb-4">Welcome to Her Cycles</h1>

              <p className="text-base opacity-90 mb-6">
                Track your cycle, understand your body, and feel confident with
                science-backed insights.
              </p>
              <img
                src="/hercycles1.png"
                alt="Her Cycles Illustration"
                className="w-full max-w-s mx-auto drop-shadow-xl rounded-2xl mt-4"
              />
            </div>

            <p className="text-xs opacity-80 mt-6">
              Your data stays private and secure.
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-6 sm:p-8 md:p-10">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              An OTP will be sent to your email for verification.
            </p>

            {error && (
              <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Esha Sharma"
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-1 relative">
                <label className="text-sm font-medium">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm pr-10 focus:ring-indigo-200 focus:border-indigo-400"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-1 relative">
                <label className="text-sm font-medium">Confirm Password</label>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm pr-10 focus:ring-indigo-200 focus:border-indigo-400"
                />

                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
                >
                  {showConfirm ? "🙈" : "👁️"}
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`mt-2 w-full rounded-xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 py-2.5 text-sm font-medium text-white shadow hover:brightness-110 active:scale-95 flex items-center justify-center
                  ${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                    Sending OTP...
                  </>
                ) : (
                  "Verify account (send OTP)"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-rose-600 hover:underline">
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
