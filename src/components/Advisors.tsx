
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface AdvisorProps {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
}

const Advisor: React.FC<AdvisorProps> = ({ name, title, bio, imageUrl, specialties }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 p-4 md:p-6 h-full flex flex-col">
      <div className="mb-4 md:mb-6 flex justify-center">
        <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 overflow-hidden rounded-full border-2 border-blue-100 shadow-sm">
          <img 
            src={imageUrl} 
            alt={`${name}, ${title} at Smart Financial Planning`}
            className="object-cover object-center w-full h-full"
            loading="lazy"
            decoding="async"
            style={{ objectPosition: imageUrl.includes('83c79661') ? 'center 20%' : 
                                    imageUrl.includes('c90c6dda') ? 'center 30%' : 
                                    'center 25%' }}
          />
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-medium text-charcoal mb-1 text-center">{name}</h3>
      <p className="text-blue-500 font-medium mb-3 md:mb-4 text-center text-sm md:text-base">{title}</p>
      <div className="text-charcoal/80 flex-grow space-y-2 md:space-y-3 text-sm md:text-base">
        {bio.split('\n\n').map((paragraph, index) => (
          <p key={index} className="leading-relaxed">{paragraph}</p>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1 md:gap-2 justify-center">
        {specialties.map((specialty, index) => (
          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
            {specialty}
          </span>
        ))}
      </div>
    </div>
  );
};

const Advisors = () => {
  const advisors = [
    {
      name: "Razell Smart",
      title: "Founder & Lead Advisor",
      bio: "Razell founded Smart Financial Planning with one mission: to provide high-level, personalized planning for individuals and families who want more than a cookie-cutter approach.\n\nWith years of experience guiding business owners, professionals, and high-income earners, Razell's strategies balance growth, protection, and long-term impact.\n\nOutside of work, he's a devoted husband and father, a lifelong student of leadership, and a strong believer that financial planning should feel empowering—not overwhelming.",
      specialties: ["Comprehensive Financial Planning", "Business Owner Solutions", "High-Income Strategies", "Leadership Development", "Personalized Wealth Management"],
      imageUrl: "/lovable-uploads/83c79661-f83a-4390-a3ed-d2cbea760fab.png"
    },
    {
      name: "Vince Gallegos",
      title: "Client Services / Associate Wealth Advisor",
      bio: "Vince has been helping clients pursue their financial goals since 2021, with a focus on business owners and the unique challenges they face.\n\nHis calm, service-first approach helps clients feel confident and supported at every step.\n\nVince is a proud husband and father—married to his wife Kirsten and raising their energetic daughter, Georgia. Away from the office, he's most likely on the golf course, watching football, or listening to music—always with coffee in hand.",
      specialties: ["Business Owner Planning", "Client Relations", "Goal-Based Planning", "Service Excellence", "Family Financial Planning"],
      imageUrl: "/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png"
    },
    {
      name: "Kelvin Mobley", 
      title: "Wealth & Asset Protection Specialist",
      bio: "Kelvin brings a grounded, entrepreneurial perspective to financial protection and wealth-building.\n\nWith deep experience in asset protection, he helps clients shield their legacy and maximize peace of mind. His approach is practical, proactive, and deeply personalized.\n\nOff the clock, Kelvin is a proud father, lifelong football fan, and golfer who believes that structure creates freedom—financially and personally.",
      specialties: ["Asset Protection", "Legacy Planning", "Wealth Preservation", "Entrepreneurial Finance", "Risk Management"],
      imageUrl: "/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png"
    }
  ];

  return (
    <section id="team" className="section bg-white relative overflow-hidden py-16 md:py-24">
      <GradientAccent variant="subtle" position="top-right" intensity="low" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-charcoal text-center mb-3 md:mb-4">
            Our Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed px-4">
            Meet the experts dedicated to your financial success and long-term prosperity in Lake Nona and Orlando.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {advisors.map((advisor, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <Advisor
                name={advisor.name}
                title={advisor.title}
                bio={advisor.bio}
                imageUrl={advisor.imageUrl}
                specialties={advisor.specialties}
              />
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-8 md:mt-12">
          <Button 
            variant="outline" 
            className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 group text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
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
