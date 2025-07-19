import React, { useState } from 'react';
import { PremiumCard, PremiumCardContent, PremiumCardHeader, PremiumCardTitle } from "@/components/ui/premium-card";
import { Briefcase, Users, ChartBar, DollarSign, ArrowRight, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const CaseStudies = () => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  const youngProfessionalData = [
    { name: 'Year 1', debt: 55000, savings: 10000, investmentGrowth: 3000 },
    { name: 'Year 2', debt: 38000, savings: 22000, investmentGrowth: 7000 },
    { name: 'Year 3', debt: 15000, savings: 38000, investmentGrowth: 12000 },
    { name: 'Year 4', debt: 0, savings: 52000, investmentGrowth: 18000 },
  ];

  const familyData = [
    { name: '2024', college: 10000, retirement: 120000 },
    { name: '2026', college: 25000, retirement: 160000 },
    { name: '2028', college: 45000, retirement: 210000 },
    { name: '2030', college: 70000, retirement: 280000 },
  ];

  const businessData = [
    { name: '2024', businessValue: 500000, personalAssets: 200000 },
    { name: '2026', businessValue: 700000, personalAssets: 300000 },
    { name: '2028', businessValue: 950000, personalAssets: 450000 },
    { name: '2030', businessValue: 1250000, personalAssets: 600000 },
  ];

  const preRetirementData = [
    { name: '2024', currentIncome: 185000, retirementIncome: 0 },
    { name: '2026', currentIncome: 210000, retirementIncome: 0 },
    { name: '2028', currentIncome: 225000, retirementIncome: 70000 },
    { name: '2030', currentIncome: 0, retirementIncome: 145000 },
  ];

  const caseStudies = [
    {
      id: 'young-professional',
      title: 'Young Professional',
      name: 'Alex, 32',
      description: 'Tech industry professional balancing student loans with early career wealth building',
      challenge: 'Alex came to us with $55,000 in student loan debt while trying to save for retirement and a future home purchase. With a good salary but living in a high-cost area, they felt stuck in a cycle of minimal progress.',
      approach: [
        'We developed a two-phase debt repayment strategy that prioritized high-interest loans first',
        'Created an automated savings system that balanced retirement contributions with debt paydown',
        'Implemented tax-advantaged investment strategies to maximize employer matching and growth',
        'Designed a realistic timeline for home purchase with specific savings targets'
      ],
      solution: 'Comprehensive debt elimination plan paired with strategic investment approach leveraging workplace benefits',
      result: 'Alex is now on track to be debt-free within 3 years while simultaneously building both retirement savings and a home down payment fund',
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      keyMetrics: [
        { label: 'Debt Reduction', value: '$55,000 → $0', icon: <TrendingUp className="w-4 h-4 text-primary" /> },
        { label: 'Retirement Assets', value: '$10,000 → $52,000', icon: <TrendingUp className="w-4 h-4 text-primary" /> },
        { label: 'Investment Growth', value: '12% annualized', icon: <TrendingUp className="w-4 h-4 text-green-500" /> }
      ],
      chartComponent: (
        <ChartContainer config={{}} className="h-64 mt-4">
          <BarChart data={youngProfessionalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="debt" fill="#f87171" name="Remaining Debt" />
            <Bar dataKey="savings" fill="#60a5fa" name="Savings" />
            <Bar dataKey="investmentGrowth" fill="#34d399" name="Investment Growth" />
          </BarChart>
        </ChartContainer>
      ),
      lessons: "The key insight from Alex's case is that with proper sequencing of financial priorities and automated systems, you can work toward multiple goals simultaneously without feeling overwhelmed."
    },
    {
      id: 'family-planner',
      title: 'Growing Family',
      name: 'The Johnsons',
      description: 'Dual-income household with young children planning for education and retirement',
      challenge: 'The Johnson family approached us with two children ages 5 and 7, concerned about balancing college savings for both kids while maintaining their retirement timeline and current lifestyle.',
      approach: [
        'Analyzed 529 plan options across multiple states to find optimal tax benefits',
        'Created separate investment allocations for each child based on time horizon',
        'Restructured retirement contributions to maximize tax efficiency',
        'Implemented family budget with automated investment flows'
      ],
      solution: 'Age-specific education funding strategy alongside optimized retirement contributions with tax-advantaged accounts',
      result: 'Both college funds are growing steadily while the Johnsons maintain their retirement trajectory and current lifestyle needs',
      icon: <Users className="w-8 h-8 text-primary" />,
      keyMetrics: [
        { label: 'College Savings', value: '$10,000 → $70,000', icon: <TrendingUp className="w-4 h-4 text-primary" /> },
        { label: 'Retirement Assets', value: '$120,000 → $280,000', icon: <TrendingUp className="w-4 h-4 text-primary" /> },
        { label: 'Education Funding', value: '85% funded', icon: <CheckCircle className="w-4 h-4 text-green-500" /> }
      ],
      chartComponent: (
        <ChartContainer config={{}} className="h-64 mt-4">
          <LineChart data={familyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="college" stroke="#60a5fa" name="College Fund" />
            <Line type="monotone" dataKey="retirement" stroke="#34d399" name="Retirement Assets" />
          </LineChart>
        </ChartContainer>
      ),
      lessons: "The Johnson case demonstrates the importance of starting education funding early and treating it as distinct from retirement planning, with each goal having its own strategy and timeline."
    },
    {
      id: 'business-owner',
      title: 'Business Owner',
      name: 'Sarah, 45',
      description: 'Entrepreneur managing business growth alongside personal financial planning',
      challenge: 'Sarah had successfully grown her business but had most of her net worth tied up in it, with minimal personal savings and no clear exit strategy for eventual retirement.',
      approach: [
        'Created business valuation framework with quarterly updates',
        'Developed compensation structure to balance business and personal finances',
        'Implemented retirement plan specific to business owners',
        'Designed 5-year exit strategy with value milestones'
      ],
      solution: 'Integrated business valuation and retirement plan with tax-optimized investment approach and entity structure review',
      result: 'Business value is growing with a clear exit timeline and personal wealth accumulation plan separate from business assets',
      icon: <ChartBar className="w-8 h-8 text-primary" />,
      keyMetrics: [
        { label: 'Business Value', value: '$500,000 → $1.25M', icon: <TrendingUp className="w-4 h-4 text-green-500" /> },
        { label: 'Personal Assets', value: '$200,000 → $600,000', icon: <TrendingUp className="w-4 h-4 text-primary" /> },
        { label: 'Exit Plan Readiness', value: '70% complete', icon: <CheckCircle className="w-4 h-4 text-primary" /> }
      ],
      chartComponent: (
        <ChartContainer config={{}} className="h-64 mt-4">
          <BarChart data={businessData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="businessValue" fill="#60a5fa" name="Business Value" />
            <Bar dataKey="personalAssets" fill="#34d399" name="Personal Assets" />
          </BarChart>
        </ChartContainer>
      ),
      lessons: "Sarah's case illustrates how business owners need to intentionally separate business and personal finances, treating the business as an asset class with its own growth and exit strategy."
    },
    {
      id: 'pre-retiree',
      title: 'Pre-Retiree',
      name: 'Michael, 58',
      description: 'Executive approaching retirement with complex compensation and estate planning needs',
      challenge: 'Michael had a complex compensation package including stock options, deferred compensation, and multiple retirement accounts, but no clear strategy for transitioning to retirement income.',
      approach: [
        'Analyzed pension options with multiple scenarios',
        'Created stock option exercise schedule to minimize tax impact',
        'Developed estate plan integrating charitable goals',
        'Designed retirement income strategy with tax-efficient withdrawal sequence'
      ],
      solution: 'Comprehensive retirement income plan with estate planning and tax-efficient withdrawal strategy across multiple account types',
      result: 'Michael is now on track for retirement in 4 years with an optimized income stream and legacy plans in place',
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      keyMetrics: [
        { label: 'Retirement Gap', value: '$750,000 → $0', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
        { label: 'Retirement Income', value: '$145,000/year', icon: <CheckCircle className="w-4 h-4 text-primary" /> },
        { label: 'Tax Savings', value: '$87,000 over 5 years', icon: <TrendingUp className="w-4 h-4 text-green-500" /> }
      ],
      chartComponent: (
        <ChartContainer config={{}} className="h-64 mt-4">
          <BarChart data={preRetirementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="currentIncome" fill="#60a5fa" name="Current Income" />
            <Bar dataKey="retirementIncome" fill="#34d399" name="Retirement Income" />
          </BarChart>
        </ChartContainer>
      ),
      lessons: "Michael's situation highlights the importance of having a clear retirement income plan with specific account withdrawal strategies to minimize taxes and maximize income stability."
    }
  ];

  return (
    <section id="case-studies" className="section-premium bg-gradient-to-br from-accent/5 to-background relative overflow-hidden">
      <GradientAccent variant="blue" position="bottom-right" intensity="low" />
      
      <div className="container-premium relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="heading-lg text-foreground mb-6">
              How We've Helped Clients Like You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our tailored financial strategies have helped professionals at all stages achieve their goals. 
              Explore real scenarios to see how our approach might work for your situation.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="space-premium-lg">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={study.id} delay={index * 100}>
              <PremiumCard 
                variant={expandedCase === study.id ? "premium" : "elevated"}
                size="lg"
                className="overflow-hidden transition-all duration-500"
              >
                <PremiumCardHeader 
                  className={`cursor-pointer transition-colors duration-300 ${
                    expandedCase === study.id ? 'bg-accent/10' : 'bg-background/90'
                  }`}
                  onClick={() => toggleCase(study.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-premium-sm">
                      <div className="bg-accent/20 p-3 rounded-xl">
                        {study.icon}
                      </div>
                      <div>
                        <PremiumCardTitle className="mb-1">
                          {study.title}
                        </PremiumCardTitle>
                        <p className="text-sm text-muted-foreground">{study.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-premium-xs">
                      <span className="text-sm text-primary font-medium hidden md:block">
                        {expandedCase === study.id ? 'Hide Details' : 'View Case Study'}
                      </span>
                      <ArrowRight className={`w-5 h-5 text-primary transition-transform duration-300 ${
                        expandedCase === study.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 leading-relaxed">{study.description}</p>
                </PremiumCardHeader>

                {expandedCase === study.id && (
                  <PremiumCardContent className="bg-background border-t border-border/50 p-premium-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-premium-lg">
                      <div className="lg:col-span-3 space-premium-md">
                        <Accordion type="single" collapsible defaultValue="challenge">
                          <AccordionItem value="challenge" className="border-border/30">
                            <AccordionTrigger className="py-4 text-foreground font-medium hover:no-underline">
                              <div className="flex items-center">
                                <AlertCircle className="w-5 h-5 mr-3 text-primary" />
                                Challenge
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="py-4 text-muted-foreground leading-relaxed">
                              {study.challenge}
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="approach" className="border-border/30">
                            <AccordionTrigger className="py-4 text-foreground font-medium hover:no-underline">
                              <div className="flex items-center">
                                <ChartBar className="w-5 h-5 mr-3 text-primary" />
                                Our Approach
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="py-4 text-muted-foreground">
                              <ul className="space-y-3 list-disc pl-6">
                                {study.approach.map((item, i) => (
                                  <li key={i} className="leading-relaxed">{item}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="result" className="border-border/30">
                            <AccordionTrigger className="py-4 text-foreground font-medium hover:no-underline">
                              <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                                Results
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="py-4 text-muted-foreground">
                              <p className="mb-6 leading-relaxed">{study.result}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-premium-sm">
                                {study.keyMetrics.map((metric, i) => (
                                  <div key={i} className="bg-accent/10 p-premium-sm rounded-lg">
                                    <div className="flex items-center mb-2">
                                      {metric.icon}
                                      <span className="text-sm font-medium ml-2 text-muted-foreground">{metric.label}</span>
                                    </div>
                                    <p className="text-lg font-medium text-foreground">{metric.value}</p>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="lessons" className="border-border/30">
                            <AccordionTrigger className="py-4 text-foreground font-medium hover:no-underline">
                              <div className="flex items-center">
                                <Briefcase className="w-5 h-5 mr-3 text-primary" />
                                Key Insights
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="py-4 text-muted-foreground leading-relaxed">
                              {study.lessons}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                      
                      <div className="lg:col-span-2 bg-accent/5 p-premium-md rounded-xl">
                        <h4 className="font-medium text-foreground mb-4">Financial Progress</h4>
                        {study.chartComponent}
                        <p className="mt-4 text-xs text-muted-foreground text-center">
                          Projected growth based on implemented strategies
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-premium-lg text-center">
                      <button
                        onClick={() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors focus-premium"
                      >
                        See if we're a good fit for your situation
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </PremiumCardContent>
                )}
              </PremiumCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
