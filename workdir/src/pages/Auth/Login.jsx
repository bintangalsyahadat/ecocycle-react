import React, { useState } from "react";
import AuthWithGoogle from "./AuthWithGoogle";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignINWithEmailAndPassword } from "../../firebase/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignIn() {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!validate()) return;

        setLoading(true);
        setErrors({});

        try {
            await doSignINWithEmailAndPassword(email, password);

            setMessage({
                type: "success",
                text: "Login successful. Redirecting...",
            });

            setTimeout(() => {
                setLoading(false);
                setIsSigningIn(false);
                window.location.href = "/dashboard";
            }, 1000);

        } catch (err) {
            setLoading(false);
            console.error(err);

            let msg = "Login failed.";

            if (err.code === "auth/user-not-found") msg = "Email not registered.";
            if (err.code === "auth/wrong-password") msg = "Incorrect password.";
            if (err.code === "auth/invalid-email") msg = "Invalid email format.";

            setMessage({ type: "error", text: msg });
        }
    };

    return (
        <>
            {userLoggedIn ? (
                <Navigate to="/dashboard" replace={true} />
            ) : (
                <div className="bg-black">
                    <div className="bg-[url(/images/background.png)] min-h-screen flex items-center justify-center">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8">
                            <form onSubmit={handleSubmit} className="flex flex-col w-full pb-6 text-center">
                                <h3 className="mb-3 text-4xl font-extrabold text-gray-900">Sign In</h3>
                                <p className="mb-4 text-gray-500">
                                    Enter your email and password
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
                                    label="Sign In"
                                    isSigningIn={isSigningIn}
                                    setIsSigningIn={setIsSigningIn}
                                    onError={(msg) => setMessage({ type: "error", text: msg })}
                                />

                                <div className="flex items-center mb-3">
                                    <hr className="border-gray-200 grow" />
                                    <p className="mx-4 text-gray-500">or</p>
                                    <hr className="border-gray-200 grow" />
                                </div>

                                {/* EMAIL */}
                                <label className="mb-2 text-sm text-start font-bold text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="mail@gmail.com"
                                    className={`w-full px-5 py-4 mb-1 text-sm rounded-2xl outline-none bg-gray-100 focus:bg-gray-200 
                                        ${errors.email ? "border border-red-500" : "border border-transparent"}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mb-3 text-left flex items-center gap-1">
                                        <MdErrorOutline /> {errors.email}
                                    </p>
                                )}

                                {/* PASSWORD */}
                                <label className="mb-2 text-sm text-start font-bold text-gray-700">
                                    Password
                                </label>
                                <div className={`relative mb-1`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                    <p className="text-red-500 text-xs mb-3 text-left flex items-center gap-1">
                                        <MdErrorOutline /> {errors.password}
                                    </p>
                                )}

                                {/* FORGET PASSWORD */}
                                <div className="flex justify-end mb-6">
                                    <a className="text-xs font-medium text-(--main-color)" href="#">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full px-6 py-5 mb-5 text-sm font-bold text-white rounded-2xl transition
                                        ${loading
                                            ? "bg-(--main-color-disable) cursor-not-allowed"
                                            : "bg-(--main-color) hover:bg-(--main-color-hover)"
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <AiOutlineLoading3Quarters className="animate-spin" /> Signing In...
                                        </span>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>

                                <p className="text-sm text-gray-900 mt-6">
                                    Not registered yet?{" "}
                                    <Link
                                        to="/register"
                                        className="font-bold text-(--main-color)"
                                    >
                                        Create an Account
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
