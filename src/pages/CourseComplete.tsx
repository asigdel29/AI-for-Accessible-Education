
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Star, ArrowRight, Home } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import Confetti from '../components/Confetti';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Badges from "@/components/Badges.tsx";

const CourseComplete = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const selectedTopic = localStorage.getItem('selectedTopic') || '';

  useEffect(() => {
    // If no topic selected, redirect back to topic selection
    if (!selectedTopic) {
      navigate('/');
    }
  }, [selectedTopic, navigate]);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmitFeedback = () => {
    if (!rating) {
      toast.error('Please provide a rating before submitting');
      return;
    }
    
    // Here you would normally send the feedback to a server
    toast.success('Thank you for your feedback!');
    setSubmitted(true);
  };

  const handleStartNewCourse = () => {
    // Clear existing course data
    localStorage.removeItem('selectedTopic');
    localStorage.removeItem('personalityScores');
    localStorage.removeItem('dominantType');
    localStorage.removeItem('courseModules');
    
    // Navigate to topic selection
    navigate('/');
  };

  const handleViewAllCourses = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">

      <AnimatedContainer className="w-full max-w-3xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Award size={48} className="text-primary" />

          </div>
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Congratulations!</h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          You've completed your personalized course on <span className="font-semibold text-foreground">{selectedTopic}</span>
        <Badges/>
        </p>
        
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-6 md:p-8 mb-8"
          >
            <h3 className="text-xl font-semibold mb-2">How was your learning experience?</h3>
            <p className="text-muted-foreground mb-6">
              Your feedback helps us improve our personalized learning system.
            </p>
            
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRatingChange(value)}
                  className="mx-2"
                >
                  <Star 
                    size={32} 
                    className={rating && value <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'} 
                  />
                </motion.button>
              ))}
            </div>
            
            <div className="mb-6">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Any additional feedback? (optional)"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white input-focus-ring transition-shadow"
                rows={4}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmitFeedback}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center shadow-sm hover:bg-primary/90 transition-colors"
            >
              Submit Feedback
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 md:p-8 mb-8"
          >
            <h3 className="text-xl font-semibold mb-2">What's Next?</h3>
            <p className="text-muted-foreground mb-6">
              Continue your learning journey with more personalized courses.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleViewAllCourses}
                className="px-6 py-3 border border-border bg-white text-foreground rounded-xl font-medium inline-flex items-center hover:border-primary/30 transition-colors w-full sm:w-auto justify-center"
              >
                <Home size={18} className="mr-2" />
                Go to Dashboard
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartNewCourse}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center shadow-sm hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
              >
                Start New Course
                <ArrowRight size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatedContainer>
    </div>
  );
};

export default CourseComplete;
