import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import QuestionCard, { Question, Option } from '../components/QuestionCard';
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
    text: "Solve This Quick Puzzle!",
    options: [
      { id: '2-1', text: "🔢 A logical number sequence", value: "Analytical Thinker" },
      { id: '2-2', text: "🎨 A color pattern matching game", value: "Creative Thinker" },
      { id: '2-3', text: "📝 Read a hidden note for hints", value: "Detail-Oriented" }
    ]
  },
  {
    id: '3',
    text: "Beat the Timer! (Stress & Focus Assessment)",
    options: [
      { id: '3-1', text: "If you rush & make mistakes", value: "High Test Anxiety" },
      { id: '3-2', text: "If you take your time", value: "Calm under pressure" }
    ]
  },
  {
    id: '4',
    text: "Your Perfect Study Space",
    options: [
      { id: '4-1', text: "📚 A quiet library", value: "Focused Learner" },
      { id: '4-2', text: "🎵 A café with background noise", value: "Sensory Learner" },
      { id: '4-3', text: "🛋️ At home on the couch", value: "Casual Learner" },
      { id: '4-4', text: "🤹 In a group study session", value: "Social Learner" }
    ]
  },
  {
    id: '5',
    text: "The Procrastination Test",
    options: [
      { id: '5-1', text: "📅 Plan a schedule and start now", value: "Disciplined" },
      { id: '5-2', text: "🚀 Wait until later but still finish on time", value: "Needs Deadlines" },
      { id: '5-3', text: "🎮 Play games and panic at the last minute", value: "Procrastinator" }
    ]
  },
  {
    id: '6',
    text: "The Post-Study Reward",
    options: [
      { id: '6-1', text: "🏆 Reward myself with a break", value: "Extrinsically Motivated" },
      { id: '6-2', text: "📈 Reflect on what I learned", value: "Intrinsically Motivated" },
      { id: '6-3', text: "📱 Scroll social media", value: "Easily Distracted" }
    ]
  }
];

const traitMapping: Record<string, Record<string, string>> = {
  '1': {
    '1-1': "Visual Learner",
    '1-2': "Auditory Learner",
    '1-3': "Reading/Writing Learner",
    '1-4': "Kinesthetic Learner"
  },
  '2': {
    '2-1': "Analytical Thinker",
    '2-2': "Creative Thinker",
    '2-3': "Detail-Oriented"
  },
  '3': {
    '3-1': "High Test Anxiety",
    '3-2': "Calm under pressure"
  },
  '4': {
    '4-1': "Focused Learner",
    '4-2': "Sensory Learner",
    '4-3': "Casual Learner",
    '4-4': "Social Learner"
  },
  '5': {
    '5-1': "Disciplined",
    '5-2': "Needs Deadlines",
    '5-3': "Procrastinator"
  },
  '6': {
    '6-1': "Extrinsically Motivated",
    '6-2': "Intrinsically Motivated",
    '6-3': "Easily Distracted"
  }
};

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const selectedTopic = localStorage.getItem('selectedTopic') || '';

  useEffect(() => {
    if (!selectedTopic) navigate('/');
  }, [selectedTopic, navigate]);

  const handleSelectOption = (optionId: string) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: optionId });
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
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const computePersonality = (answers: Record<string, string>) => {
    const traits: string[] = [];
    for (let q of questions) {
      const answerId = answers[q.id];
      if (answerId && traitMapping[q.id] && traitMapping[q.id][answerId]) {
        traits.push(traitMapping[q.id][answerId]);
      }
    }
    return traits.join(", ");
  };

  const calculateResults = () => {
    const personalityProfile = computePersonality(answers);
    // Save personality profile for course generation
    localStorage.setItem('learningProfile', personalityProfile);
    navigate('/course-generation');
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="pb-16 px-4">
      <AnimatedContainer className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Learning & Personality Assessment</h2>
          <p className="text-muted-foreground mb-6">
            Help us understand your learning and study habits for "{selectedTopic}".
          </p>
          <ProgressBar value={currentQuestionIndex + 1} max={questions.length} showPercentage={true} className="max-w-md mx-auto" />
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
            className={`px-6 py-3 rounded-xl font-medium inline-flex items-center ${currentQuestionIndex === 0 ? 'text-muted-foreground bg-muted cursor-not-allowed' : 'text-foreground bg-white border border-border hover:border-primary/40 transition-colors'}`}
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
            {currentQuestionIndex < questions.length - 1 ? <ArrowRight size={18} className="ml-2" /> : <CheckCircle2 size={18} className="ml-2" />}
          </motion.button>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default PersonalityTest;
