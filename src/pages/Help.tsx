
import React from 'react';
import AnimatedContainer from '@/components/AnimatedContainer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const Help = () => {
  const faqs: FAQ[] = [
    {
      question: "What is Let's Study?",
      answer: "Let's Study is an adaptive learning platform that curates educational content based on your personality, learning speed, and cognitive traits. We leverage AI to create personalized learning paths that adapt to your specific needs and learning style."
    },
    {
      question: "How does the personality assessment work?",
      answer: "Our platform uses the RAISEC model (Realistic, Artistic, Investigative, Social, Enterprising, Conventional) to understand your learning preferences. This assessment helps us tailor the learning experience to match how you best absorb and process information."
    },
    {
      question: "Why does the course structure change as I progress?",
      answer: "We continuously monitor your performance and engagement with the content. Based on this data, our AI adjusts the course structure, difficulty level, and content types to optimize your learning experience and improve knowledge retention."
    },
    {
      question: "Is all the educational content original?",
      answer: "Let's Study doesn't create original content. Instead, we curate high-quality, freely available educational resources from across the web and organize them into a structured learning path that's optimized for your learning style."
    },
    {
      question: "Why focus on content curation?",
      answer: "There's an abundance of free, high-quality educational content available online. The real challenge isn't access to information—it's finding the right information in the right order, presented in a way that matches your learning style. That's the problem we solve."
    },
    {
      question: "How do you measure my learning progress?",
      answer: "We use a combination of quizzes, assessments, engagement metrics, and completion rates to gauge your understanding and progress. This data helps us adapt the course to reinforce concepts you find challenging and move quickly through material you grasp easily."
    },
    {
      question: "Why is accessible education important?",
      answer: "We believe education is a fundamental right. By curating freely available content and personalizing the learning experience, we're making quality education more accessible to everyone, regardless of economic or geographic constraints."
    },
    {
      question: "Can I suggest improvements to the platform?",
      answer: "Absolutely! We're constantly improving our platform based on user feedback. Please visit our Contact page to share your suggestions, report issues, or ask questions."
    }
  ];

  return (
    <AnimatedContainer className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">About Let's Study</h2>
        <p className="text-muted-foreground mb-4">
          Let's Study is an AI-powered adaptive learning platform designed to make education more accessible and personalized. 
          Our mission is to help learners navigate the vast sea of educational content available online by curating resources 
          that match their unique learning style and cognitive preferences.
        </p>
        <p className="text-muted-foreground">
          The platform analyzes your learning preferences through personality assessments and continuously adapts as you progress 
          through the course, ensuring you're always challenged but never overwhelmed.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      
      <section className="p-6 bg-muted/40 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
        <p className="text-muted-foreground mb-4">
          If you couldn't find the answer to your question, please visit our <a href="/contact" className="text-primary hover:underline">Contact page</a> to
          get in touch with our team.
        </p>
      </section>
    </AnimatedContainer>
  );
};

export default Help;
