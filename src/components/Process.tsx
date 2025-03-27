
import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import AnimatedSectionTransition from './AnimatedSectionTransition';
import { ChevronDown, ChevronUp, Lightbulb, Layers, CheckCheck, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { InteractiveTooltip } from '@/components/ui/interactive-tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScaleOnHover } from '@/components/ui/micro-animations';

const Process = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  
  const steps = [
    {
      id: "discovery",
      number: '01',
      title: 'Deep Discovery',
      description: 'We dive deep to understand your financial landscape, ambitions, and opportunities that others overlook.',
      icon: <Lightbulb className="w-6 h-6 text-blue-400" aria-hidden="true" />,
      details: [
        {
          title: 'Comprehensive Assessment',
          description: 'We analyze your entire financial situation including assets, liabilities, income, expenses, and tax situation.'
        },
        {
          title: 'Goal Mapping',
          description: 'We work with you to define clear, measurable financial goals and the timeframes to achieve them.'
        },
        {
          title: 'Risk Tolerance Evaluation',
          description: 'We determine your comfort level with financial risk through advanced assessment tools.'
        }
      ],
      keyTerms: [
        { term: 'Risk Tolerance', definition: 'Your comfort level with market fluctuations and potential losses.' },
        { term: 'Asset Allocation', definition: 'The strategic distribution of investments across different asset classes.' }
      ]
    },
    {
      id: "blueprint",
      number: '02',
      title: 'Bespoke Blueprint',
      description: 'Receive a custom-crafted financial strategy, from investments and tax optimization to advanced wealth protection.',
      icon: <Layers className="w-6 h-6 text-blue-400" aria-hidden="true" />,
      details: [
        {
          title: 'Custom Investment Strategy',
          description: 'We design an investment portfolio that aligns with your goals, timeline, and risk tolerance.'
        },
        {
          title: 'Tax Efficiency Planning',
          description: 'We implement strategies to minimize tax liability and maximize after-tax returns.'
        },
        {
          title: 'Estate & Legacy Planning',
          description: 'We help protect and transfer your wealth according to your wishes.'
        }
      ],
      keyTerms: [
        { term: 'Portfolio Diversification', definition: 'Spreading investments across various asset types to reduce risk.' },
        { term: 'Tax-Loss Harvesting', definition: 'Selling investments at a loss to offset capital gains tax liability.' }
      ]
    },
    {
      id: "growth",
      number: '03',
      title: 'Growth & Guidance',
      description: 'Benefit from ongoing strategic reviews, adjustments, and proactive insights as your life evolves.',
      icon: <CheckCheck className="w-6 h-6 text-blue-400" aria-hidden="true" />,
      details: [
        {
          title: 'Regular Portfolio Reviews',
          description: 'We continuously monitor your investments and rebalance as needed to stay aligned with your goals.'
        },
        {
          title: 'Life Transition Support',
          description: 'We provide guidance through major life events like career changes, retirement, or inheritance.'
        },
        {
          title: 'Proactive Opportunity Identification',
          description: 'We alert you to new investment opportunities or tax-saving strategies as they emerge.'
        }
      ],
      keyTerms: [
        { term: 'Portfolio Rebalancing', definition: 'Periodically buying and selling assets to maintain your desired level of asset allocation.' },
        { term: 'Dollar-Cost Averaging', definition: 'Investing a fixed amount regularly, regardless of market prices, to reduce the impact of volatility.' }
      ]
    }
  ];

  const handleStepClick = (id: string) => {
    setActiveStep(activeStep === id ? null : id);
  };

  return (
    <>
      {/* Add the section transition at the top */}
      <AnimatedSectionTransition 
        style="wave" 
        colorScheme="white-to-blue" 
        position="top" 
        height={50}
      />
      
      <section id="process" className="section bg-charcoal text-white relative overflow-hidden py-24" aria-labelledby="process-heading">
        {/* Modern background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal/90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Gradient accents */}
        <GradientAccent variant="blue" position="top-right" intensity="low" size="xl" />
        <GradientAccent variant="dark" position="bottom-left" intensity="medium" size="lg" />
        
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <h2 id="process-heading" className="heading-lg text-center mb-6 text-white">Our Process</h2>
            <p className="text-center text-light-gray max-w-2xl mx-auto mb-16">
              Our three-step approach is designed to create clarity, confidence, and continuous growth in your financial journey.
            </p>
          </ScrollReveal>

          <Tabs defaultValue="cards" className="w-full mb-10">
            <TabsList className="w-full max-w-md mx-auto mb-8 bg-charcoal/40 border border-white/10" aria-label="Process view options">
              <TabsTrigger value="cards" className="flex-1 data-[state=active]:bg-blue-500/20">Visual Overview</TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1 data-[state=active]:bg-blue-500/20">Timeline View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                {steps.map((step) => (
                  <ScrollReveal key={step.id} delay={steps.indexOf(step) * 150}>
                    <div 
                      className={`glass-dark hover:bg-charcoal/40 transition-all duration-500 p-8 rounded-lg h-full border border-white/10 group ${activeStep === step.id ? 'bg-charcoal/40 border-blue-400/30' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-blue-400 text-4xl font-heading font-medium opacity-80 block group-hover:text-blue-300 transition-colors duration-300">
                          {step.number}
                        </span>
                        {step.icon}
                      </div>
                      
                      <h3 className="text-xl font-heading font-medium mb-4 text-white flex items-center">
                        {step.title}
                        {step.keyTerms.length > 0 && (
                          <InteractiveTooltip
                            trigger={
                              <button className="ml-2 text-blue-400 cursor-pointer text-xs border border-blue-400/30 px-1 rounded hover:bg-blue-400/10 flex items-center" aria-label={`Learn more about ${step.title}`}>
                                <span className="sr-only">Learn about key terms</span>
                                <Info className="w-3 h-3 mr-1" />
                                <span>Learn</span>
                              </button>
                            }
                            content={
                              <div className="space-y-2">
                                <h4 className="font-medium text-sm mb-1">Key Financial Concepts:</h4>
                                {step.keyTerms.map((term, idx) => (
                                  <div key={idx} className="mb-2">
                                    <h5 className="text-sm font-medium">{term.term}</h5>
                                    <p className="text-xs text-charcoal/70">{term.definition}</p>
                                  </div>
                                ))}
                              </div>
                            }
                            interactive
                            side="top"
                            variant="info"
                            maxWidth="sm"
                          />
                        )}
                      </h3>
                      
                      <p className="text-lightgray group-hover:text-white/90 transition-colors duration-300 mb-4">
                        {step.description}
                      </p>
                      
                      <Collapsible 
                        open={activeStep === step.id} 
                        onOpenChange={() => handleStepClick(step.id)}
                      >
                        <CollapsibleTrigger className="flex items-center text-sm text-blue-300 hover:text-blue-200 transition-colors duration-300" aria-expanded={activeStep === step.id}>
                          {activeStep === step.id ? (
                            <>
                              <span>Show less</span>
                              <ChevronUp className="ml-1 h-4 w-4" aria-hidden="true" />
                            </>
                          ) : (
                            <>
                              <span>Learn more</span>
                              <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                            </>
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-3 border-t border-white/10 pt-3">
                          {step.details.map((detail, idx) => (
                            <ScaleOnHover key={idx} scale="sm" className="bg-charcoal/30 p-3 rounded-md hover:bg-charcoal/50">
                              <h4 className="text-sm font-medium text-blue-200 mb-1">{detail.title}</h4>
                              <p className="text-xs text-lightgray">{detail.description}</p>
                            </ScaleOnHover>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              <div className="relative max-w-3xl mx-auto pl-6 border-l-2 border-blue-400/30 space-y-12">
                {steps.map((step, idx) => (
                  <ScrollReveal key={step.id} delay={idx * 150}>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-0 bg-charcoal p-1.5 rounded-full border-4 border-blue-400/30">
                        <div className="h-4 w-4 rounded-full bg-blue-400"></div>
                      </div>
                      <div className="bg-charcoal/20 border border-white/10 p-6 rounded-lg hover:bg-charcoal/30 transition-all">
                        <div className="flex items-center mb-3">
                          <span className="text-blue-400 text-3xl font-heading font-medium mr-3">{step.number}</span>
                          <h3 className="text-xl font-heading font-medium text-white">{step.title}</h3>
                        </div>
                        <p className="text-lightgray mb-4">{step.description}</p>
                        
                        <Collapsible 
                          open={activeStep === step.id} 
                          onOpenChange={() => handleStepClick(step.id)}
                        >
                          <CollapsibleTrigger className="flex items-center text-sm text-blue-300 hover:text-blue-200 transition-colors duration-300" aria-expanded={activeStep === step.id}>
                            {activeStep === step.id ? (
                              <>
                                <span>Show less</span>
                                <ChevronUp className="ml-1 h-4 w-4" aria-hidden="true" />
                              </>
                            ) : (
                              <>
                                <span>Learn more</span>
                                <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
                              </>
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4 space-y-3 border-t border-white/10 pt-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="bg-charcoal/30 p-3 rounded-md">
                                <h4 className="text-sm font-medium text-blue-200 mb-1">{detail.title}</h4>
                                <p className="text-xs text-lightgray">{detail.description}</p>
                              </div>
                            ))}
                            {step.keyTerms.length > 0 && (
                              <div className="bg-blue-500/10 p-3 rounded-md border border-blue-500/20">
                                <h4 className="text-sm font-medium text-blue-200 mb-2">Key Financial Concepts:</h4>
                                {step.keyTerms.map((term, idx) => (
                                  <div key={idx} className="mb-2 last:mb-0">
                                    <h5 className="text-sm font-medium text-white">{term.term}</h5>
                                    <p className="text-xs text-lightgray">{term.definition}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Add the section transition at the bottom */}
        <div className="relative z-10 mt-16">
          <AnimatedSectionTransition 
            style="curved" 
            colorScheme="dark-to-light" 
            position="bottom" 
            height={50}
            showIcon={true}
            iconType="chevron"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </section>
    </>
  );
};

export default Process;
