
import React from 'react';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';

interface PersonalityScore {
  type: 'R' | 'A' | 'I' | 'S' | 'E' | 'C';
  score: number;
  description: string;
}

interface PersonalityCardProps {
  scores: PersonalityScore[];
  dominantType: string;
}

const PersonalityCard: React.FC<PersonalityCardProps> = ({ 
  scores,
  dominantType
}) => {
  const getTypeName = (type: string) => {
    switch (type) {
      case 'R': return 'Realistic';
      case 'A': return 'Artistic';
      case 'I': return 'Investigative';
      case 'S': return 'Social';
      case 'E': return 'Enterprising';
      case 'C': return 'Conventional';
      default: return type;
    }
  };

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'R': return 'You prefer practical, hands-on problem-solving.';
      case 'A': return 'You value self-expression, creativity, and aesthetics.';
      case 'I': return 'You enjoy intellectual challenges and analytical thinking.';
      case 'S': return 'You thrive on helping others and cooperative activities.';
      case 'E': return 'You excel at leading, persuading, and decision-making.';
      case 'C': return 'You value structure, organization, and attention to detail.';
      default: return '';
    }
  };

  const maxPossibleScore = 10; // Adjust based on your scoring system

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-medium mb-2">Your Learning Personality</h3>
        <p className="text-muted-foreground">
          Your dominant learning style is <span className="font-semibold text-foreground">{getTypeName(dominantType)}</span>. 
          {getTypeDescription(dominantType)}
        </p>
      </div>
      
      <div className="space-y-4">
        {scores.map((score, index) => (
          <motion.div
            key={score.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <ProgressBar
              label={getTypeName(score.type)}
              value={score.score}
              max={maxPossibleScore}
              showPercentage={true}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 p-4 bg-muted rounded-xl text-sm"
      >
        <p className="font-medium mb-2">Learning Recommendations:</p>
        <p className="text-muted-foreground">{scores.find(s => s.type === dominantType)?.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default PersonalityCard;
