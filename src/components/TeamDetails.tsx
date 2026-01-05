import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PremiumCard } from '@/components/ui/premium-card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { advisors as teamAdvisors } from '@/data/team';
import { smoothScrollTo } from '@/utils/smoothScroll';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Simple helper functions inline
const getHeadshotPosition = (imageUrl: string): string => {
  if (imageUrl.includes('razell')) return 'center 15%';
  if (imageUrl.includes('joseph')) return 'center 20%';
  return 'center center';
};

const generateTeamAltText = (name: string, title: string): string => {
  return `${name}, ${title} at Smart Financial Planning`;
};

const TeamDetails = () => {
  const advisors = teamAdvisors;
  const getIndexFromHash = () => {
    if (typeof window === 'undefined') return 0;
    const match = window.location.hash.match(/advisor=([a-z0-9-]+)/i);
    if (match) {
      const idx = advisors.findIndex(a => a.slug === match[1]);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  };
  const [activeAdvisor, setActiveAdvisor] = useState<number>(getIndexFromHash());
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const onHashChange = () => setActiveAdvisor(getIndexFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleAdvisorChange = (index: number) => {
    if (index === activeAdvisor) return;
    setIsTransitioning(true);
    setIsExpanded(false);
    setTimeout(() => {
      setActiveAdvisor(index);
      window.location.hash = `advisor=${advisors[index].slug}`;
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const navigateAdvisor = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (activeAdvisor - 1 + advisors.length) % advisors.length
      : (activeAdvisor + 1) % advisors.length;
    handleAdvisorChange(newIndex);
  };

  const advisor = advisors[activeAdvisor];

  return (
    <section id="team" className="section-lg bg-background relative overflow-hidden" role="region" aria-labelledby="team-heading">
      <div className="container-wide relative z-10">
        <ScrollReveal distance="8px">
          <div className="text-center space-component-lg">
            <div className="space-component-xs">
              <h2 id="team-heading" className="heading-lg text-foreground">
                Meet Our Expert Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-body-lg">
                Our Orlando and Lake Nona advisors bring decades of combined experience and specialized expertise to help you achieve your financial goals.
              </p>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-unified-lg mx-auto">
          {/* Desktop Sidebar */}
          <div className="hidden lg:flex flex-col gap-unified-sm">
            {advisors.map((adv, index) => (
              <Button 
                key={index} 
                variant="subtle" 
                size="none" 
                className={`p-3 w-full text-left rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-unified-sm ${
                  activeAdvisor === index 
                    ? 'bg-accent/10 border border-accent/20 shadow-sm' 
                    : 'hover:bg-muted'
                }`}
                aria-pressed={activeAdvisor === index}
                onClick={() => handleAdvisorChange(index)}
              >
                <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-border flex-shrink-0">
                  <AvatarImage 
                    src={adv.imageUrl} 
                    alt={generateTeamAltText(adv.name, adv.title)}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    sizes="56px"
                    style={{ objectPosition: getHeadshotPosition(adv.imageUrl) }}
                  />
                  <AvatarFallback>{adv.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-foreground text-base truncate">{adv.name}</h3>
                  <p className="text-sm text-primary leading-tight">{adv.title}</p>
                </div>
              </Button>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <div className="px-10 relative">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {advisors.map((adv, index) => (
                    <CarouselItem key={index} className="pl-2 basis-auto">
                      <Button
                        variant="subtle"
                        size="none"
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-150 flex flex-col items-center gap-unified-xs w-20 sm:w-24 ${
                          activeAdvisor === index 
                            ? 'bg-accent/10 border border-accent/20 shadow-sm' 
                            : 'hover:bg-muted'
                        }`}
                        aria-pressed={activeAdvisor === index}
                        onClick={() => handleAdvisorChange(index)}
                      >
                        <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-border">
                          <AvatarImage 
                            src={adv.imageUrl} 
                            alt={generateTeamAltText(adv.name, adv.title)}
                            width={64}
                            height={64}
                            loading="lazy"
                            decoding="async"
                            sizes="64px"
                            style={{ objectPosition: getHeadshotPosition(adv.imageUrl) }}
                          />
                          <AvatarFallback>{adv.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                          <p className="font-medium text-foreground text-xs sm:text-sm">{adv.name.split(' ')[0]}</p>
                        </div>
                      </Button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-10" />
                <CarouselNext className="-right-10" />
              </Carousel>
            </div>
          </div>
          
          {/* Advisor Details */}
          <div>
            <PremiumCard 
              variant="advisor" 
              size="lg" 
              className={`p-4 sm:p-6 lg:p-8 transition-all duration-150 ring-1 ring-border/30 hover:ring-accent/30 hover:shadow-lg ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}
            >
              {/* Header with Name, Title, and Specialties */}
              <div className="space-component-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="heading-sm text-foreground">
                      {advisor.name}
                    </h3>
                    <p className="text-primary font-medium text-base">
                      {advisor.title}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateAdvisor('prev')}
                      className="h-10 w-10 sm:h-8 sm:w-8 touch-target"
                      aria-label="Previous advisor"
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateAdvisor('next')}
                      className="h-10 w-10 sm:h-8 sm:w-8 touch-target"
                      aria-label="Next advisor"
                    >
                      <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-unified-xs">
                  {advisor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-accent border-accent/30">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Summary and Full Bio */}
              <div className="space-component-sm">
                <p className="text-body text-muted-foreground leading-relaxed">
                  {advisor.summary}
                </p>
                
                <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                  <CollapsibleContent className="space-component-sm animate-accordion-down">
                    {advisor.fullBio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-body text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </CollapsibleContent>
                  <CollapsibleTrigger asChild>
                    <Button variant="link" className="text-accent p-0 h-auto font-medium">
                      {isExpanded ? 'Show less' : 'Read full story'}
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={() => smoothScrollTo('schedule')}
                className="group flex items-center gap-2"
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Background & Credentials Section */}
              <div className="border-t border-border pt-6 space-component-sm">
                <h4 className="heading-xs text-foreground">Background & Credentials</h4>
                
                <div className="space-component-md">
                  {advisor.credentials.education && advisor.credentials.education.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-primary">Education</h5>
                      <ul className="flex flex-col gap-2 mt-2">
                        {advisor.credentials.education.map((edu, index) => (
                          <li key={index} className="text-body-sm text-muted-foreground flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                            <span className="leading-relaxed">{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {advisor.credentials.certifications && advisor.credentials.certifications.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-primary">Certifications</h5>
                      <ul className="flex flex-col gap-2 mt-2">
                        {advisor.credentials.certifications.map((cert, index) => (
                          <li key={index} className="text-body-sm text-muted-foreground flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                            <span className="leading-relaxed">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {advisor.credentials.experience && advisor.credentials.experience.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-primary">Experience</h5>
                      <ul className="flex flex-col gap-2 mt-2">
                        {advisor.credentials.experience.map((exp, index) => (
                          <li key={index} className="text-body-sm text-muted-foreground flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                            <span className="leading-relaxed">{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-component-xs bg-accent/10 rounded-lg p-4">
                  <p className="text-body-sm text-primary">
                    <span className="font-medium">Professional Standards:</span> Our team maintains the highest industry standards through continuing education and professional certification requirements.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDetails;