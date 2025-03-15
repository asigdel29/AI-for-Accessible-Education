
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, BarChart2, Award, ArrowRight } from 'lucide-react';
import ModuleCard from '../components/ModuleCard';
import CourseCard from '../components/CourseCard';
import AnimatedContainer from '../components/AnimatedContainer';
import ProgressBar from '../components/ProgressBar';
import { motion } from 'framer-motion';

interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  locked: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const selectedTopic = localStorage.getItem('selectedTopic') || '';
  const dominantType = localStorage.getItem('dominantType') || 'R';
  
  const moduleProgress = modules.filter(m => m.completed).length / modules.length * 100;

  useEffect(() => {
    // If no topic selected, redirect back to topic selection
    if (!selectedTopic) {
      navigate('/');
      return;
    }

    // Load modules from localStorage
    const storedModules = localStorage.getItem('courseModules');
    if (storedModules) {
      setModules(JSON.parse(storedModules));
    }
  }, [selectedTopic, navigate]);

  const handleModuleClick = (moduleId: string) => {
    // Navigate to the learning module
    navigate(`/module/${moduleId}`);
  };

  const getLearningTypeLabel = () => {
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

  return (
    <div className="pb-16 px-4">
      <AnimatedContainer className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-10 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Learning Dashboard</h1>
              <p className="text-muted-foreground max-w-2xl">
                Personalized learning path for <span className="font-semibold text-foreground">{selectedTopic}</span>,
                tailored to your <span className="font-semibold text-foreground">{getLearningTypeLabel()}</span> style.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-xl p-5 min-w-[200px]"
          >
            <div className="flex items-center mb-3">
              <BarChart2 size={20} className="mr-3 text-primary" />
              <h3 className="font-semibold">Course Progress</h3>
            </div>
            <ProgressBar value={moduleProgress} max={100} showPercentage={true} />
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen size={20} className="mr-2 text-primary" />
                Learning Path
              </h2>
              
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <ModuleCard
                    key={module.id}
                    title={module.title}
                    description={module.description}
                    completed={module.completed}
                    locked={module.locked}
                    onClick={() => handleModuleClick(module.id)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Award size={20} className="mr-2 text-primary" />
                Recommendations
              </h2>
              
              <div className="space-y-4">
                <CourseCard
                  title={`Advanced ${selectedTopic}`}
                  description="Take your knowledge to the next level with this advanced course."
                  duration="4 weeks"
                  modules={5}
                  level="Advanced"
                  onClick={() => {}}
                />
                
                <CourseCard
                  title={`${selectedTopic} in Practice`}
                  description="Apply your knowledge in real-world scenarios and projects."
                  duration="3 weeks"
                  modules={4}
                  level="Intermediate"
                  onClick={() => {}}
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 md:p-8 mt-8"
        >
          <h3 className="text-xl font-semibold mb-2">Ready for your first lesson?</h3>
          <p className="text-muted-foreground mb-4">
            Start with the introduction module to begin your personalized learning journey.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleModuleClick('1')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center shadow-sm hover:bg-primary/90 transition-colors"
          >
            Start Learning
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </motion.div>
      </AnimatedContainer>
    </div>
  );
};

export default Dashboard;
