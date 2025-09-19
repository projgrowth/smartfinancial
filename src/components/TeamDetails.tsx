
import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PremiumCard } from '@/components/ui/premium-card';
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
      
      <div className="container-unified relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-center mb-3 md:mb-4 text-foreground">
            Meet Our Expert Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
            Our Orlando and Lake Nona advisors bring decades of combined experience and specialized expertise to help you achieve your financial goals.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 max-w-6xl mx-auto">
          <div className="col-span-1 mb-8 lg:mb-0">
            <div className="space-y-3 md:space-y-4">
              {advisors.map((advisor, index) => (
                <Button asChild key={index} variant="subtle" size="none" className={`p-3 md:p-4 w-full text-left rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3 md:gap-4 ${
                    activeAdvisor === index 
                      ? 'bg-accent/10 border border-accent/20 shadow-sm' 
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
                    <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-border flex-shrink-0">
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
                      <h3 className="font-medium text-foreground text-sm md:text-base truncate">{advisor.name}</h3>
                      <p className="text-xs md:text-sm text-primary leading-tight">{advisor.title}</p>
                    </div>
                  </button>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <PremiumCard variant="advisor" size="lg" className="lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative w-32 h-32 md:w-40 lg:w-48 md:h-40 lg:h-48 mb-4 overflow-hidden rounded-full border-4 border-accent/20 shadow-sm">
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
                  <h3 className="text-lg md:text-xl font-medium text-foreground text-center">
                    {advisors[activeAdvisor].name}
                  </h3>
                  <p className="text-primary font-medium text-center text-sm md:text-base">
                    {advisors[activeAdvisor].title}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {advisors[activeAdvisor].specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-accent/10 text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="text-muted-foreground mb-4 md:mb-6 space-y-2 md:space-y-3 text-sm md:text-base">
                    {advisors[activeAdvisor].bio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                    {advisors[activeAdvisor].approach}
                  </p>
                  
                  <Button 
                    onClick={() => smoothScrollTo('schedule')}
                    className="group text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
                  >
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="experience" className="w-full mt-4 md:mt-6">
                <TabsList className="grid w-full grid-cols-3 text-xs md:text-sm">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="experience" className="p-3 md:p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].experience?.map((exp, index) => (
                      <li key={index} className="text-muted-foreground flex items-start text-sm md:text-base">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="education" className="p-3 md:p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].education?.map((edu, index) => (
                      <li key={index} className="text-muted-foreground flex items-start text-sm md:text-base">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="certifications" className="p-3 md:p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].certifications?.map((cert, index) => (
                      <li key={index} className="text-muted-foreground flex items-start text-sm md:text-base">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{cert}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                    <p className="text-xs md:text-sm text-primary">
                      <span className="font-medium">Professional Credentials:</span> Our team maintains the highest industry standards through continuing education and professional certification requirements.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </PremiumCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDetails;
