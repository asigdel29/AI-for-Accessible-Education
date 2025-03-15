import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import QuestionCard, { Question } from '../components/QuestionCard';
import AnimatedContainer from '../components/AnimatedContainer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const questions: Question[] = [
  {
    id: '1',
    text: "You're about to learn something new. Which do you pick?",
    options: [
      { id: '1-1', text: "📺 Watch a short animation", value: "Visual Learner" },
      { id: '1-2', text: "🎧 Listen to a summary", value: "Auditory Learner" },
      { id: '1-3', text: "📖 Read a short text", value: "Reading/Writing Learner" },
      { id: '1-4', text: "🎮 Play an interactive quiz", value: "Kinesthetic Learner" }
    ]
  },
  {
    id: '2',
    text: "Solve This Quick Puzzle! (Personality & Problem-Solving)\nScenario: A locked treasure chest appears. To open it, you must choose:",
    options: [
      { id: '2-1', text: "🔢 A logical number sequence", value: "Analytical Thinker" },
      { id: '2-2', text: "🎨 A color pattern matching game", value: "Creative Thinker" },
      { id: '2-3', text: "📝 Reading a hidden note for hints", value: "Detail-Oriented" }
    ]
  },
  {
    id: '3',
    text: "Beat the Timer! (Stress & Focus Assessment)\nScenario: You have 10 seconds to answer this SUPER EASY question:",
    options: [
      { id: '3-1', text: "If you rush & make mistakes", value: "High Test Anxiety" },
      { id: '3-2', text: "If you take your time", value: "Calm Under Pressure" }
    ]
  },
  {
    id: '4',
    text: "Your Perfect Study Space (Environment & Distraction Level)\nScenario: Pick your ideal study space:",
    options: [
      { id: '4-1', text: "📚 A quiet library", value: "Focused, deep learner" },
      { id: '4-2', text: "🎵 A café with background noise", value: "Multi-tasker, sensory learner" },
      { id: '4-3', text: "🛋️ At home on the couch", value: "Casual learner" },
      { id: '4-4', text: "🤹 In a group study session", value: "Social learner" }
    ]
  },
  {
    id: '5',
    text: "The Procrastination Test (Time Management)\nScenario: You have an assignment due tomorrow. What do you do?",
    options: [
      { id: '5-1', text: "📅 Plan a schedule and start now", value: "Disciplined, High Conscientiousness" },
      { id: '5-2', text: "🚀 Wait until later but still finish on time", value: "Mild procrastinator, needs deadlines" },
      { id: '5-3', text: "🎮 Play games and panic at the last minute", value: "Procrastinator, needs structure" }
    ]
  },
  {
    id: '6',
    text: "The Post-Study Reward (Motivation Type)\nScenario: You finished studying. Now what?",
    options: [
      { id: '6-1', text: "🏆 I reward myself with a break or treat", value: "Extrinsically Motivated" },
      { id: '6-2', text: "📈 I reflect on what I learned", value: "Intrinsic Motivation" },
      { id: '6-3', text: "📱 I go on social media", value: "Easily Distracted" }
    ]
  }
];

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const selectedTopic = localStorage.getItem('selectedTopic') || '';

  useEffect(() => {
    // Redirect to topic selection if no topic is found
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
    // Map the selected option IDs to their corresponding outcome values
    const results: Record<string, string> = {};
    questions.forEach(question => {
      const answerId = answers[question.id];
      if (answerId) {
        const selectedOption = question.options.find(option => option.id === answerId);
        if (selectedOption) {
          results[question.id] = selectedOption.value;
        }
      }
    });
    
    // Save the learning profile in localStorage for use in course generation
    localStorage.setItem('learningProfile', JSON.stringify(results));
    
    // Navigate to the course generation page
    navigate('/course-generation');
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="pb-16 px-4">
      <AnimatedContainer className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Learning & Personality Assessment</h2>
          <p className="text-muted-foreground mb-6">
            Help us understand your learning and study habits for "{selectedTopic}" with these quick steps.
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
