import React, { useState, useEffect } from 'react';
import SimpleSuccessMessage from './newsletter/SimpleSuccessMessage';
import SimpleNewsletterForm from './newsletter/SimpleNewsletterForm';
import { sanitizeInput } from '@/utils/security';
import { supabase } from '@/integrations/supabase/client';
import { newsletterSubscriptionSchema } from '@/lib/formValidation';
import { useToast } from '@/hooks/use-toast';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
  onDark?: boolean;
}

const NEWSLETTER_VERSION = 'v1';

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  title = "Subscribe to Our Financial Insights",
  description = "Get exclusive financial tips, market insights, and educational resources delivered to your inbox.",
  compact = false,
  className,
  onDark = false,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedVersion = localStorage.getItem('newsletter_version');
      const isSubscribedStored = localStorage.getItem('newsletter_subscribed') === 'true';
      if (storedVersion !== NEWSLETTER_VERSION) {
        localStorage.removeItem('newsletter_subscribed');
        localStorage.setItem('newsletter_version', NEWSLETTER_VERSION);
        return false;
      }
      return isSubscribedStored;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && isSubscribed) {
      localStorage.setItem('newsletter_subscribed', 'true');
    }
  }, [isSubscribed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      const sanitizedEmail = sanitizeInput(email.trim());
      
      // Validate with Zod
      const validatedData = newsletterSubscriptionSchema.parse({
        email: sanitizedEmail,
      });

      // Insert into database
      const { error: dbError } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: validatedData.email,
          name: validatedData.name,
          interests: validatedData.interests,
        });

      if (dbError) {
        // Check for duplicate email
        if (dbError.code === '23505') {
          toast({
            title: "Already subscribed",
            description: "This email is already on our list.",
          });
          setIsSubscribed(true);
          return;
        }
        throw dbError;
      }

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

      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage || "There was an issue subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`rounded-xl overflow-hidden ${onDark ? 'surface-dark' : 'bg-accent/10 border border-border/50'} space-component-xs ${className}`}>
        <SimpleSuccessMessage onDark={onDark} />
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden ${onDark ? 'surface-dark' : 'bg-muted/30 border border-border/50'} ${compact ? 'space-component-xs' : 'space-component-sm'} ${className}`}>
      <div className={compact ? "space-y-3" : "space-y-4"}>
        <div>
          <h3 className={`font-heading ${compact ? 'text-sm' : 'text-base'} font-medium ${onDark ? 'text-on-dark' : 'text-foreground'}`}>
            {title}
          </h3>
          <p className={`${compact ? 'text-xs' : 'text-sm'} ${onDark ? 'text-on-dark-muted' : 'text-muted-foreground'}`}>
            {description}
          </p>
        </div>

        <SimpleNewsletterForm
          email={email}
          setEmail={setEmail}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          compact={compact}
          onDark={onDark}
        />
      </div>
    </div>
  );
};

export default NewsletterSignup;
