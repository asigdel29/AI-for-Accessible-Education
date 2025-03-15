
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, List, BookOpen } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
}

interface Quiz {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOption: string;
}

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [module, setModule] = useState<Module | null>(null);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const selectedTopic = localStorage.getItem('selectedTopic') || '';
  const dominantType = localStorage.getItem('dominantType') || 'R';
  
  // Mock quiz for the module
  const quiz: Quiz = {
    id: '1',
    question: `What is a key principle in understanding ${selectedTopic}?`,
    options: [
      { id: '1', text: 'Repetition and practice' },
      { id: '2', text: 'Creative thinking and visualization' },
      { id: '3', text: 'Research and analysis' },
      { id: '4', text: 'Collaboration and discussion' }
    ],
    correctOption: dominantType === 'R' ? '1' : 
                    dominantType === 'A' ? '2' : 
                    dominantType === 'I' ? '3' : '4'
  };

  useEffect(() => {
    // If no moduleId, redirect back
    if (!moduleId) {
      navigate('/dashboard');
      return;
    }

    // Load modules from localStorage
    const storedModules = localStorage.getItem('courseModules');
    if (storedModules) {
      const modules: Module[] = JSON.parse(storedModules);
      const currentModule = modules.find(m => m.id === moduleId);
      
      if (currentModule) {
        setModule(currentModule);
        
        // If the module is locked, redirect back
        if (currentModule.locked) {
          toast.error("This module is not available yet. Complete previous modules first.");
          navigate('/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }

    // Simulate lesson progress
    const interval = setInterval(() => {
      setLessonProgress(prev => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setShowQuiz(true);
          return 100;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [moduleId, navigate]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmitQuiz = () => {
    if (!selectedOption) {
      toast.error("Please select an answer before submitting");
      return;
    }

    const isCorrect = selectedOption === quiz.correctOption;
    
    if (isCorrect) {
      toast.success("Correct answer! Great job!");
    } else {
      toast.error("That's not quite right. Let's review the material again.");
    }
    
    // Mark module as completed
    if (module) {
      const storedModules = localStorage.getItem('courseModules');
      if (storedModules) {
        const modules: Module[] = JSON.parse(storedModules);
        const updatedModules = modules.map(m => {
          if (m.id === moduleId) {
            return { ...m, completed: true };
          }
          if (m.id === String(Number(moduleId) + 1)) {
            return { ...m, locked: false };
          }
          return m;
        });
        
        localStorage.setItem('courseModules', JSON.stringify(updatedModules));
      }
    }
    
    setQuizCompleted(true);
  };

  const handleContinue = () => {
    // Navigate to the next module or back to dashboard
    if (module && Number(module.id) < 4) {
      navigate(`/module/${Number(module.id) + 1}`);
    } else {
      navigate('/course-complete');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const getPersonalizedContent = () => {
    switch (dominantType) {
      case 'R':
        return (
          <div>
            <h3 className="text-xl font-medium mb-3">Practical Application</h3>
            <p className="mb-4">
              The most effective way to master {selectedTopic} is through hands-on practice. 
              Let's walk through a practical exercise that will help you develop your skills.
            </p>
            <div className="p-4 bg-muted rounded-xl mb-4">
              <h4 className="font-medium mb-2">Exercise: Real-world Application</h4>
              <p>Apply the concepts you've learned to solve this practical challenge.</p>
            </div>
          </div>
        );
      case 'A':
        return (
          <div>
            <h3 className="text-xl font-medium mb-3">Creative Exploration</h3>
            <p className="mb-4">
              Understanding {selectedTopic} can be enhanced through creative visualization and expression. 
              Let's explore some creative approaches to deepen your understanding.
            </p>
            <div className="p-4 bg-muted rounded-xl mb-4">
              <h4 className="font-medium mb-2">Activity: Visual Mapping</h4>
              <p>Create a visual representation of the key concepts in this module.</p>
            </div>
          </div>
        );
      case 'I':
        return (
          <div>
            <h3 className="text-xl font-medium mb-3">Analytical Framework</h3>
            <p className="mb-4">
              A deep analytical understanding of {selectedTopic} will help you master complex concepts. 
              Let's analyze the underlying principles and their interconnections.
            </p>
            <div className="p-4 bg-muted rounded-xl mb-4">
              <h4 className="font-medium mb-2">Research Challenge: Deep Dive</h4>
              <p>Investigate these questions to develop a comprehensive understanding of the subject.</p>
            </div>
          </div>
        );
      case 'S':
        return (
          <div>
            <h3 className="text-xl font-medium mb-3">Collaborative Learning</h3>
            <p className="mb-4">
              Learning {selectedTopic} is enhanced through discussion and collaboration. 
              Consider how you might explain these concepts to others.
            </p>
            <div className="p-4 bg-muted rounded-xl mb-4">
              <h4 className="font-medium mb-2">Discussion Points: Key Concepts</h4>
              <p>Reflect on how you would teach these concepts to someone else.</p>
            </div>
          </div>
        );
      case 'E':
        return (
          <div>
            <h3 className="text-xl font-medium mb-3">Strategic Implementation</h3>
            <p className="mb-4">
              Mastering {selectedTopic} will give you the tools to lead and influence in this field. 
              Let's explore how to apply these concepts strategically.
            </p>
            <div className="p-4 bg-muted rounded-xl mb-4">
              <h4 className="font-medium mb-2">Leadership Challenge: Decision Making</h4>
              <p>Practice making strategic decisions based on the principles you've learned.</p>
            </div>
          </div>
        );
      case 'C':
        return (
          <div>
            <h3 className="text-xl font-medium mb-3">Structured Learning Path</h3>
            <p className="mb-4">
              A systematic approach to {selectedTopic} will help you build a solid foundation. 
              Let's follow a structured process to master these concepts.
            </p>
            <div className="p-4 bg-muted rounded-xl mb-4">
              <h4 className="font-medium mb-2">Step-by-Step Process: Building Mastery</h4>
              <p>Follow this detailed guide to develop your expertise systematically.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!module) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-xl">Loading module...</div>
      </div>
    );
  }

  return (
    <div className="pb-16 px-4">
      <AnimatedContainer className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={handleBackToDashboard}
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
          <p className="text-muted-foreground mb-4">{module.description}</p>
          
          {!showQuiz && (
            <ProgressBar
              label="Lesson Progress"
              value={lessonProgress}
              max={100}
              showPercentage={true}
            />
          )}
        </div>
        
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          {!showQuiz ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-medium mb-3">Introduction</h3>
                <p className="mb-4">
                  Welcome to this module on {selectedTopic}. We'll explore key concepts, 
                  principles, and applications tailored to your learning preferences.
                </p>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="mt-1">
                    <BookOpen size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Learning Objectives</h4>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>Understand the core principles of {selectedTopic}</li>
                      <li>Apply fundamental concepts to solve related problems</li>
                      <li>Develop a foundational knowledge framework for advanced learning</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {getPersonalizedContent()}
              
              <div>
                <p className="text-sm text-muted-foreground italic">
                  Content tailored to your {getLearningTypeLabel()} style. Loading quiz...
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {!quizCompleted ? (
                <>
                  <div>
                    <h3 className="text-xl font-medium mb-3">Knowledge Check</h3>
                    <p className="mb-6">
                      Let's test your understanding of the concepts we've covered in this module.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">{quiz.question}</h4>
                      <div className="space-y-3">
                        {quiz.options.map((option) => (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionSelect(option.id)}
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
                              <span className="ml-3">{option.text}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSubmitQuiz}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center shadow-sm hover:bg-primary/90 transition-colors"
                    >
                      Submit Answer
                    </motion.button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Module Completed!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Great job! You've successfully completed this module on {selectedTopic}.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleBackToDashboard}
                      className="px-6 py-3 border border-border bg-white text-foreground rounded-xl font-medium inline-flex items-center hover:border-primary/30 transition-colors w-full sm:w-auto justify-center"
                    >
                      <List size={18} className="mr-2" />
                      View All Modules
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleContinue}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center shadow-sm hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
                    >
                      Continue Learning
                      <ArrowLeft size={18} className="ml-2 rotate-180" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </AnimatedContainer>
    </div>
  );
};

// Helper function to determine the learning type label
const getLearningTypeLabel = () => {
  const dominantType = localStorage.getItem('dominantType') || 'R';
  
  switch (dominantType) {
    case 'R': return 'Practical Learner';
    case 'A': return 'Creative Learner';
    case 'I': return 'Analytical Learner';
    case 'S': return 'Social Learner';
    case 'E': return 'Enterprising Learner';
    case 'C': return 'Structured Learner';
    default: return 'Balanced Learner';
  }
};

export default ModulePage;
