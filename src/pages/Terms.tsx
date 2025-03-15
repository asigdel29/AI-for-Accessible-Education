
import React from 'react';
import AnimatedContainer from '@/components/AnimatedContainer';

const Terms = () => {
  return (
    <AnimatedContainer className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
          <p>Welcome to Let's Study. By accessing our website or using our services, you agree to be bound by these Terms of Service.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
          <p>Let's Study provides a personalized learning platform that adapts to your learning style and preferences. Our AI-driven solution curates educational content based on your personality and cognitive traits to create an optimized learning experience.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. User Accounts</h2>
          <p>You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Content</h2>
          <p>Our platform curates content from various sources. While we strive to provide high-quality educational resources, we do not guarantee the accuracy, completeness, or usefulness of any content.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Intellectual Property</h2>
          <p>All content, features, and functionality of our service are owned by Let's Study or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
          <p>Let's Study shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Your continued use of the service after such modifications constitutes your acceptance of the revised terms.</p>
        </section>
      </div>
    </AnimatedContainer>
  );
};

export default Terms;
