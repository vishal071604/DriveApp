import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please complete all fields");
      return;
    }

    try {
      await API.post(
        "/auth/signup",
        {
          name,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      alert("Signup successful ✅");

      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);

      alert(
        error.response?.data?.message ||
          "Invalid email or password ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-8">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
            D
          </div>

          <h2 className="text-3xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-slate-400 mt-2 text-sm">
            Register to continue to your Drive App
          </p>

        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* EMAIL */}

        <div className="mb-4">

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* PASSWORD */}

        <div className="mb-6">

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* LOGIN BUTTON */}

        <button
          type="button"
          onClick={handleSignup}
          className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-700 active:scale-[0.98] transition"
        >
          Login
        </button>

        {/* SIGNUP */}

        <p className="text-sm mt-6 text-center text-slate-400">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Create account
          </Link>

        </p>

      </div>

    </div>
  );
}
