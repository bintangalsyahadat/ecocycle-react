import React, { useState } from "react";
import AuthWithGoogle from "./AuthWithGoogle";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

export default function SignUp() {
    const { userLoggedIn } = useAuth();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!form.username.trim()) {
            newErrors.username = "Username is required.";
        } else if (form.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters.";
        }

        if (!form.email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!form.password) {
            newErrors.password = "Password is required.";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- Handle Input ---
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    // --- Submit Handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validate()) return;

        setLoading(true);
        setErrors({});

        try {
            await doCreateUserWithEmailAndPassword(form.username, form.email, form.password);

            setMessage("✅ Account created successfully!");

            // reset
            setForm({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            // redirect otomatis
            setTimeout(() => {
                setLoading(false);
                setIsRegistering(false);
                window.location.href = "/login";
            }, 1000);

        } catch (err) {
            setLoading(false);
            setMessage(err.message);
        }
    };

    return (
        <>
            {userLoggedIn ? <Navigate to="/" replace={true} /> : <div className="bg-black">
                <div className="bg-[url(images/background.png)] min-h-screen flex items-center justify-center">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-full h-full pb-6 text-center"
                        >
                            <h3 className="mb-3 text-4xl font-extrabold text-gray-900">
                                Sign Up
                            </h3>
                            <p className="mb-6 text-gray-500">
                                Create your account to get started
                            </p>

                            {/* Google Button */}
                            <AuthWithGoogle label='Sign Up' isSigningIn={isRegistering} setIsSigningIn={setIsRegistering} />

                            <div className="flex items-center mb-3">
                                <hr className="h-0 border-b border-solid border-gray-200 grow" />
                                <p className="mx-4 text-gray-500">or</p>
                                <hr className="h-0 border-b border-solid border-gray-200 grow" />
                            </div>

                            <label
                                htmlFor="username"
                                className="mb-2 text-sm text-start font-bold text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className={`w-full px-5 py-4 mb-2 text-sm font-medium rounded-2xl outline-none bg-gray-100 focus:bg-gray-200 placeholder:text-gray-500 ${errors.username ? "border border-red-500" : ""
                                    }`}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mb-3 text-left">
                                    {errors.username}
                                </p>
                            )}

                            <label
                                htmlFor="email"
                                className="mb-2 text-sm text-start font-bold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="mail@gmail.com"
                                className={`w-full px-5 py-4 mb-2 text-sm font-medium rounded-2xl outline-none bg-gray-100 focus:bg-gray-200 placeholder:text-gray-500 ${errors.email ? "border border-red-500" : ""
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mb-3 text-left">
                                    {errors.email}
                                </p>
                            )}

                            <label
                                htmlFor="password"
                                className="mb-2 text-sm text-start font-bold text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className={`w-full px-5 py-4 mb-2 text-sm font-medium rounded-2xl outline-none bg-gray-100 focus:bg-gray-200 placeholder:text-gray-500 ${errors.password ? "border border-red-500" : ""
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mb-3 text-left">
                                    {errors.password}
                                </p>
                            )}

                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 text-sm text-start font-bold text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter password"
                                className={`w-full px-5 py-4 mb-2 text-sm font-medium rounded-2xl outline-none bg-gray-100 focus:bg-gray-200 placeholder:text-gray-500 ${errors.confirmPassword ? "border border-red-500" : ""
                                    }`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mb-3 text-left">
                                    {errors.confirmPassword}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-6 py-5 mt-2 mb-5 text-sm font-bold leading-none text-white transition duration-300 rounded-2xl cursor-pointer ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#01A3B0] hover:bg-[#018d98]"
                                    }`}
                            >
                                {loading ? "Creating Account..." : "Sign Up"}
                            </button>

                            {message && (
                                <p
                                    className={`mt-2 text-sm font-medium ${message.includes("✅") ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {message}
                                </p>
                            )}

                            <p className="text-sm leading-relaxed text-gray-900 mt-6">
                                Already have an account?{" "}
                                <Link to="/login" className="font-bold text-(--main-color)">
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    );
}