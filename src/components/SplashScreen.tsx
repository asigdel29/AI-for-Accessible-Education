import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import { motion } from 'framer-motion';

const SplashScreen = ({ onComplete, duration = 5000 }) => {
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

        <div className="splash-container">

            <motion.div
                initial={{ width: "100vw", height: "100vh", backgroundColor: "blue" }}
                // animate={[
                //     { width: 150, height: 150, bottom: 0, left: 0, position: "absolute" },
                //     { x: "50vw", y: "-50vh" } // Moves diagonally to center
                // ]}
                animate={{ width: 100, height: 100, borderRadius: "50%",  bottom: 0, left: 0, position: "absolute" }}
                exit={{ x: "50vw", y: "-50vh" , transition: {duration: 2}}}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="fixed bottom-0 left-0"
            />




            {/*<div className={`book-wrapper ${isExiting ? 'fade-out' : ''}`}>*/}
            <div className={"book-wrapper"}>
                <div className="book">
                    <div className="page"></div>
                    <div className="page"></div>
                    <div className="page"></div>
                </div>
            </div>
            <div className={`splash-text ${isExiting ? 'fade-out' : ''}`}>
                <h1>Let's Study</h1>
                <p>Education for all, start anytime & anywhere</p>
            </div>
        </div>
    );
};

export default SplashScreen;
