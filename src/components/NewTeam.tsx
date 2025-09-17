import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const NewTeam = () => {
  const teamMembers = [
    {
      name: "Razell Smart",
      title: "Founder & Lead Advisor",
      image: "/lovable-uploads/144559fd-7765-4c3f-8256-fbde965750ab.png",
      bio: "With over 15 years of experience in financial planning, Razell is passionate about helping ambitious professionals achieve their financial goals through personalized strategies."
    },
    {
      name: "Vince Gallegos", 
      title: "Senior Financial Advisor",
      image: "/lovable-uploads/3dda3ab1-0f6f-4e70-bff1-ce75f2161c6f.png",
      bio: "Vince specializes in retirement planning and wealth management, bringing a analytical approach to complex financial challenges."
    },
    {
      name: "Kelvin Mobley",
      title: "Financial Planning Associate", 
      image: "/lovable-uploads/4a48b776-30e0-4d46-92da-c3ac05890e19.png",
      bio: "Kelvin focuses on risk management and estate planning, ensuring clients have comprehensive protection strategies in place."
    }
  ];

  const handleLearnMore = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="section-lg bg-muted/30">
      <div className="container-unified">
        {/* Section Header */}
        <div className="text-center space-component-lg">
          <h2 className="heading-lg">Meet Our Team</h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            Our experienced financial professionals are dedicated to helping you achieve your financial goals.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid-three-col gap-unified-lg">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center space-component-sm">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-muted">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="heading-xs">{member.name}</h3>
                <p className="text-accent text-body-sm font-medium">{member.title}</p>
                <p className="text-body">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learn More CTA */}
        <div className="text-center mt-12">
          <Button 
            onClick={handleLearnMore}
            variant="outline"
            size="lg"
            className="hover:bg-accent hover:text-accent-foreground"
          >
            Learn More About Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewTeam;