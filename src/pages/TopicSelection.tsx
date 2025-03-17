import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, MessageSquare, Send, X } from 'lucide-react';
import AnimatedContainer from '../components/AnimatedContainer';
import SearchInput from '../components/SearchInput';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Badge from "@/components/Badges.tsx";

const suggestedTopics = [
  'Machine Learning Basics',
  'Web Development',
  'Data Science Fundamentals',
  'JavaScript Frameworks',
  'UX Design Principles',
  'Cloud Computing',
  'Mobile App Development',
  'Quantum Computing',
  'Digital Marketing',
  'Blockchain Technology'
];

const TopicSelection = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hi there! What topic are you interested in learning about today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Ensuring pop-up state
  const [popupTriggered, setPopupTriggered] = useState(false);

  useEffect(() => {
    // Ensure this runs only once and doesn't get reset
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');

    if (!hasSeenPopup && !popupTriggered) {
    const timeout = setTimeout(() => {
      setShowPopup(true);
      setPopupTriggered(true);
    }, 3000); // Show pop-up after 3 seconds

    return () => clearTimeout(timeout);
  }
}, [popupTriggered]);


  // Original search handling
  const handleSearch = (value) => {
    setTopic(value);
  };

  const handleContinue = () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic you want to learn');
      return;
    }
    localStorage.setItem('selectedTopic', topic);
    navigate('/personality-test');
  };

  const callAIModel = async (conversation) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversation })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error calling AI model:', error);
      throw error;
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim()) {
      toast.error('Please enter a message.');
      return;
    }
    const userMsg = { role: 'user', text: chatInput };
    const updatedChat = [...chatMessages, userMsg];
    setChatMessages(updatedChat);
    setChatInput('');
    setChatLoading(true);

    try {
      const botResponse = await callAIModel(updatedChat);
      setChatMessages((prev) => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      toast.error('Error communicating with the AI model.');
    }
    setChatLoading(false);
  };

  const handleChatFinalize = () => {
    const userMsgs = chatMessages.filter((msg) => msg.role === 'user');
    const finalTopic = userMsgs[userMsgs.length - 1]?.text;
    if (!finalTopic) {
      toast.error('Please specify a topic in the chat.');
      return;
    }
    setTopic(finalTopic);
    localStorage.setItem('selectedTopic', finalTopic);
    navigate('/personality-test');
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setTopic(suggestion);
    localStorage.setItem('selectedTopic', suggestion);
    navigate('/personality-test');
  };

  return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 relative">
        {/* Show Pop-up */}
        {showPopup && <Popup setShowPopup={setShowPopup} />}

        <AnimatedContainer className="w-full max-w-3xl mx-auto text-center">
          <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
          >
            <BookOpen size={48} className="mx-auto mb-4 text-primary" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">What would you like to learn today?</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Enter any topic you're interested in, and we'll create a personalized learning experience just for you.
          </p>

          <div className="mb-8">
            <SearchInput
                placeholder="E.g., Machine Learning, Web Development, Data Science..."
                suggestions={suggestedTopics}
                onSearch={handleSearch}
            />
          </div>

          <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium inline-flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors"
          >
            Start Learning
            <ArrowRight size={18} className="ml-2" />
          </motion.button>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground">Or</p>
            <button
                onClick={() => setShowChat(true)}
                className="mt-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg inline-flex items-center gap-2 hover:bg-secondary/90 transition-colors"
            >
              <MessageSquare size={18} />
              Chat with Bot
            </button>
          </div>

          {/* Popular Topics Section */}
          <AnimatedContainer delay={0.2} className="w-full max-w-3xl mx-auto mt-12">
            <h3 className="text-lg font-medium mb-4 text-center">Popular Topics</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestedTopics.slice(0, 6).map((suggestion, index) => (
                  <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="px-4 py-2 rounded-full border border-border bg-white hover:border-primary/30 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
              ))}
            </div>
          </AnimatedContainer>
        </AnimatedContainer>

        {/* Full Screen Chat Overlay */}
        {showChat && (
            <div className="fixed inset-0 z-50 bg-white flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Chatbot Assistant</h2>
                <button onClick={() => setShowChat(false)} className="text-gray-600 hover:text-gray-800">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-800'}`}>
                        {msg.text}
                      </div>
                    </div>
                ))}
                {chatLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-left text-gray-600"
                    >
                      <MessageSquare className="inline mr-2" /> Bot is typing...
                    </motion.div>
                )}
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-lg px-3 py-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleChatSend();
                      }}
                  />
                  <button
                      onClick={handleChatSend}
                      className="px-3 py-2 bg-primary text-primary-foreground rounded-lg flex items-center"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <button
                    onClick={handleChatFinalize}
                    className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Finalize Topic
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default TopicSelection;
