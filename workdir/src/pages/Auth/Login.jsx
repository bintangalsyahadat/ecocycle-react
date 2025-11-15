import React, { useState } from "react";
import AuthWithGoogle from "./AuthWithGoogle";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignINWithEmailAndPassword } from "../../firebase/auth";

export default function SignIn() {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);

    const dummyAccount = {
        email: "user@example.com",
        password: "123456",
    };

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
        setMessage("");

        if (!validate()) return;

        setLoading(true);
        setErrors({});

        try {
            // Firebase login
            await doSignINWithEmailAndPassword(email, password);

            setMessage("✅ Login successful!");

            // Redirect setelah 1 detik
            setTimeout(() => {
                setLoading(false);
                setIsSigningIn(false);
                window.location.href = "/dashboard";
            }, 1000);

        } catch (err) {
            setLoading(false);
            console.error(err);

            let msg = "❌ Login failed.";

            if (err.code === "auth/user-not-found") {
                msg = "❌ Email not registered.";
            } else if (err.code === "auth/wrong-password") {
                msg = "❌ Incorrect password.";
            } else if (err.code === "auth/invalid-email") {
                msg = "❌ Invalid email format.";
            }

            setMessage(msg);
        }
    };

    return (
        <>
            {userLoggedIn ? <Navigate to="/dashboard" replace={true} /> : <div className="bg-black">
                <div className="bg-[url(images/background.png)] min-h-screen flex items-center justify-center">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                        >
                            <h3 className="mb-3 text-4xl font-extrabold text-dark-gray-900">
                                Sign In
                            </h3>
                            <p className="mb-4 text-gray-500">
                                Enter your email and password
                            </p>

                            {/* Google Button */}
                            <AuthWithGoogle label='Sign In' isSigningIn={isSigningIn} setIsSigningIn={setIsSigningIn} />

                            <div className="flex items-center mb-3">
                                <hr className="h-0 border-b border-solid border-gray-200 grow" />
                                <p className="mx-4 text-gray-500">or</p>
                                <hr className="h-0 border-b border-solid border-gray-200 grow" />
                            </div>

                            {/* EMAIL */}
                            <label
                                htmlFor="email"
                                className="mb-2 text-sm text-start font-bold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="mail@gmail.com"
                                className={`flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none mb-2 placeholder:text-gray-500 bg-gray-100 focus:bg-gray-200 text-dark-gray-900 rounded-2xl ${errors.email ? "border border-red-500" : ""
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mb-4 text-left">
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter a password"
                                className={`flex items-center w-full px-5 py-4 mb-2 mr-2 text-sm font-medium outline-none placeholder:text-gray-500 bg-gray-100 focus:bg-gray-200 text-dark-gray-900 rounded-2xl ${errors.password ? "border border-red-500" : ""
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mb-4 text-left">
                                    {errors.password}
                                </p>
                            )}

                            {/* REMEMBER ME */}
                            <div className="flex flex-row justify-between mb-8">
                                {/* <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-purple-blue-500">
                      <img
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                        alt="tick"
                      />
                    </div>
                    <span className="ml-3 text-sm font-normal text-gray-900">
                      Keep me logged in
                    </span>
                  </label> */}
                                <div></div>
                                <a
                                    href="#"
                                    className="mr-4 text-xs font-medium text-(--main-color)"
                                >
                                    Forget password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl cursor-pointer ${loading
                                    ? "bg-(--main-color-disable) cursor-not-allowed"
                                    : "bg-(--main-color) hover:bg-(--main-color-hover)"
                                    }`}
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>

                            {message && (
                                <p
                                    className={`mt-2 text-sm font-medium ${message.includes("✅")
                                        ? "text-green-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    {message}
                                </p>
                            )}

                            <p className="text-sm leading-relaxed text-gray-900 mt-6">
                                Not registered yet?{" "}
                                <Link to="/register" href="#" className="font-bold text-(--main-color)">
                                    Create an Account
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    );
}
