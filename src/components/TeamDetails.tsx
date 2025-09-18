
import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { advisors as teamAdvisors } from '@/data/team';
import { getHeadshotPosition, generateTeamAltText } from '@/utils/imageOptimization';
import { smoothScrollTo } from '@/utils/smoothScroll';


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
  useEffect(() => {
    const onHashChange = () => setActiveAdvisor(getIndexFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  

  return (
    <section id="team-details" className="section bg-background relative overflow-hidden">
      <GradientAccent variant="subtle" position="bottom-right" intensity="low" />
      
      <div className="container-site relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-center space-component-sm text-foreground">
            Meet Our Expert Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground container-narrow mx-auto space-component-lg text-body-lg leading-relaxed">
            Our Orlando and Lake Nona advisors bring decades of combined experience and specialized expertise to help you achieve your financial goals.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 card-gap-lg container-wide mx-auto">
          <div className="col-span-1 space-component-lg lg:mb-0">
            <div className="space-component-sm">
              {advisors.map((advisor, index) => (
                <Button asChild key={index} variant="subtle" size="none" className={`space-component-sm w-full text-left rounded-lg cursor-pointer transition-all duration-normal flex items-center card-gap-md ${
                    activeAdvisor === index 
                      ? 'bg-accent/10 border border-accent/20 shadow-design-sm' 
                      : 'hover:bg-muted'
                  }`}>
                  <button 
                    type="button"
                    aria-pressed={activeAdvisor === index}
                    onClick={() => {
                      setActiveAdvisor(index);
                      window.location.hash = `advisor=${advisors[index].slug}`;
                    }}
                  >
                    <Avatar className="icon-xxl border-2 border-border flex-shrink-0">
                      <AvatarImage 
                        src={advisor.imageUrl} 
                        alt={generateTeamAltText(advisor.name, advisor.title)}
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        sizes="56px"
                        style={{ objectPosition: getHeadshotPosition(advisor.imageUrl) }}
                      />
                      <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-foreground text-body truncate">{advisor.name}</h3>
                      <p className="text-body-sm text-primary leading-tight">{advisor.title}</p>
                    </div>
                  </button>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-card rounded-xl shadow-design-sm border border-border space-component-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 card-gap-md space-component-md">
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative w-32 h-32 lg:w-48 lg:h-48 space-component-sm overflow-hidden rounded-full border-4 border-accent/20 shadow-design-sm">
                    <img 
                      src={advisors[activeAdvisor].imageUrl} 
                      alt={generateTeamAltText(advisors[activeAdvisor].name, advisors[activeAdvisor].title)}
                      className="object-cover object-center w-full h-full"
                      loading="lazy"
                      decoding="async"
                      width={192}
                      height={192}
                      sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, 128px"
                      style={{ objectPosition: getHeadshotPosition(advisors[activeAdvisor].imageUrl) }}
                    />
                  </div>
                  <h3 className="heading-md font-medium text-foreground text-center">
                    {advisors[activeAdvisor].name}
                  </h3>
                  <p className="text-primary font-medium text-center text-body-sm">
                    {advisors[activeAdvisor].title}
                  </p>
                  <div className="flex flex-wrap justify-center card-gap-sm content-item">
                    {advisors[activeAdvisor].specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-accent/10 text-body-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="text-muted-foreground content-item space-component-sm text-body-sm">
                    {advisors[activeAdvisor].bio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground content-item text-body-sm leading-relaxed">
                    {advisors[activeAdvisor].approach}
                  </p>
                  
                  <Button 
                    onClick={() => smoothScrollTo('schedule')}
                    className="group text-body-sm touch-target"
                  >
                    Schedule a Consultation
                    <ArrowRight className="card-gap-sm icon-sm transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="experience" className="w-full content-item">
                <TabsList className="grid w-full grid-cols-3 text-body-xs">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="experience" className="card-padding-sm">
                  <ul className="space-component-sm">
                    {advisors[activeAdvisor].experience?.map((exp, index) => (
                      <li key={index} className="text-muted-foreground flex items-start text-body-sm">
                        <div className="h-2 w-2 rounded-full bg-primary content-item card-gap-sm flex-shrink-0"></div>
                        <span className="leading-relaxed">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="education" className="card-padding-sm">
                  <ul className="space-component-sm">
                    {advisors[activeAdvisor].education?.map((edu, index) => (
                      <li key={index} className="text-muted-foreground flex items-start text-body-sm">
                        <div className="h-2 w-2 rounded-full bg-primary content-item card-gap-sm flex-shrink-0"></div>
                        <span className="leading-relaxed">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="certifications" className="card-padding-sm">
                  <ul className="space-component-sm">
                    {advisors[activeAdvisor].certifications?.map((cert, index) => (
                      <li key={index} className="text-muted-foreground flex items-start text-body-sm">
                        <div className="h-2 w-2 rounded-full bg-primary content-item card-gap-sm flex-shrink-0"></div>
                        <span className="leading-relaxed">{cert}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="content-item card-padding-sm bg-accent/10 rounded-lg">
                    <p className="text-body-xs text-primary">
                      <span className="font-medium">Professional Credentials:</span> Our team maintains the highest industry standards through continuing education and professional certification requirements.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDetails;
