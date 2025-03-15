
import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 md:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-semibold text-primary hover:opacity-80 transition-opacity">
            EduVibe<span className="text-secondary">.</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
            <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">My Learning</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Help</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-6 md:px-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
      
      <footer className="py-8 px-6 md:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduVibe. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
