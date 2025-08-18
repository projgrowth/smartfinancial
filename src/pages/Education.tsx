
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
      <section className="relative min-h-[85vh] md:min-h-[90vh] safari-mobile:min-h-[75vh] flex flex-col justify-center overflow-hidden">
        <div className="container-unified mx-auto z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="heading-xl text-charcoal mb-6">
                Financial Knowledge Center
              </h1>
            </ScrollReveal>
          
            <ScrollReveal delay={100}>
            <p className="text-lg text-center text-charcoal/70 max-w-2xl mx-auto mb-8">
              Resources to help you make informed financial decisions and build your knowledge of personal finance concepts.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-50 hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-medium flex items-center text-charcoal">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    Educational Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-charcoal/70 text-sm">
                    Comprehensive resources on financial planning concepts and strategies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-blue-50 hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-medium flex items-center text-charcoal">
                    <Calculator className="h-5 w-5 mr-2 text-blue-500" />
                    Financial Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-charcoal/70 text-sm">
                    Interactive calculators and worksheets to help you plan and visualize your financial future.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-blue-50 hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-medium flex items-center text-charcoal">
                    <Play className="h-5 w-5 mr-2 text-blue-500" />
                    Video Library
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-charcoal/70 text-sm">
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
        <div className="container-unified">
          <ScrollReveal>
            <h2 className="heading-lg text-charcoal mb-8 text-center">
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
                      <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-slate-50/80 transition-colors">
                        <div>
                          <h3 className="font-heading font-medium text-lg text-charcoal">{section.title}</h3>
                          <p className="text-sm text-charcoal/70">{section.description}</p>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-blue-500 transition-transform duration-300 ${
                          openSections[section.id] ? 'rotate-180' : ''
                        }`} />
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="p-4 bg-slate-50/50 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {section.resources.map((resource, i) => (
                            <Card key={i} className="overflow-hidden border-blue-50/80 hover:shadow-md transition-all">
                              <CardHeader className="p-4 bg-white flex flex-row items-start space-y-0 gap-2">
                                <div className="bg-blue-50 p-1.5 rounded-md">
                                  {resource.icon}
                                </div>
                                <div>
                                  <CardTitle className="text-base font-medium text-charcoal">
                                    {resource.title}
                                  </CardTitle>
                                  <p className="text-xs font-medium uppercase text-blue-500/80">
                                    {resource.type}
                                  </p>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4">
                                <p className="text-sm text-charcoal/70 mb-4">{resource.description}</p>
                                <a 
                                  href={resource.link} 
                                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
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
              
              <TabsContent value="glossary" className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
                <div className="mb-6">
                  <h3 className="font-heading text-xl font-medium text-charcoal mb-2">Financial Glossary</h3>
                  <p className="text-charcoal/70">
                    Understanding these key financial terms will help you make more informed decisions about your money.
                    Try clicking on any term card to learn more.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <p className="text-charcoal/80 mb-4">
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
                  
                  <h4 className="font-medium text-lg text-charcoal mb-4">All Financial Terms</h4>
                  <AllFinancialTerms />
                </div>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="section-md bg-blue-500/10">
        <div className="container-unified max-w-3xl">
          <ScrollReveal>
            <Card className="border-0 bg-white shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 p-8">
                    <h3 className="font-heading text-xl font-medium text-charcoal mb-3">
                      Subscribe to Our Financial Insights
                    </h3>
                    <p className="text-charcoal/70 mb-6 text-sm">
                      Receive our exclusive educational content, market insights, and personalized financial tips directly to your inbox.
                    </p>
                    
                    {hasSubmitted ? (
                      <div className="bg-green-50 border border-green-100 p-4 rounded-md">
                        <p className="text-green-800 font-medium">
                          Thank you for subscribing!
                        </p>
                        <p className="text-green-700 text-sm mt-1">
                          Check your email for a confirmation message and your first financial insight.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleNewsletterSignup} className="space-y-4">
                        <div className="space-y-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="text-xs text-charcoal/50">
                            We respect your privacy and will never share your information.
                          </p>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
