
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

const Education = () => {
  const navigateToSection = useNavigateSection();
  // State for newsletter sign-up
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  // Handle newsletter sign-up
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      setEmail('');
    }, 1500);
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
        canonicalUrl={typeof window !== 'undefined' ? `${window.location.origin}/education` : undefined}
      />
      <div id="main-content" />
      
      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-var(--nav-h))] flex flex-col justify-center overflow-hidden">
        <div className="container-unified mx-auto z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="heading-xl text-charcoal mb-6">
                Financial Knowledge Center
              </h1>
            </ScrollReveal>
          
            <ScrollReveal delay={100}>
            <p className="text-body-lg text-center max-w-2xl mx-auto space-component-sm">
              Resources to help you make informed financial decisions and build your knowledge of personal finance concepts.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid-three-col gap-unified-lg container-wide mx-auto">
              <Card className="bg-card/80 backdrop-blur-sm border-muted hover:shadow-md transition-shadow">
                <CardHeader className="space-component-sm">
                  <CardTitle className="heading-xs flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-accent" />
                    Educational Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-component-xs">
                  <p className="text-body-sm">
                    Comprehensive resources on financial planning concepts and strategies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-muted hover:shadow-md transition-shadow">
                <CardHeader className="space-component-sm">
                  <CardTitle className="heading-xs flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-accent" />
                    Financial Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-component-xs">
                  <p className="text-body-sm">
                    Interactive calculators and worksheets to help you plan and visualize your financial future.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80 backdrop-blur-sm border-muted hover:shadow-md transition-shadow">
                <CardHeader className="space-component-sm">
                  <CardTitle className="heading-xs flex items-center">
                    <Play className="h-5 w-5 mr-2 text-accent" />
                    Video Library
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-component-xs">
                  <p className="text-body-sm">
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
      <section className="section-md bg-muted/50">
        <div className="container-unified">
          <ScrollReveal>
            <h2 className="heading-lg text-center space-component-md">
              Educational Resources
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <Tabs defaultValue="resources" className="container-wide mx-auto">
              <TabsList className="grid grid-cols-2 space-component-md">
                <TabsTrigger value="resources">Resources Library</TabsTrigger>
                <TabsTrigger value="glossary">Financial Glossary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="resources" className="bg-card space-component-lg rounded-lg border shadow-sm">
                <div className="space-component-lg">
                  {educationalResourceLists.map((section) => (
                    <Collapsible 
                      key={section.id}
                      open={openSections[section.id]} 
                      onOpenChange={() => toggleSection(section.id)}
                      className="border rounded-lg overflow-hidden"
                    >
                      <CollapsibleTrigger className="flex justify-between items-center w-full space-component-sm text-left bg-card hover:bg-muted/50 transition-colors">
                        <div>
                          <h3 className="heading-xs">{section.title}</h3>
                          <p className="text-body-sm">{section.description}</p>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-accent transition-transform duration-300 ${
                          openSections[section.id] ? 'rotate-180' : ''
                        }`} />
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="space-component-sm bg-muted/30 border-t">
                        <div className="grid-three-col gap-unified-md">
                          {section.resources.map((resource, i) => (
                            <Card key={i} className="overflow-hidden border-muted hover:shadow-md transition-all">
                              <CardHeader className="space-component-sm bg-card flex flex-row items-start space-y-0 gap-2">
                                <div className="bg-accent/10 p-1.5 rounded-md">
                                  {resource.icon}
                                </div>
                                <div>
                                  <CardTitle className="heading-xs">
                                    {resource.title}
                                  </CardTitle>
                                  <p className="text-xs font-medium uppercase text-accent">
                                    {resource.type}
                                  </p>
                                </div>
                              </CardHeader>
                              <CardContent className="space-component-sm">
                                <p className="text-body-sm space-component-xs">{resource.description}</p>
                                <a 
                                  href={resource.link} 
                                  className="inline-flex items-center text-accent hover:text-accent/80 text-body-sm font-medium focus-enhanced"
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
              
              <TabsContent value="glossary" className="bg-card space-component-lg rounded-lg border shadow-sm">
                <div className="space-component-md">
                  <h3 className="heading-md space-component-xs">Financial Glossary</h3>
                  <p className="text-body">
                    Understanding these key financial terms will help you make more informed decisions about your money.
                    Try clicking on any term card to learn more.
                  </p>
                </div>
                
                <div className="space-component-md">
                  <p className="text-body space-component-xs">
                    When reading financial content, you'll often encounter terms like <FinancialTerm term="Asset Allocation">asset allocation</FinancialTerm> and <FinancialTerm term="Diversification">diversification</FinancialTerm>. Understanding these concepts is crucial to building a solid financial plan. Another important concept to grasp is <FinancialTerm term="Compound Interest">compound interest</FinancialTerm>, which Einstein allegedly called "the most powerful force in the universe."
                  </p>
                  
                  <div className="flex flex-wrap gap-unified-md space-component-md">
                    <GlossaryButton term="Asset Allocation" />
                    <GlossaryButton term="Compound Interest" />
                    <GlossaryButton term="Tax-Loss Harvesting" />
                    <GlossaryButton term="Diversification" />
                    <GlossaryButton term="Risk Tolerance" />
                  </div>
                  
                  <hr className="space-component-lg" />
                  
                  <h4 className="heading-xs space-component-sm">All Financial Terms</h4>
                  <AllFinancialTerms />
                </div>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="section-md bg-accent/10">
        <div className="container-narrow">
          <ScrollReveal>
            <Card className="border-0 bg-card shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 space-component-lg">
                    <h3 className="heading-md space-component-xs">
                      Subscribe to Our Financial Insights
                    </h3>
                    <p className="text-body space-component-md">
                      Receive our exclusive educational content, market insights, and personalized financial tips directly to your inbox.
                    </p>
                    
                    {hasSubmitted ? (
                      <div className="bg-accent/10 border border-accent/20 space-component-sm rounded-md">
                        <p className="text-accent font-medium">
                          Thank you for subscribing!
                        </p>
                        <p className="text-muted-foreground text-body-sm">
                          Check your email for a confirmation message and your first financial insight.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletterSignup} className="space-component-sm">
                        <div className="space-component-xs">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            required
                            className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          />
                          <p className="text-body-sm text-muted-foreground">
                            We respect your privacy and will never share your information.
                          </p>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
                        </Button>
                      </form>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 bg-blue-500 text-white p-8 flex flex-col justify-center">
                    <h4 className="font-medium text-lg mb-4">What You'll Receive:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</div>
                        <span className="text-sm">Monthly financial planning insights</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</div>
                        <span className="text-sm">Exclusive educational resources</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</div>
                        <span className="text-sm">Market updates and analysis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</div>
                        <span className="text-sm">Invitations to exclusive webinars</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-md">
        <div className="container-unified text-center">
          <ScrollReveal>
            <h2 className="heading-md text-charcoal mb-4">
              Ready to Take the Next Step?
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <p className="text-charcoal/70 max-w-2xl mx-auto mb-8">
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
