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
      { id: '3-2', text: "If you take your time", value: "Calm under pressure" }
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
  // Answers are stored with keys matching the question id (e.g. "1", "2", etc.)
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

  // Compute the personality profile based on the answers.
  const computePersonality = (answers: Record<string, string>) => {
    const traits: string[] = [];

    // For Question 1 ("learning")
    const learning = answers['1'] ? answers['1'].split('-')[1] : "";
    if (learning === "1") {
      traits.push("Visual Learner");
    } else if (learning === "2") {
      traits.push("Auditory Learner");
    } else if (learning === "3") {
      traits.push("Reading/Writing Learner");
    } else if (learning === "4") {
      traits.push("Kinesthetic Learner");
    }

    // For Question 2 ("puzzle")
    const puzzle = answers['2'] ? answers['2'].split('-')[1] : "";
    if (puzzle === "1") {
      traits.push("Analytical Thinker");
    } else if (puzzle === "2") {
      traits.push("Creative Thinker");
    } else if (puzzle === "3") {
      traits.push("Detail-Oriented");
    }

    // For Question 3 ("timer")
    const timer = answers['3'] ? answers['3'].split('-')[1] : "";
    if (timer === "1") {
      traits.push("High Test Anxiety");
    } else if (timer === "2") {
      traits.push("Calm under pressure");
    }

    // For Question 4 ("study_space")
    const studySpace = answers['4'] ? answers['4'].split('-')[1] : "";
    if (studySpace === "1") {
      traits.push("Focused, deep learner");
    } else if (studySpace === "2") {
      traits.push("Multi-tasker, sensory learner");
    } else if (studySpace === "3") {
      traits.push("Casual learner");
    } else if (studySpace === "4") {
      traits.push("Social learner");
    }

    // For Question 5 ("procrastination")
    const procrastination = answers['5'] ? answers['5'].split('-')[1] : "";
    if (procrastination === "1") {
      traits.push("Disciplined, High Conscientiousness");
    } else if (procrastination === "2") {
      traits.push("Mild procrastinator, needs deadlines");
    } else if (procrastination === "3") {
      traits.push("Procrastinator, needs structure");
    }

    // For Question 6 ("post_study_reward")
    const postStudyReward = answers['6'] ? answers['6'].split('-')[1] : "";
    if (postStudyReward === "1") {
      traits.push("Extrinsically Motivated");
    } else if (postStudyReward === "2") {
      traits.push("Intrinsic Motivation");
    } else if (postStudyReward === "3") {
      traits.push("Easily Distracted");
    }

    return traits.join(", ");
  };

  const calculateResults = () => {
    // Compute the personality profile string.
    const personalityProfile = computePersonality(answers);

    // Build the final prompt.
    const instruction = "Generate a personalized course outline for Subject_1 focusing on Natural Language Processing.";
    const inputText = "Course materials include: NLP Resources, Syntax-based Machine Translation, Generative and Discriminative Models, Python Basics.";
    const prompt = `Personality Profile: ${personalityProfile}\nInstruction: ${instruction}\nInput: ${inputText}\nOutput:`;

    // Save the computed prompt (or profile) for later use.
    localStorage.setItem('learningProfile', JSON.stringify(personalityProfile));
    localStorage.setItem('prompt', prompt);

    // Navigate to the course generation page.
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