
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from './ScrollReveal';
import GradientAccent from './GradientAccent';
import ThankYouMessage from './newsletter/ThankYouMessage';
import NewsletterForm from './newsletter/NewsletterForm';
import { NEWSLETTER_FREQUENCY, INTEREST_TOPICS } from './newsletter/constants';
import { supabase } from '@/integrations/supabase/client';
import { newsletterSubscriptionSchema } from '@/lib/formValidation';

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Validate input
      const validatedData = newsletterSubscriptionSchema.parse({
        email: email,
        name: name || undefined,
        interests: interests.length > 0 ? interests : undefined,
      });

      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscriptions')
        .select('id')
        .eq('email', validatedData.email)
        .single();

      if (existing) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Insert into database
      const { error: dbError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: validatedData.email,
          name: validatedData.name,
          interests: validatedData.interests,
        });

      if (dbError) throw dbError;

      // Send notification email
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'newsletter',
          data: {
            email: validatedData.email,
            name: validatedData.name,
            interests: validatedData.interests,
          },
        },
      });

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
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: error.message || "There was an issue subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubscribed(false);
    setStep(1);
  };

  return (
    <section id="newsletter" className="section-xl relative overflow-hidden section-bg-premium-light">
      <GradientAccent variant="subtle" position="top-left" intensity="low" />
      <GradientAccent variant="subtle" position="bottom-right" intensity="low" />
      
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
