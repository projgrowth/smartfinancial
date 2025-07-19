
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdvisorProps {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

const Advisor: React.FC<AdvisorProps> = ({ name, title, bio, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 p-6 h-full flex flex-col">
      <div className="mb-6 flex justify-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-2 border-blue-100 shadow-sm">
          <img 
            src={imageUrl} 
            alt={name} 
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
      </div>
      <h3 className="heading-sm text-charcoal mb-1 text-center">{name}</h3>
      <p className="text-blue-500 font-medium mb-4 text-center">{title}</p>
      <p className="text-charcoal/80 flex-grow">{bio}</p>
    </div>
  );
};

const Advisors = () => {
  const advisors = [
    {
      name: "Razell Smart",
      title: "Founder & CEO",
      bio: "With a disciplined approach honed by 13 years in the Armed Forces, Razell specializes in delivering innovative, strategic financial solutions to high-achieving entrepreneurs and professionals. Razell's expertise lies in asset protection, growth optimization, and personalized financial strategy.",
      imageUrl: "/lovable-uploads/8b9ec04f-64ac-49d5-9530-f05fcf4c6240.png"
    },
    {
      name: "Vince Gallegos",
      title: "[PLACEHOLDER - VERIFY EXACT TITLE]",
      bio: "[PLACEHOLDER - WAITING FOR EXACT BIO FROM UPLOADED FILES]",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Kelvin Mobley", 
      title: "[PLACEHOLDER - VERIFY EXACT TITLE]",
      bio: "[PLACEHOLDER - WAITING FOR EXACT BIO FROM UPLOADED FILES]",
      imageUrl: "/placeholder.svg"
    }
  ];

  return (
    <section id="team" className="section bg-white relative overflow-hidden py-24">
      <GradientAccent variant="subtle" position="top-right" intensity="low" />
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            Our Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-16">
            Meet the experts dedicated to your financial success and long-term prosperity.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advisors.map((advisor, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <Advisor
                name={advisor.name}
                title={advisor.title}
                bio={advisor.bio}
                imageUrl={advisor.imageUrl}
              />
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 group"
            onClick={() => {
              const teamDetails = document.getElementById('team-details');
              if (teamDetails) {
                teamDetails.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Learn More About Our Team
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Advisors;
