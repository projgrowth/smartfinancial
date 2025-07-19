
import React, { useState } from 'react';
import { Briefcase, Users, ChartBar, DollarSign, ArrowRight, Target, TrendingUp, Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import ClientStoryCard from './case-studies/ClientStoryCard';
import StoryTimeline from './case-studies/StoryTimeline';

const CaseStudies = () => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id);
  };

  // Chart data for each case study
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
      title: 'The Debt-to-Wealth Transformation',
      clientName: 'Alex, 32-year-old Tech Professional',
      situation: 'Alex felt trapped in a cycle of debt payments while watching colleagues build wealth. Despite earning a good salary in tech, $55k in student loans and high living costs in Orlando made progress feel impossible.',
      challenges: [
        'Overwhelming $55,000 student loan debt creating payment stress',
        'Living in high-cost Orlando area limiting savings capacity',
        'Confusion about prioritizing debt vs. retirement savings',
        'No clear strategy for future home ownership goals'
      ],
      outcomes: [
        'Completely eliminated all debt within 3 years using strategic paydown',
        'Built $52,000 in retirement savings while paying off loans',
        'Created automated systems requiring minimal ongoing management',
        'Established clear timeline and funding for home purchase'
      ],
      keyInsight: 'You don\'t have to choose between paying off debt and building wealth - with the right strategy and automation, you can make meaningful progress on both simultaneously.',
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      timeline: [
        {
          phase: 'Discovery & Planning',
          title: 'Debt Analysis & Strategy Design',
          description: 'We analyzed all debt types, interest rates, and cash flow to create a prioritized paydown strategy while maximizing employer retirement matching.',
          timeframe: 'Month 1-2',
          icon: <Target className="w-4 h-4 text-blue-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Implementation',
          title: 'Automated Wealth-Building System',
          description: 'Set up automated debt payments, retirement contributions, and home savings to remove decision fatigue and ensure consistent progress.',
          timeframe: 'Month 3-6',
          icon: <TrendingUp className="w-4 h-4 text-green-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Acceleration',
          title: 'Income Optimization & Debt Elimination',
          description: 'Leveraged salary increases and bonuses to accelerate debt payoff while maintaining retirement and home savings momentum.',
          timeframe: 'Year 1-3',
          icon: <Clock className="w-4 h-4 text-orange-500" />,
          status: 'completed' as const
        }
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
      )
    },
    {
      id: 'family-planner',
      title: 'Balancing Dreams and Reality',
      clientName: 'The Johnson Family (2 Kids, Dual Income)',
      situation: 'Parents of 5 and 7-year-olds feeling overwhelmed by competing financial priorities. They wanted to fund their children\'s education without sacrificing their own retirement, but felt like they were falling behind on both goals.',
      challenges: [
        'Confusion about optimal college savings strategies and vehicles',
        'Worry about balancing kids\' education with retirement security',
        'Overwhelm from managing multiple financial goals simultaneously',
        'Uncertainty about realistic funding targets for each child'
      ],
      outcomes: [
        'Built $70,000 across both children\'s 529 education accounts',
        'Increased retirement savings by 60% through tax optimization',
        'Created age-appropriate investment strategies for each child',
        'Maintained current lifestyle while funding future goals'
      ],
      keyInsight: 'Education and retirement planning don\'t have to compete - they can complement each other when you use the right accounts and timing strategies.',
      icon: <Users className="w-8 h-8 text-primary" />,
      timeline: [
        {
          phase: 'Goal Setting',
          title: 'Education Cost Planning',
          description: 'Calculated realistic college costs and created funding targets based on each child\'s age and projected education timeline.',
          timeframe: 'Month 1',
          icon: <Target className="w-4 h-4 text-blue-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Strategy Design',
          title: '529 Plan Optimization',
          description: 'Selected optimal 529 plans considering tax benefits, investment options, and flexibility for changing education needs.',
          timeframe: 'Month 2-3',
          icon: <TrendingUp className="w-4 h-4 text-green-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Integration',
          title: 'Retirement Synchronization',
          description: 'Restructured retirement contributions to maximize tax benefits while maintaining aggressive education funding.',
          timeframe: 'Ongoing',
          icon: <Clock className="w-4 h-4 text-orange-500" />,
          status: 'in-progress' as const
        }
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
      )
    },
    {
      id: 'business-owner',
      title: 'From Business-Dependent to Financially Free',
      clientName: 'Sarah, 45-year-old Business Owner',
      situation: 'Sarah had built a successful business but realized 90% of her net worth was tied up in it. She loved her work but wanted the security of diversified wealth and a clear path to eventual exit.',
      challenges: [
        'Overwhelming concentration of wealth in single business asset',
        'No clear exit strategy or business valuation framework',
        'Minimal personal savings outside of business operations',
        'Uncertainty about tax implications of wealth diversification'
      ],
      outcomes: [
        'Grew business value from $500k to $1.25M with strategic improvements',
        'Built $600k in personal assets separate from business',
        'Developed comprehensive exit strategy with specific milestones',
        'Created tax-efficient compensation structure for wealth building'
      ],
      keyInsight: 'Business owners need intentional separation between business growth and personal wealth building - your business should fund your freedom, not trap you.',
      icon: <ChartBar className="w-8 h-8 text-primary" />,
      timeline: [
        {
          phase: 'Assessment',
          title: 'Business Valuation & Analysis',
          description: 'Established baseline business value and identified key growth levers while assessing personal financial needs.',
          timeframe: 'Month 1-2',
          icon: <Target className="w-4 h-4 text-blue-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Diversification',
          title: 'Personal Wealth Building',
          description: 'Restructured compensation to maximize personal savings while maintaining business growth capital.',
          timeframe: 'Year 1-2',
          icon: <TrendingUp className="w-4 h-4 text-green-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Exit Planning',
          title: 'Strategic Exit Preparation',
          description: 'Developing multi-year exit strategy with value milestones and transition planning for financial independence.',
          timeframe: 'Year 3-5',
          icon: <Clock className="w-4 h-4 text-orange-500" />,
          status: 'in-progress' as const
        }
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
      )
    },
    {
      id: 'pre-retiree',
      title: 'The Executive\'s Retirement Transition',
      clientName: 'Michael, 58-year-old Corporate Executive',
      situation: 'After decades of climbing the corporate ladder, Michael had accumulated significant assets but felt overwhelmed by the complexity of transitioning from earning to spending mode.',
      challenges: [
        'Complex compensation with stock options and deferred benefits',
        'Multiple retirement accounts requiring coordination',
        'Uncertainty about sustainable retirement withdrawal rates',
        'Estate planning needs for wealth transfer and legacy goals'
      ],
      outcomes: [
        'Eliminated $750k retirement funding gap through optimization',
        'Created $145k annual retirement income stream',
        'Saved $87k in taxes over 5 years through strategic planning',
        'Established comprehensive estate plan with charitable component'
      ],
      keyInsight: 'Pre-retirement is not about accumulating more - it\'s about orchestrating what you have into a reliable, tax-efficient income system.',
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      timeline: [
        {
          phase: 'Income Analysis',
          title: 'Retirement Income Planning',
          description: 'Analyzed all income sources including pension, 401k, stock options, and Social Security to create comprehensive income strategy.',
          timeframe: 'Month 1-3',
          icon: <Target className="w-4 h-4 text-blue-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Tax Optimization',
          title: 'Withdrawal Strategy Design',
          description: 'Created tax-efficient withdrawal sequence across different account types to minimize lifetime tax burden.',
          timeframe: 'Month 4-6',
          icon: <TrendingUp className="w-4 h-4 text-green-500" />,
          status: 'completed' as const
        },
        {
          phase: 'Legacy Planning',
          title: 'Estate & Charitable Integration',
          description: 'Implemented estate planning strategies aligned with wealth transfer and charitable giving objectives.',
          timeframe: 'Year 2-3',
          icon: <Clock className="w-4 h-4 text-orange-500" />,
          status: 'in-progress' as const
        }
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
      )
    }
  ];

  return (
    <section id="case-studies" className="section-premium bg-gradient-to-br from-accent/5 to-background relative overflow-hidden">
      <GradientAccent variant="blue" position="bottom-right" intensity="low" />
      
      <div className="container-premium relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="heading-lg text-foreground mb-6">
              Real Client Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every financial journey is unique, but the principles of success are consistent. 
              Follow these real client stories to see how strategic planning transforms lives and builds lasting wealth.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="space-premium-lg">
          {caseStudies.map((study, index) => (
            <ScrollReveal key={study.id} delay={index * 100}>
              <ClientStoryCard
                title={study.title}
                clientName={study.clientName}
                situation={study.situation}
                challenges={study.challenges}
                outcomes={study.outcomes}
                keyInsight={study.keyInsight}
                icon={study.icon}
                isExpanded={expandedCase === study.id}
                onToggle={() => toggleCase(study.id)}
              >
                <div className="grid lg:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium text-charcoal mb-4">The Journey</h4>
                    <StoryTimeline steps={study.timeline} />
                  </div>
                  
                  <div className="bg-accent/5 p-6 rounded-xl">
                    <h4 className="font-medium text-charcoal mb-4">Financial Progress</h4>
                    {study.chartComponent}
                    <p className="mt-4 text-xs text-muted-foreground text-center">
                      Real results from implemented strategies
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">Could This Be Your Story?</h4>
                  <p className="text-blue-700 text-sm mb-4">
                    If you're facing similar challenges, we'd love to explore how our approach might work for your unique situation.
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Start Your Success Story
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </ClientStoryCard>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-blue-100">
            <h3 className="text-xl font-medium text-charcoal mb-4">
              Your Story Starts Here
            </h3>
            <p className="text-charcoal/70 mb-6">
              Every success story begins with a conversation. Let's discuss your financial goals and see how our proven strategies can be tailored to your unique situation.
            </p>
            <button
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Schedule Your Strategy Session
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
