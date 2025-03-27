
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { InteractiveTooltip } from './ui/interactive-tooltip';

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
      title: "Founder & CEO",
      bio: "With a disciplined approach honed by 13 years in the Armed Forces, Razell specializes in delivering innovative, strategic financial solutions to high-achieving entrepreneurs and professionals. Razell's expertise lies in asset protection, growth optimization, and personalized financial strategy.",
      imageUrl: "/lovable-uploads/8b9ec04f-64ac-49d5-9530-f05fcf4c6240.png",
      specialty: ["Business Owner Planning", "Wealth Optimization", "Tax Strategies"],
      education: [
        "MBA, Finance, University of Florida",
        "BS, Business Administration, Florida State University"
      ],
      certifications: [
        "Certified Financial Planner (CFP®)",
        "Chartered Financial Analyst (CFA)"
      ],
      experience: [
        "13 years, United States Armed Forces, Leadership & Operations",
        "7 years, SmartWealth Financial, Senior Advisor",
        "5 years, Smart Financial Planning, Founder & CEO"
      ],
      approach: "Razell combines military precision with innovative financial strategies to help clients build resilient wealth. His disciplined approach emphasizes long-term growth while protecting assets from market volatility and unnecessary taxation."
    },
    {
      name: "Faith Paddon",
      title: "Associate",
      bio: "An accomplished professional with an integrated business degree from UCF, Faith is dedicated to demystifying complex financial strategies. Her approachable style ensures clarity, helping high-income professionals secure their financial futures with confidence and precision.",
      imageUrl: "/lovable-uploads/c87641e0-5dd7-4189-8b8d-25531f26619d.png",
      specialty: ["Retirement Planning", "Risk Management", "Estate Planning"],
      education: [
        "BBA, Integrated Business, University of Central Florida"
      ],
      certifications: [
        "Series 7 & 66 Licenses",
        "Life & Health Insurance Licensed"
      ],
      experience: [
        "4 years, Elite Financial Group, Financial Advisor",
        "3 years, Smart Financial Planning, Associate Advisor"
      ],
      approach: "Faith focuses on making complex financial concepts understandable and actionable. She believes that educated clients make better decisions, and works to ensure each client fully understands their financial plan and investment strategy."
    }
  ];

  return (
    <section id="team-details" className="section bg-white relative overflow-hidden py-24">
      <GradientAccent variant="subtle" position="bottom-right" intensity="low" />
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            Meet Our Expert Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-16">
            Our advisors bring decades of combined experience and specialized expertise to help you achieve your financial goals.
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12 max-w-6xl mx-auto">
          <div className="col-span-1 mb-8 md:mb-0">
            <div className="space-y-4">
              {advisors.map((advisor, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                    activeAdvisor === index 
                      ? 'bg-blue-50 border border-blue-100 shadow-sm' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setActiveAdvisor(index)}
                >
                  <Avatar className="h-14 w-14 border-2 border-blue-100">
                    <AvatarImage src={advisor.imageUrl} alt={advisor.name} />
                    <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-charcoal">{advisor.name}</h3>
                    <p className="text-sm text-blue-500">{advisor.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1 flex flex-col items-center">
                  <div className="relative w-40 h-40 md:w-48 md:h-48 mb-4 overflow-hidden rounded-full border-4 border-blue-100 shadow-sm">
                    <img 
                      src={advisors[activeAdvisor].imageUrl} 
                      alt={advisors[activeAdvisor].name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-medium text-charcoal text-center">
                    {advisors[activeAdvisor].name}
                  </h3>
                  <p className="text-blue-500 font-medium text-center">
                    {advisors[activeAdvisor].title}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {advisors[activeAdvisor].specialty.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 hover:bg-blue-100">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-charcoal/80 mb-6">
                    {advisors[activeAdvisor].bio}
                  </p>
                  
                  <p className="text-charcoal/80 mb-6">
                    {advisors[activeAdvisor].approach}
                  </p>
                  
                  <Button 
                    onClick={() => {
                      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group"
                  >
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="experience" className="w-full mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="experience" className="p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].experience.map((exp, index) => (
                      <li key={index} className="text-charcoal/80 flex items-start">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></div>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="education" className="p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].education.map((edu, index) => (
                      <li key={index} className="text-charcoal/80 flex items-start">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></div>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="certifications" className="p-4">
                  <ul className="space-y-2">
                    {advisors[activeAdvisor].certifications.map((cert, index) => (
                      <li key={index} className="text-charcoal/80 flex items-start">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></div>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      <InteractiveTooltip
                        trigger={<span className="font-medium cursor-help border-b border-dashed border-blue-400">What do these certifications mean?</span>}
                        content={
                          <div className="space-y-2 max-w-sm">
                            <p className="text-sm"><strong>CFP®</strong>: Certified Financial Planner - Professionals who have met extensive education, experience and ethics requirements to provide holistic financial planning.</p>
                            <p className="text-sm"><strong>CFA</strong>: Chartered Financial Analyst - Advanced credential focused on investment analysis, portfolio management, and broader financial industry knowledge.</p>
                            <p className="text-sm"><strong>Series 7 & 66</strong>: Licenses that permit financial advisors to sell securities and provide investment advice.</p>
                          </div>
                        }
                        interactive
                        title="Financial Certifications"
                        side="top"
                        maxWidth="md"
                      />
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
