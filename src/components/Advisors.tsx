
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { advisors } from '@/data/team';
import { generateTeamAltText, getHeadshotPosition } from '@/utils/imageOptimization';
import { smoothScrollTo } from '@/utils/smoothScroll';

interface AdvisorProps {
  slug: string;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
}

const Advisor: React.FC<AdvisorProps> = ({ slug, name, title, bio, imageUrl, specialties }) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 space-component-md h-full flex flex-col">
      <div className="space-component-sm flex justify-center">
        <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 overflow-hidden rounded-full border-2 border-border shadow-sm">
          <img 
            src={imageUrl} 
            alt={generateTeamAltText(name, title)}
            className="object-cover object-center w-full h-full"
            loading="lazy"
            decoding="async"
            width={160}
            height={160}
            sizes="(min-width: 1024px) 160px, (min-width: 768px) 128px, 112px"
            style={{ objectPosition: getHeadshotPosition(imageUrl) }}
          />
        </div>
      </div>
      <h3 className="heading-xs space-component-xs text-center">{name}</h3>
      <p className="text-primary font-medium space-component-xs text-center text-body-md">{title}</p>
      <div className="text-muted-foreground flex-grow space-component-xs text-body-sm">
        {bio.split('\n\n').map((paragraph, index) => (
          <p key={index} className="leading-relaxed">{paragraph}</p>
        ))}
      </div>
      <div className="space-component-xs flex flex-wrap gap-unified-xs justify-center">
        {specialties.map((specialty, index) => (
          <span key={index} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
            {specialty}
          </span>
        ))}
      </div>
      <div className="space-component-xs flex justify-center">
        <Button variant="ghost" size="sm" className="group" aria-label={`View ${name}'s profile`}
          onClick={() => {
            window.location.hash = `advisor=${slug}`;
            smoothScrollTo('team-details');
          }}
        >
          View Profile
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

const Advisors = () => {
  // Using imported advisors data

  return (
    <section id="team" className="section bg-background relative overflow-hidden">
      <GradientAccent variant="subtle" position="top-right" intensity="low" />
      
      <div className="container-site relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-center space-component-sm text-foreground">
            Our Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground container-narrow mx-auto space-component-lg text-body-lg leading-relaxed">
            Meet the experts dedicated to your financial success and long-term prosperity in Lake Nona and Orlando.
          </p>
        </ScrollReveal>
        
        <div className="grid-auto gap-unified-lg container-wide mx-auto">
          {advisors.map((advisor, index) => (
            <ScrollReveal key={index} delay={index * 150}>
              <Advisor
                slug={advisor.slug}
                name={advisor.name}
                title={advisor.title}
                bio={advisor.bio}
                imageUrl={advisor.imageUrl}
                specialties={advisor.specialties}
              />
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center space-component-lg">
          <Button 
            variant="outline" 
            className="group text-body-md"
            onClick={() => smoothScrollTo('team-details')}
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
