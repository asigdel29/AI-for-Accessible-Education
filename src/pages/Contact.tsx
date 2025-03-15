
import React from 'react';
import AnimatedContainer from '@/components/AnimatedContainer';

interface TeamMember {
  name: string;
  role: string;
  email: string;
}

const Contact = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Anubhav Sigdel",
      role: "Team Member",
      email: "asigdel@oswego.edu"
    },
    {
      name: "Ayusha Bhandari",
      role: "Team Member",
      email: "abhandar@oswego.edu"
    },
    {
      name: "Sakshyam Sarki",
      role: "Team Member",
      email: "ssarki@oswego.edu"
    },
    {
      name: "Shrishtika Bajracharya",
      role: "Team Member",
      email: "shrishtika.vajra@gmail.com"
    }
  ];

  return (
    <AnimatedContainer className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <p className="text-muted-foreground mb-8">
        Have questions about Let's Study? Our team is here to help! Feel free to reach out to any of our team members below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="border rounded-lg p-6 hover:border-primary/50 transition-all">
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
            <a 
              href={`mailto:${member.email}`} 
              className="text-sm text-primary hover:underline"
            >
              {member.email}
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-muted/40 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          We'd love to hear your feedback, questions, or suggestions about Let's Study. Please reach out to us!
        </p>
        <p className="text-muted-foreground">
          General inquiries: <a href="mailto:asigdel@oswego.edu" className="text-primary hover:underline">asigdel@oswego.edu</a>
        </p>
      </div>
    </AnimatedContainer>
  );
};

export default Contact;
