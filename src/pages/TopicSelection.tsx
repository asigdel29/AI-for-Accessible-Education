
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import SearchInput from '../components/SearchInput';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const suggestedTopics = [
  'Machine Learning Basics',
  'Web Development',
  'Data Science Fundamentals',
  'JavaScript Frameworks',
  'UX Design Principles',
  'Cloud Computing',
  'Mobile App Development',
  'Quantum Computing',
  'Digital Marketing',
  'Blockchain Technology'
];

const TopicSelection = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');

  const handleSearch = (value: string) => {
    setTopic(value);
  };

  const handleContinue = () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic you want to learn');
      return;
    }
    
    localStorage.setItem('selectedTopic', topic);
    navigate('/personality-test');
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setTopic(suggestion);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <AnimatedContainer className="w-full max-w-3xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <BookOpen size={48} className="mx-auto mb-4 text-primary" />
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-3">What would you like to learn today?</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Enter any topic you're interested in, and we'll create a personalized learning experience just for you.
        </p>
        
        <div className="mb-8">
          <SearchInput 
            placeholder="E.g., Machine Learning, Web Development, Data Science..."
            suggestions={suggestedTopics}
            onSearch={handleSearch}
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleContinue}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors"
        >
          Start Learning
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </AnimatedContainer>
      
      <AnimatedContainer delay={0.2} className="w-full max-w-3xl mx-auto mt-12">
        <h3 className="text-lg font-medium mb-4 text-center">Popular Topics</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {suggestedTopics.slice(0, 6).map((suggestion, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-4 py-2 rounded-full border border-border bg-white hover:border-primary/30 transition-colors"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default TopicSelection;
