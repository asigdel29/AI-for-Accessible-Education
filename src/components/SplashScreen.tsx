import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete, duration = 3000 }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsExiting(true), duration - 500);
        const completeTimer = setTimeout(() => onComplete(), duration);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [duration, onComplete]);

    return (
        <div className={`splash-container ${isExiting ? 'zoom-out' : ''}`}>
            <div className="book-wrapper">
                <div className="book">
                    <div className="page"></div>
                    <div className="page"></div>
                    <div className="page"></div>
                </div>
            </div>
            <div className="splash-text">
                <h1>Let's Study</h1>
                <p>Education for all, start anytime & anywhere</p>
            </div>
        </div>
    );
};

export default SplashScreen;
