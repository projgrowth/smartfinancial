import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PremiumCard } from '@/components/ui/premium-card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { advisors as teamAdvisors } from '@/data/team';
import { getHeadshotPosition, generateTeamAltText } from '@/utils/imageOptimization';
import { smoothScrollTo } from '@/utils/smoothScroll';
import { preloadMeetingScheduler } from '@/utils/componentPreloader';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <GradientAccent variant="subtle" position="bottom-right" intensity="ultra-low" />
      
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
        
        <div className="grid-three-col gap-unified-xl mx-auto">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block col-span-1">
            <div className="space-component-md">
              {advisors.map((adv, index) => (
                <Button 
                  key={index} 
                  variant="subtle" 
                  size="none" 
                  className={`p-4 w-full text-left rounded-lg cursor-pointer transition-all duration-150 flex items-center gap-unified-sm ${
                    activeAdvisor === index 
                      ? 'bg-accent/10 border border-accent/20 shadow-sm' 
                      : 'hover:bg-muted'
                  }`}
                  aria-pressed={activeAdvisor === index}
                  onClick={() => handleAdvisorChange(index)}
                >
                  <Avatar className="h-14 w-14 border-2 border-border flex-shrink-0">
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
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden space-component-sm">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {advisors.map((adv, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-auto">
                    <Button
                      variant="subtle"
                      size="none"
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-150 flex flex-col items-center gap-unified-xs min-w-[120px] ${
                        activeAdvisor === index 
                          ? 'bg-accent/10 border border-accent/20 shadow-sm' 
                          : 'hover:bg-muted'
                      }`}
                      aria-pressed={activeAdvisor === index}
                      onClick={() => handleAdvisorChange(index)}
                    >
                      <Avatar className="h-16 w-16 border-2 border-border">
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
                        <p className="font-medium text-foreground text-sm">{adv.name.split(' ')[0]}</p>
                      </div>
                    </Button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
          
          {/* Advisor Details */}
          <div className="col-span-1 lg:col-span-2">
            <PremiumCard 
              variant="advisor" 
              size="lg" 
              className={`lg:p-8 transition-all duration-150 ring-1 ring-border/30 hover:ring-accent/30 hover:shadow-lg ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}
            >
              {/* Header with Name, Title, and Specialties */}
              <div className="space-component-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="heading-sm text-foreground mb-1">
                      {advisor.name}
                    </h3>
                    <p className="text-primary font-medium text-base">
                      {advisor.title}
                    </p>
                  </div>
                  <div className="flex gap-unified-xs">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateAdvisor('prev')}
                      className="h-8 w-8"
                      aria-label="Previous advisor"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigateAdvisor('next')}
                      className="h-8 w-8"
                      aria-label="Next advisor"
                    >
                      <ChevronRight className="h-4 w-4" />
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
                onMouseEnter={preloadMeetingScheduler}
                onFocus={preloadMeetingScheduler}
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
                      <ul className="space-component-xs">
                        {advisor.credentials.education.map((edu, index) => (
                          <li key={index} className="text-body-sm text-muted-foreground flex items-start gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{edu}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {advisor.credentials.certifications && advisor.credentials.certifications.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-primary">Certifications</h5>
                      <ul className="space-component-xs">
                        {advisor.credentials.certifications.map((cert, index) => (
                          <li key={index} className="text-body-sm text-muted-foreground flex items-start gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {advisor.credentials.experience && advisor.credentials.experience.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-primary">Experience</h5>
                      <ul className="space-component-xs">
                        {advisor.credentials.experience.map((exp, index) => (
                          <li key={index} className="text-body-sm text-muted-foreground flex items-start gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-accent/10 rounded-lg">
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
