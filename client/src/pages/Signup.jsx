import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {
        // Check fields
        if (!name || !email || !password) {
            alert("Please complete all fields");
            return;
        }

        try {
            await API.post("/auth/signup", {
                name,
                email,
                password
            });

            alert("Signup successful");
            navigate("/login");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Signup failed. Please try again"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

            <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                        D
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                        Create Account
                    </h2>

                    <p className="text-slate-400 mt-2 text-sm">
                        Register to continue to your Drive App
                    </p>
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm text-slate-300 mb-2">
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-white outline-none"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm text-slate-300 mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-white outline-none"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm text-slate-300 mb-2">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-white outline-none"
                    />
                </div>

                {/* Signup Button */}
                <button
                    onClick={handleSignup}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white"
                >
                    Create Account
                </button>

                {/* Login */}
                <p className="text-sm mt-6 text-center text-slate-400">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-400 font-semibold"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}