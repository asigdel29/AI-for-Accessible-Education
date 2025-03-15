
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import QuestionCard, { Question } from '../components/QuestionCard';
import AnimatedContainer from '../components/AnimatedContainer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Sample RAISEC questions
const questions: Question[] = [
  {
    id: '1',
    text: 'I prefer learning by doing practical hands-on activities.',
    category: 'R',
    options: [
      { id: '1-1', text: 'Strongly Disagree' },
      { id: '1-2', text: 'Disagree' },
      { id: '1-3', text: 'Neutral' },
      { id: '1-4', text: 'Agree' },
      { id: '1-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '2',
    text: 'I enjoy expressing my creativity when learning new concepts.',
    category: 'A',
    options: [
      { id: '2-1', text: 'Strongly Disagree' },
      { id: '2-2', text: 'Disagree' },
      { id: '2-3', text: 'Neutral' },
      { id: '2-4', text: 'Agree' },
      { id: '2-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '3',
    text: 'I like to analyze information deeply and solve complex problems.',
    category: 'I',
    options: [
      { id: '3-1', text: 'Strongly Disagree' },
      { id: '3-2', text: 'Disagree' },
      { id: '3-3', text: 'Neutral' },
      { id: '3-4', text: 'Agree' },
      { id: '3-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '4',
    text: 'I learn best when collaborating with others in a group setting.',
    category: 'S',
    options: [
      { id: '4-1', text: 'Strongly Disagree' },
      { id: '4-2', text: 'Disagree' },
      { id: '4-3', text: 'Neutral' },
      { id: '4-4', text: 'Agree' },
      { id: '4-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '5',
    text: 'I enjoy taking charge in learning projects and influencing others.',
    category: 'E',
    options: [
      { id: '5-1', text: 'Strongly Disagree' },
      { id: '5-2', text: 'Disagree' },
      { id: '5-3', text: 'Neutral' },
      { id: '5-4', text: 'Agree' },
      { id: '5-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '6',
    text: 'I prefer learning in a structured, organized environment with clear instructions.',
    category: 'C',
    options: [
      { id: '6-1', text: 'Strongly Disagree' },
      { id: '6-2', text: 'Disagree' },
      { id: '6-3', text: 'Neutral' },
      { id: '6-4', text: 'Agree' },
      { id: '6-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '7',
    text: 'I like solving practical problems and working with tools or machines.',
    category: 'R',
    options: [
      { id: '7-1', text: 'Strongly Disagree' },
      { id: '7-2', text: 'Disagree' },
      { id: '7-3', text: 'Neutral' },
      { id: '7-4', text: 'Agree' },
      { id: '7-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '8',
    text: 'I prefer learning approaches that allow me to think outside the box.',
    category: 'A',
    options: [
      { id: '8-1', text: 'Strongly Disagree' },
      { id: '8-2', text: 'Disagree' },
      { id: '8-3', text: 'Neutral' },
      { id: '8-4', text: 'Agree' },
      { id: '8-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '9',
    text: 'I enjoy researching and understanding complex theories and concepts.',
    category: 'I',
    options: [
      { id: '9-1', text: 'Strongly Disagree' },
      { id: '9-2', text: 'Disagree' },
      { id: '9-3', text: 'Neutral' },
      { id: '9-4', text: 'Agree' },
      { id: '9-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '10',
    text: 'I learn best when helping others understand the material.',
    category: 'S',
    options: [
      { id: '10-1', text: 'Strongly Disagree' },
      { id: '10-2', text: 'Disagree' },
      { id: '10-3', text: 'Neutral' },
      { id: '10-4', text: 'Agree' },
      { id: '10-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '11',
    text: 'I enjoy persuading others and taking leadership roles in learning activities.',
    category: 'E',
    options: [
      { id: '11-1', text: 'Strongly Disagree' },
      { id: '11-2', text: 'Disagree' },
      { id: '11-3', text: 'Neutral' },
      { id: '11-4', text: 'Agree' },
      { id: '11-5', text: 'Strongly Agree' }
    ]
  },
  {
    id: '12',
    text: 'I prefer following detailed instructions and established procedures when learning.',
    category: 'C',
    options: [
      { id: '12-1', text: 'Strongly Disagree' },
      { id: '12-2', text: 'Disagree' },
      { id: '12-3', text: 'Neutral' },
      { id: '12-4', text: 'Agree' },
      { id: '12-5', text: 'Strongly Agree' }
    ]
  }
];

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const selectedTopic = localStorage.getItem('selectedTopic') || '';

  useEffect(() => {
    // If no topic selected, redirect back to topic selection
    if (!selectedTopic) {
      navigate('/');
    }
  }, [selectedTopic, navigate]);

  const handleSelectOption = (optionId: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: optionId
    });
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestionIndex].id]) {
      toast.error('Please select an answer before continuing');
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    // Calculate scores for each RAISEC category
    const scores: Record<string, number> = { R: 0, A: 0, I: 0, S: 0, E: 0, C: 0 };
    
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        // Get numeric value from answer (1-5)
        const optionIndex = parseInt(answer.split('-')[1]) - 1;
        scores[question.category] += optionIndex + 1;
      }
    });
    
    // Calculate the dominant personality type
    let dominantType = 'R';
    let maxScore = scores.R;
    
    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        dominantType = type;
      }
    });
    
    // Store results in localStorage
    localStorage.setItem('personalityScores', JSON.stringify(scores));
    localStorage.setItem('dominantType', dominantType);
    
    // Navigate to course generation page
    navigate('/course-generation');
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="pb-16 px-4">
      <AnimatedContainer className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Learning Style Assessment</h2>
          <p className="text-muted-foreground mb-6">
            Help us understand your learning preferences for "{selectedTopic}" with these quick questions.
          </p>
          <ProgressBar 
            value={currentQuestionIndex + 1} 
            max={questions.length} 
            showPercentage={true}
            className="max-w-md mx-auto"
          />
        </div>
        
        {questions[currentQuestionIndex] && (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            selectedOption={answers[questions[currentQuestionIndex].id] || null}
            onSelectOption={handleSelectOption}
          />
        )}
        
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-xl font-medium inline-flex items-center ${
              currentQuestionIndex === 0
                ? 'text-muted-foreground bg-muted cursor-not-allowed'
                : 'text-foreground bg-white border border-border hover:border-primary/40 transition-colors'
            }`}
          >
            <ArrowLeft size={18} className="mr-2" />
            Previous
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center shadow-sm hover:bg-primary/90 transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Complete Test'}
            {currentQuestionIndex < questions.length - 1 ? (
              <ArrowRight size={18} className="ml-2" />
            ) : (
              <CheckCircle2 size={18} className="ml-2" />
            )}
          </motion.button>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PersonalityTest;
