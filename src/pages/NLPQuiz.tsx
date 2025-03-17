import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../components/ProgressBar';
import {Import} from "lucide-react";
import '../App.css';
import {useNavigate} from "react-router-dom";

interface Question {
    id: string;
    text: string;
    options: { id: string; text: string }[];
    correctAnswerId: string;
    levelOnIncorrect: string;
}

const questions: Question[] = [
    {
        id: '1',
        text: 'What is Natural Language Processing (NLP)?',
        options: [
            { id: '1-1', text: 'A field of AI that enables computers to understand and process human language' },
            { id: '1-2', text: 'A method to store large amounts of text' },
            { id: '1-3', text: 'A programming language' },
            { id: '1-4', text: 'A way to translate between numbers' }
        ],
        correctAnswerId: '1-1',
        levelOnIncorrect: 'Basic Level',
    },
    {
        id: '2',
        text: 'Which of the following is a key task in NLP?',
        options: [
            { id: '2-1', text: 'Image recognition' },
            { id: '2-2', text: 'Speech-to-text conversion' },
            { id: '2-3', text: 'Circuit board design' },
            { id: '2-4', text: 'Database management' }
        ],
        correctAnswerId: '2-2',
        levelOnIncorrect: 'Beginner Level',
    },
    {
        id: '3',
        text: 'Which technique is commonly used for word representation in NLP?',
        options: [
            { id: '3-1', text: 'Fourier Transforms' },
            { id: '3-2', text: 'Word Embeddings' },
            { id: '3-3', text: 'SQL Queries' },
            { id: '3-4', text: 'XML Parsing' }
        ],
        correctAnswerId: '3-2',
        levelOnIncorrect: 'Intermediate Level',
    },
    {
        id: '4',
        text: 'What is a Transformer model in NLP?',
        options: [
            { id: '4-1', text: 'A model that uses self-attention mechanisms to process text efficiently' },
            { id: '4-2', text: 'A system that translates audio into video' },
            { id: '4-3', text: 'A mathematical model for statistical analysis' },
            { id: '4-4', text: 'A tool used to encrypt text messages' }
        ],
        correctAnswerId: '4-1',
        levelOnIncorrect: 'Advanced Level',
    },
    {
        id: '5',
        text: 'Which of the following best describes BERT?',
        options: [
            { id: '5-1', text: 'A Transformer-based NLP model designed for bidirectional text understanding' },
            { id: '5-2', text: 'A tool used for data encryption' },
            { id: '5-3', text: 'A database query language' },
            { id: '5-4', text: 'A neural network that generates pixel-based images' }
        ],
        correctAnswerId: '5-1',
        levelOnIncorrect: 'Expert Level',
    }
];

const NLPQuiz: React.FC = () => {
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userLevel, setUserLevel] = useState<string | null>(null);

    const handleOptionSelect = (optionId: string) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (optionId !== currentQuestion.correctAnswerId) {
            setUserLevel(currentQuestion.levelOnIncorrect);

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

            return;
        }

        if (currentQuestionIndex === questions.length - 1) {
            setUserLevel('Master (Top NLP Expert)');
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            {userLevel ? (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-center p-6 bg-muted/30 rounded-xl"
                >
                    <h2 className="text-2xl font-bold">Your NLP Knowledge Level:</h2>
                    <p className="text-xl font-medium text-primary mt-2">{userLevel}</p>
                    <p className="text-muted-foreground mt-4">
                        Redirecting to Dashboard...
                    </p>
                </motion.div>
            ) : (
                <>
                    <motion.div
                        initial={{opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-6"
                    >
                        <h2 className="text-2xl font-bold mb-4">NLP Knowledge Quiz</h2>
                        <ProgressBar value={progressPercentage} max={100} showPercentage />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="p-6 bg-white shadow-lg rounded-lg"
                    >
                        <h3 className="text-xl font-medium mb-4">{questions[currentQuestionIndex].text}</h3>
                        <div className="space-y-4">
                            {questions[currentQuestionIndex].options.map((option) => (
                                <motion.button
                                    key={option.id}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleOptionSelect(option.id)}
                                    className="block w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                >
                                    {option.text}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default NLPQuiz;
