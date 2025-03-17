import React, { useState } from "react";
import { FaTimes, FaUser } from "react-icons/fa";

interface LoginOverlayProps {
    setShowLogin: (show: boolean) => void;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({ setShowLogin, setIsLoggedIn }) => {
    const [isSignUp, setIsSignUp] = useState(false); // Track if it's Sign In or Sign Up
    const [name, setName] = useState(""); // Only for Sign Up
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:8000/auth"; // Update based on your backend

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const endpoint = isSignUp ? `${API_URL}/signup` : `${API_URL}/login`;
        const payload = isSignUp ? { name, email, password } : { email, password };

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Important for cookies/sessions
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setIsLoggedIn(true);
            setShowLogin(false); // Close modal after successful login/signup
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setIsLoggedIn(true);
        window.location.href = "http://localhost:8000/auth/google";
    };

    const handleGuestLogin = () => {
        setIsLoggedIn(false);
        setShowLogin(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{isSignUp ? "Create an account" : "Sign in"}</h2>
                    <button onClick={() => setShowLogin(false)} className="text-gray-600 hover:text-gray-800">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : isSignUp ? "Create Account" : "Sign in"}
                    </button>
                </form>

                {/* Toggle Between Sign In & Sign Up */}
                <p className="text-center text-sm mt-2">
                    {isSignUp ? (
                        <>
                            Already have an account?{" "}
                            <button onClick={() => setIsSignUp(false)} className="text-blue-600">Sign in</button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <button onClick={() => setIsSignUp(true)} className="text-blue-600">Create one</button>
                        </>
                    )}
                </p>

                {/* OR Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-1 border-t"></div>
                    <span className="px-2 text-gray-500">OR</span>
                    <div className="flex-1 border-t"></div>
                </div>

                {/* Social & Guest Login */}
                <button onClick={handleGoogleLogin} className="w-full border p-2 rounded flex items-center justify-center">
                    G Continue with Google
                </button>
                <button onClick={handleGuestLogin} className="w-full border p-2 rounded flex items-center justify-center mt-2">
                    <FaUser size={18} className="mr-2" /> Continue as Guest
                </button>
            </div>
        </div>
    );
};

export default LoginOverlay;
