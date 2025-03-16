import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import { motion } from 'framer-motion';
import {linearGradient} from "framer-motion/m";

const SplashScreen = ({ onComplete, duration = 2000 }) => {
    const [isExiting, setIsExiting] = useState(false);
    // const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsExiting(true), duration - 500);
        const completeTimer = setTimeout(() => onComplete(), duration);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [duration, onComplete]);

    // useEffect(() => {
    //     // Simulate an asynchronous operation, like fetching data
    //     setTimeout(() => {
    //         setIsVisible(true);
    //     }, 2000); // Wait for 1 second
    // }, []);

    return (

        <div className="splash-container">
     {/*// <div>*/}
            {/*<motion.div*/}
            {/*    initial={{ width: "100vw", height: "100vh", backgroundColor: "blue" }}*/}
            {/*    // animate={[*/}
            {/*    //     { width: 150, height: 150, bottom: 0, left: 0, position: "absolute" },*/}
            {/*    //     { x: "50vw", y: "-50vh" } // Moves diagonally to center*/}
            {/*    // ]}*/}
            {/*    animate={{ width: 100, height: 100, borderRadius: "50%",  bottom: 0, left: 0, position: "absolute" }}*/}
            {/*    exit={{ x: "50vw", y: "-50vh" , transition: {duration: 2}}}*/}
            {/*    transition={{ duration: 2, ease: "easeInOut" }}*/}
            {/*    className="fixed bottom-0 left-0"*/}
            {/*/>*/}
            {/*<motion.div*/}
            {/*    initial={{ width: "100vw", height: "100vh", backgroundColor: "blue" }}*/}
            {/*    animate={{*/}
            {/*        width: 100,*/}
            {/*        height: 100,*/}
            {/*        borderRadius: "50%",*/}
            {/*        bottom: 0,*/}
            {/*        left: 0,*/}
            {/*        position: "absolute",*/}
            {/*        transitionEnd: {*/}
            {/*            x: "50vw",*/}
            {/*            y: "50vh",*/}
            {/*            translateX: "-50%",*/}
            {/*            translateY: "-50%"*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    transition={{ duration: 2, ease: "easeInOut" }}*/}
            {/*    exit={{ x: "50vw", y: "50vh", translateX: "-50%", translateY: "-50%", transition: { duration: 2 } }}*/}
            {/*    className="fixed bottom-0 left-0"*/}
            {/*/>*/}

           <div className="animateball" ></div>


            {/*<div className={`book-wrapper ${isExiting ? 'fade-out' : ''}`}>*/}
            {<div className={`splash-text ${isExiting ? 'fade-out' : ''}`}>
                <div className={`book-wrapper ${isExiting ? 'fade-out' : ''}`}>
                    <div className="book">
                        <div className="page"></div>
                        <div className="page"></div>
                        <div className="page"></div>
                    </div>
                </div>
                {/*<div className={`splash-text ${isExiting ? 'fade-out' : ''}`}>*/}
                <div style={{position: "relative", top: 45, zIndex: 2000}} className="">
                    <h1 style={{fontSize: 60}} className="text-color"><strong>Let's Study</strong></h1>
                    <p style={{color: "black", fontStyle:"italic", fontWeight: "-moz-initial"}}>Education for all - Start anytime & anywhere</p>
                </div>
            </div>}
        </div>
    );
};

export default SplashScreen;
