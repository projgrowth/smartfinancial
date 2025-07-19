
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
      title: "Founder & Lead Advisor",
      bio: "Razell founded Smart Financial Planning with one mission: to provide high-level, personalized planning for individuals and families who want more than a cookie-cutter approach. With years of experience guiding business owners, professionals, and high-income earners, Razell's strategies balance growth, protection, and long-term impact. Outside of work, he's a devoted husband and father, a lifelong student of leadership, and a strong believer that financial planning should feel empowering—not overwhelming.",
      imageUrl: "/lovable-uploads/8b9ec04f-64ac-49d5-9530-f05fcf4c6240.png"
    },
    {
      name: "Vince Gallegos",
      title: "Client Services / Associate Wealth Advisor",
      bio: "Vince has been helping clients pursue their financial goals since 2021, with a focus on business owners and the unique challenges they face. His calm, service-first approach helps clients feel confident and supported at every step. Vince is a proud husband and father—married to his wife Kirsten and raising their energetic daughter, Georgia. Away from the office, he's most likely on the golf course, watching football, or listening to music—always with coffee in hand.",
      imageUrl: "/placeholder.svg"
    },
    {
      name: "Kelvin Mobley", 
      title: "Wealth & Asset Protection Specialist",
      bio: "Kelvin brings a grounded, entrepreneurial perspective to financial protection and wealth-building. With deep experience in asset protection, he helps clients shield their legacy and maximize peace of mind. His approach is practical, proactive, and deeply personalized. Off the clock, Kelvin is a proud father, lifelong football fan, and golfer who believes that structure creates freedom—financially and personally.",
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
