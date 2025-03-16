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
      answer: "Let's Study is an adaptive learning platform that personalizes educational content based on your unique learning style and cognitive traits. Our AI-driven system curates high-quality resources and adapts the course structure based on interactive assessments that reveal how you learn best."
    },
    {
      question: "How do the interactive assessments work?",
      answer: "Our process includes a variety of engaging tasks: we present the same content in multiple formats (video, text, audio, interactive activity) to determine your learning style (Visual, Auditory, Reading, Kinesthetic). We also use simple puzzles to gauge personality traits, timed reading passages to measure speed and retention, and choices related to procrastination, stress, and study habits to build a complete picture of your learning profile."
    },
    {
      question: "How does the personality assessment work?",
      answer: "We evaluate personality using elements of the Big 5 model. For example, a simple puzzle task helps us see whether you plan before acting or dive right in—an indicator of traits like conscientiousness and openness. This information is then used to further personalize your learning experience."
    },
    {
      question: "How are other cognitive traits assessed?",
      answer: "In addition to learning style and personality, our assessments examine reading speed & retention, attention span, and your response to distractions (like a fake notification sound). We also explore group vs. solo learning preferences and intrinsic versus extrinsic motivation, ensuring the platform adapts to your overall study habits and stress responses."
    },
    {
      question: "Why does the course structure change as I progress?",
      answer: "We continuously monitor your performance and engagement using these dynamic assessments. This data allows our AI to adjust the course structure, difficulty level, and content formats in real-time, ensuring that you remain both challenged and supported throughout your learning journey."
    },
    {
      question: "Is all the educational content original?",
      answer: "Let's Study curates high-quality, freely available educational resources from across the web. Our role is to organize and present this content in a way that matches your learning style and cognitive strengths."
    },
    {
      question: "Why focus on content curation and personalized assessments?",
      answer: "There's an abundance of excellent free content online, but finding the right material in the right order is a challenge. By using interactive assessments to understand your learning style, personality, and habits, we tailor a personalized path that maximizes retention and engagement."
    },
    {
      question: "Can I suggest improvements to the platform?",
      answer: "Absolutely! We're constantly evolving based on user feedback. Please visit our Contact page to share your suggestions, report issues, or ask any questions."
    }
  ];

  return (
    <AnimatedContainer className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">About Let's Study</h2>
        <p className="text-muted-foreground mb-4">
          Let's Study is an AI-powered adaptive learning platform designed to make education more accessible and personalized.
          We use interactive assessments to understand your learning style, personality, and cognitive traits, ensuring that the content
          you receive is perfectly tailored to how you learn best.
        </p>
        <p className="text-muted-foreground">
          Our dynamic approach means that as you progress, our system adapts the course structure and difficulty to suit your evolving needs.
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
