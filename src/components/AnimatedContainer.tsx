
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedContainerProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  delay = 0,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
