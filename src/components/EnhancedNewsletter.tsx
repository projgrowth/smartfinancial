
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
