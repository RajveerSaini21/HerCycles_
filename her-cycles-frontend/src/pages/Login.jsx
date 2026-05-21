import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-50 to-rose-100 px-4">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* LEFT PANEL*/}
          <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 text-white p-8">
            <div>
              <h1 className="text-4xl font-semibold mb-4">
                Welcome back to Her Cycles
              </h1>
              <p className="text-base opacity-90 mb-6">
                Log in to view your cycle insights, track your symptoms, and
                stay connected with your body every day.
              </p>

              <img
                src="/hercycles2.png"
                alt="Her Cycles Illustration"
                className="w-full max-w-s mx-auto drop-shadow-xl rounded-2xl mt-4"
              />
            </div>

            <p className="text-xs opacity-80 mt-6">
              Your data stays private and secure. Only you control it.
            </p>
          </div>

          {/* RIGHT PANEL – LOGIN FORM */}
          <div className="p-6 sm:p-8 md:p-10">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Login to continue your journey with Her Cycles
            </p>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-1 relative">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm pr-10 focus:ring-indigo-200 focus:border-indigo-400"
                />

                {/* Eye icon */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 py-2.5 text-sm font-medium text-white shadow hover:brightness-110 active:scale-95"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-rose-600 hover:underline underline-offset-2"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}