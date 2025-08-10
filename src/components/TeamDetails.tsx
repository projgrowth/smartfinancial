
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface AdvisorData {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  specialty: string[];
  education: string[];
  certifications: string[];
  experience: string[];
  approach: string;
}

const TeamDetails = () => {
  const [activeAdvisor, setActiveAdvisor] = useState(0);
  
  const advisors: AdvisorData[] = [
    {
      name: "Razell Smart",
      title: "Founder & Lead Advisor",
      bio: "Razell founded Smart Financial Planning with one mission: to provide high-level, personalized planning for individuals and families who want more than a cookie-cutter approach.\n\nWith years of experience guiding business owners, professionals, and high-income earners, Razell's strategies balance growth, protection, and long-term impact.\n\nOutside of work, he's a devoted husband and father, a lifelong student of leadership, and a strong believer that financial planning should feel empowering—not overwhelming.",
      imageUrl: "/lovable-uploads/83c79661-f83a-4390-a3ed-d2cbea760fab.png",
      specialty: ["Comprehensive Financial Planning", "Business Owner Solutions", "High-Income Strategies", "Leadership Development", "Personalized Wealth Management"],
      education: [
        "Financial Services Professional Training"
      ],
      certifications: [
        "Licensed Financial Professional"
      ],
      experience: [
        "Founded Smart Financial Planning to serve Lake Nona and Orlando professionals",
        "Specialized expertise in high-income earner strategies",
        "Extensive experience with business owner financial planning",
        "Leadership development and team building background"
      ],
      approach: "Razell believes financial planning should feel empowering, not overwhelming. His personalized approach ensures each client receives strategies tailored to their unique goals, balancing growth opportunities with protection and long-term wealth impact."
    },
    {
      name: "Vince Gallegos",
      title: "Client Services / Associate Wealth Advisor",
      bio: "Vince has been helping clients pursue their financial goals since 2021, with a focus on business owners and the unique challenges they face.\n\nHis calm, service-first approach helps clients feel confident and supported at every step.\n\nVince is a proud husband and father—married to his wife Kirsten and raising their energetic daughter, Georgia. Away from the office, he's most likely on the golf course, watching football, or listening to music—always with coffee in hand.",
      imageUrl: "/lovable-uploads/9a1a6d90-cf14-4f3e-a92d-2ac3bb515025.png",
      specialty: ["Business Owner Planning", "Client Relations", "Goal-Based Planning", "Service Excellence", "Family Financial Planning"],
      education: [
        "Financial Services Training"
      ],
      certifications: [
        "Licensed Financial Professional"
      ],
      experience: [
        "5+ years helping Central Florida clients pursue financial goals",
        "Specialized focus on business owner financial challenges",
        "Expert in client relationship management and service delivery",
        "Goal-based planning methodology specialist"
      ],
      approach: "Vince's calm, service-first approach ensures clients feel confident and supported at every step of their financial journey. He specializes in translating complex financial concepts into clear, actionable strategies that business owners can implement with confidence."
    },
    {
      name: "Kelvin Mobley",
      title: "Wealth & Asset Protection Specialist",
      bio: "Kelvin brings a grounded, entrepreneurial perspective to financial protection and wealth-building.\n\nWith deep experience in asset protection, he helps clients shield their legacy and maximize peace of mind. His approach is practical, proactive, and deeply personalized.\n\nOff the clock, Kelvin is a proud father, lifelong football fan, and golfer who believes that structure creates freedom—financially and personally.",
      imageUrl: "/lovable-uploads/c90c6dda-53e6-45f2-8b9b-d36329401aa9.png",
      specialty: ["Asset Protection", "Legacy Planning", "Wealth Preservation", "Entrepreneurial Finance", "Risk Management"],
      education: [
        "Financial Services Training"
      ],
      certifications: [
        "Licensed Financial Professional"
      ],
      experience: [
        "Extensive background in asset protection strategies",
        "Specialized expertise in legacy and estate planning",
        "Entrepreneur-focused wealth preservation techniques",
        "Risk management and insurance planning specialist"
      ],
      approach: "Kelvin's practical, proactive approach to asset protection helps clients shield their legacy while maximizing peace of mind. He believes that proper financial structure creates freedom, both personally and professionally, allowing clients to focus on what matters most."
    }
  ];

  return (
    <section id="team-details" className="section bg-white relative overflow-hidden py-16 md:py-24">
      <GradientAccent variant="subtle" position="bottom-right" intensity="low" />
      
      <div className="container-unified relative z-10">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-charcoal text-center mb-3 md:mb-4">
            Meet Our Expert Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-12 md:mb-16 text-base md:text-lg leading-relaxed px-4">
            Our Orlando and Lake Nona advisors bring decades of combined experience and specialized expertise to help you achieve your financial goals.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 max-w-6xl mx-auto">
          <div className="col-span-1 mb-8 lg:mb-0">
            <div className="space-y-3 md:space-y-4">
              {advisors.map((advisor, index) => (
                <div 
                  key={index}
                  className={`p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-3 md:gap-4 ${
                    activeAdvisor === index 
                      ? 'bg-blue-50 border border-blue-100 shadow-sm' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setActiveAdvisor(index)}
                >
                  <Avatar className="h-12 w-12 md:h-14 md:w-14 border-2 border-blue-100 flex-shrink-0">
                    <AvatarImage 
                      src={advisor.imageUrl} 
                      alt={`${advisor.name}, ${advisor.title}`}
                      width={56}
                      height={56}
                      style={{ objectPosition: advisor.imageUrl.includes('83c79661') ? 'center 20%' : 
                                              advisor.imageUrl.includes('c90c6dda') ? 'center 30%' : 
                                              'center 25%' }}
                    />
                    <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-charcoal text-sm md:text-base truncate">{advisor.name}</h3>
                    <p className="text-xs md:text-sm text-blue-500 leading-tight">{advisor.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 md:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative w-32 h-32 md:w-40 lg:w-48 md:h-40 lg:h-48 mb-4 overflow-hidden rounded-full border-4 border-blue-100 shadow-sm">
                    <img 
                      src={advisors[activeAdvisor].imageUrl} 
                      alt={`${advisors[activeAdvisor].name}, ${advisors[activeAdvisor].title} at Smart Financial Planning Orlando`}
                      className="object-cover object-center w-full h-full"
                      loading="lazy"
                      decoding="async"
                      width={192}
                      height={192}
                      style={{ objectPosition: advisors[activeAdvisor].imageUrl.includes('83c79661') ? 'center 20%' : 
                                              advisors[activeAdvisor].imageUrl.includes('c90c6dda') ? 'center 30%' : 
                                              'center 25%' }}
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-charcoal text-center">
                    {advisors[activeAdvisor].name}
                  </h3>
                  <p className="text-blue-500 font-medium text-center text-sm md:text-base">
                    {advisors[activeAdvisor].title}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {advisors[activeAdvisor].specialty.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 hover:bg-blue-100 text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="text-charcoal/80 mb-4 md:mb-6 space-y-2 md:space-y-3 text-sm md:text-base">
                    {advisors[activeAdvisor].bio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  
                  <p className="text-charcoal/80 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                    {advisors[activeAdvisor].approach}
                  </p>
                  
                  <Button 
                    onClick={() => {
                      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                    }}
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
                    {advisors[activeAdvisor].experience.map((exp, index) => (
                      <li key={index} className="text-charcoal/80 flex items-start text-sm md:text-base">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="education" className="p-3 md:p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].education.map((edu, index) => (
                      <li key={index} className="text-charcoal/80 flex items-start text-sm md:text-base">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="certifications" className="p-3 md:p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].certifications.map((cert, index) => (
                      <li key={index} className="text-charcoal/80 flex items-start text-sm md:text-base">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{cert}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs md:text-sm text-blue-700">
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
