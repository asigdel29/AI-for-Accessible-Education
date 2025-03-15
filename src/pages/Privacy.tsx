
import React from 'react';
import AnimatedContainer from '@/components/AnimatedContainer';

const Privacy = () => {
  return (
    <AnimatedContainer className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as your name, email address, and learning preferences. We also collect data about your interactions with our platform to improve our service.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
          <p>We use your information to provide, maintain, and improve our services, to develop new features, and to personalize your learning experience based on your preferences and learning style.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
          <p>We do not share your personal information with third parties except as described in this policy or when required by law. We may share anonymized, aggregated data for research and educational purposes.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Security</h2>
          <p>We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Your Choices</h2>
          <p>You can access, update, or delete your account information at any time through your account settings. You may also opt out of certain data collection features.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Changes to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us through the Contact page.</p>
        </section>
      </div>
    </AnimatedContainer>
  );
};

export default Privacy;
