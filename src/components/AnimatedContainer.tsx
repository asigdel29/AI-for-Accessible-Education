import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedContainerProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
    duration?: number;
    show?: boolean;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
                                                                 children,
                                                                 delay = 0,
                                                                 className = "",
                                                                 direction = 'up',
                                                                 duration = 300,
                                                                 show = true
                                                             }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(show);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, show]);

    const getDirectionVariants = () => {
        switch (direction) {
            case 'up':
                return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
            case 'down':
                return { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } };
            case 'left':
                return { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } };
            case 'right':
                return { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };
            case 'scale':
                return { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
            case 'fade':
            default:
                return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={getDirectionVariants()}
            transition={{
                duration: duration / 1000,
                delay: delay / 1000,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={cn('transition-all', className)}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedContainer;
