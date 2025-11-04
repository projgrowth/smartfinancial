
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import ThankYouMessage from './newsletter/ThankYouMessage';
import NewsletterForm from './newsletter/NewsletterForm';
import { NEWSLETTER_FREQUENCY, INTEREST_TOPICS } from './newsletter/constants';

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

  const resetForm = () => {
    setIsSubscribed(false);
    setStep(1);
  };

  return (
    <section id="newsletter" className="section-xl relative overflow-hidden section-bg-premium-light">
      <GradientAccent variant="subtle" position="top-left" intensity="low" className="hidden lg:block" />
      <GradientAccent variant="subtle" position="bottom-right" intensity="low" className="hidden lg:block" />
      
      <div className="container-narrow relative z-10">
        <ScrollReveal>
          <h2 className="heading-lg text-foreground text-center text-balance mb-4">
            Financial Insights Newsletter
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="text-center text-body-lg text-muted-foreground max-w-2xl mx-auto space-component-xl">
            Stay informed with our expert insights on investment strategies, tax planning, and wealth management.
          </p>
        </ScrollReveal>
        
        {isSubscribed ? (
          <ThankYouMessage onReset={resetForm} />
        ) : (
          <NewsletterForm 
            step={step}
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            frequency={frequency}
            setFrequency={setFrequency}
            interests={interests}
            handleInterestToggle={handleInterestToggle}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            frequencyOptions={NEWSLETTER_FREQUENCY}
            interestTopics={INTEREST_TOPICS}
          />
        )}
      </div>
    </section>
  );
};

export default EnhancedNewsletter;
