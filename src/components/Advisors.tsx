
import React from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Button } from '@/components/ui/button';
import { PremiumCard, PremiumCardContent } from '@/components/ui/premium-card';
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
    <PremiumCard variant="advisor" size="responsive" className="h-full flex flex-col">
      <div className="mb-4 md:mb-6 flex justify-center">
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
      <h3 className="heading-xs mb-1 text-center">{name}</h3>
      <p className="text-primary font-medium mb-3 md:mb-4 text-center text-sm md:text-base">{title}</p>
      <PremiumCardContent className="text-muted-foreground flex-grow space-y-2 md:space-y-3 text-sm md:text-base">
        {bio.split('\n\n').map((paragraph, index) => (
          <p key={index} className="leading-relaxed">{paragraph}</p>
        ))}
      </PremiumCardContent>
      <div className="mt-4 flex flex-wrap gap-1 md:gap-2 justify-center">
        {specialties.map((specialty, index) => (
          <span key={index} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
            {specialty}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
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
    </PremiumCard>
  );
};

const Advisors = () => {
  // Using imported advisors data

  return (
    <section id="team" className="section bg-background relative overflow-hidden">
      <GradientAccent variant="subtle" position="top-right" intensity="low" />
      
      <div className="container-unified relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-center mb-3 md:mb-4 text-foreground">
            Our Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed">
            Meet the experts dedicated to your financial success and long-term prosperity in Lake Nona and Orlando.
          </p>
        </ScrollReveal>
        
        <div className="grid-auto gap-unified-lg max-w-6xl mx-auto">
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
        
        <div className="text-center mt-8 md:mt-12">
          <Button 
            variant="outline" 
            className="group text-sm md:text-base"
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
