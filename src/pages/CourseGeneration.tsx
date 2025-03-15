
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Sparkles } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import PersonalityCard from '../components/PersonalityCard';
import { motion } from 'framer-motion';

const CourseGeneration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const selectedTopic = localStorage.getItem('selectedTopic') || '';
  const personalityScoresStr = localStorage.getItem('personalityScores');
  const dominantType = localStorage.getItem('dominantType') || 'R';

  const personalityDescriptions = {
    R: 'You learn best through practical, hands-on activities. Your course includes interactive exercises and real-world applications.',
    A: 'You thrive on creative expression and visualization. Your course includes creative projects and visual learning materials.',
    I: 'You excel with analytical thinking and research. Your course includes in-depth analysis and problem-solving challenges.',
    S: 'You learn best through collaboration and discussion. Your course includes group activities and communication exercises.',
    E: 'You prefer leadership and persuasive activities. Your course includes decision-making scenarios and presentation opportunities.',
    C: 'You excel with structured, organized approaches. Your course includes detailed instructions and sequential learning materials.'
  };

  const personalityScores = personalityScoresStr
    ? JSON.parse(personalityScoresStr)
    : { R: 0, A: 0, I: 0, S: 0, E: 0, C: 0 };

  const formattedScores = Object.entries(personalityScores).map(([type, score]) => ({
    type: type as 'R' | 'A' | 'I' | 'S' | 'E' | 'C',
    score: score as number,
    description: personalityDescriptions[type as keyof typeof personalityDescriptions]
  }));

  useEffect(() => {
    // If no topic or personality data, redirect back
    if (!selectedTopic || !personalityScoresStr) {
      navigate('/');
      return;
    }

    // Simulate course generation process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Update generation stage based on progress
        if (newProgress === 30) setStage(1);
        if (newProgress === 60) setStage(2);
        if (newProgress === 85) setStage(3);
        
        // When complete, wait a moment and navigate
        if (newProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          
          // Create mock course data
          const modules = [
            {
              id: '1',
              title: `Introduction to ${selectedTopic}`,
              description: 'Foundation concepts and principles',
              completed: false,
              locked: false
            },
            {
              id: '2',
              title: `Core ${selectedTopic} Techniques`,
              description: 'Essential methods and approaches',
              completed: false,
              locked: true
            },
            {
              id: '3',
              title: `Advanced ${selectedTopic} Concepts`,
              description: 'Expert-level strategies and applications',
              completed: false,
              locked: true
            },
            {
              id: '4',
              title: `Practical ${selectedTopic} Applications`,
              description: 'Real-world usage and case studies',
              completed: false,
              locked: true
            }
          ];
          
          localStorage.setItem('courseModules', JSON.stringify(modules));
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [selectedTopic, personalityScoresStr, navigate]);

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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div 
              animate={{ 
                rotate: 360,
                transition: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
              className="w-16 h-16 mx-auto mb-6 text-primary"
            >
              <Sparkles size={64} />
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Personalizing Your Learning Experience
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {getStageText()}
            </p>
            
            <div className="h-2 bg-muted rounded-full max-w-md mx-auto overflow-hidden">
              <motion.div 
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 text-primary">
              <Brain size={64} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Your Personalized Course is Ready!
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We've created a custom learning experience based on your preferences for {selectedTopic}.
            </p>
            
            <PersonalityCard 
              scores={formattedScores}
              dominantType={dominantType}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <p className="text-sm text-muted-foreground mb-4">Redirecting you to your dashboard...</p>
              <div className="h-1 bg-muted rounded-full max-w-xs mx-auto overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: '100%',
                    transition: { duration: 2 }
                  }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatedContainer>
    </div>
  );
};

export default CourseGeneration;
