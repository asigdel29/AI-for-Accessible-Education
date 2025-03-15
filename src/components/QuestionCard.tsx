
import React from 'react';
import { motion } from 'framer-motion';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  category: 'R' | 'A' | 'I' | 'S' | 'E' | 'C';
}

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption
}) => {
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'R': return 'Realistic';
      case 'A': return 'Artistic';
      case 'I': return 'Investigative';
      case 'S': return 'Social';
      case 'E': return 'Enterprising';
      case 'C': return 'Conventional';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'R': return 'bg-blue-100 text-blue-800';
      case 'A': return 'bg-purple-100 text-purple-800';
      case 'I': return 'bg-green-100 text-green-800';
      case 'S': return 'bg-yellow-100 text-yellow-800';
      case 'E': return 'bg-red-100 text-red-800';
      case 'C': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <div className="mb-6">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium mb-3 ${getCategoryColor(question.category)}`}>
          {getCategoryName(question.category)}
        </span>
        <h3 className="text-xl md:text-2xl font-medium">{question.text}</h3>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectOption(option.id)}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
              selectedOption === option.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === option.id ? 'border-primary' : 'border-muted-foreground'
              }`}>
                {selectedOption === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                  />
                )}
              </div>
              <span className="ml-3 text-base">{option.text}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
