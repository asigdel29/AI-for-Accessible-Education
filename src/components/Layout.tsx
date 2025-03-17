import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import LoginOverlay from './LoginOverlay';

interface LayoutProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, setIsLoggedIn, children }) => {
    const location = useLocation();
    // const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false); // <-- Added for modal control
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        fetch("http://localhost:8000/whoami", { credentials: "include" })
            .then((res) => res.text())
            .then((data) => {
                console.log(data)
                if (data==="logged in") {
                    setUser(" ");
                    setIsLoggedIn(true);
                }
            })
            .catch(() => {
                setUser(null);
            });
    }, [setIsLoggedIn]);

    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const profile = params.get("profile");
    //     if (profile) {
    //         setUser(profile);
    //         console.log(profile)
    //         // localStorage.setItem("profilePicture", profile); // Store for later use
    //     }
    // }, []);

    const handleLogout = () => {
        fetch("http://localhost:8000/logout", { method: "GET", credentials: "include" })
            .then(() => {
                setUser(null);
                setIsLoggedIn(false);
            })
            .catch((err) => console.error("Logout failed", err));
    };


    return (
        <div className="min-h-screen flex flex-col">
            <header className="py-4 px-6 md:px-8 border-b border-border fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/" className="text-xl font-semibold text-primary hover:opacity-80 transition-opacity text-color">
                        Let's Study<span className="text-secondary"></span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
                        <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">My Learning</a>
                        <a href="/help" className="text-sm font-medium hover:text-primary transition-colors">Help</a>

                        {/* Profile Icon & Dropdown when Logged In */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <FaUserCircle size={24} className="text-green-700" />
                                    <span className="text-sm font-medium">{user || "Profile"}</span>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                                        <a href="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                            My Profile
                                        </a>
                                        <a href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                            Settings
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                style={{
                                }}
                            >
                                Login / Sign Up
                            </button>
                        )}
                    </nav>
                </div>
            </header>

            <main className="flex-1 pt-24 py-8 px-6 md:px-8">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-7xl mx-auto"
                >
                    {children}
                </motion.div>
            </main>

            {showLogin && <LoginOverlay setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />}

            <footer className="py-8 px-6 md:px-8 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Let's Study. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
                        <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                        <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
