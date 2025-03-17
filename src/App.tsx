import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SplashScreen from "./components/SplashScreen";
import TopicSelection from "./pages/TopicSelection";
import PersonalityTest from "./pages/PersonalityTest";
import CourseGeneration from "./pages/CourseGeneration";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";
import CourseComplete from "./pages/CourseComplete";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Index from "./pages/Index";
import NLPQuiz from './pages/NLPQuiz';


const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("hasSeenSplash");
  });

  // const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (showSplash) {
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, [showSplash]);

   const [isLoggedIn, setIsLoggedIn] = useState(false);

  return showSplash ? (
      <SplashScreen onComplete={() => setShowSplash(false)} />
  ) : (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
              <Routes>
                <Route path="/" element={<TopicSelection />} />
                <Route path="/index" element={<Index />} />
                <Route path="/personality-test" element={<PersonalityTest />} />
                <Route path="/nlp-quiz" element={<NLPQuiz />} />
                <Route path="/course-generation" element={<CourseGeneration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/module/:moduleId" element={<ModulePage />} />
                <Route path="/course-complete" element={<CourseComplete />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  );

};

export default App;

