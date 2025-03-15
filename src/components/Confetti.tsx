
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  count?: number;
  colors?: string[];
}

const Confetti: React.FC<ConfettiProps> = ({
  count = 100,
  colors = ['#FFC700', '#FF0066', '#2563EB', '#10B981', '#8B5CF6']
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    rotation: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 15,
      rotation: Math.random() * 360
    }));
    
    setParticles(newParticles);
  }, [count, colors]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`, 
            rotate: particle.rotation,
            opacity: 1
          }}
          animate={{ 
            y: '120%', 
            rotate: particle.rotation + 360,
            opacity: 0
          }}
          transition={{ 
            duration: 4 + Math.random() * 4,
            ease: [0.45, 0, 0.55, 1]
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
