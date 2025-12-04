import React, { useState } from "react";
import AuthWithGoogle from "./AuthWithGoogle";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from "react-icons/ai";

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
    const [message, setMessage] = useState({ type: "", text: "" });
    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!validate()) return;

        setLoading(true);
        setErrors({});

        try {
            await doCreateUserWithEmailAndPassword(
                form.username,
                form.email,
                form.password
            );

            setMessage({
                type: "success",
                text: "Account created successfully. Redirecting...",
            });

            setTimeout(() => {
                setLoading(false);
                setIsRegistering(false);
                window.location.href = "/login";
            }, 1000);

        } catch (err) {
            setLoading(false);

            let msg = "Failed to create account.";
            if (err.code === "auth/email-already-in-use") {
                try {
                    await doSignINWithEmailAndPassword(form.email, form.password);

                    setMessage({
                        type: "success",
                        text: "Email already registered, synced your account. Redirecting...",
                    });

                    setTimeout(() => {
                        setLoading(false);
                        setIsRegistering(false);
                        window.location.href = "/dashboard";
                    }, 1000);
                } catch (err2) {
                    setMessage({
                        type: "error",
                        text: "Email already registered. Please login instead.",
                    });
                }

                return;
            }

            if (err.code === "auth/invalid-email")
                msg = "Invalid email format.";
            if (err.code === "auth/weak-password")
                msg = "Password is too weak.";

            setMessage({ type: "error", text: msg });
        }
    };

    return userLoggedIn ? (
        <Navigate to="/" replace />
    ) : (
        <div className="bg-black">
            <div className="bg-[url(/images/background.png)] min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full pb-6">

                        <h3 className="mb-3 text-4xl font-extrabold text-gray-900 text-center">
                            Sign Up
                        </h3>
                        <p className="mb-4 text-gray-500 text-center">
                            Create your account to get started
                        </p>

                        {/* ALERT MESSAGE */}
                        {message.text !== "" && (
                            <div
                                className={`mt-2 px-4 py-3 rounded-xl text-sm flex items-center gap-2 mb-3
                                    ${message.type === "success"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {message.type === "success" ? (
                                    <AiOutlineCheckCircle size={18} />
                                ) : (
                                    <MdErrorOutline size={18} />
                                )}
                                {message.text}
                            </div>
                        )}

                        {/* Google Button */}
                        <AuthWithGoogle
                            label="Sign Up"
                            isSigningIn={isRegistering}
                            setIsSigningIn={setIsRegistering}
                            onError={(msg) => setMessage({ type: "error", text: msg })}
                        />

                        <div className="flex items-center mb-3">
                            <hr className="border-gray-200 grow" />
                            <p className="mx-4 text-gray-500">or</p>
                            <hr className="border-gray-200 grow" />
                        </div>

                        {/* USERNAME */}
                        <label className="mb-2 text-sm font-bold text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className={`w-full px-5 py-4 mb-1 text-sm rounded-2xl outline-none bg-gray-100 focus:bg-gray-200 
                                ${errors.username ? "border border-red-500" : "border border-transparent"}`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
                                <MdErrorOutline /> {errors.username}
                            </p>
                        )}

                        {/* EMAIL */}
                        <label className="mb-2 text-sm font-bold text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="mail@gmail.com"
                            className={`w-full px-5 py-4 mb-1 text-sm rounded-2xl outline-none bg-gray-100 focus:bg-gray-200 
                                ${errors.email ? "border border-red-500" : "border border-transparent"}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
                                <MdErrorOutline /> {errors.email}
                            </p>
                        )}

                        {/* PASSWORD */}
                        <label className="mb-2 text-sm font-bold text-gray-700">
                            Password
                        </label>
                        <div className="relative mb-1">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full px-5 py-4 text-sm rounded-2xl outline-none bg-gray-100 focus:bg-gray-200
                                    ${errors.password ? "border border-red-500" : "border border-transparent"}`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
                                <MdErrorOutline /> {errors.password}
                            </p>
                        )}

                        {/* CONFIRM PASSWORD */}
                        <label className="mb-2 text-sm font-bold text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative mb-1">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter password"
                                className={`w-full px-5 py-4 text-sm rounded-2xl outline-none bg-gray-100 focus:bg-gray-200
                                    ${errors.confirmPassword ? "border border-red-500" : "border border-transparent"}`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                {showConfirmPassword ? (
                                    <FiEyeOff size={20} />
                                ) : (
                                    <FiEye size={20} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
                                <MdErrorOutline /> {errors.confirmPassword}
                            </p>
                        )}

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full px-6 py-5 mt-2 mb-5 text-sm font-bold text-white rounded-2xl transition
                                ${loading
                                    ? "bg-(--main-color-disable) cursor-not-allowed"
                                    : "bg-(--main-color) hover:bg-(--main-color-hover)"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <AiOutlineLoading3Quarters className="animate-spin" /> Creating Account...
                                </span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                        {/* LINK TO LOGIN */}
                        <p className="text-sm text-gray-900 text-center mt-6">
                            Already have an account?{" "}
                            <Link to="/login" className="font-bold text-(--main-color)">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
