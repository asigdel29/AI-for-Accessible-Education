import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

interface PopupProps {
    setShowPopup: (show: boolean) => void;
}

const Popup: React.FC<PopupProps> = ({ setShowPopup }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Auto-close popup after 10 seconds
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [setShowPopup]);

    const handleProceed = () => {
        setShowPopup(false);
        sessionStorage.setItem("hasSeenPopup", "true"); // Resets per session
        navigate("/personality-test"); // Redirects to quiz page
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                {/* Close Button */}
                <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
                    <FaTimes size={20} />
                </button>

                {/* Popup Content */}
                <h2 className="text-2xl font-semibold text-center mb-2">Your learning journey starts here!</h2>
                <p className="text-gray-600 text-center mb-4">
                    Answer a few questions so we can understand your style. We’ll tailor the learning for YOU!
                </p>

                {/* Proceed Button */}
                <button
                    onClick={handleProceed}
                    className="w-full bg-blue-600 text-white py-2 rounded text-lg hover:bg-blue-700 transition"
                >
                    Proceed
                </button>

                {/* Ask Me Later */}
                <p className="text-center mt-3 text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => setShowPopup(false)}>
                    Ask me later
                </p>
            </div>
        </div>
    );
};

export default Popup;
