import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import { motion } from 'framer-motion';
import { generateCourse, adaptCourse } from '../model.js';

const CourseGeneration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [courseOutline, setCourseOutline] = useState('');
  const [adaptedOutline, setAdaptedOutline] = useState('');

  const selectedTopic = localStorage.getItem('selectedTopic') || '';
  const personalityProfile = localStorage.getItem('learningProfile') || '';

  // Updated prompt incorporating both personality profile and topic.
  const prompt = `
Personality Profile: ${personalityProfile}
Course Topic: ${selectedTopic}
Instruction: Generate a personalized course outline with lesson plans and quizzes.
Output:
`;

  // Function to call the local generateCourse function.
  const handleGenerateCourse = async () => {
    try {
      const generatedText = await generateCourse(prompt);
      // Save the generated course outline.
      setCourseOutline(generatedText);
      localStorage.setItem('courseModules', JSON.stringify(generatedText));
      setLoading(false);
      // Navigate to dashboard after a short delay.
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error generating course:', error);
      // Fallback if generation fails.
      const modules = [
        { id: '1', title: `Introduction to ${selectedTopic}`, description: 'Foundation concepts', completed: false, locked: false },
        { id: '2', title: `Core ${selectedTopic} Techniques`, description: 'Essential methods', completed: false, locked: true },
        { id: '3', title: `Advanced ${selectedTopic} Concepts`, description: 'Expert-level strategies', completed: false, locked: true },
        { id: '4', title: `Practical ${selectedTopic} Applications`, description: 'Case studies', completed: false, locked: true }
      ];
      localStorage.setItem('courseModules', JSON.stringify(modules));
      setLoading(false);
      setTimeout(() => { navigate('/dashboard'); }, 2000);
    }
  };

  // Example function to adapt the course outline.
  // You could trigger this after receiving assessment feedback.
  const handleAdaptCourse = async () => {
    const assessmentFeedback = { remedial_needed: true, quiz_score: 65 };
    try {
      const updatedOutline = await adaptCourse(courseOutline, assessmentFeedback);
      setAdaptedOutline(updatedOutline);
      localStorage.setItem('courseModules', JSON.stringify(updatedOutline));
      console.log('Adapted Course Outline:', updatedOutline);
    } catch (error) {
      console.error('Error adapting course:', error);
    }
  };

  useEffect(() => {
    if (!selectedTopic || !personalityProfile) {
      navigate('/');
      return;
    }
    // Simulate progress/loading before generating the course.
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress === 30) setStage(1);
        if (newProgress === 60) setStage(2);
        if (newProgress === 85) setStage(3);
        if (newProgress >= 100) {
          clearInterval(interval);
          // Call the local generateCourse function.
          handleGenerateCourse();
        }
        return newProgress;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [selectedTopic, personalityProfile, navigate, prompt]);

  const getStageText = () => {
    switch (stage) {
      case 0:
        return 'Analyzing your learning preferences...';
      case 1:
        return `Creating personalized ${selectedTopic} content...`;
      case 2:
        return 'Generating quizzes and assessments...';
      case 3:
        return 'Finalizing your adaptive learning path...';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <AnimatedContainer className="w-full max-w-3xl mx-auto">
        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <motion.div
              animate={{ rotate: 360, transition: { duration: 2, repeat: Infinity, ease: "linear" } }}
              className="w-16 h-16 mx-auto mb-6 text-primary"
            >
              <Sparkles size={64} />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Personalizing Your Learning Experience</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">{getStageText()}</p>
            <div className="h-2 bg-muted rounded-full max-w-md mx-auto overflow-hidden">
              <motion.div initial={{ width: '0%' }} animate={{ width: `${progress}%` }} className="h-full bg-primary rounded-full" />
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 text-primary">
              <Brain size={64} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Your Personalized Course is Ready!</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We've created a custom learning experience for {selectedTopic} based on your preferences.
            </p>
            <div className="bg-gray-100 p-4 rounded">
              <pre className="text-left text-sm whitespace-pre-wrap">{prompt}</pre>
            </div>
            {/* Optionally, a button to manually trigger course adaptation */}
            <button
              onClick={handleAdaptCourse}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Adapt Course Based on Feedback
            </button>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">Redirecting you to your dashboard...</p>
              <div className="h-1 bg-muted rounded-full max-w-xs mx-auto overflow-hidden">
                <motion.div initial={{ width: '0%' }} animate={{ width: '100%', transition: { duration: 2 } }} className="h-full bg-primary rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatedContainer>
    </div>
  );
};

export default CourseGeneration;
