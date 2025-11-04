
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FinancialTerm, GlossaryButton, AllFinancialTerms } from '@/components/FinancialTermGlossary';
import { Download, BookOpen, Calculator, ArrowRight, ChevronDown, Play, BarChart4 } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ScrollReveal from '../components/ScrollReveal';
import PremiumBackground from '../components/PremiumBackground';
import SEO from '@/components/SEO';
import useNavigateSection from '@/hooks/useNavigateSection';
import Newsletter from '@/components/Newsletter';

const Education = () => {
  const navigateToSection = useNavigateSection();

  // State for collapsibles
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'basics': true,
    'investing': false,
    'retirement': false,
    'tax': false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const educationalResourceLists = [
    {
      id: 'basics',
      title: 'Financial Basics',
      description: 'Foundational knowledge for building a solid financial future',
      resources: [
        {
          title: 'Building an Emergency Fund',
          type: 'Guide',
          description: 'How to create a financial safety net for unexpected expenses',
          link: '#emergency-fund',
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          title: 'Budgeting 101',
          type: 'Worksheet',
          description: 'A step-by-step guide to creating a realistic budget that works',
          link: '#budgeting',
          icon: <Download className="h-4 w-4" />
        },
        {
          title: 'Debt Reduction Calculator',
          type: 'Tool',
          description: 'Plan your path to becoming debt-free with this interactive calculator',
          link: '#debt-calculator',
          icon: <Calculator className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'investing',
      title: 'Investing Fundamentals',
      description: 'Learn how to grow your wealth through strategic investing',
      resources: [
        {
          title: 'Investment Risk Assessment',
          type: 'Quiz',
          description: 'Discover your risk tolerance and what it means for your portfolio',
          link: '#risk-assessment',
          icon: <BarChart4 className="h-4 w-4" />
        },
        {
          title: 'The Power of Compound Interest',
          type: 'Video',
          description: 'Understanding how your money can grow exponentially over time',
          link: '#compound-interest',
          icon: <Play className="h-4 w-4" />
        },
        {
          title: 'Asset Allocation Guide',
          type: 'Ebook',
          description: 'How to distribute your investments across different asset classes',
          link: '#asset-allocation',
          icon: <Download className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'retirement',
      title: 'Retirement Planning',
      description: 'Strategies for securing your financial future',
      resources: [
        {
          title: 'Retirement Needs Calculator',
          type: 'Tool',
          description: 'Determine how much you need to save for a comfortable retirement',
          link: '#retirement-calculator',
          icon: <Calculator className="h-4 w-4" />
        },
        {
          title: '401(k) vs IRA Comparison',
          type: 'Guide',
          description: 'Understanding the differences between retirement account options',
          link: '#retirement-accounts',
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          title: 'Social Security Optimization',
          type: 'Webinar',
          description: 'Strategies to maximize your Social Security benefits',
          link: '#social-security',
          icon: <Play className="h-4 w-4" />
        }
      ]
    },
    {
      id: 'tax',
      title: 'Tax Planning',
      description: 'Strategies to minimize your tax burden legally',
      resources: [
        {
          title: 'Tax-Efficient Investing',
          type: 'Guide',
          description: 'How to structure your investments to minimize tax implications',
          link: '#tax-efficient-investing',
          icon: <BookOpen className="h-4 w-4" />
        },
        {
          title: 'Tax Loss Harvesting Explained',
          type: 'Video',
          description: 'Learn how to offset capital gains with strategic investment losses',
          link: '#tax-loss-harvesting',
          icon: <Play className="h-4 w-4" />
        },
        {
          title: 'Year-End Tax Checklist',
          type: 'Worksheet',
          description: 'Essential actions to take before December 31st to optimize your taxes',
          link: '#tax-checklist',
          icon: <Download className="h-4 w-4" />
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <PremiumBackground />
      
      <SEO 
        title="Financial Education & Resources | Smart Financial Planning"
        description="Guides, tools, and glossary to help you understand key financial planning concepts and make informed decisions."
      />
      <div id="main-content" />
      
      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-var(--nav-h))] flex flex-col justify-center overflow-hidden">
        <div className="container-wide mx-auto z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="heading-xl text-balance mb-6">
                Financial Knowledge Center
              </h1>
            </ScrollReveal>
          
            <ScrollReveal delay={100}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Resources to help you make informed financial decisions and build your knowledge of personal finance concepts.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-card/80 backdrop-blur-sm border-border hover:shadow-md transition-all duration-300">
                <CardHeader className="p-4">
                  <CardTitle className="heading-sm flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Educational Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-muted-foreground text-sm">
                    Comprehensive resources on financial planning concepts and strategies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border hover:shadow-md transition-all duration-300">
                <CardHeader className="p-4">
                  <CardTitle className="heading-sm flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-primary" />
                    Financial Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-muted-foreground text-sm">
                    Interactive calculators and worksheets to help you plan and visualize your financial future.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-border hover:shadow-md transition-all duration-300">
                <CardHeader className="p-4">
                  <CardTitle className="heading-sm flex items-center">
                    <Play className="h-5 w-5 mr-2 text-primary" />
                    Video Library
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-muted-foreground text-sm">
                    Expert explanations of complex financial topics in an easy-to-understand format.
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Educational Resources Section */}
      <section className="section-md bg-slate-50/50">
        <div className="container-default">
          <ScrollReveal>
            <h2 className="heading-lg text-balance mb-8 text-center">
              Educational Resources
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <Tabs defaultValue="resources" className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="resources">Resources Library</TabsTrigger>
                <TabsTrigger value="glossary">Financial Glossary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="resources" className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="space-y-6">
                  {educationalResourceLists.map((section) => (
                    <Collapsible 
                      key={section.id}
                      open={openSections[section.id]} 
                      onOpenChange={() => toggleSection(section.id)}
                      className="border rounded-lg overflow-hidden"
                    >
                      <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-card hover:bg-muted/50 transition-colors">
                        <div>
                          <h3 className="heading-sm">{section.title}</h3>
                          <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-primary transition-transform duration-300 ${
                          openSections[section.id] ? 'rotate-180' : ''
                        }`} />
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="p-4 bg-muted/50 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {section.resources.map((resource, i) => (
                            <Card key={i} className="overflow-hidden hover:shadow-md transition-all duration-300">
                              <CardHeader className="p-4 bg-card flex flex-row items-start space-y-0 gap-2">
                                <div className="bg-primary/10 p-1.5 rounded-md">
                                  {resource.icon}
                                </div>
                                <div>
                                  <CardTitle className="text-base font-medium">
                                    {resource.title}
                                  </CardTitle>
                                  <p className="text-xs font-medium uppercase text-primary/80">
                                    {resource.type}
                                  </p>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4">
                                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                                <a 
                                  href={resource.link} 
                                  className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                                >
                                  Access Resource
                                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                </a>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="glossary" className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <div className="mb-6">
                  <h3 className="heading-md mb-2">Financial Glossary</h3>
                  <p className="text-muted-foreground">
                    Understanding these key financial terms will help you make more informed decisions about your money.
                    Try clicking on any term card to learn more.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-body text-muted-foreground mb-4">
                    When reading financial content, you'll often encounter terms like <FinancialTerm term="Asset Allocation">asset allocation</FinancialTerm> and <FinancialTerm term="Diversification">diversification</FinancialTerm>. Understanding these concepts is crucial to building a solid financial plan. Another important concept to grasp is <FinancialTerm term="Compound Interest">compound interest</FinancialTerm>, which Einstein allegedly called "the most powerful force in the universe."
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <GlossaryButton term="Asset Allocation" />
                    <GlossaryButton term="Compound Interest" />
                    <GlossaryButton term="Tax-Loss Harvesting" />
                    <GlossaryButton term="Diversification" />
                    <GlossaryButton term="Risk Tolerance" />
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h4 className="heading-sm mb-4">All Financial Terms</h4>
                  <AllFinancialTerms />
                </div>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Newsletter Section - Using Unified Component */}
      <section className="section-md bg-accent/5">
        <div className="container-narrow">
          <ScrollReveal>
            <Newsletter variant="simple" 
              title="Subscribe to Our Financial Insights"
              description="Receive our exclusive educational content, market insights, and personalized financial tips directly to your inbox."
              showWebhook={false}
            />
          </ScrollReveal>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-md">
        <div className="container-default text-center">
          <ScrollReveal>
            <h2 className="heading-md text-foreground mb-4">
              Ready to Take the Next Step?
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Schedule a complimentary 30-minute consultation to discuss your financial situation and explore how our personalized approach can help you achieve your goals.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <Button 
              className="mx-auto px-6 py-3 group"
              onClick={() => navigateToSection('contact')}
            >
              <span className="inline-flex items-center">
                <span>Schedule Your Free Consultation</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Button>
          </ScrollReveal>
        </div>
      </section>
      
      
    </div>
  );
};

export default Education;
