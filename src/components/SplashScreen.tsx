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
        // <motion.div  className={`splash-container ${isExiting ? 'zoom-out' : ''}`}>
        //     <motion.div initial={{background: "blue"}} animate={{background: "white", x: [0, 50], y: [0, 50], transition:{duration: 5, times: [1, 0.3]}}}>zhhsjfd</motion.div>
        //     <div className="book-wrapper">
        //         <div className="book">
        //             <div className="page"></div>
        //             <div className="page"></div>
        //             <div className="page"></div>
        //         </div>
        //     </div>
        //     <div className="splash-text">
        //         <h1>Let's Study</h1>
        //         <p>Education for all, start anytime & anywhere</p>
        //     </div>
        // </motion.div>
        <div className="splash-container">
            {/* Animated Background Transition */}
            {/*<motion.div*/}
            {/*    initial={{*/}
            {/*        width: "100vw",*/}
            {/*        height: "100vh",*/}
            {/*        borderRadius: "0%",*/}
            {/*        background: "blue",*/}
            {/*        position: "absolute",*/}
            {/*        top: 0,*/}
            {/*        left: 0*/}
            {/*    }}*/}
            {/*    animate={{*/}
            {/*        width: ["100vw", "150px", "150px", "150px"], // Shrinking progressively*/}
            {/*        height: ["100vh", "150px", "150px", "150px"],*/}
            {/*        borderRadius: ["0%", "50%", "50%", "50%"], // Turns into a circle*/}

            {/*        // Movement path covering the whole screen:*/}
            {/*        x: ["0vw", "-45vw", "45vw", "-45vw", "0vw"], // Left → Right → Left → Center*/}
            {/*        y: ["0vh", "80vh", "40vh", "-30vh", "50vh"] // Top → Bottom → Middle → Top → Center*/}
            {/*    }}*/}
            {/*    transition={{*/}
            {/*        duration: 6, // Increase duration for smoother animation*/}
            {/*        ease: "easeInOut",*/}
            {/*        times: [0, 0.25, 0.5, 0.75, 1], // Even timing between movement stages*/}
            {/*        delay: 1*/}
            {/*    }}*/}
            {/*    className="animated-bg"*/}
            {/*/>*/}

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
