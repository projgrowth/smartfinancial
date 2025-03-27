
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CheckCircle, Mail, ArrowRight, CheckCheck } from 'lucide-react';
import MicroAnimations from './ui/micro-animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';

const NEWSLETTER_FREQUENCY = [
  { id: "weekly", label: "Weekly Updates", description: "Stay current with weekly market insights and financial tips" },
  { id: "monthly", label: "Monthly Digest", description: "Get a comprehensive monthly summary of key financial news" },
  { id: "quarterly", label: "Quarterly Review", description: "Receive in-depth quarterly market analysis and wealth strategies" }
];

const INTEREST_TOPICS = [
  { id: "retirement", label: "Retirement Planning" },
  { id: "investing", label: "Investment Strategies" },
  { id: "taxPlanning", label: "Tax Planning" },
  { id: "estateWealth", label: "Estate & Wealth Transfer" },
  { id: "business", label: "Business Owner Strategies" },
  { id: "marketTrends", label: "Market Trends" }
];

const EnhancedNewsletter = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleInterestToggle = (interestId: string) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter(id => id !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1 && !email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      
      toast({
        title: "Successfully Subscribed",
        description: "Thank you for subscribing to our financial insights newsletter!",
      });
      
      // Reset form
      setEmail('');
      setName('');
      setFrequency('monthly');
      setInterests([]);
    }, 1200);
  };

  if (isSubscribed) {
    return (
      <section id="newsletter" className="section py-20 relative overflow-hidden bg-blue-50/40">
        <GradientAccent variant="subtle" position="top-left" intensity="low" />
        
        <div className="container-custom relative z-10">
          <Card className="max-w-2xl mx-auto border-blue-100 shadow-sm overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              
              <CardTitle className="text-2xl mb-4">Thank You for Subscribing!</CardTitle>
              <CardDescription className="text-base mb-6">
                Your first edition of our financial insights will arrive in your inbox shortly. 
                We're excited to help you on your journey to financial success.
              </CardDescription>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <h4 className="font-medium text-blue-700 mb-2 flex items-center justify-center gap-2">
                  <CheckCheck className="h-5 w-5" />
                  <span>What to expect next:</span>
                </h4>
                <ul className="text-sm text-blue-700/80 text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                    <span>A welcome email with exclusive financial resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                    <span>Regular insights based on your selected preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                    <span>Invitations to exclusive webinars and events</span>
                  </li>
                </ul>
              </div>
              
              <Button
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
                onClick={() => setIsSubscribed(false)}
              >
                Subscribe Another Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="section py-20 relative overflow-hidden bg-blue-50/40">
      <GradientAccent variant="subtle" position="top-left" intensity="low" />
      
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-charcoal text-center mb-4">
            Financial Insights Newsletter
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-charcoal/70 max-w-2xl mx-auto mb-12">
            Stay informed with our expert insights on investment strategies, tax planning, and wealth management.
          </p>
        </ScrollReveal>
        
        <Card className="max-w-2xl mx-auto border-blue-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-blue-500 text-white p-6">
            <CardTitle className="text-xl">Subscribe to Our Financial Insights</CardTitle>
            <CardDescription className="text-blue-100">
              Get personalized financial guidance delivered to your inbox
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-2.5 pr-12 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First Name"
                      className="w-full px-4 py-2.5 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h3 className="font-medium text-charcoal mb-4">How often would you like to hear from us?</h3>
                  <div className="space-y-3">
                    {NEWSLETTER_FREQUENCY.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                          frequency === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                        onClick={() => setFrequency(option.id)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{option.label}</h4>
                            <p className="text-xs text-charcoal/70">{option.description}</p>
                          </div>
                          <div className={`h-4 w-4 rounded-full border ${
                            frequency === option.id
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {frequency === option.id && (
                              <div className="h-full w-full flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h3 className="font-medium text-charcoal mb-4">What topics interest you? (Select all that apply)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INTEREST_TOPICS.map((topic) => (
                      <div
                        key={topic.id}
                        className={`p-3 border rounded-md cursor-pointer transition-all duration-200 ${
                          interests.includes(topic.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                        onClick={() => handleInterestToggle(topic.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`h-4 w-4 rounded flex-shrink-0 border ${
                            interests.includes(topic.id)
                              ? 'bg-blue-500 border-blue-500 flex items-center justify-center'
                              : 'border-gray-300'
                          }`}>
                            {interests.includes(topic.id) && (
                              <CheckCheck className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm">{topic.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              
              <MicroAnimations.ShimmerButton
                className={`${step > 1 ? '' : 'w-full'} flex items-center justify-center gap-1.5`}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting 
                  ? "Processing..." 
                  : step < 3 
                    ? "Continue" 
                    : "Subscribe Now"
                }
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </MicroAnimations.ShimmerButton>
            </CardFooter>
          </form>
          
          <div className="p-4 bg-blue-50/50 text-xs text-center text-charcoal/50 border-t border-blue-100">
            We respect your privacy. Unsubscribe anytime. View our <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </div>
        </Card>
      </div>
    </section>
  );
};

export default EnhancedNewsletter;
