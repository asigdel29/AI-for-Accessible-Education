
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModuleCardProps {
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  completed,
  locked,
  onClick
}) => {
  return (
    <motion.div
      whileHover={!locked ? { y: -5 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      className={`rounded-xl p-5 border transition-all duration-300 ${
        locked 
          ? 'bg-muted/50 border-border cursor-not-allowed opacity-70' 
          : completed
            ? 'border-green-200 bg-green-50 hover:border-green-300 cursor-pointer'
            : 'border-border hover:border-primary/40 hover:shadow-sm cursor-pointer'
      }`}
      onClick={!locked ? onClick : undefined}
    >
      <div className="flex items-start">
        <div className="mt-1 mr-4">
          {completed ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : (
            <Circle 
              className={locked ? "text-muted-foreground" : "text-primary"} 
              size={20} 
            />
          )}
        </div>
        <div>
          <h4 className="font-medium text-base mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
