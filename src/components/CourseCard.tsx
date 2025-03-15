
import React from 'react';
import { Clock, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  modules: number;
  level: string;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  duration,
  modules,
  level,
  onClick
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card rounded-2xl overflow-hidden hover-card-animation cursor-pointer"
      onClick={onClick}
    >
      <div className="h-3 bg-primary" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center">
            <Clock size={16} className="mr-1.5 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen size={16} className="mr-1.5 text-muted-foreground" />
            <span>{modules} modules</span>
          </div>
          <div className="flex items-center">
            <Award size={16} className="mr-1.5 text-muted-foreground" />
            <span>{level}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
